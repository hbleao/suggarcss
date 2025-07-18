// useDataQuality.ts (hook para validações por tipo)
'use client';

import { useCallback, useRef, useState } from 'react';
import { api } from '@/lib';
import { onlyNumbers } from '@/utils';
import { DataQualityService } from '@/services';


export function useDataQuality() {
  const abortController = useRef<AbortController | null>(null);

  const [emailValidation, setEmailValidation] = useState({ isValid: false, message: '' });
  const [phoneValidation, setPhoneValidation] = useState({ isValid: false, message: '' });
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);

  const validate = useCallback(async (type: 'email' | 'telefone', param: string) => {

    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

    try {
      const res = await DataQualityService({
              type: type,
              param: onlyNumbers(param)
            });

      const isValid = res.isValid ?? false;
      return {
        isValid,
        message: isValid ? '' : `Digite um ${type} válido`,
      };
    } catch {
      return { isValid: false, message: `Digite um ${type} válido` };
    }
  }, []);

  const checkEmailValidation = useCallback(async (email: string, hasError: boolean) => {
    if (hasError || email === '') return;
    setEmailValidation({ isValid: false, message: '' });
    setIsLoadingEmail(true);
    const result = await validate('email', email);
    setEmailValidation(result);
    setIsLoadingEmail(false);
  }, [validate]);

  const checkPhoneValidation = useCallback(async (phone: string) => {
    if (phone.length !== 15) return;
    setPhoneValidation({ isValid: false, message: '' });
    setIsLoadingPhone(true);
    const result = await validate('telefone', onlyNumbers(phone));
    setPhoneValidation(result);
    setIsLoadingPhone(false);
  }, [validate]);

  return {
    emailValidation,
    phoneValidation,
    isLoadingEmail,
    isLoadingPhone,
    checkEmailValidation,
    checkPhoneValidation,
  };
}
