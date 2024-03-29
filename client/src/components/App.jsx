// EXTERNAL
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

// INTERNAL
// components
import AnimatedCursor from '../../helpers/animated_cursor.js';
import Home from './pages/Home.jsx';
import PostBuilder from './builder-components/PostBuilder.jsx';
import PostViewer from './viewer-components/PostViewer.jsx';
import Admin from './pages/Admin.jsx';
import SignInUpPage from './pages/SignInUpPage.jsx';
import Protected from './utility-components/Protected.jsx';
import WorkPage from './work-components/WorkPage.jsx';
import GamesPage from './game-components/GamesPage.jsx';
import PoetryPage from './poetry-components/PoetryPage.jsx';
import PoemPage from './poetry-components/PoemPage.jsx';
import SummerInEuropePage from './pages/SummerInEuropePage.jsx';
import ContactPage from './contact-page/ContactPage.jsx';
// different posts pages
import AllPosts from './pages/AllPostsPage.jsx';
import AdventurePostsPage from './pages/PostPages/AdventurePostsPage.jsx';
import CulturePostsPage from './pages/PostPages/CulturePostsPage.jsx';
import RunningPostsPage from './pages/PostPages/RunningPostsPage.jsx';
import SkiingPostsPage from './pages/PostPages/SkiingPostsPage.jsx';
import TaggedPostPage from './pages/PostPages/TaggedPostsPage.jsx';
import VisitsDataPage from './visits-data/VisitsDataPage.jsx';

// css
import './styles/App.css';
// contexts
import MasterContextProvider from '../contexts/MasterContextProvider.jsx';

//#region FONTAWESOME
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
  faArrowsDownToLine,
  faArrowsUpToLine,
  faCaretRight,
  faCaretLeft,
  faForward,
  faBackward,
  faAngleRight,
  faAngleLeft,
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
  faArrowsDownToLine,
  faArrowsUpToLine,
  faBars,
  faCaretRight,
  faCaretLeft,
  faForward,
  faBackward,
  faAngleRight,
  faAngleLeft
);
//#endregion

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/all-posts',
    element: <AllPosts />,
  },
  {
    path: '/adventure-posts',
    element: <AdventurePostsPage isMobile={isMobile} />,
  },
  {
    path: '/culture-posts',
    element: <CulturePostsPage isMobile={isMobile} />,
  },
  {
    path: '/running-posts',
    element: <RunningPostsPage isMobile={isMobile} />,
  },
  {
    path: '/skiing-posts',
    element: <SkiingPostsPage isMobile={isMobile} />,
  },
  {
    path: '/posts-by-tag/:tag',
    element: <TaggedPostPage />,
    loader: async ({ params }) => {
      return params.tag;
    },
  },
  {
    path: '/admin',
    element: (
      <Protected>
        <Admin />
      </Protected>
    ),
  },
  {
    path: '/visits-data',
    element: (
      <Protected>
        <VisitsDataPage />
      </Protected>
    ),
  },
  {
    path: '/post-builder/:post_id',
    element: (
      <Protected>
        <PostBuilder />
      </Protected>
    ),
    loader: async ({ params }) => {
      return params.post_id;
    },
  },
  {
    path: '/post-viewer/:post_id',
    element: <PostViewer />,
    loader: async ({ params }) => {
      return params.post_id;
    },
  },
  {
    path: '/post-viewer/64daafdfecde6bfa3f585cde',
    element: <SummerInEuropePage />,
  },
  {
    path: '/sign-in-up',
    element: <SignInUpPage />,
  },
  {
    path: '/work',
    element: <WorkPage />,
  },
  {
    path: '/games',
    element: <GamesPage />,
  },
  {
    path: '/poetry',
    element: <PoetryPage />,
  },
  {
    path: '/poem/:poem_id',
    element: <PoemPage />,
    loader: async ({ params }) => {
      return params.poem_id;
    },
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
]);

function App() {
  return (
    <MasterContextProvider>
      <Root />
    </MasterContextProvider>
  );
}

function Root() {
  return (
    <div className='App'>
      {!isMobile ? <AnimatedCursor /> : null}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
