const LOG = require("./node_modules/pdfreader/lib/LOG.js").toggle(false);
const PdfReader = require("./node_modules/pdfreader/index.js").PdfReader;
var data = "";
var counter = 0;
var page = 0;
var line = 0;
var jbuffer;

function printRawItems(filename, callback){
  new PdfReader().parseFileItems(filename, function(err, item){
    if (err)
      callback(err);
    else if (!item)
      callback();
    else if (item.file)
      data += 'FILENAME ' + item.file.path + ', PAGES:';
    else if (item.page){
      if(item.page == 1)
        data += 'PAGE' + item.page;
      else
        data += 'PAGE' + item.page;
      	line = 0;
      //console.log(item.page);
    }
    else if(item.text){
      if(line < 1){
        data += item.text + "";
        line++;
      }
      else {
        data += item.text + "";
      }
    }
    else
      console.log("error");
  });
}

var filename = process.argv[2];
if (!filename) {
  console.error("please provide the name of a PDF file");
}
else {
  console.warn("printing raw items from file:", filename, "...");
  printRawItems(filename, function(){
    console.log(data);

    var fs = require('fs');
    /*fs.writeFile ("input.json", JSON.stringify(jbuffer), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );*/
    fs.writeFile ("input.txt", data, function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );


  });





}