/*global CodeMirror*/

import './codeSample.less';

import classNames from 'classnames';
import jsx from 'jsx-transform';

import React, { Component, PropTypes } from 'react';
import Button from 'muicss/lib/react/button';
import { downloadHyperScript } from '../app/utils';

let hyperScript = {
    part1 : null,
    part2: null,
    loaded: false
};


class CodeSample extends Component {

    constructor(props) {
        super(props);

        this.state = { code: false, display: false, run: false };

        this.keyDownBound = this.keyDown.bind(this);

        this.downloadScript();
    }

    downloadScript() {
        if(hyperScript.loaded) {
            return;
        }

        downloadHyperScript()
        .then(({ part1, part2 }) => {
            hyperScript.part1 = part1;
            hyperScript.part2 = part2;
            hyperScript.loaded = true;
        });
    }

    keyDown(e) {

        if (e.keyCode === 27) {   // Escape
            this.setState({ code: false, display: false });

            const editor = this.refs.editor;
            editor.removeEventListener('keydown', this.keyDownBound);

            const dipslay = this.refs.editor;
            dipslay.removeEventListener('keydown', this.keyDownBound);
        }

        if (e.keyCode === 39 ||
            e.keyCode === 37) {
            e.stopPropagation();
        }
    }

    showCode() {
        this.setState({ code: true });

        const editor = this.refs.editor;
        editor.addEventListener('keydown', this.keyDownBound);
    }

    dislayDependencies() {
        this.setState({ display: true });

        const editor = this.refs.display;
        editor.addEventListener('keydown', this.keyDownBound);
    }

    hideRun() {
        var host = this.refs.frame;
        var iframe = host.querySelector('iframe');

        if (iframe) {
            host.removeChild(iframe);
        }
        
        this.setState({run : false});
    }

    generateCode() {
        const head = this.props.head ||
        `<head>
                <style>
                    .result {
                        font-size: 50px;
                        font-weight: 300;
                        color: #648880;
                        padding-top: 20px;
                        overflow: hidden;
                    }

                    input {
                        font-size:23px;
                    }
                    
                    button {
                        font-size:25px;
                    }

                </style>
            </head>`;
        
        var code = [
            '<!DOCTYPE HTML>'
            ,head,
            '<body class="result">',
                this.props.hyperscript === true ? '' : 
                `<span id="placeholder"> </span> 
                <br/>
                <span id="placeholder2"> </span>`, 
           '</body>'];

        let assets = (this.props.preload || [])
                            .concat(this.props.depValue || []);
        
        let editorValue = this.codeEditor.getValue();

        if(this.props.isJsx) {
            editorValue = jsx.fromString(editorValue, {
                factory: 'h'
            });
        }
        
        assets.push(editorValue);

        if(this.props.hyperscript === true)
        {
            return [...code, 
                    '<script>', 
                        hyperScript.part1, 
                        ...assets, 
                        hyperScript.part2, 
                    '</script>'];
        }

        return [...code, ...assets.map(item => `<script>${item}</script>`)];
    }

    runCode() {
        var code = this.generateCode();

        var host = this.refs.frame;
        var iframe = host.querySelector('iframe');

        if (iframe) {
            host.removeChild(iframe);
        }

        iframe = document.createElement('IFRAME');
        iframe.className = this.props.frameClass || 'small';

        host.appendChild(iframe);

        var execFrame = (iframe.contentWindow) ? iframe.contentWindow :
            (iframe.contentDocument.document ? iframe.contentDocument.document :
                iframe.contentDocument);

        execFrame.document.open();
        execFrame.document.write(code.join(`
        `));
        execFrame.document.close();

        this.setState({run : true});
    }

    componentWillUnmount() {
        const editor = this.refs.editor;
        editor.removeEventListener('keydown', this.keyDownBound);
        this.codeEditor = null;
    }

    componentDidMount() {
        this.codeEditor = CodeMirror(this.refs.editor, {
            value: this.props.value,
            mode: 'javascript',
            lineWrapping: true,
            lineNumbers: true,
            autofocus: true,
            readOnly: false
        });

        if (this.props.displayDep) {
            CodeMirror(this.refs.display, {
                value: this.props.depValue ? this.props.depValue.join(`
                `) : '',
                mode: 'javascript',
                lineWrapping: true,
                lineNumbers: true,
                autofocus: true,
                readOnly: true
            });
        }
    }

    render() {

        const editorClass = classNames({
            editor: true,
            show: this.state.code,
            hide: !this.state.code
        });

        const displayClass = classNames({
            editor: true,
            show: this.state.display,
            hide: !this.state.display
        });

        const renderRunButton = () =>
            !!this.props.canRun &&
            (<Button variant="raised" onClick={this.runCode.bind(this) }>Run</Button>);

        const renderDispayButton = () =>
            !!this.props.displayDep &&
            (<Button variant="raised" 
                      onClick={this.dislayDependencies.bind(this) }>Dependencies</Button>);


        return (
            <div className="code-sample">
                {renderDispayButton() }
                <Button variant="raised" onClick={this.showCode.bind(this) }>Code</Button>
                {renderRunButton() }
                <div className={editorClass} ref="editor"></div>
                <div className={displayClass} ref="display"></div>
                <div className="host">
                    {this.state.run ? 
                        <button className="close" onClick={this.hideRun.bind(this)}>X</button> : null}
                    <div ref="frame">
                    </div>
                </div>
            </div>);
    }
}

CodeSample.propTypes = {
    value: PropTypes.string.isRequired,
    depValue: PropTypes.arrayOf(React.PropTypes.string),
    preload: PropTypes.arrayOf(React.PropTypes.string),
    canRun: PropTypes.bool,
    displayDep: PropTypes.bool,
    hyperscript: PropTypes.bool,
    isJsx : PropTypes.bool,
    head: PropTypes.string,
    frameClass: PropTypes.string
};

export default CodeSample;