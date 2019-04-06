const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const mongoose   = require('mongoose');

const app = express();
const poll = require('./routes/poll');

mongoose.connect("mongodb://root:a1a2a3a4@ds133256.mlab.com:33256/polls",
    { useNewUrlParser: true },function(err){
    if(err){
        console.log(err);
    }else{
        console.log("connected to DB");
    }

})

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors())

app.use('/poll',poll);

const port = 3000||process.env.PORT;
app.listen(port,(err) =>{
    if(err){
        console.log(err);
    }else{
        console.log(`running on port ${port}`);
    }
})
