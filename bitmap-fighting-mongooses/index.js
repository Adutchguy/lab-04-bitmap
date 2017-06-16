'use strict';

const bitmap = require('./modules/bitmap.js');
const io = require('./lib/io.js');
const fs = require('fs')

let bm;

io.read('../assets/house.bmp', (err, data) => {
  bm = bitmap.makeIt(data);
  // console.log('fileSize', bm.fileSize);
  console.log('headerField', bm.headerField);
  console.log('width', bm.width);
  console.log('height', bm.height);
  console.log('ogBuff', bm.ogBuff);
  console.log('COLORTABLE', bm.colorTable);
  console.log('pxl arra', bm.pixelArray);
  bm.scale('g');
  io.write(bm.ogBuff);
});
