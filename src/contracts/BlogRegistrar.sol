// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BlogRegistrar {

    struct Blog {
        uint idx;
        address author;
        string content;
        uint date;
        bool isPaid;
        /**
        * can include paid features such as likes, donate to author etc
        */
        uint viewCount;
    }

    Blog[] blogs;

    mapping(address => uint[]) public userToBlogIdxes;

    event View(uint indexed blogIdx, address indexed author);

    function submitBlog(string calldata _content, bool _isPaid) public {
        uint _idx = blogs.length;
        blogs.push(Blog({
            idx: _idx,
            author: msg.sender,
            content: _content,
            date: block.timestamp,
            isPaid: _isPaid,
            viewCount: 0
        }));
        userToBlogIdxes[msg.sender].push(_idx);
    }

    function totalBlogs() public view returns(uint) {
        return blogs.length;
    }

    function viewBlog(uint blogIdx) public view returns(Blog memory){
        Blog storage blog = blogs[blogIdx];
        if(blog.isPaid) {
            return Blog({
                idx: blog.idx,
                author: blog.author,
                content: substring(blog.content,0, 200),
                date: blog.date,
                isPaid: blog.isPaid,
                viewCount: blog.viewCount
            });
        }
        return blog;
    }

    function viewBlogPaid(uint blogIdx) public returns(Blog memory) {
        Blog storage blog = blogs[blogIdx];
        blog.viewCount++;
        blogs[blogIdx] = blog;
        emit View(blogIdx, blog.author);
        return blog;
    }

    function substring(string memory str, uint startIndex, uint endIndex) public pure returns (string memory ) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
    }
}