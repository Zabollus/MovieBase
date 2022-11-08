import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Movies from "./components/Movies"
import MovieDetails from "./components/Movie-details"
import MyNavbar from "./components/MyNavbar"
import FormMovie from "./components/FormMovie"
import FormPerson from "./components/FormPerson"

function App() {
  return (
  <>
    <MyNavbar />
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Movies}/>
            <Route path='/movie/:movieID' component={MovieDetails}/>
            <Route path='/add/movie' component={FormMovie}/>
            <Route path='/add/person' component={FormPerson}/>
        </Switch>
    </BrowserRouter>
  </>
  );
}

export default App;
