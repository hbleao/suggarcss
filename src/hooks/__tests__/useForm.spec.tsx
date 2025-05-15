import { renderHook, act } from '@testing-library/react';
import { useForm } from '../useForm';

describe('useForm', () => {
  it('deve inicializar com os valores fornecidos', () => {
    const initialValues = { name: 'John', email: 'john@example.com', age: 30 };
    
    const { result } = renderHook(() => useForm(initialValues));
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('deve atualizar um único valor corretamente', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Jane' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.values).toEqual({
      name: 'Jane',
      email: 'john@example.com'
    });
  });

  it('deve marcar um campo como tocado ao perder o foco', () => {
    const initialValues = { name: '', email: '' };
    
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.handleBlur({
        target: { name: 'name' }
      } as React.FocusEvent<HTMLInputElement>);
    });
    
    expect(result.current.touched).toEqual({ name: true });
    expect(result.current.touched.email).toBeUndefined();
  });

  it('deve validar os campos usando a função de validação fornecida', () => {
    const initialValues = { name: '', email: 'invalid' };
    
    const validate = (values: typeof initialValues) => {
      const errors: Record<string, string> = {};
      
      if (!values.name) {
        errors.name = 'Nome é obrigatório';
      }
      
      if (!values.email.includes('@')) {
        errors.email = 'Email inválido';
      }
      
      return errors;
    };
    
    const { result } = renderHook(() => useForm(initialValues, validate));
    
    // Verificar erros iniciais
    expect(result.current.errors).toEqual({
      name: 'Nome é obrigatório',
      email: 'Email inválido'
    });
    expect(result.current.isValid).toBe(false);
    
    // Corrigir o campo de email
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'valid@example.com' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    // Verificar que o erro de email foi resolvido
    expect(result.current.errors).toEqual({
      name: 'Nome é obrigatório'
    });
    expect(result.current.isValid).toBe(false);
    
    // Corrigir o campo de nome
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    // Verificar que todos os erros foram resolvidos
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(true);
  });

  it('deve executar onSubmit quando o formulário é válido', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const onSubmit = jest.fn();
    
    const { result } = renderHook(() => useForm(initialValues, undefined, onSubmit));
    
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
    });
    
    // Verificar que onSubmit foi chamado com os valores corretos
    expect(onSubmit).toHaveBeenCalledWith(initialValues);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('não deve executar onSubmit quando o formulário é inválido', () => {
    const initialValues = { name: '', email: 'invalid' };
    const onSubmit = jest.fn();
    
    const validate = (values: typeof initialValues) => {
      const errors: Record<string, string> = {};
      
      if (!values.name) {
        errors.name = 'Nome é obrigatório';
      }
      
      if (!values.email.includes('@')) {
        errors.email = 'Email inválido';
      }
      
      return errors;
    };
    
    const { result } = renderHook(() => useForm(initialValues, validate, onSubmit));
    
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
    });
    
    // Verificar que onSubmit não foi chamado
    expect(onSubmit).not.toHaveBeenCalled();
    
    // Verificar que todos os campos foram marcados como tocados
    expect(result.current.touched).toEqual({
      name: true,
      email: true
    });
  });

  it('deve permitir definir valores programaticamente', () => {
    const initialValues = { name: '', email: '' };
    
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.setValues({
        name: 'John',
        email: 'john@example.com'
      });
    });
    
    expect(result.current.values).toEqual({
      name: 'John',
      email: 'john@example.com'
    });
  });

  it('deve permitir redefinir o formulário para os valores iniciais', () => {
    const initialValues = { name: 'Initial', email: 'initial@example.com' };
    
    const { result } = renderHook(() => useForm(initialValues));
    
    // Modificar os valores
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Modified' }
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'email', value: 'modified@example.com' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.values).toEqual({
      name: 'Modified',
      email: 'modified@example.com'
    });
    
    // Redefinir o formulário
    act(() => {
      result.current.resetForm();
    });
    
    // Verificar que os valores voltaram ao estado inicial
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.touched).toEqual({});
    expect(result.current.errors).toEqual({});
  });

  it('deve lidar com submissões assíncronas', async () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const onSubmit = jest.fn().mockImplementation(() => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    });
    
    const { result, waitForNextUpdate } = renderHook(() => useForm(initialValues, undefined, onSubmit));
    
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
    });
    
    // Verificar que isSubmitting é true durante a submissão
    expect(result.current.isSubmitting).toBe(true);
    
    // Esperar a conclusão da submissão
    await waitForNextUpdate();
    
    // Verificar que isSubmitting voltou a ser false
    expect(result.current.isSubmitting).toBe(false);
    expect(onSubmit).toHaveBeenCalledWith(initialValues);
  });
});
