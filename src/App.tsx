/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useRef } from "react";
import { IServers } from "./types/servers";
import { ITheme, TTheme } from "./types/themes";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import BrazilFlag from "./img/brazil.svg";
import UsFlag from "./img/us.svg";
import WrittingHands from './img/Writting Emoji.svg';

function App() {
  const { t, i18n } = useTranslation();
  const actualTheme = localStorage.getItem("theme")
    ? { actual: localStorage.getItem("theme") as TTheme }
    : { actual: "dark" as TTheme };

  const [theme, setTheme] = useState<ITheme>(actualTheme);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [communities, setCommunities] = useState<IServers[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    localStorage.setItem("theme", theme.actual);
  }, [theme]);

  useEffect(() => {
    communities.length > 0 ? setLoading(false) : setLoading(true);
  }, [communities]);

  const handleOnKeyPressEvent = (event: React.KeyboardEvent<HTMLElement>) => {
    
    if(event.ctrlKey && (event.key === "k")) {
      event.preventDefault();
      inputRef.current !== null ? inputRef.current.focus() : undefined;
    }
  }

  const onClickChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const getServers = (event: React.KeyboardEvent<HTMLInputElement>,filter: string) => {
    clearTimeout(timer);

    if (filter.length >= 2 && (event.key === "Enter" || event.key === " ")) {
      timer = setTimeout(fetchData, 500);
    } else {
      setCommunities([]);
      setLoading(true);
    }
  };

  const fetchData = async () => {
    await fetch(
      `https://discord.com/api//discovery/search?query=${filter}&limit=20`
    )
      .then((data) => data.json())
      .then((data) => setCommunities(data.hits));
  }

  return (
    <main
      className={`mainContainer ${theme.actual === "dark" ? "dark" : "light"}`}
      onKeyDown={(e) => handleOnKeyPressEvent(e)}
      tabIndex={1}
    >
      <header className="headerContainer">
        <span className="headerItem">
          <i onClick={() => onClickChangeLanguage("ptBR")}>
            <img src={BrazilFlag} alt="Bandeira do Brasil" />
          </i>
        </span>
        <span className="headerItem">
          <i onClick={() => onClickChangeLanguage("en-US")}>
            <img src={UsFlag} alt="Bandeira dos Estados Unidos" />
          </i>
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
        <span><img src={WrittingHands} alt="Mão escrevendo"/></span>
        <h1>{t("title")}</h1>
        <h2>{t("subtitle")}</h2>
        <div
          className={`searchContainer ${
            theme.actual === "dark" ? "dark" : "light"
          }`}
        >
          <span></span>
          <input
            ref={inputRef}
            type="text"
            id="search"
            name="search"
            value={filter}
            onChange={(e) => {setFilter(e.target.value)}}
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
          {loading &&
            [0, 1, 2].map((index) => (
              <div className="itemContainer" key={index}>
                <Skeleton circle height={40} width={40} />
                <div className="itemDetails">
                  <h1>{loading ? <Skeleton width={280} /> : undefined}</h1>
                  <h2>{loading ? <Skeleton width={200} /> : undefined}</h2>
                </div>
                <div className="itemActions">
                  <a href="#" className="linkInvite">
                    {loading ? <Skeleton width={70} /> : undefined}
                  </a>
                </div>
              </div>
            ))}
          {communities.map((item, index) => (
            <div
              key={index}
              className={`itemContainer ${
                theme.actual === "dark" ? "dark" : "light"
              }`}
              style={{ display: loading ? "none" : undefined }}
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
                  <button tabIndex={index} className="buttonInvite">
                    {t("button")}
                  </button>
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
