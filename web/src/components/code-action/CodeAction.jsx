
import React, { Component, PropTypes } from 'react';

class CodeAction extends Component {


    setCode(data) {
        var code =[ 
            `<!DOCTYPE HTML>
            <head> </head>
            <body style='font-size:25px;'> 
                <span id='placeholder'> </span> 
              
                <span id='placeholder2'> </span> 
            </body>`];

        data.forEach(item => {
            code.push(`<script>
                    ${item}
                    </script>`);
        });

        var host = this.refs.frame;
        var iframe = host.querySelector('iframe');

        if(iframe) {
            host.removeChild(iframe);
        }

        iframe = document.createElement('IFRAME');
        iframe.className = 'frame';

        host.appendChild(iframe);

        var execFrame = (iframe.contentWindow) ? iframe.contentWindow : 
                        (iframe.contentDocument.document) ? iframe.contentDocument.document : 
                                                            iframe.contentDocument;

        execFrame.document.open();
        execFrame.document.write(code.join(''));
        execFrame.document.close();
    }

    componentWillReceiveProps(props) {
       
        if(props.code &&
           props.code.length > 0) {
            this.setCode(props.code);
        }
    }

    render() {
        return (<div ref="frame"></div>);
    }
}

CodeAction.propTypes = { 
    code: PropTypes.arrayOf(React.PropTypes.string),
 };

export default CodeAction;