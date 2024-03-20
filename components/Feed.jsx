"use client";

import { useState, useEffect } from "react";
import PromptCrad from "./PromptCrad";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCrad
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchtext] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchtext(value);
  };

  useEffect(() => {
    if (searchText === "") {
      setFilteredPosts(allPost);
      return;
    };

    const timeout = setTimeout(() => {
      const filteredResult = allPost.filter((post) => {
        return (
          post.tag.includes(searchText) || post.creator.username.includes(searchText)
        )
      });
      setFilteredPosts(filteredResult);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText, allPost]);

  const fetchPosts = async () => {
    const response = await fetch("api/prompt");
    const data = await response.json();

    setAllPost(data);
    setFilteredPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText.length > 0 && filteredPosts.length === 0 
        ?<p className="mt-10 text-gray-500">No results found!</p>
        :<PromptCardList data={filteredPosts} handleTagClick={(tag) => {setSearchtext(tag)}} />}
    </section>
  );
};

export default Feed;
