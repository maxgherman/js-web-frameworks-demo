import 'muicss/lib/css/mui.css';
import './app.less';

import React, { Component, PropTypes } from 'react';
import routes from '../routing/routes';

class App extends Component {
    
    constructor(props) {
        super(props);

        this.keyDownBound = this.keyDown.bind(this);
    }

    componentWillMount(){
        document.addEventListener('keydown', this.keyDownBound);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownBound);
    }

    keyDown(e) {
        
        if(e.keyCode === 39) {  // Right Arrow
            let path = routes.getNextPath(this.props.location.pathname);

            if(path) {
                this.context.router.push(path);
            }
        }
        
        if(e.keyCode === 37) {  // Left Arrow
            let path = routes.getPrevtPath(this.props.location.pathname);

            if(path) {
                this.context.router.push(path);
            }
        }
    }

    render() {
        return (<div className="app">
            {this.props.children}
            </div>);
    }
}

App.contextTypes = { router: PropTypes.object.isRequired };
App.propTypes = { 
    children: PropTypes.node.isRequired,
    location: PropTypes.object
};

export default App;