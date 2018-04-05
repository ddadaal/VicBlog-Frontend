import createBrowserHistory from "history/createBrowserHistory";
import { initProviders } from "../providers";
import { Module } from "react.di";
import React from "react";
import { Root } from "./root";
import { switches } from "../routes/routes";
import { Router } from "react-router";

export async function App() {
  const history = createBrowserHistory();
  const providers = await initProviders(history);
  return Module({
    providers: providers
  })(
    class App extends React.Component<{}, {}> {
      render() {
        return <Root>
          <Router history={history}>
          {switches}
          </Router>
        </Root>
      }
    });
}
