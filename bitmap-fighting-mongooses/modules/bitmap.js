'use strict';

const bitmap = module.exports = {};

bitmap.Bitmap = function (buffer) {
  this.ogBuff = buffer;
  this.height = buffer.readUInt32LE(22);
  this.width = buffer.readUInt32LE(18);
  this.colorTable = buffer.slice(54, 1078);
  this.pixelArray = buffer.slice(1066, 1066 + this.width * this.height);
};

bitmap.makeIt = (data) => {
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
    temp.fill([acc]);
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
    default:
      throw new Error(`Function arguments must be 'r' (red), 'g' (green), or 'b' (blue).`);
    }
    this.colorTable[maxColor] = 255;
  }
};
