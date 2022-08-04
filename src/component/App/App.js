import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import About from '../About/About';
import CatDescription from '../CatDescription/CatDescription';
import Favorites from '../Favorites/Favorites';
import List from '../List/List';
import NavBar from '../NavBar/NavBar';
import './App.css';

const App = () => {
  const [catsData, setCatsData] = useState([]);
  const [selectedCat, setSelectedCat] = useState({});
  const [favoriteCats, setFavoriteCats] = useState([]);

  const getCatData = async () => {
    const URL = "https://petdata-api.herokuapp.com/api/v1/petsData";
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setCatsData(data.petsData)
    } catch (error) {
      console.log(error);
    }
  } 
  
  useEffect(() => {
    getCatData();
  }, []);

  const selectCat = (id) => {
    const findCat = catsData.find(cat => cat.id === id);
    setSelectedCat(findCat)
  }

  const favoriteCat = (id) => {
    const favCat = catsData.find(cat => cat.id === id);
    setFavoriteCats([...favoriteCats, favCat])
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path='/' render={() => (
          <section className='main-page'>
            <img className='main-img' src='https://wallup.net/wp-content/uploads/2018/09/25/602884-baby_animals-kittens-cat.jpg' />
            <Link to='/list'>
              <button className='button-adopt'>Adopt a Cat!</button>
            </Link>
          </section>
        )}/>
        <Route path='/about' render={() => <About />}/>
        <Route path='/favorites' render={() => <Favorites favCats={favoriteCats} selectCat={selectCat}/>}/>
        <Route path='/list' render={() => <List cats={catsData} selectCat={selectCat}/>}/>
        <Route path='/cat-description/:id' render={() => <CatDescription cat={selectedCat} favCat={favoriteCat}/>}/>
        <Route path='*' render={() => 
        <div className='error-message'>
          <h2>Oops something went wrong, please try again!</h2>
          <Link to='/'>
            <button>Go back Home!</button>
          </Link>
        </div>}/>
      </Switch>
    </div>
  );
}

export default App;
