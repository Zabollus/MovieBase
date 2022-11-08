import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Movies from "./components/Movies"
import MovieDetails from "./components/Movie-details"

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Movies}/>
            <Route path='/movie/:movieID' component={MovieDetails}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
