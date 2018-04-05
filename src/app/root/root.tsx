import React from "react";
import { Navbar } from '../components/Navbar';

import './global.style.css';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { observer } from "mobx-react";
import ScrollUpButton from "react-scroll-up-button"
import { AsyncComponent } from "../routes/AsyncComponent";

export interface BlogAppProps {
}


async function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = (await import('mobx-react-devtools')).default;
    return (<DevTools />);
  } else {
    return null;
  }
}

@observer
export class Root extends React.Component<BlogAppProps, {}> {


  render() {
    return <div>

      <ScrollUpButton/>
      <Header/>
      <Navbar/>
      {this.props.children}
      <Footer/>
      <AsyncComponent render={renderDevTool}/>
    </div>;
  }
}
