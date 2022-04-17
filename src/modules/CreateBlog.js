import React from "react";
import Toggle from "../components/Toggle";

import { id } from "../Constants";
import BlogHelper from "../helpers/BlogHelper";

class CreateBlog extends React.Component {
  constructor(props) {
    super(props);
    this.helper = new BlogHelper();
  }

  render() {
    return (
      <div>
        <textarea style={{ width: "75%", height: "50vh" }} id={id.input.createBlogContent} />
        <input hidden={true} id={id.input.createBlogIsPaid} />
        <br />
        <button onClick={this.helper.saveBlog}>Save</button>
        <br />
        <Toggle onChange={(s) => (document.getElementById(id.input.createBlogIsPaid).value = s)} />
        <hr/>
      </div>
    );
  }
}

export default CreateBlog;
