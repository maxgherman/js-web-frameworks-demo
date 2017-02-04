/*global _DEBUG_*/

import './slide16.less';

import React, { Component, PropTypes } from 'react';
import { setTitle } from '../../redux/actions';
import { connect } from 'react-redux';
import { downloadDemo } from '../../app/utils';

import CodeSample from '../../code-sample/CodeSample';
import { dependency, computeItem } from '../../../demoes/demo-3/code';
import { library } from '../../../demoes/demo-7/code';


class Slide16 extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            jsx: null,
            loaded : false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setTitle('Demo'));

        this.downloadScript();
    }

    downloadScript() {
        if(this.state.loaded === true) {
            return;
        }
            
        downloadDemo()
        .then(jsx => {
            this.setState({
                jsx,
                loaded : true 
            });    
        });
    }
    
    renderDemo() {
        if(this.state.loaded !== true) {
            return null;
        }

        var code = `
const obj = Library.createClass({
  properties : {
      cardNumber1: '',
      cardNumber2: '',
      cardNumber3: '',
      cardNumber4: '',
      cardHolder: '',
      expirationMonth: '',
      expirationYear: '',
      ccv: '',
      rotate: false
  },

  cardNumber() {
      return [this.properties.cardNumber1,
              this.properties.cardNumber2,
              this.properties.cardNumber3,
              this.properties.cardNumber4 ].join(' ');
  },

  expirationDate() {
      return [this.properties.expirationMonth,
                '/', 
              this.properties.expirationYear ].join(' ');
  },

  cardNumberChange(property, event) {
      
      if(event.target.value.length >= 4 &&
         event.code !== 'Backspace' &&
         event.code !== 'Delete') {
          return;
      }
      
      setTimeout(() => {
          this.properties[property] = event.target.value;
      }, 0);
  },

  cardHolderChange(property, event) {
      
      setTimeout(() => {
          this.properties[property] = event.target.value;
      }, 0);
  },

  expirationChange(property, event) {
      this.properties[property] = event.target.value;
  },

  ccvChange(event) {
      
      if(event.target.value.length >= 3 &&
         event.code !== 'Backspace' &&
         event.code !== 'Delete') {
          return;
      }
      
      setTimeout(() => {
          this.properties.ccv = event.target.value;
      }, 0);
  },

  ccvFocus() {
      this.properties.rotate = true;
  },

  ccvBlur() {
      this.properties.rotate = false;
  },

  submit(event) {
      event.preventDefault();
      return false;
  },
  
  render() { 
    
    const hover = this.properties.rotate === true ? 'hover' : '';
    const cardBox = ['credit-card-box', hover].join(' ');  
    
    return (`+ this.state.jsx +` );
  }
});`;

    const cssPath = [_DEBUG_ ? '/www/' : '/', 'demo.css'].join('');

    return (<CodeSample 
                canRun={true}
                displayDep={false}
                preload={[computeItem, dependency]}
                depValue={[library]}
                hyperscript={true}
                isJsx={true}
                value={code}
                frameClass={'full'}
                head={`<head>
                            <link href=${cssPath} rel="stylesheet">
                        </head>`}>
            </CodeSample>);
    }

    render() {
        
        return (<div className="slide slide-14"> 
                    {this.renderDemo()}
                </div>)
    }
}

Slide16.contextTypes = { router: PropTypes.object.isRequired };
Slide16.propTypes = { 
    dispatch: PropTypes.func.isRequired
};

export default connect()(Slide16);
