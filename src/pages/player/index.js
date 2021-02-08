import React, { memo } from 'react';

import { 
    ZPlayerWrapper,
    PlayerLeft,
    PlayerRight
 } from './style'
const ZPlayer = memo(function (props) {

    return (
        <ZPlayerWrapper>
            <div className="content">
                <PlayerLeft></PlayerLeft>
                <PlayerRight></PlayerRight>
            </div>
        </ZPlayerWrapper>
    )
})

export default ZPlayer