/*
 *	Netease CloudMusic API Private Encrypt Function
 *  
 *  Thanks TO:
 *  | Project              | URL                                              |
 *  | -------------------- | ------------------------------------------------ |
 *  | musicbox             | https://github.com/darknessomi/musicbox          |
 *  | NeteaseCloudMusicApi | https://github.com/metowolf/NeteaseCloudMusicApi |
 *  
 *  Author: Corps
 *  E-Mail: zsq01@live.com
 *  URL   : https://corps.set-fire.com
 *  
 *  Thanks for your Using!
 *  
*/
const crypto = require("crypto");
const Bigint = require("big-integer");
const http = require("http");
const url = require("url");
const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
const nonce = '0CoJUm6Qyw8W8jud';
const pubKey = '010001';

String.prototype.fillZero = function(num){
	let arr = this.split("").reverse();
	for(let i = arr.length;i<num;i++)arr[i]="0";
	return arr.reverse().join("");
};
let shuffle = function(arr) {
    for(let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

let core = {};
let createSecretKey = (size)=>{
	let str = Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
	str = shuffle(str).join("");
	return str.substring(0,size);
};
let aesEncrypt = (text,secKey)=>{
	let encryptor = crypto.createCipheriv("aes-128-cbc",new Buffer(secKey),new Buffer('0102030405060708'));
	encryptor.setAutoPadding(true);
	let crypted = [encryptor.update(text,"utf8","base64"),encryptor.final("base64")].join("");
	return crypted;
}
let rsaEncrypt = (text)=>{
	text = text.split("").reverse().join("");//反转字符串
	let textHex = new Buffer(text).toString("hex");
	let tb = Bigint(textHex,16);
	let pk = Bigint(pubKey,16);
	let md = Bigint(modulus,16);
	let rs = tb.modPow(pk,md).toString(16);
	let result = rs.fillZero(256);
	return result;
}
let encode = (json)=>{
	json = JSON.stringify(json);
	let secKey = createSecretKey(16); 
	let encSecKey = rsaEncrypt(secKey);
	let encText = aesEncrypt(json,nonce);
		encText = aesEncrypt(encText,secKey);
	let data = {"params":encText,"encSecKey":encSecKey};
	return data;
}
core.post = (urls,data,callback) =>{
	data = encode(data);
	data = require('querystring').stringify(data);

	let urlObject = url.parse(urls);
	let options = {
		hostname: urlObject.hostname,
		path	: urlObject.path,
		method	: "POST",
		headers	: {
			"Host"			:"music.163.com",
			"User-Agent"	:"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Safari/537.36",
			"Accept"		:"*/*",
			"Referer"		:"http://music.163.com/",
			"Cookie"		:"os=pc; osver=Microsoft-Windows-10-Professional-build-10586-64bit; appver=2.0.3.131777; channel=netease; __remember_me=true",
			"Content-Length":data.length,
			"Content-Type"	:"application/x-www-form-urlencoded",
			"Connection"	:"close"
		}
	};
	let request = http.request(options,function(res){
		//console.dir(res);
		if(res.statusCode === 404) {throw new Error("File not Found!!!");return;};
		if(res.statusCode === 403) {throw new Error("Connection Refused.");return;};
		res.setEncoding("utf8");
		let d = [];
		res.on("data",(chunk)=>{
			d.push(chunk);
		});
		res.on("end",()=>{
			callback(JSON.parse(d.join("")));
		})
	});
	request.on("error",(err)=>{console.log(JSON.stringify(err))});
	request.write(data);
	request.end();
};

module.exports = core;