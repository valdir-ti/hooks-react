import React, { useState, useEffect } from 'react';

export default function App() {
  const [ repositories, setRepositories ] = useState([]);

  //Carrega as informações quando o componente é montado
  useEffect(() => {    
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/valdir-ti/repos');    
      const data = await response.json();    
      setRepositories(data);
    }    
    fetchData();
  }, []);

  //Inserindo a informação de favorito
  function handleFavorite(id){
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito) </span>}
            &nbsp;&nbsp;<button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
  );
}
