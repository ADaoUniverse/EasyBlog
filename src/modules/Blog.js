import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";

import BlogHelper from "../helpers/BlogHelper";
import Author from "../components/Author";

export default () => {
  const params = useParams();
  const helper = new BlogHelper();

  const [blog, setBlog] = useState();

  const getBlog = async () => {
    setBlog(await helper.getBlog(params.blogId));
  };

  useEffect(() => {
    getBlog();
  }, []);

  if (!blog) return <div>Blog not found</div>;
  return (
    <div
      style={{
        maxWidth: "694px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "40px",
        paddingBottom: "40px",
        paddingLeft: "52px",
        paddingRight: "52px",
      }}
    >
      <Author author={blog.author} date={blog.date.toString()} />
      <ReactMarkdown children={blog.content} remarkPlugins={[remarkGfm]} />
    </div>
  );
};
