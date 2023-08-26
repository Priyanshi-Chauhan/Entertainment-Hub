import {useState, useEffect} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300 , noPicture} from "../../Config/Config";
import axios from "axios";
import "./Carousel.css";
const REACT_APP_API_KEY = "ae055c89b27f4c7280072b0c83a15d60";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({  media_type, id }) => {
  const [credits, setCredits] = useState([]);
  
  const fetchCredits = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`)
    console.log("data in carousel", data);
    setCredits(data.cast);
  }

  useEffect(() => {
    fetchCredits();
  }, [])

  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
       items : 5,
    },
    1024: {
      items : 7

    }
    
  }
  return <AliceCarousel mouseTracking items={items}
    autoPlay 
    responsive={responsive}
    infinite
    disableButtonsControls
    disableDotsControls
  />;
};

export default Carousel;

