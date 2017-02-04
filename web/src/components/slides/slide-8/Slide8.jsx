import './slide8.less';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';
import CodeSample from '../../code-sample/CodeSample';
import {computeItem, dependency, value } from '../../../demoes/demo-3/code';


class Slide8 extends Component {

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
            <div className="slide slide-8">
                <section>
                    <h2 className="sub-header">Anchors</h2>
                    <CodeSample 
                        canRun={true}
                        displayDep={true}
                        depValue={[computeItem, dependency]}
                        value={value}>
                    </CodeSample>
                </section>
             </div>);
    }
}

Slide8.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide8);
