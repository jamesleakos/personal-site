// dependancies
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

// import
// comps
import PostTile from './PostTile.jsx';
import PostSpan from './PostSpan.jsx';
import TileScroller from '../utility-components/scrollers/base-tile-scroller/TileScroller.jsx';
// css
import './styles/PostList.css';

function PostList({
  postFilters,
  onTileClick,
  showAddNew,
  showSearch,
  title,
  useWindowOffset,
  amTiled,
  showPostsOldToNew,
}) {
  //
  const [posts, setPosts] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');

  // get the posts
  useEffect(() => {
    axios
      .get('/tags')
      .then((ts) => {
        setTags(ts.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('/posts/info', {
        params: {
          ...postFilters,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let newPosts = [...posts];
    newPosts = newPosts.filter((post) => {
      let returning = false;
      if (post.title.toLowerCase().includes(search.toLowerCase()))
        returning = true;
      if (post.description.toLowerCase().includes(search.toLowerCase()))
        returning = true;
      // tags
      const tagNames = tags
        .filter((t) => post.tag_ids.includes(t._id))
        .map((t) => t.name);
      for (let name of tagNames) {
        if (name.toLowerCase().includes(search.toLowerCase())) returning = true;
      }
      if (search.toLowerCase().includes('publish') && post.published)
        returning = true;
      if (search.toLowerCase().includes('feature') && post.featured)
        returning = true;
      if (search.toLowerCase().includes('draft') && !post.published)
        returning = true;
      return returning;
    });

    setShownPosts(!!showPostsOldToNew ? newPosts : newPosts.reverse());
  }, [search, posts, tags, postFilters]);

  // what should we do when a tile is clicked
  const handleTileClick = function (post) {
    if (onTileClick) {
      onTileClick(post._id);
    }
  };

  // adding a new post
  const addPost = function () {
    const today = new Date();
    axios
      .post('/posts', {
        title: 'Temp Title',
        description: 'Temp Description',
        tags: [],
        created_at: today.toISOString(),
        published: false,
        published_at: null,
        featured: false,
      })
      .then((res) => {
        setPosts([...posts, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postMapper = (arr) => {
    // map out the posts
    return arr.map((post) => {
      return (
        <PostTile
          key={post._id}
          post={post}
          onClick={handleTileClick}
          tags={tags
            .filter((t) => post.tag_ids.includes(t._id))
            .map((t) => t.name)}
        />
      );
    });
  };

  return (
    <div className={amTiled ? 'post-list tiled' : 'post-list spanned'}>
      <p className='title'>{title}</p>
      <hr />
      {showAddNew ? (
        <p
          className='new-post-button links-item reacting-link'
          onClick={addPost}
        >
          Add New Draft
        </p>
      ) : null}
      {showSearch ? (
        <div className='search-holder'>
          <input
            className='search'
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      ) : null}
      {amTiled ? (
        <div className='post-list-scroller'>
          <TileScroller Mapper={postMapper} MapArray={shownPosts} />
        </div>
      ) : (
        <div className='span-area'>
          {shownPosts.map((post, index) => {
            return (
              <PostSpan
                key={post._id}
                post={post}
                onClick={handleTileClick}
                showSlash={index !== shownPosts.length - 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PostList;
