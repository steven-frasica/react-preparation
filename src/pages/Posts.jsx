import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Posts = () => {

  let navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
    console.log(searchId);
    fetchPosts(searchId);
  }

  async function fetchPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`,
    );
    setPosts(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="post__search">
          <button onClick={() => navigate('/')}>← Back</button>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onKeyPress={(event) => onSearchKeyPress(event.key)}
            onChange={(event) => setSearchId(event.target.value)}
          />
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {loading
        ? posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
};

export default Posts;
