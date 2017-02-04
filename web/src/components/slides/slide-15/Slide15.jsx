import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';
import classNames from 'classnames';


class Slide15 extends Component {

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
        dispatch(setTitle('Summary'));
    }

    keyDown(e) {
        if(e.keyCode === 32) {  // Space
            this.setState({step : this.state.step + 1});      
        }
    }

    renderItems(step) {
        return ['Knockout', 
                'Meteor',
                'React',
                'Polymer',
                'Mercury',
                'CycleJS',
                '...']
                .map((item, index) => {
                    
                    let className = classNames({
                        highlighted: step === (index + 1)
                    });

                    return (<h2 key={index} className={className}>{item}</h2>);
                });
    }

    render() {
        
        return (
            <div className="slide slide-15">
                <section>
                    {this.renderItems(this.state.step)}
                </section>
            </div>);
    }
}

Slide15.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide15);
