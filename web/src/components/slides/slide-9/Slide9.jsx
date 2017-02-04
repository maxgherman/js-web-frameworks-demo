import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

import CodeSample from '../../code-sample/CodeSample';
import { computeItem, dependency } from '../../../demoes/demo-3/code';
import { reactiveDictionary, value } from '../../../demoes/demo-4/code';


class Slide9 extends Component {

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
            <div className="slide slide-9">
                <section>
                    <h2 className="sub-header">Reactive dictionary</h2>
                    <CodeSample 
                        canRun={true}
                        displayDep={true}
                        depValue={[reactiveDictionary]}
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
