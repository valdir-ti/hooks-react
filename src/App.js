import React, { useState, useEffect } from 'react';

export default function App() {
  const [ repositories, setRepositories ] = useState([]);
  const [ location, setLocation ] = useState({});

  //Carrega as informações quando o componente é montado
  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/valdir-ti/repos');    
      const data = await response.json();    
      setRepositories(data);
    }    
    fetchData();

    //ComponentWillUnmount
    const watchId = navigator.geolocation.watchPosition(handlePositionReceived);
    return () =>navigator.geolocation.clearWatch(watchId);

  }, []);

  //Esse effect só vai ser executado quando o parametro enviado for alterado
  useEffect(()=>{
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem (${filtered.length}) favoritos`
  }, [repositories]);

  //Inserindo a informação de favorito
  function handleFavorite(id){
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  //Trabalhando com o eventListener
  function handlePositionReceived({ coords }){
    console.log(coords);    
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  }

  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito) </span>}
            &nbsp;&nbsp;<button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
      <hr/>
      <h3>Latitude e Longitude</h3>
      <p>Latitude:&nbsp;{location.latitude}</p>
      <p>Longitude:&nbsp;{location.longitude}</p>
    </>
  );
}
