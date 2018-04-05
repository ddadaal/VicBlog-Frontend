import React from "react";
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { App } from "./root";

// enable MobX strict mode
configure( { enforceActions: true});


async function render() {
  // render react DOM
  const AppComponent = await App();
  ReactDOM.render(
    <AppComponent/>,
    document.getElementById('root')
  );
}


// prepare MobX stores

render();



