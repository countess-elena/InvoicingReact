var express = require('express');
var app = express();
app.set ('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//app.use('/public', express.static('public'));
app.use(express.static('uploads'));

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

app.use(fileUpload({
    createParentPath: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use ('/testAPI', (req, res)=>{
    res.send(upload())});

function upload () {
    xlsxj = require ('xlsx-to-json-lc');
    xlsxj({
      input: "uploads/excelmiddleimp.xlsx", 
      output: "outputMiddleImp.json",
      //sheet: "EXPORT",
      lowerCaseHeaders:true //converts excel header rows into lowercase as json keys
    }, function(err, result) {
      if(err) {
        console.log ('problem');
        console.error(err);
      }else {
        //var myobj=JSON.parse(result[3])
        console.log ('file uploaded');
        //myjson=JSON.stringify(result);
        //myobj=JSON.parse(myjson);
        console.log(result);
}
return result; 
    })
   // return result; 
}

export {upload}; 