import { useState } from 'react';
import './App.css';

// Componentes instalados pela CLI do SugarCSS
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function App() {
  const [name, setName] = useState('');
  
  return (
    <div className="app">
      <h1>Teste SugarCSS</h1>
      <p>Este é um projeto de teste para a biblioteca SugarCSS</p>
      
      <div className="form">
        {/* Componentes SugarCSS instalados pela CLI */}
        <Input 
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        
        <Button onClick={() => alert(`Olá, ${name || 'visitante'}!`)} type="button">
          Dizer Olá
        </Button>
        
        {/* Componentes nativos (comentados após instalar os componentes SugarCSS) */}
        {/*
        <div className="input-container">
          <label htmlFor="name">Nome</label>
          <input 
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        
        <button onClick={() => alert(`Olá, ${name || 'visitante'}!`)}>
          Dizer Olá
        </button>
        */}
      </div>
      
      <div className="instructions">
        <h2>Componentes SugarCSS instalados!</h2>
        <p>Os componentes Button e Input foram instalados com sucesso e estão sendo utilizados nesta aplicação.</p>
        <h3>Outros componentes disponíveis:</h3>
        <pre>
          <code>
{`# No diretório raiz do projeto SugarCSS
npm run test:cli install <nome-do-componente>`}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default App;
