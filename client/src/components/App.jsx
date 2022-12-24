// modules
import React, { useEffect, useState, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// components
import AnimatedCursor from '../../helpers/animated_cursor.js';
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
  return (
    <div className='App'>
      <AnimatedCursor/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
