// modules
import React, { useEffect, useState, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  useParams
} from "react-router-dom";

// components
import AnimatedCursor from '../../helpers/animated_cursor.js';
// import ScrollToTop from '../../helpers/scrollToTop.js';
import Home from '../pages/Home.jsx';
import Posts from '../pages/Posts.jsx';
import PostBuilder from '../pages/PostBuilder.jsx';
import PostViewer from '../pages/PostViewer.jsx';
import Admin from '../pages/Admin.jsx';
import './styles/App.css';

// font awesome import
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faImage, faImages, faBook, faBookOpen, faSection, faFont, faQuoteLeft, faClosedCaptioning, faImagePortrait, faArrowRight, faSquarePlus, faXmark, faX, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
// import { farBook } from '@fortawesome/free-regular-svg-icons';

library.add(fab, faImage, faImages, faBook, faBookOpen, faSection, faFont, faQuoteLeft, faClosedCaptioning, faImagePortrait, faArrowRight, faSquarePlus, faXmark, faX, faArrowUp, faArrowDown);

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
    path: '/post-builder',
    element: <PostBuilder />,
  },
  {
    path: '/post-viewer',
    element: <PostViewer />,
  },
]);

// App
function App() {
  return (
    <div className='App'>
      <AnimatedCursor/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
