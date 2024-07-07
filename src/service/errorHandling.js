class errorhandler{
    static notfound(req,res,next){
        const error=new Error(`Not Fond: ${req.originalUrl}`);
        res.status(404);
        next(error);
    }

    static errorHandler(err,req,res,next){
        const statuscode =res.statusCode==200?422:res.statusCode;
        res.status(statuscode);
        res.json({
            message:err?.message,
            status: "Bad request",
            statuscode:statuscode
        });
        
        
    }
}

module.exports=errorhandler;