import './slide3.less';
import { Images } from '../../common/content';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

class Slide3 extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Difficult choice'));
    }

    render() {
        
        return (
            <div className="slide slide-3">
                <section>
                    <h2 className="sub-header">How?</h2>
                    <img src={Images.reactHype}></img>
                    
                </section>
             </div>);
    }
}

Slide3.contextTypes = { router: PropTypes.object.isRequired };
Slide3.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide3);
