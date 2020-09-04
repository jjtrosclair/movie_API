import React from "react";
import ReactDOM from "react-dom";

import { MainView } from "./components/main-view/main-view";

//import statement indicating that you need to bundle this file

import "./index.scss";

//main component that will eventually use all others

class MyFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

//finds the root of your app

const container = document.getElementsByClassName("app-container")[0];

// tells React to render your app in the root DOM element

ReactDOM.render(React.createElement(MyFlixApplication), container);
