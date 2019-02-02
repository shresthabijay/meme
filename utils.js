const fs = require('fs');

function addMemify(name,meme,threshold){
  fs.appendFileSync('memify.txt', `${name} ${meme} ${threshold}`);
}


// module.exports={displayPyramid}

  