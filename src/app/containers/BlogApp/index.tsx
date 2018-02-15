import * as React from 'react';
import { Navbar } from '../../components/Navbar';

import './global.style.css';
import { Header } from "../../components/Header";
import style from '../../components/style';
import { Footer } from "../../components/Footer";

export interface BlogAppProps {

}

export class BlogApp extends React.Component<BlogAppProps, {}> {

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    } else {
      return null;
    }
  };

  render() {
    return <div>
      <Header/>
      <Navbar/>
      <div className={style("w3-container")}>
      {this.props.children}
      </div>
      <Footer/>
      {this.renderDevTool()}
    </div>;
  }
}
