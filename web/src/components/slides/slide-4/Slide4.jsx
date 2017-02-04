import { Images } from '../../common/content';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

class Slide4 extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Difficult choice'));
    }

    render() {
        
        return (
            <div className="slide slide-4">
                <section>
                    <img src={Images.polymer}></img>
                    
                </section>
             </div>);
    }
}

Slide4.contextTypes = { router: PropTypes.object.isRequired };
Slide4.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide4);
