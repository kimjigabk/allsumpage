import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import SongList from "./songs/SongList";
import SongCreate from "./songs/SongCreate";
import SongEdit from "./songs/SongEdit";
import SongDetail from "./songs/SongDetail";

class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }} className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={SongList} />
              <Route path="/songs/new" exact component={SongCreate} />
              <Route path="/songs/edit/:id" exact component={SongEdit} />
              <Route path="/songs/:id" exact component={SongDetail} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
