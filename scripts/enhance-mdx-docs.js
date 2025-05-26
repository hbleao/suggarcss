#!/usr/bin/env node

/**
 * Script para melhorar a documentação MDX com exemplos de código detalhados
 * Este script adiciona exemplos de código para cada componente
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios
const mdxDir = path.join(__dirname, '../.storybook/stories/docs/components');

// Obter todos os arquivos MDX
const mdxFiles = fs.readdirSync(mdxDir)
  .filter(file => file.endsWith('.mdx'));

// Componentes e seus exemplos específicos
const componentExamples = {
  // Já atualizados manualmente
  'Alert': null,
  'Button': null,
  
  // Componentes com exemplos específicos
  'BannerDouble': `### Exemplo Básico

\`\`\`jsx
<BannerDouble 
  banners={[
    {
      title: "Oferta Especial",
      subtitle: "Até 50% de desconto",
      link: { label: "Ver ofertas", href: "/ofertas" },
      image: { src: "url-da-imagem.jpg", alt: "Imagem promocional" },
      bgColor: "primary",
      titleColor: "white",
      subtitleColor: "light"
    },
    {
      title: "Novos Produtos",
      subtitle: "Confira os lançamentos",
      link: { label: "Explorar", href: "/lancamentos" },
      image: { src: "url-da-imagem-2.jpg", alt: "Novos produtos" },
      bgColor: "secondary",
      titleColor: "dark",
      subtitleColor: "dark"
    }
  ]}
/>
\`\`\``,

  'Column': `### Exemplo Básico

\`\`\`jsx
<Column 
  mobile={[1, 9]} 
  tabletPortrait={[1, 5]} 
  tabletLandscape={[1, 7]} 
  desktop={[1, 4]} 
  wide={[1, 3]}
>
  Conteúdo da coluna
</Column>
\`\`\`

### Exemplo com Grid Responsivo

\`\`\`jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
  <Column 
    mobile={[1, 12]} 
    tabletPortrait={[1, 6]} 
    desktop={[1, 4]}
  >
    Coluna 1
  </Column>
  <Column 
    mobile={[1, 12]} 
    tabletPortrait={[7, 12]} 
    desktop={[5, 8]}
  >
    Coluna 2
  </Column>
  <Column 
    mobile={[1, 12]} 
    desktop={[9, 12]}
  >
    Coluna 3
  </Column>
</div>
\`\`\``,

  'Dialog': `### Exemplo Básico

\`\`\`jsx
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

return (
  <>
    <Button onClick={handleOpen}>Abrir Dialog</Button>
    <Dialog
      open={open}
      onClose={handleClose}
      title="Título do Dialog"
      content="Este é o conteúdo do dialog. Você pode incluir qualquer texto ou componentes aqui."
      actions={[
        { label: 'Cancelar', onClick: handleClose },
        { label: 'Confirmar', onClick: () => {
          console.log('Confirmado!');
          handleClose();
        }}
      ]}
    />
  </>
);
\`\`\`

### Dialog com Conteúdo Personalizado

\`\`\`jsx
<Dialog
  open={open}
  onClose={handleClose}
  title="Formulário de Contato"
>
  <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor="name">Nome</label>
      <input id="name" type="text" />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
      <Button onClick={handleClose} styles="ghost">Cancelar</Button>
      <Button type="submit">Enviar</Button>
    </div>
  </form>
</Dialog>
\`\`\``,

  'Footer': `### Exemplo Básico

\`\`\`jsx
<Footer
  logo="/path/to/logo.svg"
  logoAlt="Logo da Empresa"
  copyright="© 2025 Empresa. Todos os direitos reservados."
  links={[
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'Cookies', href: '/cookies' }
  ]}
  socialLinks={[
    { icon: 'facebook', href: 'https://facebook.com/empresa' },
    { icon: 'instagram', href: 'https://instagram.com/empresa' },
    { icon: 'twitter', href: 'https://twitter.com/empresa' }
  ]}
/>
\`\`\`

### Footer com Múltiplas Colunas

\`\`\`jsx
<Footer
  logo="/path/to/logo.svg"
  logoAlt="Logo da Empresa"
  copyright="© 2025 Empresa. Todos os direitos reservados."
  columns={[
    {
      title: 'Produtos',
      links: [
        { label: 'Seguro Auto', href: '/auto' },
        { label: 'Seguro Residencial', href: '/residencial' },
        { label: 'Seguro Viagem', href: '/viagem' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nós', href: '/sobre' },
        { label: 'Carreiras', href: '/carreiras' },
        { label: 'Contato', href: '/contato' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Chat Online', href: '/chat' },
        { label: 'Telefones', href: '/telefones' }
      ]
    }
  ]}
/>
\`\`\``,

  'Header': `### Exemplo Básico

\`\`\`jsx
<Header
  logo="/path/to/logo.svg"
  logoAlt="Logo da Empresa"
  menuItems={[
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' }
  ]}
/>
\`\`\`

### Header com Dropdown

\`\`\`jsx
<Header
  logo="/path/to/logo.svg"
  logoAlt="Logo da Empresa"
  menuItems={[
    { label: 'Início', href: '/' },
    { 
      label: 'Produtos', 
      href: '/produtos',
      submenu: [
        { label: 'Seguro Auto', href: '/produtos/auto' },
        { label: 'Seguro Residencial', href: '/produtos/residencial' },
        { label: 'Seguro Viagem', href: '/produtos/viagem' }
      ]
    },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' }
  ]}
  actions={[
    { label: 'Entrar', href: '/login', variant: 'secondary' },
    { label: 'Cadastrar', href: '/cadastro', variant: 'primary' }
  ]}
/>
\`\`\``,

  'HeaderAcquisitionFlow': `### Exemplo Básico

\`\`\`jsx
<HeaderAcquisitionFlow
  goBackLink="/produtos"
  hasGoBackLink={true}
  hasShoppingCart={true}
  logoSrc="/path/to/logo.svg"
  logoAlt="Logo da Empresa"
/>
\`\`\`

### Exemplo com Etapas

\`\`\`jsx
<HeaderAcquisitionFlow
  goBackLink="/produtos"
  hasGoBackLink={true}
  hasShoppingCart={true}
  logoSrc="/path/to/logo.svg"
  logoAlt="Logo da Empresa"
  steps={[
    { label: 'Dados Pessoais', completed: true },
    { label: 'Endereço', completed: true },
    { label: 'Pagamento', active: true },
    { label: 'Confirmação', completed: false }
  ]}
/>
\`\`\``,
};

// Modelo genérico para componentes sem exemplos específicos
const getGenericExamples = (componentName) => {
  return `### Exemplo Básico

\`\`\`jsx
<${componentName} />
\`\`\`

### Exemplo com Props

\`\`\`jsx
<${componentName} 
  // Adicione props específicas do componente aqui
/>
\`\`\``;
};

// Processar cada arquivo MDX
for (const mdxFile of mdxFiles) {
  const componentName = path.basename(mdxFile, '.mdx');
  const mdxPath = path.join(mdxDir, mdxFile);
  
  // Pular componentes que já foram atualizados manualmente
  if (componentExamples[componentName] === null) {
    console.log(`Pulando ${componentName} (já atualizado manualmente)`);
    continue;
  }
  
  // Ler o conteúdo atual
  let content = fs.readFileSync(mdxPath, 'utf8');
  
  // Verificar se o arquivo já tem exemplos detalhados
  if (content.includes('### Exemplo Básico')) {
    console.log(`Pulando ${componentName} (já contém exemplos detalhados)`);
    continue;
  }
  
  // Encontrar a posição para inserir os exemplos
  const examplesMatch = content.match(/## Exemplos/);
  
  if (examplesMatch) {
    // Posição após "## Exemplos"
    const examplesPos = content.indexOf(examplesMatch[0]) + examplesMatch[0].length;
    
    // Obter exemplos específicos ou genéricos
    const examples = componentExamples[componentName] || getGenericExamples(componentName);
    
    // Inserir exemplos após "## Exemplos"
    const before = content.substring(0, examplesPos);
    const after = content.substring(examplesPos);
    
    content = before + '\n\n' + examples + after;
  } else {
    // Se não encontrar "## Exemplos", adicionar antes de "## Importação" ou ao final
    const importMatch = content.match(/## Importação/);
    
    if (importMatch) {
      const importPos = content.indexOf(importMatch[0]);
      const examples = componentExamples[componentName] || getGenericExamples(componentName);
      
      const before = content.substring(0, importPos);
      const after = content.substring(importPos);
      
      content = before + '## Exemplos\n\n' + examples + '\n\n' + after;
    } else {
      // Adicionar ao final
      const examples = componentExamples[componentName] || getGenericExamples(componentName);
      content += '\n\n## Exemplos\n\n' + examples;
    }
  }
  
  // Escrever o conteúdo atualizado
  fs.writeFileSync(mdxPath, content);
  
  console.log(`Adicionados exemplos detalhados para ${componentName}`);
}

console.log('Melhoria da documentação MDX concluída!');
