import * as React from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import "../assets/main.css";

interface IAppProps extends React.Props<any> { };

class App extends React.Component<void, void>{
    render() {
        return (
            <div>
                <Navbar />
                <div style={{ backgroundColor: "#ECECEC", minHeight: "300px" }}>
                    <div style={{ margin: "0 16px", padding: "24px 0 24px" }}>
                        <div style={{ backgroundColor: "white", padding:"8px 16px 8px 16px" }}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default App;
