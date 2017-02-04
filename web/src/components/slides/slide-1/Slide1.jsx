import './slide-1.less';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';
import classNames from 'classnames';

class Slide1 extends Component {

    constructor(props) {
        super(props);

        this.state = { step : 0 };

        this.keyDownBound = this.keyDown.bind(this);
    }

    componentWillMount(){
        document.addEventListener('keydown', this.keyDownBound);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownBound);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Difficult choice'));
    }

    keyDown(e) {
        if(e.keyCode === 32) {  // Space
            this.setState({step : this.state.step + 1});      
        }
    }

    renderItems(step) {
        return ['Don\'t Reinvent The Wheel', 
                     'Do More With Less Code',
                     'Save Time',
                     'Higher Order Abstraction']
                .map((item, index) => {
                    
                    let className = classNames({
                        highlighted: step === (index + 1)
                    });

                    return (<h2 key={index} className={className}>{item}</h2>);
                });
    }

    render() {
        
        return (
            <div className="slide slide-1">
                <section>
                    <h2 className="sub-header">Why?</h2>
                    {this.renderItems(this.state.step)}
                </section>
             </div>);
    }
}

Slide1.contextTypes = { router: PropTypes.object.isRequired };
Slide1.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide1);
