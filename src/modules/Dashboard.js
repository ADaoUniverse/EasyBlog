import React from "react";
import { Outlet, Link } from "react-router-dom";

import Toggle from "../components/Toggle";
import { eventTopic } from "../Constants";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Toggle
          onChange={(isDark) =>
            window.dispatchEvent(new CustomEvent(eventTopic.REQUEST_THEME_TOGGLE, { detail: { isDark } }))
          }
        />
        <h1>Dashboard</h1>
        <ul>
          <li>
            <Link to="/view">View Blog</Link>
          </li>
          <li>
            <Link to="/create">Create Blog</Link>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    );
  }
}

export default Dashboard;
