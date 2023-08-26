import {useEffect} from 'react'
import axios from "axios"; 
import Chip from "@mui/material/Chip";
const REACT_APP_API_KEY = "ae055c89b27f4c7280072b0c83a15d60";

const Genres = ({selectedgenres, setSelectedgenres, genres, setGenres,setPage , type,}) => {
    const fetchGenres = async () => {
      const {data} =   await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`
        );
        setGenres(data.genres);
    }
    console.log("genres", genres);
    useEffect(() => {
        fetchGenres();

        return () => {   // this is same as componentWillUnmount in class based component
            setGenres({});   // on changing the page , we want this genre component to be unmounted, means it should cancel the api key call 
        }
    }, [])
  
  const handleAdd = (genre) => {
    setSelectedgenres([...selectedgenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));  // remove the latest selected genre from its previous place of genres; 
    setPage(1);

  }
  const handleRemove = (genre) => {
    setSelectedgenres(selectedgenres.filter((selected) => selected.id !== genre.id))
    setGenres([...genres, genre]);
    setPage(1);
  }
    return (
      <div>
        {selectedgenres &&
          selectedgenres.map((genre) => (
            <Chip
              label={genre.name}
              style={{ margin: 2}}
              size="small"
              color = "secondary"
              key={genre.id}
              clickable
              onDelete ={()=>handleRemove(genre)}
            />
          ))} 
        {genres.length > 1  &&
          genres.map((genre) => (
            <Chip
              label={genre.name}
              style={{ margin: 2 }}
              size="small"
              key={genre.id}
              clickable
              color ="primary"
              onClick = {()=>handleAdd(genre)}
            />
          ))}
      </div>
    );
}

export default Genres
