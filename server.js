const express = require('express');
const path=require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./server/database/connection');
const Handlebars = require('handlebars');
const hbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
// handlebars: allowInsecurePrototypeAccess(Handlebars);



const app = express();
// app.engine('hbs', expressHandlebars({ extname: 'hbs', 
//   defaultLayout: 'mainLayout', 
//   handlebars: allowInsecurePrototypeAccess(handlebars), 
//   layoutsDir: __dirname + '/server/controller/' })
// ); 

    // setup view engine
    app.engine('hbs', hbs.engine({
        // extname:'hbs',
        // defaultLayout: 'layout',
        // allowProtoMethodsByDefault:'true', 
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        // layoutsDir: __dirname + '/server/controller/'
      }));
      app.set('view engine', 'handlebars');

dotenv.config({path:'config.env'});
// const PORT = 'https://iclilaboratory.herokuapp.com/icladdis/viewresult';
let PORT = process.env.PORT || 8080;

//connect to DB
connectDB();

// parse request to the body parser
app.use(bodyParser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs");

// load assets
app.use('/css',express.static(path.resolve(__dirname,"asset/css")));
app.use('/img',express.static(path.resolve(__dirname,"asset/img")));
app.use('/js',express.static(path.resolve(__dirname,"asset/js")));
app.use( express.static( "views" ) );


// load routes
app.use('/',require('./server/routes/router'));


app.listen(PORT,()=>{console.log(`server is Running at http://localhost:${PORT}`)});