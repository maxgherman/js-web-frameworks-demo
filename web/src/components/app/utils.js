/*global _DEBUG_*/

import xhr from 'xhr';


export function downloadFile(url) {
    return new Promise(resolve => { 
        xhr({
                uri: url,
                headers: { 'Content-Type': 'text/plain' }
            },
            function (err, resp, body) {
                resolve(body); 
        });
    });     
}

export function downloadHyperScript() {
     
    const prefix = _DEBUG_ ? '/www' : '';
    var p1 = downloadFile(`${prefix}/hyperTextPart1.src`);
    var p2 = downloadFile(`${prefix}/hyperTextPart2.src`);
        
    return Promise.all([p1, p2])
    .then(([part1, part2]) => ({ part1, part2 }));
}

export function downloadDemo() {
     
    const prefix = _DEBUG_ ? '/www' : '';
    return downloadFile(`${prefix}/demo.jsx`);
}