import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

import CodeSample from '../../code-sample/CodeSample';
import {renderHyperText, example } from '../../../demoes/demo-6/code';


class Slide12 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Virtual Dom'));
    }

    render() {
        
        return (
            <div className="slide slide-12">
                <section>
                    <h2 className="sub-header">Hyperscript</h2>
                    <CodeSample 
                        canRun={false}
                        displayDep={true}
                        depValue={[renderHyperText]}       
                        value={example}>
                    </CodeSample>
                </section>
             </div>);
    }
}

Slide12.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide12);
