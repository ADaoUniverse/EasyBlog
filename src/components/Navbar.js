import { useEffect, useState } from "react";

import Toggle from "../components/Toggle";
import { eventTopic, id } from "../Constants";

export default () => {
  const [navTop, setNavTop] = useState({});

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const navbar = document.getElementById(id.div.navbar);
    setNavTop({ offsetTop: navbar.offsetTop, width: navbar.clientWidth });
  };

  const stickyNav = () => {
    const navbarElem = document.getElementById(id.div.navbar)
    navbarElem.style.position = "fixed";
    navbarElem.style.top = 0;
    navbarElem.style.width = `${navTop.width}px`;
    navbarElem.style.boxShadow = "0 4px 8px 0 var(--card-shadow);";

    const navbarStickyPaddingFillerElem = document.getElementById(id.div.navbarStickyPadding)
    navbarStickyPaddingFillerElem.style.height = `${navbarElem.clientHeight}px`;
  };

  const nonStickyNav = () => {
    const navbarElem = document.getElementById(id.div.navbar)
    navbarElem.style.top = navTop.offsetTop;
    navbarElem.style.position = "";
    navbarElem.style.width = "";
    navbarElem.style.boxShadow = "";
 
    const navbarStickyPaddingFillerElem = document.getElementById(id.div.navbarStickyPadding)
    navbarStickyPaddingFillerElem.style.height = "0px";
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY >= navTop.offsetTop) {
      stickyNav();
      return;
    }
    nonStickyNav();
  });

  window.addEventListener("resize", () => {
    init();
  });

  return (
    <div>
      <h1>Best navbar in the world</h1>
      <div id={id.div.navbar} className="navbar">
        <div className="navitem">Dashboard</div>
        <input className="navitem" placeholder="Search..." />
        <div></div>
        <Toggle
          onChange={(isDark) =>
            window.dispatchEvent(new CustomEvent(eventTopic.REQUEST_THEME_TOGGLE, { detail: { isDark } }))
          }
        />
      </div>
      <div id={id.div.navbarStickyPadding}></div>
    </div>
  );
};
