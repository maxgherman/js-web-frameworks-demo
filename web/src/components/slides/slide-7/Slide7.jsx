
import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';

import CodeSample from '../../code-sample/CodeSample';
import { preLoadCode, value } from '../../../demoes/demo-2/code';


class Slide7 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Data Binding'));
    }

    render() {

        return (
            <div className="slide slide-7">
                <section>
                    <h2 className="sub-header">Wrapper</h2>
                    <CodeSample 
                        canRun={true}
                        value={value}
                        preload={[preLoadCode]}>
                    </CodeSample>
                </section>
            </div>);
    }
}

Slide7.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide7);
