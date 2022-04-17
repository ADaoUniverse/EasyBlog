import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Card from "../components/Card";
import Author from "../components/Author";

export default ({ idx, blog }) => {
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
