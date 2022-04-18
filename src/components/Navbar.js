import Toggle from "../components/Toggle";
import { eventTopic, id } from "../Constants";

export default () => {
  return (
    <>
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
    </>
  );
};
