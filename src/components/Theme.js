import { useEffect } from "react";
import { eventTopic } from "../Constants";

const darkTheme = () => {
  document.documentElement.style.setProperty("--bg-color", "#001E3C");
  document.documentElement.style.setProperty("--text-color", "#fff");
  document.documentElement.style.setProperty("--light-color", "#ff7961");
  document.documentElement.style.setProperty("--main-color", "#f44336");
  document.documentElement.style.setProperty("--dark-color", "#ba000d");
  document.documentElement.style.setProperty("--text-contrast", "#373737");
  document.documentElement.style.setProperty("--card-shadow", "#FFE1C320");
};

const lightTheme = () => {
  document.documentElement.style.setProperty("--bg-color", "#FFFFFF");
  document.documentElement.style.setProperty("--text-color", "#373737");
  document.documentElement.style.setProperty("--light-color", "#757ce8");
  document.documentElement.style.setProperty("--main-color", "#3f50b5");
  document.documentElement.style.setProperty("--dark-color", "#002884");
  document.documentElement.style.setProperty("--text-contrast", "#fff");
  document.documentElement.style.setProperty("--card-shadow", "#00000020");
};

export default () => {
  const setTheme = ({ detail }) => {
    // todo: save theme to localstorage for persistence
    if (detail.isDark) {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  useEffect(() => {
    lightTheme();
    window.addEventListener(eventTopic.REQUEST_THEME_TOGGLE, setTheme);
  }, []);

  return <></>;
};
