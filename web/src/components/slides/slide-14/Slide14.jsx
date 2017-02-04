import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

import CodeSample from '../../code-sample/CodeSample';
import { dependency, computeItem } from '../../../demoes/demo-3/code';
import { library } from '../../../demoes/demo-7/code';
import value from '../../../demoes/demo-8/code';


class Slide14 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Final result'));
    }

    render() {
        
        return (
            <div className="slide slide-14">
                <section>
                    <h2 className="sub-header">JSX Objects</h2>
                    <CodeSample 
                        canRun={true}
                        displayDep={false}
                        preload={[computeItem, dependency]}
                        depValue={[library]}
                        hyperscript={true}
                        isJsx={true}
                        value={value}>
                    </CodeSample>
                </section>
             </div>);
    }
}

Slide14.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide14);
