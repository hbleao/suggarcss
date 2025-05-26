#!/usr/bin/env node

/**
 * Script para melhorar os arquivos MDX adicionando exemplos interativos
 * Este script adiciona Canvas e Story para cada componente
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

// Modelo para os imports e Canvas/Story
const getEnhancedImports = (componentName) => `import { Meta, Story, Canvas } from '@storybook/blocks';
import { ${componentName} } from '../../../src/components/${componentName}';`;

// Função para criar exemplos interativos com base no nome do componente
const createInteractiveExamples = (componentName) => {
  switch(componentName) {
    case 'Button':
      return `
<Canvas>
  <Story name="Primary">
    <Button variant="insurance" styles="primary">Botão Primário</Button>
  </Story>
  <Story name="Secondary">
    <Button variant="insurance" styles="secondary">Botão Secundário</Button>
  </Story>
  <Story name="Ghost">
    <Button variant="insurance" styles="ghost">Botão Ghost</Button>
  </Story>
</Canvas>

## Variantes

<Canvas>
  <Story name="Insurance">
    <Button variant="insurance">Seguro</Button>
  </Story>
  <Story name="Banking">
    <Button variant="banking">Banco</Button>
  </Story>
  <Story name="Health">
    <Button variant="health">Saúde</Button>
  </Story>
</Canvas>`;

    case 'Header':
      return `
<Canvas>
  <Story name="Default">
    <Header 
      logo="https://via.placeholder.com/120x40?text=Porto"
      logoAlt="Logo Porto"
      menuItems={[
        { label: 'Início', href: '/' },
        { label: 'Produtos', href: '/produtos' },
        { label: 'Sobre', href: '/sobre' },
        { label: 'Contato', href: '/contato' }
      ]}
    />
  </Story>
</Canvas>`;

    case 'Footer':
      return `
<Canvas>
  <Story name="Default">
    <Footer
      logo="https://via.placeholder.com/120x40?text=Porto"
      logoAlt="Logo Porto"
      copyright="© 2025 Porto. Todos os direitos reservados."
      links={[
        { label: 'Termos de Uso', href: '/termos' },
        { label: 'Política de Privacidade', href: '/privacidade' },
        { label: 'Cookies', href: '/cookies' }
      ]}
    />
  </Story>
</Canvas>`;

    case 'Dialog':
      return `
<Canvas>
  <Story name="Dialog Example">
    {() => {
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
    }}
  </Story>
</Canvas>`;

    case 'BannerDouble':
      return `
<Canvas>
  <Story name="Default">
    <BannerDouble 
      banners={[
        {
          title: "Oferta Especial",
          subtitle: "Até 50% de desconto",
          link: { label: "Ver ofertas", href: "/ofertas" },
          image: { 
            src: "https://via.placeholder.com/600x400?text=Oferta+Especial", 
            alt: "Imagem promocional" 
          },
          bgColor: "primary",
          titleColor: "white",
          subtitleColor: "light"
        },
        {
          title: "Novos Produtos",
          subtitle: "Confira os lançamentos",
          link: { label: "Explorar", href: "/lancamentos" },
          image: { 
            src: "https://via.placeholder.com/600x400?text=Novos+Produtos", 
            alt: "Novos produtos" 
          },
          bgColor: "secondary",
          titleColor: "dark",
          subtitleColor: "dark"
        }
      ]}
    />
  </Story>
</Canvas>`;

    case 'Column':
      return `
<Canvas style={{ background: '#f0f0f0', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
  <Story name="Default">
    <Column 
      mobile={[1, 13]} 
      tabletPortrait={[1, 7]} 
      tabletLandscape={[1, 7]} 
      desktop={[1, 7]} 
      wide={[1, 7]}
    >
      <div style={{ 
        background: '#0066cc', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '4px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}>
        Coluna Responsiva
      </div>
    </Column>
  </Story>
</Canvas>`;

    case 'HeaderAcquisitionFlow':
      return `
<Canvas>
  <Story name="Default">
    <HeaderAcquisitionFlow 
      goBackLink="/products" 
      hasGoBackLink={true} 
      hasShoppingCart={true}
      logoSrc="https://via.placeholder.com/120x40?text=Porto"
      logoAlt="Logo Porto"
    />
  </Story>
</Canvas>`;

    // Exemplos genéricos para outros componentes
    default:
      return `
<Canvas>
  <Story name="Default">
    <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
      Exemplo interativo do componente ${componentName} será exibido aqui.
      Para visualizar corretamente, é necessário implementar um exemplo específico para este componente.
    </div>
  </Story>
</Canvas>`;
  }
};

// Processar cada arquivo MDX
for (const mdxFile of mdxFiles) {
  const componentName = path.basename(mdxFile, '.mdx');
  const mdxPath = path.join(mdxDir, mdxFile);
  
  // Ler o conteúdo atual
  let content = fs.readFileSync(mdxPath, 'utf8');
  
  // Verificar se o arquivo já tem Canvas/Story
  if (content.includes('<Canvas>') || content.includes('<Story')) {
    console.log(`Pulando ${mdxFile} (já contém exemplos interativos)`);
    continue;
  }
  
  // Substituir os imports
  const importRegex = /import \{ Meta \} from '@storybook\/blocks';/;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, getEnhancedImports(componentName));
  } else {
    // Se não encontrar o padrão de import, adicionar no início
    content = getEnhancedImports(componentName) + '\n\n' + content;
  }
  
  // Encontrar a posição para inserir os exemplos interativos (após a primeira seção ## ou # se não houver ##)
  const firstSectionMatch = content.match(/^## /m);
  const insertPosition = firstSectionMatch 
    ? content.indexOf(firstSectionMatch[0]) 
    : content.indexOf('\n\n', content.indexOf('# ' + componentName));
  
  if (insertPosition !== -1) {
    // Inserir exemplos interativos após a primeira seção
    const before = content.substring(0, insertPosition);
    const after = content.substring(insertPosition);
    
    // Adicionar exemplos interativos
    const interactiveExamples = createInteractiveExamples(componentName);
    content = before + '\n\n## Exemplos Interativos\n' + interactiveExamples + '\n\n' + after;
  } else {
    // Adicionar ao final se não encontrar um bom ponto de inserção
    content += '\n\n## Exemplos Interativos\n' + createInteractiveExamples(componentName);
  }
  
  // Escrever o conteúdo atualizado
  fs.writeFileSync(mdxPath, content);
  
  console.log(`Adicionados exemplos interativos para ${componentName}`);
}

console.log('Melhoria dos arquivos MDX concluída!');
