import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// class Dashboard extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <>
//         <Navbar />
//         <div className="grid-container">
//           <div className="left-panel">
//             <Link to="/view">View Blog</Link>
//             <Link to="/create">Create Blog</Link>
//           </div>
//           <div className="center-panel">
//             <Outlet />
//           </div>
//           <div className="right-panel">
//             <h1>This is the right panel. I am going to add more functionality here</h1>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="grid-container">
          <div className="left-panel panel">
            <Link to="/view">View Blog</Link>
            <Link to="/create">Create Blog</Link>
          </div>
          <div className="center-panel panel">
            <Outlet />
          </div>
          <div className="right-panel panel">
            <h1>This is the right panel. I am going to add more functionality here</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
