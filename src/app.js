
'use strict';

// we use fs + brfs to inline an example XML document
var fs = require('fs');

// inlined in result file via brfs
export  const pizzaDiagram = fs.readFileSync(require.resolve('./pizza-collaboration.bpmn'), 'utf-8');
