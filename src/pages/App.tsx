import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../assets/main.css";


export default class App extends React.Component<any, any>{

    render() {
        return (
            <div>
                <Navbar />
                <hr/>
                <div className="main-content">
                    {this.props.children}
                </div>
                <hr/>
                <Footer />
            </div>
        );
    }
}
