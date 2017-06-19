'use strict';

const bitmap = require('./modules/bitmap.js');
const io = require('./lib/io.js');

io.read('../assets/house.bmp', (err, data) => {
  let bm;
  bm = bitmap.makeIt(data);
  bm.scale('1');
  io.write(bm.ogBuff);
});
