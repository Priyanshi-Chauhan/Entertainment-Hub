import React, { useState , useEffect} from 'react'
import SingleContent from '../Components/SingleContent/SingleContent';
import useGenre from '../hooks/useGenre';
import Genres from '../Components/Genres';
import axios from "axios";
import "./index.css";
import CustomPagination from '../Components/Pagination/CustomPagination';

const REACT_APP_API_KEY = "ae055c89b27f4c7280072b0c83a15d60";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numofpages, setNumofpages] = useState();
  const [selectedgenres, setSelectedgenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedgenres);

  const fetchTv = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    console.log("fetchedseries" , data.results);
    setContent(data.results);
    setNumofpages(data.total_pages);

  }
  useEffect(() => {
    window.scroll(0, 0)
    fetchTv();
}, [page, genreforURL])


  return (
    <div>
      <span className="pageTitle">Series</span>

      <Genres
        type="tv"
        selectedgenres={selectedgenres}
        setSelectedgenres={setSelectedgenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="index">
        {content &&
          content.map((c) => 
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.name}
              date={c.first_air_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          )}
      </div>
      {numofpages > 0 && <CustomPagination setPage={setPage} numOfPages={numofpages} />}
    </div>
  );
}

export default Series
