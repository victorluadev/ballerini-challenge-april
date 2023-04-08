import React from "react";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <span>✍</span>
        <h1>Faça algo mágico...</h1>
        <h2>Ache sempre tudo em um só lugar!</h2>
        <div className="searchContainer">
          <span></span>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Faça algo mágico..."
            className="searchButton"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
