import React from "react";
import { Routes, Route } from "react-router";

import { appName } from "./Constants";
import Login from "./modules/Login";
import Blogs from "./modules/Blogs";
import Blog from "./modules/Blog";
import CreateBlog from "./modules/CreateBlog";

class App extends React.Component {
  constructor(props) {
    super(props);
    window[appName] = {};
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="/view" element={<Blogs />} />
          <Route path="/view/:authorId/:blogId" element={<Blog />} />
          <Route path="/create" element={<CreateBlog />} />
        </Route>
        <Route path="*" element={<div>404: Not Found</div>} />
      </Routes>
    );
  }
}

export default App;
