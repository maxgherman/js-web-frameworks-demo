import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';
import CodeSample from '../../code-sample/CodeSample';
import value from '../../../demoes/demo-1/code';

class Slide6 extends Component {

    constructor(props) {
        super(props);

        this.state = { showCode : false };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Data Binding'));
    }

    showCode() {
        this.setState({ showCode : true });
    }

    render() {
  
        return (
            <div className="slide slide-6">
                <section>
                    <h2 className="sub-header">The Parts</h2>
                     <CodeSample canRun={false} value={value}></CodeSample>
                </section>
             </div>);
    }
}

Slide6.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide6);
