'use strict';

const expect = require('expect');
const bitmap = require('../modules/bitmap.js');
const io = require('../lib/io.js');

describe('testing bitmap module', () => {
  describe('testing invert method', () => {
    let bm;
    io.read('../assets/house.bmp', (err, data) => {
      bm = bitmap.makeIt(data);
      bm.colorTable = new Buffer([123, 43, 64, 0]);

      bm.invert();
    }); 
    it('should invert color scheme', () => {
      expect(bm.colorTable).toEqual(new Buffer([132, 212, 191, 0]));
    });
  });
  
});
