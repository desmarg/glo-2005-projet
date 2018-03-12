import React from "react";
import Main from "./components/Main";
import Header from "./components/Header";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}