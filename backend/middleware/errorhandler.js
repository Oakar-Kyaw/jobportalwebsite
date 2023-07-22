const errorResponse= require('../util/erroresponse');

const ErrorHandler=(err,req,res,next)=>{
     
    let error={...err};
    error.message=err.message;
    console.log("error is "+JSON.stringify(error));
    
    if(err.message=="CastError"){
        const message="Resource not found "+ err.value;
        error=new errorResponse(message,404);
    };

    //mongo duplicate field
    if(err.code==11000){
        const message="Mongo Duplicate Field Entered";
        error=new  errorResponse(message,400);
    };

    //Validation Error 
    if(err.name=="ValidationError"){
        const message=Object.values(err.value).map(val=>' '+val.message);
        error=new  errorResponse(message,404);
    };

    res.status(error.codeStatus || 500).json({
        success:false,
        error:error.message || 'server error'
    });


}

module.exports = ErrorHandler;