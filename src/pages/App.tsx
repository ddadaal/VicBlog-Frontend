import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../assets/main.css";

interface IAppProps extends React.Props<any> { };

class App extends React.Component<void, void>{
    render() {
        return (
            <div>
                <Navbar />
                <hr/>
                <div style={{ backgroundColor: "white", padding: "8px 16px 8px 16px", maxWidth:"1600px", marginLeft:"auto",marginRight: "auto" }}>
                    {this.props.children}
                </div>
                <hr/>
                <Footer />
            </div>
        );
    }
}
export default App;
