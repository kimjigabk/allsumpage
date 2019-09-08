import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Header from "./Header";
import SongList from "./songs/SongList";
import MainPage from "./pages/mainpage/MainPage";
import YourPage from "./pages/yourpage/YourPage";
const AboutPage = lazy(() => import("./pages/aboutpage/AboutPage"));
const SongCreate = lazy(() => import("./songs/SongCreate"));
const SongEdit = lazy(() => import("./songs/SongEdit"));
// import AboutPage from "./about/AboutPage";

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
              <Route path="/yourpage/" exact component={YourPage} />
              <Route path="/yourpage/:id" exact component={YourPage} />
              <Suspense fallback={<div className="ui active loader"></div>}>
                <Route path="/about" exact component={AboutPage} />
                <Route path="/songs/new" exact component={SongCreate} />
                <Route path="/songs/edit/:id" exact component={SongEdit} />
              </Suspense>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
