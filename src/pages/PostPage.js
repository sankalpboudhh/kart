import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ThemeContext } from "../ThemeContext.js";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import { FavoriteBorder } from "@material-ui/icons";

const reducer = (state, action) => {
  switch (action.type) {
    case "POST_REQUEST":
      return { ...state, loading: true };
    case "POST_SUCCESS":
      return { ...state, loading: false, post: action.payload, error: "" };
    case "POST_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
export default function PostPage() {
  const [like, setLike] = useState(false);
  const { backendAPI, user } = useContext(ThemeContext);
  const { postId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    post: { user: {} },
    error: "",
  });
  const { loading, error, post } = state;

  useEffect(() => {
    const fetchPost = async () => {
      dispatch({ type: "POST_REQUEST" });
      try {
        const { data } = await axios.get(`${backendAPI}/posts/${postId}`);
        const { data: userData } = await axios.get(
          `${backendAPI}/users/${data.userId}`
        );
        dispatch({
          type: "POST_SUCCESS",
          payload: { ...data, user: userData },
        });
      } catch (err) {
        dispatch({ type: "POST_FAIL", payload: err.message });
      }
    };
    fetchPost();
  }, []);
  return (
    <div>
      <Link to="/">Back to Blogs</Link>
      <div className="blog">
        <div className="content">
          {loading ? (
            <div>loading...</div>
          ) : error ? (
            <div> Error: {error} </div>
          ) : (
            <div>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          )}
          {user ? (
            // <button onClick={() => setLike((prev) => !prev)}>
            //   {like ? "Liked" : "Like"}
            // </button>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                />
              }
              label="Like"
            />
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                />
              }
              label="Like"
            />
            // <button>
            //   <NavLink to="/login" activeClassName="active">
            //     Like
            //   </NavLink>
            // </button>
          )}
        </div>
        <div className="sidebar">
          <div>
            <h2>{post.user.name} </h2>
            <ul>
              <li>Email: {post.user.email}</li>
              <li>Phone: {post.user.phone}</li>
              <li>Website: {post.user.website}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
