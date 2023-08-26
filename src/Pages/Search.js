import { Button, Tab, Tabs, TextField, ThemeProvider, createMuiTheme} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./index.css";
import SingleContent from '../Components/SingleContent/SingleContent';
import CustomPagination from '../Components/Pagination/CustomPagination';

const REACT_APP_API_KEY = "ae055c89b27f4c7280072b0c83a15d60";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchtext, setSearchtext] = useState("");
  const [content, setContent] = useState([]);
  const [numofpages, setNumofpages] = useState(); 

  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchtext}&page=${page}&include_adult=false`)
    setContent(data.results);
    setNumofpages(data.total_pages);
  }
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
    }, [type, page])
  
  return (
    <div>
        <div style= {{display : "flex", margin : "15px 0"}}>
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchtext(e.target.value)}
        color  = "white"
        />
        <Button variant="contained" style={{ marginLeft: 10 }} onClick ={fetchSearch}>
          <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs value={type} indicatorColor="secondary" textColor="white"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);    
        }}
        >
          <Tab style= {{width : "50%"}} label ="Search Movies"></Tab>
          <Tab style= {{width : "50%"}}  label="Search TV Series"></Tab>
        </Tabs>

      <div className="index">
        {content && content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={type ? "tv" : "movie"}
            vote_average={c.vote_average}
            
          />
        ))}
        {searchtext && content.length < 1 && 
          ( type ? <h2>No Series Found</h2> : <h2>No movies found</h2>        )}
      </div>
      {numofpages > 1 && (
        <CustomPagination setPage={setPage} numOfPages ={numofpages}/>
      )}
    </div>
  );
}

export default Search
