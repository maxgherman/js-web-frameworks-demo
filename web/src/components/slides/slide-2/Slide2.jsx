import { Images } from '../../common/content';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

class Slide2 extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Difficult choice'));
    }

    render() {
        
        return (
            <div className="slide slide-2">
                <section>
                    <h2 className="sub-header">What?</h2>
                    <img src={Images.frameworks}></img>
                    
                </section>
             </div>);
    }
}

Slide2.contextTypes = { router: PropTypes.object.isRequired };
Slide2.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide2);
