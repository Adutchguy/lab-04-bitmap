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
  describe('testing greyscale method', () => {
    let bm;
    io.read('../assets/house.bmp', (err, data) => {
      bm = bitmap.makeIt(data);
      bm.colorTable = new Buffer([123, 43, 64, 0]);

      bm.grayscale();
    }); 
    it('should change image to black and white', () => {
      expect(bm.colorTable).toEqual(new Buffer([76, 76, 76, 76]));
    });
  });
  describe('testing scale method', () => {
    describe('test red scale', () => {
      let bm;
      io.read('../assets/house.bmp', (err, data) => {
        bm = bitmap.makeIt(data);
        bm.colorTable = new Buffer([123, 43, 64, 0]);

        bm.scale('r');
      }); 
      it('should change image to black and white', () => {
        expect(bm.colorTable).toEqual(new Buffer([123, 43, 255, 0]));
      });
    });
    describe('test blue scale', () => {
      let bm;
      io.read('../assets/house.bmp', (err, data) => {
        bm = bitmap.makeIt(data);
        bm.colorTable = new Buffer([123, 43, 64, 0]);

        bm.scale('g');
      }); 
      it('should change image to black and white', () => {
        expect(bm.colorTable).toEqual(new Buffer([123, 255, 64, 0]));
      });
    });
    describe('test green scale', () => {
      let bm;
      io.read('../assets/house.bmp', (err, data) => {
        bm = bitmap.makeIt(data);
        bm.colorTable = new Buffer([123, 43, 64, 0]);

        bm.scale('b');
      }); 
      it('should change image to black and white', () => {
        expect(bm.colorTable).toEqual(new Buffer([255, 43, 64, 0]));
      });
    });
  });  
});
