import React, { useState, useEffect } from 'react';

export default function App() {
  const [ repositories, setRepositories] = useState([])
  const [ favorites, setFavorites] = useState(0)

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/Sif1/repos');
    const data = await response.json();
    
    setRepositories(data);
  }, []);

  useEffect(() => { 
    const filtered = repositories.filter(repo => repo.favorite );
    setFavorites(filtered.length);
    
}, [repositories])

 function handleFavorite(id) {
    const newList = repositories.map(repo => {
      return repo.id === id ? { ... repo, favorite: !repo.favorite} : repo
    });

    setRepositories(newList);
 }

  return (
  <> 
  {console.log('repos', repositories)}
  <h1>My github public repos</h1>
  <h1>Numer of favorite repos: {favorites}</h1>
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
        {repo.name}
        {repo.favorite && <span> (FAVORITO)</span>}
        <button onClick={() => handleFavorite(repo.id)}>Favoritar Repo</button>
        </li>
        ))}
    </ul>
  </>  
  )
}