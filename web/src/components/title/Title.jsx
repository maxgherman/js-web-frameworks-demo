import './title.less';
import { Images } from '../common/content';

import React from 'react';
import Container from 'muicss/lib/react/container';


const Title = () => (
    <div className="title">
        <header className="mui-container">
            <h1 className="logo">Barcamp<br/>Readify - NSW</h1>
            <h3 className="time">March 2017 - Sydney, NSW</h3>
        </header>
        <section>
            <Container>
                <h1 className="main-title">JavaScript Web Frameworks</h1>
                <h2 className="main-sub-title">different yet similar</h2>
            </Container>
        </section>
        <footer className="mui-container">
            <div className="author">
                <h3>Max Gherman<br/>Senior Engineer, Readify</h3>
            </div>
            <div className="logo">
                <img src={Images.logo}></img>
            </div>
        </footer>
    </div>
);

export default Title;
