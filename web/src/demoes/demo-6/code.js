
const renderHyperText = `
const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

let tree;
let rootNode;

function renderh(newTree) {
  
  if(!tree) {
            tree = newTree;
            rootNode = createElement(newTree);
            document.body.appendChild(rootNode);
            return;
  }

  let patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
}`;

const example = `
let initialTree = h('div', null, ["Hello! ",
                    h('br'),
                    h('input', {type: "text", value: ''}),
                    h('button', null, ["Click me"])
                  ]);

renderh(initialTree);`;

export { renderHyperText, example };