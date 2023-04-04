// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';

// comps
import Footer from '../../main-components/Footer.jsx';
import Navbar from '../../main-components/Navbar.jsx';
import PostList from '../../main-components/PostList.jsx';
import BackgroundImage from '../../main-components/BackgroundImage.jsx';

function TaggedPostsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const passedTag = useLoaderData();
  const [tag, setTag] = useState(passedTag);

  useEffect(() => {
    const oldTag = tag;
    setTag(passedTag);
    if (oldTag !== passedTag) window.location.reload();
  }, [passedTag]);

  const navigate = useNavigate();
  const loadPostViewer = function (post_id) {
    navigate(`/post-viewer/${post_id}`);
  };

  return (
    <div className='posts'>
      <Navbar />
      <PostList
        postFilters={{ published: true, tags: tag }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        title={`${tag} Posts`}
        useWindowOffset={false}
        amTiled={true}
      />
      <Footer />
    </div>
  );
}

export default TaggedPostsPage;
