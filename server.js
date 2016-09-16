#!/usr/bin/env node

//import cParseURL from "./lib/cParseURL.js";
let http = require("http");
let api = require("./api");
let server = http.createServer((req,res)=>{
	const CALLBACK = data=>{
		data = JSON.stringify(data);
		if(url.query.callback) data = url.query.callback + "(" + data + ")";
		res.end(data);
	};
	res.writeHead(200,{
		"Content-Type":"text/json;charset=utf-8"
	});
	let url = require("url").parse(req.url,true);
		if (url.pathname == '/health') {
	    res.writeHead(200);
	    res.end();
	}
	url.pathname = decodeURI(url.pathname);
	if(url.pathname.substring(0,13)=="/search/song/"){
		api.search(url.pathname.substring(13),CALLBACK,{type:"1"});
	}else
	if(url.pathname.substring(0,14)=="/search/album/"){
		api.search(url.pathname.substring(14),CALLBACK,{type:"10"});
	}else
	if(url.pathname.substring(0,17)=="/search/playlist/"){
		api.search(url.pathname.substring(17),CALLBACK,{type:"1000"});
	}else
	if(url.pathname.substring(0,15)=="/search/artist/"){
		api.search(url.pathname.substring(15),CALLBACK,{type:"100"});
	}else
	if(url.pathname.substring(0,13)=="/search/user/"){
		api.search(url.pathname.substring(13),CALLBACK,{type:"1002"});
	}else
	if(url.pathname.substring(0,11)=="/search/fm/"){
		api.search(url.pathname.substring(11),CALLBACK,{type:"1009"});
	}else
	if(url.pathname.substring(0,7)=="/album/"){
		api.getAlbum(url.pathname.substring(7),CALLBACK);
	}else
	if(url.pathname.substring(0,8)=="/detail/"){
		api.getDetail(url.pathname.substring(8),CALLBACK);
	}else
	if(url.pathname.substring(0,10)=="/playlist/"){
		api.getPlaylist(url.pathname.substring(10),CALLBACK);
	}else
	if(url.pathname.substring(0,6)=="/song/"){
		api.getURL(url.pathname.substring(6),CALLBACK);
	}else
	if(url.pathname.substring(0,7)=="/lyric/"){
		api.getLyric(url.pathname.substring(7),CALLBACK);
	}else
	if(url.pathname.substring(0,4)=="/mv/"){
		api.getMV(url.pathname.substring(4),CALLBACK);
	}else
	{
		res.end("汪汪汪???");
	}
	//以上是搜索信息的可能(1.0.0)
});
server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});