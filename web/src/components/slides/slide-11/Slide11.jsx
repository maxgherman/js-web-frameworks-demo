import './slide11.less';

import { Images } from '../../common/content';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

class Slide11 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Virtual Dom'));
    }

    render() {
        
        return (
            <div className="slide slide-11">
                <section>
                    <img src={Images.vdom}></img>
                    <p>
                        source: https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/
                    </p>
                </section>
             </div>);
    }
}

Slide11.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide11);
