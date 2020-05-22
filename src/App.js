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

  return (
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
  );
}
