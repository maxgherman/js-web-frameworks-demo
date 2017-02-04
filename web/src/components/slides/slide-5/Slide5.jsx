import './slide5.less';

import { Images } from '../../common/content';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

class Slide5 extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Options'));
    }

    render() {
        
        return (
            <div className="slide slide-5">
                <section>
                    <img src={Images.options}></img>
                    <p>
                        source: https://www.sencha.com/blog/4-questions-to-ask-before-choosing-a-javascript-framework
                    </p>
                </section>
             </div>);
    }
}

Slide5.contextTypes = { router: PropTypes.object.isRequired };
Slide5.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide5);
