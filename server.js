#!/usr/bin/env node

let http = require("http");
let api = require("./api");
let port;
if (!process.argv[2]){
	port = 8888;
}else{
	port = process.argv[2].match(/--port=(\d*)/gi)[0] ? parseInt(process.argv[2].replace(/--port=(\d+)/gi,"$1")) : 8888;
}
http.createServer((req,res)=>{
	const CALLBACK = data=>{
		res.end(JSON.stringify(data));
	};
	res.writeHead(200,{
		"Content-Type":"text/json;charset=utf-8"
	});
	let url = decodeURI(req.url);
	if(url.substring(0,13)=="/search/song/"){
		api.search(url.substring(14),CALLBACK,{type:"1"});
	}else
	if(url.substring(0,14)=="/search/album/"){
		api.search(url.substring(15),CALLBACK,{type:"10"});
	}else
	if(url.substring(0,17)=="/search/playlist/"){
		api.search(url.substring(18),CALLBACK,{type:"1000"});
	}else
	if(url.substring(0,15)=="/search/artist/"){
		api.search(url.substring(16),CALLBACK,{type:"100"});
	}else
	if(url.substring(0,13)=="/search/user/"){
		api.search(url.substring(14),CALLBACK,{type:"1002"});
	}else
	if(url.substring(0,11)=="/search/fm/"){
		api.search(url.substring(12),CALLBACK,{type:"1009"});
	}else
	{
		res.end("汪汪汪???");
	}
	//以上是搜索信息的可能(1.0.0)
}).listen(port).on("error", (j)=>{console.log(j)});