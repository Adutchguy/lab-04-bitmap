'use strict';

let fs = require('fs');

const io = module.exports = {};

io.read = (path, callback) => {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    callback(null, data);
  });
};



// io.write = () => {
//   fs.writeFile(pathhhh, ())
// };
