import  express  from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from "mongoose";
import helmet from 'helmet'
import mysql from 'mysql2'
import Sentence from "./models/sentence.js";
import Log from "./models/logs.js";
import axios from 'axios'
const endpoint="http://localhost:8000/"
dotenv.config();
const app=express();
app.use(express.json());//to tell the server ki take the json data
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(cors());







  // let q='create table sentence (_id int not null auto_increment primary key,sentence varchar(100) not null ,ngram int not null, time timestamp default current_timestamp not null)';
  const sqllogger=()=>{
    // var mysql = require('mysql');
  const con = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12647012',
    password: 'GB218C3eev',
    database: 'sql12647012'
  });
    const q=`insert into log values()`;
    con.query(
      q,
      function(err, results, fields) {
      //  console.log(results); 
      //  console.log(err);
        // console.log(fields);
      }
    );
  }
  const sqlsentencer=(sentence,ngram)=>{
    // var mysql = require('mysql');
  
  const con = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12647012',
    password: 'GB218C3eev',
    database: 'sql12647012'
  });
    const q=`insert into sentence (sentence,ngram) values("${sentence}",${ngram})`;
    con.query(
      q,
      function(err, results, fields) {
        //console.log(results); 
        //console.log(err);
        // console.log(fields);
      }
    );
  }
  



//MONGO
app.post('/ngram',async(req, res) => {
  const sentencer=req.body.inputValueText;
  const ngram=req.body.inputValueN;
  console.log(sentencer,ngram);
  sqllogger();
  sqlsentencer(sentencer,ngram);
  const log = new Log();
  await log.save();
  const sentence=new Sentence({
    Sentence:sentencer,
    Ngram:ngram

  });
  await sentence.save();

  const all=await Sentence.find();
  // console.log(all);
  const djangoarray=[];
  djangoarray.push(all[all.length -1]);
  djangoarray.push(all[all.length -2]);

  const data={
    Sentence1:all[all.length -1].Sentence,
    Sentence2:all[all.length -2].Sentence,
    Ngram1:all[all.length -1].Ngram,
    Ngram2:all[all.length -2].Ngram
  }

  const resdata=await axios.post(`${endpoint}`,data)
  console.log(resdata.data);
  res.status(200).json(resdata.data); 
})
  




mongoose.connect(process.env.MONGO_URL,{
   useNewUrlParser:true,
   useUnifiedTopology:true,

}).then(()=>{
   console.log('datbase connected')
})
.catch((error)=>console.log(`${error} did not connect`));

const PORT=process.env.PORT||6001;
app.listen(PORT,()=>console.log(`Server Port :${PORT}`));











