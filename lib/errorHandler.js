var Perror = require('./Perror');

module.exports = function(){
	return function(req, res, next){
	    res.handle = function(fn){
	        return function(err){
	            if(err){
	            	if (err instanceof Perror) {
	            		res.status(500).send(err.message);
	            	} else {
	            		res.status(500).send();
	                	console.log(err);
	            	}
	            }
	            else if (fn) {
	                var otherargs = [];
	                for(var i = 1; i < arguments.length; i++) {
	                    otherargs.push(arguments[i]);
	                }
	                fn.apply(this, otherargs);
	            }
	        };
	    };
	    next();
	}
};