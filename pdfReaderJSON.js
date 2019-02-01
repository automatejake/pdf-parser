/*this code reads in a pdf, converts it to json, and then inserts the data into mongoDB*/

/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

////////////////////////////////////////////////////////
//this part of the code reads a pdf to strings in JSON

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
      data += '\"FILENAME\":\"' + item.file.path + '\","PAGES":{';
    else if (item.page){
      if(item.page == 1)
        data += '"PAGE' + item.page + '":[';
      else
        data += '],"PAGE' + item.page + '":[';
      line = 0;
      //console.log(item.page);
    }
    else if(item.text){
      if(line < 1){
        data += '\"' + item.text + '"';
        line++;
      }
      else {
        data += ',\"' + item.text + '"';
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
    data = '{' + data  + ']}}';
    console.log(data);
    jbuffer = JSON.parse(data);

    var fs = require('fs');
    fs.writeFile ("input.json", JSON.stringify(jbuffer), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
    fs.writeFile ("input.txt", data, function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );



    //mongoimport -c test -d test --mode insert input.json

  });





}
////////////////////////////////////////////////////

//this code removes JSON from mongoDB

/*const MongoClient = require('./node_modules/mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'PDFcontents';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {

  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);



//////////////////////////////
const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 1 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 1");
    callback(result);
  });
}

removeDocument(db, function() {
    client.close();
  });*/


////////////////////////////












  //client.close();
//});
