import { HashRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

import "./App.css";

function App() {
  return (
    <Router basename="/">
      <div>
        <Route path="/" exact component={Join}></Route>
        <Route path="/chat" component={Chat}></Route>
      </div>
    </Router>
  );
}

export default App;
