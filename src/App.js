import React, { useState } from 'react';

export default function App() {
  const [ repositories, setRepositories ] = useState([
    { id: 1, name: 'Repos teste'},
    { id: 2, name: 'Repos 2 '},
    { id: 3, name: 'Repos 3'} 
  ]);

  function handleAddRepository(){
    setRepositories([
      ...repositories, 
      { id: Math.random(), name: 'Novo Repo'} 
    ]);
  }

  return (
    <>      
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>
        Adicionar repositório
      </button>
    </>
  );
}
