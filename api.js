const core = require("./lib/core.lib");
let API = {};
API.search = (name,callback,{limit="5",type="1"}={})=>{
	if(typeof limit == "number")limit = limit.toString();
	if(typeof type  == "number")type  = type.toString();
	if(!name) {throw new Error("Name not Found!!!");return;};
	const form = {
		s			:name,
		limit,
		total		:true,
		type,
		csrf_token	:"",
		offset		:"0"
	};
	core.post("http://music.163.com/weapi/cloudsearch/get/web?csrf_token=",form,(data)=>callback(data));
};
API.getAlbum = (id,callback)=>{
	if(id == 0)  throw new Error("叽叽叽???");
	if(typeof id == "number") id = id.toString();
	const form = {
		album_id	:id,
		csrf_token	:""
	};
	core.post("http://music.163.com/weapi/v1/album/"+ id +"?csrf_token=",form,(data)=>callback(data));
};
API.getDetail = (id,callback)=>{
	let isArr = false;
	if(id == 0)  throw new Error("叽叽叽???");
	if(typeof id == "number"){
		id = id.toString();
	}else if(Array.isArray(id)){
		id = JSON.stringify(id);
		isArr = true;
	}
	const form = {
		ids			:id,
		csrf_token	:""
	};
	core.post("http://music.163.com/weapi/v1/song/detail",form,(data)=>callback(data,isArr));
};
API.getPlaylist = (id,callback)=>{
	if(id == 0) throw new Error("叽叽叽???");
	const form = {
		id,
		n			:"1000",
		csrf_token	:""
	};
	core.post("http://music.163.com/weapi/v3/playlist/detail?csrf_token=",form,(data)=>callback(data));
}
API.getURL = (id,callback,br = "320000")=>{
	if(id == 0) throw new Error("喵喵喵???");
	if(typeof id == "number"){
		id = "["+id+"]";
	}else if(Array.isArray(id)){
		id = JSON.stringify(id);
	}else if(id.substring(0,1)!=="["){
		id = "["+id+"]";
	}
	if(typeof br == "number") br = br.toString();
	const form = {
		ids			:id,
		br,
		csrf_token	:""
	};
	core.post("http://music.163.com/weapi/song/enhance/player/url?csrf_token=",form,(data)=>callback(data));
}
API.getLyric = (id,callback)=>{
	if(id == 0) throw new Error("哞哞哞???");
	const form = {
		id,
		os				:"pc",
		lv				:"-1",
		kv				:"-1",
		tv				:"-1",
		csrf_token		:""
	};
	core.post("http://music.163.com/weapi/song/lyric?csrf_token=",form,data=>callback(data));
}
API.getMV = (id,callback)=>{
	if(id == 0) throw new Error("WTF???");
	const form = {
		id,
		csrf_token:""
	}
	core.post("http://music.163.com/weapi/mv/detail/",form,(data)=>callback(data));
}
module.exports = API;