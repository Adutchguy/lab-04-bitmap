'use strict';

let io = require('../lib/io.js');

let bitmap = module.exports = {};

bitmap.Bitmap = function (buffer) {
  this.ogBuff = buffer;
  this.headerField = buffer.toString('utf-8', 0, 2);
  this.height = buffer.readUInt32LE(22);
  this.width = buffer.readUInt32LE(18);
  this.fileSize = buffer.readUInt32LE(2);
  //gets the number of colors in the table, multiplys it by 4 (number of bytes per color), and adds to offset
  this.colorTable = buffer.slice(54, (buffer.readUInt32LE(46) * 4) + 54).toString('hex');
  this.pixelRowSize = Math.floor(((buffer.readUInt16LE(28) * this.width + 31) / 32) * 4);
  this.pixelArraySize = this.pixelRowSize * Math.abs(this.height);
  this.pixelArray = buffer.slice((buffer.readUInt32LE() * 4) + 54), this.pixelArraySize + ((buffer.readUInt32LE() * 4) + 54);
};

bitmap.makeIt = (data) => {
  console.log(data.readUInt32LE(46));
  return new bitmap.Bitmap(data);
};
