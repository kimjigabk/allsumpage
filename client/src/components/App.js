import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import SongList from "./songs/SongList";
import SongDetail from "./songs/SongDetail";
import SongCreate from "./songs/SongCreate";
import SongEdit from "./songs/SongEdit";

class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }} className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={SongList} />
            <Route path="/songs/new" exact component={SongCreate} />
            <Route path="/songs/edit/:id" exact component={SongEdit} />
            <Route path="/songs/:id" exact component={SongDetail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
