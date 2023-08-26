import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import './App.css'
import Header from './Components/Header/Header';
import Mainnav from './Components/Mainnav';
import Trending from "./Pages/Trending";
import Movies from "./Pages/Movies";
import Search from "./Pages/Search";
import Series from "./Pages/Series";

function App() {
  return (
  <>
   <Header/>
      <div className="app">
        
        <Container>
          <Routes>
            <Route exact path="/" element ={<Trending/>}/>
            <Route exact path="/Movies" element ={<Movies/>}/>
            <Route exact path="/Series" element ={<Series/>}/>
            <Route exact path="/Search" element ={<Search/>}/>
          </Routes>
        </Container>
      
      </div>
      <Mainnav/>
      </>
  );
}

export default App;
