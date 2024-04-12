import { FiSearch } from "react-icons/fi";
import './stylesCriado.css';
import { useState } from "react";
import api from "./services/api";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if (input === "") {
      alert('Preencha algum CEP');
      setCep("");
      return;
    }
    if (input.length !== 8) {
      alert("O CEP deve possuir 8 números");
      setInput("");
      setCep("");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data)
      setInput("");

    } catch{
      alert("Erro ao buscar um CEP");
      setInput("");
      setCep("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        maxLength={8}
        value={input}
        onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>
      
      {Object.keys(cep).length > 1 && (
      <main className="main">
        <h2>CEP:{ cep.cep }</h2>

        <span>{ cep.logradouro }</span>
        {Object.keys(cep.complemento).length > 0 && (
          <span>Complemento: { cep.complemento }</span>
        )}
        <span>{ cep.bairro }</span>
        <span>{ cep.localidade } - { cep.uf }</span>
      </main>
      )}

    </div>
  );
}

export default App;
