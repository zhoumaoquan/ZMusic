import React from 'react';

import ZDiscover from '@/pages/discover';
import ZRecommend from '@/pages/discover/c-pages/recommend'
import ZRanking from '@/pages/discover/c-pages/ranking'
import ZSongs from '@/pages/discover/c-pages/songs'
import ZDjradio from '@/pages/discover/c-pages/djradio'
import ZArtist from '@/pages/discover/c-pages/artist'
import ZAlbum from '@/pages/discover/c-pages/album'
import ZPlayer from '@/pages/discover/c-pages/player'

import ZMine from '@/pages/mine';
import ZFriend from '@/pages/friend'
import { Redirect } from 'react-router-dom';

const routers = [
    {
        path: '/',
        exact: true,
        render: () => {
            return (<Redirect to="/discover" />)
        }
    },
    {
        path: '/discover',
        component: ZDiscover,
        routes: [
            {
                path: "/discover",
                exact: true,
                render: () => (
                    <Redirect to="/discover/recommend" />
                )
            },
            {
                path: "/discover/recommend",
                component: ZRecommend
            },
            {
                path: "/discover/ranking",
                component: ZRanking
            },
            {
                path: "/discover/songs",
                component: ZSongs
            },
            {
                path: "/discover/djradio",
                exact: true,
                component: ZDjradio
            },
            {
                path: "/discover/artist",
                component: ZArtist
            },
            {
                path: "/discover/album",
                component: ZAlbum
            },
            {
                path: "/discover/player",
                component: ZPlayer
            }
        ]
    },
    {
        path: '/mine',
        component: ZMine
    },
    {
        path: '/friend',
        component: ZFriend
    }
]

export default routers