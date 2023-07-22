const express= require('express');
const app = express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./middleware/errorhandler');
const authRoutes= require('./route/authroutes');
const userRoutes= require('./route/userroutes');
const jobTypeRoutes= require('./route/jobtyperoutes');
const jobRoutes=require('./route/jobroutes');
//middleware 
app.use(morgan('dev'));
app.use(bodyparser.json({limit:'5mb'}));
app.use(bodyparser.urlencoded({
    limit:'5mb',
    extended:true
}));


app.use(cookieParser());
app.use(cors({
    origin: config.origin,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));;
app.use(ErrorHandler);

//Routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',jobTypeRoutes);
app.use('/api',jobRoutes);


//database connection
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        
    }
    ).then(()=>{
        console.log('db connected')
    }).catch((err)=>{console.log(err)})


//port
port =process.env.PORT || 8000;

app.listen(port,function(){
   
})
