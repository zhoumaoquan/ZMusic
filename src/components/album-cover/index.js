import React, { memo } from 'react'
import PropTypes from 'prop-types';

import {
    AlbumWrapper
} from './style'

import { setImageSize } from '@/utils/format'

const AlbumCover = function (props) {
// state and props
  const { info, size, width , bgp } = props;

  return (
    <AlbumWrapper size={size} width={width} bgp={bgp}>
      <div className="album-image">
        <img src={setImageSize(info.picUrl, size)} alt="" />
        <a href="/todo" className="cover image_cover">{info.name}</a>
      </div>
      <div className="album-info">
        <div className="name text-nowrap">{info.name}</div>
        <div className="artist text-nowrap">{info.artist.name}</div>
      </div>
    </AlbumWrapper>
  )
}

AlbumCover.propTypes = {
    info: PropTypes.object.isRequired,
    size: PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string]
    ),
    width: PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string]
    ),
    bgp: PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string]
    )
}
AlbumCover.defaultProps = {
    info: {},
    size: 130,
    width: 153,
    bgp: "-845px"
}

export default memo(AlbumCover)