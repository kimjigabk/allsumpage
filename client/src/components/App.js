import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import SongList from "./songs/SongList";
import SongCreate from "./songs/SongCreate";
import SongEdit from "./songs/SongEdit";
import SongDetail from "./songs/SongDetail";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }} className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={SongList} />
              <Route path="/songs/new" exact component={SongCreate} />
              <Route path="/songs/edit/:id" exact component={SongEdit} />
              <Route path="/songs/:id" exact component={SongDetail} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
