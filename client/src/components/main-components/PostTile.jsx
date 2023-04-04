// dependancies
import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';

// imports
import './styles/PostTile.css';

function PostTile({ post, onClick, tags }) {
  const navigate = useNavigate();
  const loadTagViewer = function (tag) {
    navigate(`/posts-by-tag/${tag}`);
  };

  console.log(tags);

  return (
    <div className='post-tile'>
      {/* tags */}
      <div className='tags'>
        {
          // these tags are really just the tag names passed in
          tags.map((tag, index) => {
            return (
              <div
                className='tag reacting-link no-select'
                key={tag + index + ''}
                onClick={() => {
                  loadTagViewer(tag);
                }}
              >
                <span className='tag-span no-select'>{tag}</span>
              </div>
            );
          })
        }
      </div>
      <div className='post-tile-title-area' onClick={() => onClick(post)}>
        {/* image */}
        {post.display_image_key ? (
          <div className='tile-title-image'>
            <img
              className='no-select'
              src={`https://ik.imagekit.io/hfywj4j0a/tr:w-500/${post.display_image_key}`}
              alt='tile image'
              draggable='false'
            />
          </div>
        ) : null}
        {/* title */}
        <h3 className='tile-title links-item reacting-link no-select'>
          {post.title}
        </h3>
      </div>
      {/* description */}
      <p className='description no-select'>{post.description}</p>
    </div>
  );
}

export default PostTile;
