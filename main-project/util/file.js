const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
  console.log(filePath);
  const nodeFilePath = path.normalize(filePath);  // in case of windows issue
  
  fs.unlink(nodeFilePath, (err) => {
    if (err) {
      throw (err);
    }
  });
}

exports.deleteFile = deleteFile;