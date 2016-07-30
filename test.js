var i = require("./api");
console.time("Runtime");
i.search("hello",(data)=>{
	console.log(data);
	console.timeEnd("Runtime");
});
