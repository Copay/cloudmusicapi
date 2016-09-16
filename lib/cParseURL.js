(()=>{
	class cParseURL{
		constructor(urlString){
			this.urlObject = require("url").parse(urlString,true);
			this.urlObject.pathname = urlObject.pathname.replace(/[\/]+/gi,"/").substring(1).split("/");
			Object.defineProperty(this,"urlObject",{writable:false});
		}
		has(path,unknownNumber=0){
			if(path===undefined||path===null||typeof unknownNumber !=="number")
				throw new TypeError("喵喵喵???");
			return this.urlObject.pathname[unknownNumber]===path ?
				true:false;
		}
		query(name){
			let theTemp;
			if(name===undefined)
				throw new TypeError("叽叽叽???");
			return (theTemp=this.urlObject.query[name])!==undefined ?
				theTemp:false;
		}
	}
	export cParseURL;
})();