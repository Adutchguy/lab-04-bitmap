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
  this.colorTable = buffer.slice(54, 1078);
  this.pixelArray = buffer.slice(1066, 1066 + this.width * this.height);
};

bitmap.makeIt = (data) => {
  console.log(data.readUInt32LE(46));
  return new bitmap.Bitmap(data);
};

bitmap.Bitmap.prototype.invert = function() {
  for(let i=0; i < this.colorTable.length; i += 4) {
    let temp = this.colorTable.slice(i, i + 4);
    for(let i = 0; i < temp.length - 1; i++) {
      temp[i] = 255 - temp[i];
    }
  }
};


bitmap.Bitmap.prototype.grayscale = function() {
  for(let i=0; i < this.colorTable.length; i += 4) {
    let temp = this.colorTable.slice(i, i + 4);
    let acc = 0;
    for(let i = 0; i < temp.length - 1; i++) {
      acc += temp[i];
    }
    acc = Math.floor(acc / 3);
    console.log(acc);
    temp.fill([acc]);
    console.log(temp);
  }
};

bitmap.Bitmap.prototype.scale = function(color) {
  for(let i=0; i < this.colorTable.length; i += 4) {
    let maxColor;
    switch (color) {
    case 'b':
      maxColor = i;
      break;
    case 'g':
      maxColor = i + 1;
      break;
    case 'r':
      maxColor = i + 2;
      break;
    }
    this.colorTable[maxColor] = 255;
  }
};
