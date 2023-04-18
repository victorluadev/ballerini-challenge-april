import { useState } from "react";
import { IServers } from "./types/servers";
import { ITheme } from "./types/themes";

function App() {
  const [theme, setTheme] = useState<ITheme>({actual: 'dark'});
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [communities, setCommunities] = useState<IServers[]>([]);

  let timer: NodeJS.Timeout;

  function getServers(event: React.KeyboardEvent<HTMLInputElement>, filter: string) {
    setLoading(true);

    console.log(loading);
    clearTimeout(timer);

    console.log(event.key)
    
    if (filter.length >= 2 && event.key === "Enter") {
      timer = setTimeout(fetchData, 500);

      
      console.log(loading);
    }
  }

  async function fetchData() {
    await fetch(
      `https://discord.com/api//discovery/search?query=${filter}&limit=20`
    )
      .then((data) => data.json())
      .then((data) => setCommunities(data.hits))
      .then(() => setLoading(false));
  }

  return (
    <main className={`mainContainer ${theme.actual === 'dark' ? 'dark' : 'light'}`}>
      <header className="headerContainer">
        <span className="headerItem">
          {theme.actual === 'dark' ? (
            <i onClick={() => setTheme({actual: 'light'})}> 🌞 </i>
            ) : (
            <i onClick={() => setTheme({actual: 'dark'})}> 🌙 </i>
          )}
        </span>
      </header>
      <section className={`container ${theme.actual === 'dark' ? 'dark' : 'light'}`} >
        <span>✍</span>
        <h1>Faça algo mágico...</h1>
        <h2>Ache sempre tudo em um só lugar!</h2>
        <div className={`searchContainer ${theme.actual === 'dark' ? 'dark' : 'light'}`}>
          <span></span>
          <input
            type="text"
            id="search"
            name="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyUp={(e) => getServers(e, filter)}
            placeholder="Faça algo mágico..."
            className={`searchButton ${theme.actual === 'dark' ? 'dark' : 'light'}`}
          />
        </div>
        <div
          className={"searchResults " + (filter.length > 0 ? "show " : "hide ") + (theme.actual === 'dark' ? 'dark' : 'light')}
        >
          {communities.map((item, index) => (
            <div key={index} className={`itemContainer ${theme.actual === 'dark' ? 'dark' : 'light'}`}>
              <img
                src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`}
                alt={`${item.name} Server`}
              />
              <div className={`itemDetails ${theme.actual === 'dark' ? 'dark' : 'light'}`}>
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
