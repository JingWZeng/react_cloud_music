import React from 'react';
import { Navigate } from 'react-router-dom';

import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Album from '../application/Album';

export default [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        exact: true,
        element: <Recommend />,
      },
      {
        path: 'recommend',
        element: <Recommend />,
        children: [
          {
            path: '/recommend/:id',
            element: <Album />,
          },
        ],
      },
      {
        path: 'singers',
        element: <Singers />,
      },
      {
        path: 'rank',
        element: <Rank />,
        children: [
          {
            path: '/rank/:id',
            element: <Album />,
          },
        ],
      },
    ],
  },
];
