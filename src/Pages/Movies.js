import { useState , useEffect} from 'react';
import axios from 'axios';
import "./index.css";
import CustomPagination from '../Components/Pagination/CustomPagination';
import SingleContent from '../Components/SingleContent/SingleContent';
import Genres from '../Components/Genres';
import useGenre from '../hooks/useGenre';
const REACT_APP_API_KEY = "ae055c89b27f4c7280072b0c83a15d60";

const Movies = () => {
  const [page, setPage] = useState(1); 
  const [content, setContent] = useState([]);
  const [numofpages, setNumofpages] = useState();
  const [selectedgenres, setSelectedgenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedgenres);
  
  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=ae055c89b27f4c7280072b0c83a15d60&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    console.log("fetchedMovies", data.results);
    setContent(data.results);
    setNumofpages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);    // whenever genre is changing . it should update the page

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <div className="index">
        <Genres
          type="movie"
          selectedgenres={selectedgenres}
          setSelectedgenres={setSelectedgenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />

        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              vote_average={c.vote_average}
              media_type="movie"
            />
          ))}
      </div>
      {numofpages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numofpages} />
      )}
    </div>
  );
}

export default Movies
