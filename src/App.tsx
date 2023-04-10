import { useState } from "react";
import { IServers } from "./types/servers";

function App() {
  const [filter, setFilter] = useState<string>("");
  const [communities, setCommunities] = useState<IServers[]>([]);

  let timer: NodeJS.Timeout;

  function getServers(event: React.KeyboardEvent<HTMLInputElement>, filter: string) {
    clearTimeout(timer);

    console.log(event.key)
    
    if (filter.length >= 2 &&(event.key.match("^\\w$|\\s") || event.key === "Backspace")) {
      timer = setTimeout(fetchData, 500);
    }
  }

  async function fetchData() {
    await fetch(
      `https://discord.com/api//discovery/search?query=${filter}&limit=20`
    )
      .then((data) => data.json())
      .then((data) => setCommunities(data.hits));
  }

  return (
    <main>
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
            onKeyUp={(e) => getServers(e, filter)}
            placeholder="Faça algo mágico..."
            className="searchButton"
          />
        </div>
        <div
          className={"searchResults " + (filter.length > 0 ? "show" : "hide")}
        >
          {communities.map((item, index) => (
            <div className="itemContainer" key={index}>
              <img
                src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`}
                alt={`${item.name} Server`}
              />
              <div className="itemDetails">
                <h1>{item.name}</h1>
                <h2>{`${item.approximate_member_count} membros`}</h2>
              </div>
              <div className="itemActions">
                <a
                  href={`https://discord.gg/${item.vanity_url_code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="linkInvite"
                >
                  <button className="buttonInvite">Entrar</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
