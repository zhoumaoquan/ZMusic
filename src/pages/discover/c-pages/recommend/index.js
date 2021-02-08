import React, { memo } from 'react';

import ZTopBanners from './c-coms/top-baners'
import ZHotRecommend from './c-coms/hot-recommend'
import ZNewDisc from './c-coms/new-disc'
import ZRankList from './c-coms/rank-list'

import { 
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight
} from './style'
function ZRecommend(props) {
    
    return (
        <RecommendWrapper>
            <ZTopBanners />
            <Content className="wrap-v2">
                <RecommendLeft>
                    <ZHotRecommend />
                    <ZNewDisc />
                    <ZRankList />
                </RecommendLeft>
                <RecommendRight>
                    
                </RecommendRight>
            </Content>
        </RecommendWrapper>
    )
}


export default memo(ZRecommend)