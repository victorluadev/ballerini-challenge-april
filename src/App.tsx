import React, { useState } from "react";

function App() {
  const [filter, setFilter] = useState<string>("");

  return (
    <React.Fragment>
      <section className="container">
        <span>✍</span>
        <h1>Faça algo mágico...</h1>
        <h2>Ache sempre tudo em um só lugar!</h2>
        <div className="searchContainer">
          <span></span>
          <input
            type="text"
            id="search"
            name="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Faça algo mágico..."
            className="searchButton"
          />
        </div>
        <div className={"searchResults " + (filter.length > 0 ? 'show' : '')}>
          {filter}
          <div className="itemContainer">
            <img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png" alt="nome do servidor"/>
            <div className="itemDetails">
              <h1>Comunidade top</h1>
              <h2>20k membros</h2>
            </div>
            <div className="itemActions">
              <button>Entrar</button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default App;
