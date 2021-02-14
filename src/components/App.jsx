import { Route, Router, Switch } from "react-router-dom";

import StreamList from "./stream/StreamList";
import StreamCreate from "./stream/StreamForm";
import StreamEdit from "./stream/StreamEdit";
import StreamDelete from "./stream/StreamDelete";
import StreamShow from "./stream/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/stream/new" exact component={StreamCreate} />
          <Route path="/stream/edit/:id" component={StreamEdit} />
          <Route path="/stream/delete/:id" component={StreamDelete} />
          <Route path="/stream/:id" component={StreamShow} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
