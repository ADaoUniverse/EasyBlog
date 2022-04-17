import React from "react";
import BlogHelper from "../helpers/BlogHelper";
import BlogCard from "../components/BlogCard";

class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.helper = new BlogHelper();
    this.state = {};
  }

  async componentDidMount() {
    this.setState({
      blogs: await this.helper.getBlogs(),
    });
  }

  render() {
    if (!this.state.blogs) return <div>No blogs available</div>;
    return (
      <div className="card-container">
        {this.state.blogs.map((blog, i) => (
          <BlogCard idx={i} blog={blog} />
        ))}
      </div>
    );
  }
}

export default Blogs;
