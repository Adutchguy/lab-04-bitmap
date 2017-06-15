'use strict';

let io = require('../lib/io.js');

let bitmap = module.exports = {};

bitmap.Bitmap = function (buffer) {
  this.ogBuff = buffer;
  this.headerField = buffer.toString('utf-8', 0, 2);
  this.height = buffer.readUInt32LE(22);
  this.width = buffer.readUInt32LE(18);
  this.fileSize = buffer.readUInt32LE(2);
  this.colorTable = buffer.readUInt16LE(54, 1078);
  // this.pixelArray
};

bitmap.makeIt = (data) => {
  return new bitmap.Bitmap(data);
};
