import * as React from 'react';
import { Link } from 'react-router';

const Home: React.StatelessComponent<{}> = function (props) {
    document.title = "Homepage - VicBlog";
    return (
        <div style={{textAlign: "center"}}>
        <h1>Welcome to my blog!</h1>
        <br/>
        So, what to do next?
        <br/>
        <ol>
        <li><Link to="/articles">Check out my badly-written articles!</Link></li>
        <li><Link to="/about">Or some words I'd like to say about this website!</Link></li>
        </ol>
        </div>
    );
};

export default Home;