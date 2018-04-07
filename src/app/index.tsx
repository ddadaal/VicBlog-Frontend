import React from "react";
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { App } from "./root";
// enable MobX strict mode
configure( { enforceActions: true});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("serviceWorker.js").catch(err => {
    console.error("Could not register service worker",err)
  });
} else {
  console.error("Service workers are not supported")
}

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



