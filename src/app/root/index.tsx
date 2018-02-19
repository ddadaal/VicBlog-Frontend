import * as React from 'react';
import { Navbar } from '../components/Navbar';

import './global.style.css';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
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
      {this.props.children}
      <Footer/>
      {this.renderDevTool()}
    </div>;
  }
}
