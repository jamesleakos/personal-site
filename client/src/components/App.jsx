// modules
import React, { useEffect, useState, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Router
} from "react-router-dom";

// components
import AnimatedCursor from '../../helpers/animated_cursor.js';
// import ScrollToTop from '../../helpers/scrollToTop.js';
import Home from '../pages/Home.jsx';
import Posts from '../pages/Posts.jsx';
import './styles/App.css';

// font awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

// App
function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router])

  return (
    <div className='App'>
      <AnimatedCursor/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
