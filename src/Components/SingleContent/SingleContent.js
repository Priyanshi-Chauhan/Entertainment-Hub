import React from 'react'
import { img_300, unavailable } from '../../Config/Config'
import "./SingleContent.css";
import Badge from "@mui/material/Badge";
import ContentModal from '../ContentModel/ContentModel';

const SingleContent = ({ id, poster, title, date, media_type, vote_average}) => {
    return (
        <ContentModal media_type ={media_type} id ={id} >
            <Badge badgeContent={vote_average} color={vote_average > 7 ? 'primary' : 'secondary' } />
          {/* variables are inside dollar sign */}
          <img className ="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt = {title} />
          <b className="title">{title}</b>
          <span className='subtitle'>
              { media_type  ==="tv" ? "TV Series" : "Movie"}
          <span className="subtitle">{date}</span>
    </span>
        </ContentModal>
  )
}

export default SingleContent
