import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';
import CodeSample from '../../code-sample/CodeSample';
import { computeItem, dependency } from '../../../demoes/demo-3/code';
import { reactiveObjects, value } from '../../../demoes/demo-5/code';


class Slide9 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Data Binding'));
    }

    render() {
        
        return (
            <div className="slide slide-10">
                <section>
                    <h2 className="sub-header">Reactive Objects</h2>
                    <CodeSample 
                        canRun={true}
                        displayDep={true}
                        depValue={[reactiveObjects]}
                        preload={[computeItem, dependency]}
                        value={value}>
                    </CodeSample>
                </section>
             </div>);
    }
}

Slide9.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide9);