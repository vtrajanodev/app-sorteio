import React, { useRef, useState } from "react";
import './app.css'

interface NomeSorteado {
  nome: string;
}

const App = () => {
  const [nome, setNome] = useState("");
  const [nomes, setNomes] = useState<string[]>([]);
  const [sorteados, setSorteados] = useState<NomeSorteado[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNome = (event: React.FormEvent) => {
    event.preventDefault();
    if (nome.trim() !== "") {
      setNomes([...nomes, nome]);
      setNome("");
      if (inputRef.current) {
        inputRef.current.focus();
      }

    } else {
      alert("Nome não pode ser vazio")
    }
  };

  const sortearNomes = (event: React.FormEvent) => {
    event.preventDefault();
    if (nomes.length >= 4) {
      const nomesSorteados: NomeSorteado[] = [];
      while (nomesSorteados.length < 4) {
        const i = Math.floor(Math.random() * nomes.length);
        const nomeSorteado = nomes[i];
        if (!nomesSorteados.find((n) => n.nome === nomeSorteado)) {
          nomesSorteados.push({ nome: nomeSorteado });
        }
      }
      setSorteados(nomesSorteados);
    }
  };

  const limpaNomes = (event: React.FormEvent) => {
    event.preventDefault();
    setNomes([]);
    setSorteados([]);
    inputRef.current?.focus();
  }


  return (
    <div>
      <h1>Aplicativo de Sorteio</h1>
      <form onSubmit={adicionarNome}>

        <div className="initialButtons">
          <input
            ref={inputRef}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite um nome"
          />
          <button onClick={adicionarNome}>Adicionar</button>
          <button onClick={limpaNomes}>Limpar lista</button>
        </div>
        <ul>
          {nomes.map((nome, index) => (
            <li key={index}>{nome}</li>
          ))}
        </ul>
        <div>
          {nomes.length >= 4 ? (
            <>
              <button onClick={sortearNomes}>Sortear</button>
              <button onClick={limpaNomes}>Novo sorteio</button>
            </>
          ) : (
            <p>Adicione pelo menos 4 nomes para sortear</p>
          )}
        </div>
        {sorteados.length > 0 && (
          <div>
            <h2>Nomes Sorteados</h2>
            <ul>
              {sorteados.map((nomeSorteado) => (
                <li key={Math.random()}>{nomeSorteado.nome}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;