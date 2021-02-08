import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';

import {
    HeaderWrapper,
    HeaderLeft,
    HeaderRight
} from './style'

import { headerLinks } from '@/common/local-data';

import { SearchOutlined } from '@ant-design/icons';

export default memo(function ZAppFooter() {

    const renderSelectItem = (item, index) => {
        if (index < 3) {
            return (
                <NavLink to={item.link} strict>
                    {item.title}
                    <i className="sprite_01 icon"></i>
                </NavLink>
            )
        } else {
            return <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
            >{item.title}</a>
        }
    }

    return (
        <HeaderWrapper>
            <div className="content wrap-v1">
                <HeaderLeft>
                    <a href="#/" className="logo sprite_01">网易云音乐</a>
                    <div className="select-list">
                        {
                            headerLinks.map((item, index) => {
                                return (
                                    <div className="select-item" key={item.link}>
                                        { renderSelectItem(item, index)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </HeaderLeft>
                <HeaderRight>
                    <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined className="icon-size" />} />
                    <div className="center">创作者中心</div>
                    <div>登录</div>
                </HeaderRight>
            </div>
            <div className="divider"></div>
        </HeaderWrapper>
    )
})