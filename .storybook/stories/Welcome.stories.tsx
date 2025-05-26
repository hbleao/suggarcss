import React from 'react';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Introdução/Bem-vindo',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const Welcome = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Ocean Design System</h1>
      
      <div style={{ width: '200px', height: '60px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        Logo Ocean
      </div>
      
      <p>
        Bem-vindo à documentação interativa do Ocean, uma biblioteca de componentes React em TypeScript 
        que fornece um conjunto de componentes reutilizáveis, estilizados e acessíveis para construir 
        interfaces modernas e consistentes.
      </p>
      
      <h2>Navegação</h2>
      <p>A documentação está organizada nas seguintes seções:</p>
      <ul>
        <li><strong>Fundamentos</strong>: Princípios de design, tipografia, cores e outros elementos fundamentais</li>
        <li><strong>Componentes</strong>: Documentação detalhada e exemplos interativos de todos os componentes disponíveis</li>
        <li><strong>Hooks</strong>: Hooks utilitários para facilitar o desenvolvimento</li>
      </ul>
      
      <h2>Instalação</h2>
      <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
        <code>
          # Usando npm{'\n'}
          npm install @porto/js-library-corp-hubv-porto-ocean{'\n\n'}
          # Usando yarn{'\n'}
          yarn add @porto/js-library-corp-hubv-porto-ocean
        </code>
      </pre>
      
      <h2>Uso Básico</h2>
      <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
        <code>
          {`import React from 'react';
import { Button, Typography } from '@porto/js-library-corp-hubv-porto-ocean';
import '@porto/js-library-corp-hubv-porto-ocean/dist/styles.css';

function App() {
  return (
    <div>
      <Typography variant="title1">Olá, Ocean!</Typography>
      <Button variant="insurance" styles="primary">Clique-me</Button>
    </div>
  );
}`}
        </code>
      </pre>
      
      <h2>Contribuição</h2>
      <p>
        O Ocean é um projeto em constante evolução. Contribuições são bem-vindas para melhorar 
        a biblioteca e sua documentação.
      </p>
      
      <h2>Suporte</h2>
      <p>
        Se você tiver dúvidas ou precisar de ajuda, entre em contato com a equipe de desenvolvimento.
      </p>
    </div>
  );
};
