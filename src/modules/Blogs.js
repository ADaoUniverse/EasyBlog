import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";

import Card from "../components/Card";
import BlogHelper from "../helpers/BlogHelper";
import Author from "../components/Author";

const BlogCard = ({ idx, blog }) => {
  if (!blog) return <div>#{idx} Empty</div>;
  return (
    <Card link={`/view/${blog.author}/${blog.idx}`}>
      <Author author={blog.author} date={blog.date.toString()} />
      <ReactMarkdown
        children={blog.content.substr(0, Math.min(200, blog.content.length)) + "..."}
        remarkPlugins={[remarkGfm]}
      />
    </Card>
  );
};

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
