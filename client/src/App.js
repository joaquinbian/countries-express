import './App.css';
import React from "react"
import LandingPage from "./Components/LandingPage/LangingPage"
import MainPage from "./Components/MainPage/MainPage"
import CountryId from "./Components/CountryId/CountryId"
import FormActivity from "./Components/FormActivity/FormActivity"
import { Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/countries" component={MainPage}/>
        <Route path ="/activities" component={FormActivity}/>
        <Route exact path="/countries/:id" component={CountryId}/>
    </div>
  );
}

export default App;
