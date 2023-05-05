import { useEffect, useState } from "react";
import { IServers } from "./types/servers";
import { ITheme, TTheme } from "./types/themes";
import { useTranslation } from "react-i18next";

import BrazilFlag from './img/brazil.svg';
import UsFlag from './img/us.svg';

function App() {
  const actualTheme = localStorage.getItem("theme")
    ? { actual: localStorage.getItem("theme") as TTheme }
    : { actual: "dark" as TTheme };

  const [theme, setTheme] = useState<ITheme>(actualTheme);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [communities, setCommunities] = useState<IServers[]>([]);
  
  const {t, i18n} = useTranslation();

  const onClickChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  let timer: NodeJS.Timeout;

  useEffect(() => {
    localStorage.setItem("theme", theme.actual);
  }, [theme]);

  function getServers(
    event: React.KeyboardEvent<HTMLInputElement>,
    filter: string
  ) {
    setLoading(true);

    clearTimeout(timer);

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
    <main
      className={`mainContainer ${theme.actual === "dark" ? "dark" : "light"}`}
    >
      <header className="headerContainer">
        <span className="headerItem"> 
          <i onClick={() => onClickChangeLanguage("ptBR")}> <img src={BrazilFlag} alt ="Bandeira do Brasil" /> </i>
        </span>
        <span className="headerItem"> 
          <i onClick={() => onClickChangeLanguage("en-US")}> <img src={UsFlag} alt ="Bandeira dos Estados Unidos" /> </i>
        </span>
        <span className="headerItem">
          {theme.actual === "dark" ? (
            <i onClick={() => setTheme({ actual: "light" })}> 🌞 </i>
          ) : (
            <i onClick={() => setTheme({ actual: "dark" })}> 🌙 </i>
          )}
        </span>
      </header>
      <section
        className={`container ${theme.actual === "dark" ? "dark" : "light"}`}
      >
        <span>✍</span>
        <h1 tabIndex={0}>{t("title").toString()}</h1>
        <h2 tabIndex={1}>{t("subtitle")}</h2>
        <div
          className={`searchContainer ${
            theme.actual === "dark" ? "dark" : "light"
          }`}
        >
          <span></span>
          <input
            type="text"
            id="search"
            name="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyUp={(e) => getServers(e, filter)}
            placeholder={t("placeholder").toString()}
            className={`searchButton ${
              theme.actual === "dark" ? "dark" : "light"
            }`}
          />
        </div>
        <div
          className={
            "searchResults " +
            (filter.length > 0 ? "show " : "hide ") +
            (theme.actual === "dark" ? "dark" : "light")
          }
        >
          {communities.map((item, index) => (
            <div
              key={index}
              className={`itemContainer ${
                theme.actual === "dark" ? "dark" : "light"
              }`}
            >
              <img
                src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`}
                alt={`${item.name} Server`}
              />
              <div
                className={`itemDetails ${
                  theme.actual === "dark" ? "dark" : "light"
                }`}
              >
                <h1>{item.name}</h1>
                <h2>{`${item.approximate_member_count} ${t("members")}`}</h2>
              </div>
              <div className="itemActions">
                <a
                  href={`https://discord.gg/${item.vanity_url_code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="linkInvite"
                >
                  <button tabIndex={index} className="buttonInvite">{t("button")}</button>
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
