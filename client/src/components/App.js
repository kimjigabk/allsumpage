import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Header from "./Header";
import SongList from "./songs/SongList";
import SongCreate from "./songs/SongCreate";
import SongEdit from "./songs/SongEdit";
import SongDetail from "./songs/SongDetail";
import MainPage from "./MainPage";
import YourPage from "./yourpage/YourPage";
import AboutPage from "./about/AboutPage";

class App extends React.Component {
  render() {
    return (
      <div id="hi" style={{ textAlign: "center" }} className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/songs" exact component={SongList} />
              <Route path="/songs/new" exact component={SongCreate} />
              <Route path="/songs/edit/:id" exact component={SongEdit} />
              <Route path="/songs/:id" exact component={SongDetail} />
              <Route path="/yourpage/" exact component={YourPage} />
              <Route path="/yourpage/:id" exact component={YourPage} />
              <Route path="/about" exact component={AboutPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
