'use strict';

const bitmap = require('./modules/bitmap.js');
const io = require('./lib/io.js');

io.read('../assets/bitmap.bmp', (err, data) => {
  let bm = bitmap.makeIt(data);
  console.log('fileSize', bm.fileSize);
  console.log('headerField', bm.headerField);
  console.log('width', bm.width);
  console.log('height', bm.height);
  console.log('ogBuff', bm.ogBuff);
  console.log('COLORTABLE', bm.colorTable);
});
