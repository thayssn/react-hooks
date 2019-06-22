import React, { useState, useEffect } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const response = await fetch(
        "https://api.github.com/users/thayssn/repos"
      );
      const data = await response.json();

      setRepositories(data);
    };
    fetchRepos();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo =>
      repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    );

    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li
            key={repo.id}
            style={{
              backgroundColor: repo.favorite ? "#DE4853" : "#000",
              color: "#FFF"
            }}
          >
            {repo.name} - {repo.id}
            <button
              onClick={() => {
                handleFavorite(repo.id);
              }}
            >
              Favoritar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
