import { ethers } from "ethers";

import { appName, id, deployed } from "../Constants";
import blogApi from "../abi/BlogApi.json";

class BlogHelper {
  constructor() {
    const contractAddress = deployed.contract.BLOG[window[appName].network.chainId];
    if (!contractAddress) return alert("Network not supported!");
    this.contract = new ethers.Contract(
      deployed.contract.BLOG[window[appName].network.chainId],
      blogApi,
      window[appName].wallet.getSigner()
    );

    this.saveBlog = this.saveBlog.bind(this);
  }

  async saveBlog() {
    const content = document.getElementById(id.input.createBlogContent).value;
    const isPaid = document.getElementById(id.input.createBlogIsPaid).value == "true";
    if (!content || content.trim().length == 0) return alert("Blog not valid");
    const res = await this.contract.submitBlog(content, isPaid);
    console.log(res);
    alert("Blog Published");
    return content;
  }

  async getBlog(idx) {
    const blog = await this.contract.viewBlog(idx);
    return blog;
  }

  async getTotalBlogsCount() {
    return await this.contract.totalBlogs();
  }

  async getBlogs(fromIdx = 0) {
    const totalBlogs = await this.getTotalBlogsCount();
    const toIdx = Math.min(fromIdx + 10, totalBlogs - 1);
    const blogs = [];
    for (let i = fromIdx; i <= toIdx; i++) {
      blogs.push(await this.getBlog(i));
    }
    return blogs;
  }
}

export default BlogHelper;
