import {useState, useEffect} from 'react'
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
    root: {
        width:"100%", 
        position: "fixed",    
        bottom: 0, 
        backgroundColor: "#2d313a", 
        zIndex: 100
    }
})

const Mainnav = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const navigate= useNavigate();
 
  useEffect(() => {
    if (value === 0) {
      navigate("/");
    }
    else  if (value === 1) {
       navigate("/Movies");
    }
     else if (value === 2) {
       navigate("/Series");
    }
     else if (value === 3) {
      navigate("/Search");
     }
  }, [value, navigate]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "red" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "red" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "red" }}
        label="TV Series"
        icon={<TvIcon />}
      />

      <BottomNavigationAction
        style={{ color: "red" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}

export default Mainnav;
