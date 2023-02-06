// modules
import React, { useEffect, useState, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  useParams,
} from 'react-router-dom';
import { isMobile } from 'react-device-detect';

// components
import AnimatedCursor from '../../helpers/animated_cursor.js';
// import ScrollToTop from '../../helpers/scrollToTop.js';
import Home from '../pages/Home.jsx';
import Posts from '../pages/Posts.jsx';
import PostBuilder from '../pages/PostBuilder.jsx';
import PostViewer from '../pages/PostViewer.jsx';
import Admin from '../pages/Admin.jsx';
import SignInUpPage from '../pages/SignInUpPage.jsx';
import IDPage from '../pages/IDPage.jsx';
import './styles/App.css';

// font awesome import
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faImage,
  faImages,
  faBook,
  faBookOpen,
  faSection,
  faFont,
  faQuoteLeft,
  faClosedCaptioning,
  faImagePortrait,
  faArrowRight,
  faSquarePlus,
  faXmark,
  faX,
  faArrowUp,
  faArrowDown,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import { farBook } from '@fortawesome/free-regular-svg-icons';

library.add(
  fab,
  faImage,
  faImages,
  faBook,
  faBookOpen,
  faSection,
  faFont,
  faQuoteLeft,
  faClosedCaptioning,
  faImagePortrait,
  faArrowRight,
  faSquarePlus,
  faXmark,
  faX,
  faArrowUp,
  faArrowDown,
  faBars,
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/all-posts',
    element: <Posts />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/post-builder/:post_id',
    element: <PostBuilder />,
    loader: async ({params}) => {
      return params.post_id;
    }

  },
  {
    path: '/post-viewer/:post_id',
    element: <PostViewer />,
    loader: async ({params}) => {
      return params.post_id;
    }
  },
  {
    path: '/sign-in-up',
    element: <SignInUpPage />,
  },
  {
    path: '/test',
    element: <IDPage />,
  },
  {
    element: <IDPage />,
    path: 'test/:id',
    loader: async ({params}) => {
      return params.id;
    }
  },
]);

// App
function App() {
  return (
    <div className='App'>
      { !isMobile ? <AnimatedCursor /> : null }
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
