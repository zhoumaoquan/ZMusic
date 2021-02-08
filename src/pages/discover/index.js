import { memo } from 'react'

import { dicoverMenu } from '@/common/local-data';

import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import {
    DiscoverWrapper,
    TopMenu
} from './style';
export default memo(function ZDiscover(props) {
    const route = props.route
    return (
        <DiscoverWrapper>
            <div className="top">
                <TopMenu className="wrap-v1">
                    {
                        dicoverMenu.map((item, index) => {
                            return (
                                <div className="item" key={item.title}>
                                    <NavLink to={item.link}>{item.title}</NavLink>
                                </div>
                            )
                        })
                    }
                </TopMenu>
            </div>
            {renderRoutes(route.routes)}
        </DiscoverWrapper>
    )
})