import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

import CodeSample from '../../code-sample/CodeSample';
import { dependency, computeItem } from '../../../demoes/demo-3/code';
import { library, value } from '../../../demoes/demo-7/code';


class Slide13 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Virtual Dom'));
    }

    render() {
        
        return (
            <div className="slide slide-13">
                <section>
                    <h2 className="sub-header">Hyper Objects</h2>
                    <CodeSample 
                        canRun={true}
                        displayDep={true}
                        preload={[computeItem, dependency]}
                        depValue={[library]}
                        hyperscript={true}
                        value={value}>
                    </CodeSample>
                </section>
             </div>);
    }
}

Slide13.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide13);
