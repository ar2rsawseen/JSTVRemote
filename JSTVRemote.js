/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * This library allows you to develop web apps to control your Smart TVs. 
 * Support of features depends on your TV, but it can send remote control keys 
 * to your TV, input text or control mouse cursor. Current TVs supported are:
 * Philips with JointSpace APIs, LG with WebOS, LG with NetCast
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Control-Smart-TV-from-browser
**************************************************************/
var JSTVRemote = {
	_TV:{
		getFeatures: function(){
			return {};
		},
		getKeys: function(){
			if(Object.keys)
				return Object.keys(this.keys);
			else{
				var ret = [];
				for(var i in this.keys){
					ret.push(i);
				}
				return ret;
			}
		},
		sendKey: function(key, cb){
			console.log("Functionality is not supported");
		},
		moveMouse: function(dx, dy, drag, cb){
			console.log("Functionality is not supported");
		},
		click: function(cb){
			console.log("Functionality is not supported");
		},
		scroll: function(dx, dy, cb){
			console.log("Functionality is not supported");
		},
		inputText: function(text, cb){
			console.log("Functionality is not supported");
		}
	},
	_utils:{
		request: function(url,callback,postData,headers) {
			var XMLHttpFactories = [
				function () {return new XMLHttpRequest()},
				function () {return new ActiveXObject("Msxml2.XMLHTTP")},
				function () {return new ActiveXObject("Msxml3.XMLHTTP")},
				function () {return new ActiveXObject("Microsoft.XMLHTTP")}
			];
			var req = false;
			for (var i=0;i<XMLHttpFactories.length;i++) {
				try {
					req = XMLHttpFactories[i]();
				}
				catch (e) {
					continue;
				}
				break;
			}
			if (!req) return;
			var method = (postData) ? "POST" : "GET";
			req.open(method,url,true);
			if(headers){
				for(var i in headers){
					req.setRequestHeader(i,headers[i]);
				}
			}
			if (postData)
				req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			req.onreadystatechange = function () {
				if (req.readyState != 4) return;
				if (req.status != 200 && req.status != 304) {
					//alert('HTTP error ' + req.status);
					return;
				}
				callback(req);
			}
			if (req.readyState == 4) return;
			req.send(postData);
		}
	},
	init:function(tv, ip, port, cb){
		tv = tv.toLowerCase();
		if(tv == "philips" || tv == "jointspace"){
			return new JSTVRemote.Philips(ip, port, cb);
		}
		else if(tv == "lg_netcast" || tv == "lgnetcast" || tv == "netcast"){
			return new JSTVRemote.LGNetCast(ip, port, cb);
		}
		else if(tv == "lg_webos" || tv == "lgwebos" || tv == "webos"){
			return new JSTVRemote.LGWebOS(ip, port, cb);
		}
		else{
			console.log("Unsupported TV")
		}
	}
}

//Philips using JointSpace API
//http://jointspace.sourceforge.net/
JSTVRemote.Philips = function(ip, port, cb){
	this.ip = ip;
	this.port = port || "1925";
	this.keys = {
		power: "Standby",
		back: "Back",
		search: "Find",
		red: "RedColour",
		green: "GreenColour",
		yellow: "YellowColour",
		blue: "BlueColour",
		home: "Home",
		volumeUp: "VolumeUp",
		volumeDown: "VolumeDown",
		mute: "Mute",
		menu: "Options",
		0: "Digit0",
		1: "Digit1",
		2: "Digit2",
		3: "Digit3",
		4: "Digit4",
		5: "Digit5",
		6: "Digit6",
		7: "Digit7",
		8: "Digit8",
		9: "Digit9",
		info: "Info",
		up: "CursorUp",
		down: "CursorDown",
		left: "CursorLeft",
		right: "CursorRight",
		ok: "Confirm",
		next: "Next",
		prev: "Previous",
		adjust: "Adjust",
		tv: "WatchTV",
		mode: "Viewmode",
		txt: "Teletext",
		subtitle: "Subtitle",
		channelUp: "ChannelStepUp",
		channelDown: "ChannelStepDown",
		source: "Source",
		play: "PlayPause",
		pause: "Pause",
		forward: "FastForward",
		stop: "Stop",
		rewind: "Rewind",
		record: "Record",
		internet: "Online"
	};
	if(cb)
		cb();
};
JSTVRemote.Philips.prototype = JSTVRemote._TV;
JSTVRemote.Philips.prototype.getFeatures = function(){
	return {"sendKey":true};
};
JSTVRemote.Philips.prototype.sendKey = function(key, cb){
	if(this.keys[key]){
		JSTVRemote._utils.request("http://"+this.ip+":"+this.port+"/1/input/key", cb, '{ "key": "'+this.keys[key]+'" }');
	}
	else if(cb)
		cb("Key " + key + " is not supported");
};

//LG NetCast using UDAP API
//http://developer.lgappstv.com/TV_HELP/index.jsp
JSTVRemote.LGNetCast = function(ip, port, cb){
	this.ip = ip;
	this.port = port || "8080";
	this.keys = {
		power: 1,
		back: 23,
		red: 31,
		green: 30,
		yellow: 32,
		blue: 29,
		home: 21,
		volumeUp: 24,
		volumeDown: 25,
		mute: 26,
		menu: 22,
		0: 2,
		1: 3,
		2: 4,
		3: 5,
		4: 6,
		5: 7,
		6: 8,
		7: 9,
		8: 10,
		9: 11,
		info: 45,
		up: 12,
		down: 13,
		left: 14,
		right: 15,
		ok: 20,
		next: 38,
		prev: 39,
		adjust: 46,
		tv: 43,
		mode: 405,
		txt: 51,
		subtitle: 49,
		channelUp: 27,
		channelDown: 28,
		source: 47,
		play: 33,
		pause: 34,
		forward: 36,
		stop: 35,
		rewind: 37,
		record: 40,
		internet: 417
	};
	if(cb)
		cb();
};
JSTVRemote.LGNetCast.prototype = JSTVRemote._TV;
JSTVRemote.LGNetCast.prototype.getFeatures = function(){
	return {"sendKey":true, "moveMouse":true, "click":true, "scroll":true, "inputText":true};
};
JSTVRemote.LGNetCast.prototype.sendKey = function(key, cb){
	if(this.keys[key]){
		JSTVRemote._utils.request("http://"+this.ip+":"+this.port+"/udap/api/command", cb, '<?xml version="1.0" encoding="utf-8"?><envelope><api type="command"><name>HandleKeyInput</name><value>'+this.keys[key]+'</value></api></envelope>', {"User-Agent": "UDAP/2.0"});
	}
	else if(cb)
		cb("Key " + key + " is not supported");
};
JSTVRemote.LGNetCast.prototype.moveMouse = function(dx, dy, drag, cb){
	JSTVRemote._utils.request("http://"+this.ip+":"+this.port+"/udap/api/command", cb, '<?xml version="1.0" encoding="utf-8"?><envelope><api type="command"><name>HandleTouchMove</name><x>'+dx+'</x><y>'+dy+'</y></api></envelope>', {"User-Agent": "UDAP/2.0"});
};
JSTVRemote.LGNetCast.prototype.click = function(cb){
	JSTVRemote._utils.request("http://"+this.ip+":"+this.port+"/udap/api/command", cb, '<?xml version="1.0" encoding="utf-8"?><envelope><api type="command"><name>HandleTouchClick</name></api></envelope>', {"User-Agent": "UDAP/2.0"});
};
JSTVRemote.LGNetCast.prototype.scroll = function(dx, dy, cb){
	JSTVRemote._utils.request("http://"+this.ip+":"+this.port+"/udap/api/command", cb, '<?xml version="1.0" encoding="utf-8"?><envelope><api type="command"><name>HandleTouchWheel</name><value>'+dy+'</value></api></envelope>', {"User-Agent": "UDAP/2.0"});
};
JSTVRemote.LGNetCast.prototype.inputText = function(text, cb){
	JSTVRemote._utils.request("http://"+this.ip+":"+this.port+"/udap/api/event", cb, '<?xml version="1.0" encoding="utf-8"?><envelope><api type="event"><name>TextEdited</name><state>EditEnd</state><value>'+text+'</value></api></envelope>', {"User-Agent": "UDAP/2.0"});
};

//LG WebOS using WebSockets
//http://connectsdk.com/
JSTVRemote.LGWebOS = function(ip, port, cb){
	this.ip = ip;
	this.port = port || "3000";
	this.ws = new WebSocket("ws://"+this.ip+":"+this.port+"/");
	this.requestId = 1;
	this.requests = {};
	var that = this;
	this.ws.onopen = function(event) {
		//registering
		var register = {
			type: 'register',
			payload: {
				manifest: {
					permissions: [
						"LAUNCH",
						"LAUNCH_WEBAPP",
						"APP_TO_APP",
						"CONTROL_AUDIO",
						"CONTROL_INPUT_MEDIA_PLAYBACK",
						"CONTROL_POWER",
						"READ_INSTALLED_APPS",
						"CONTROL_DISPLAY",
						"CONTROL_INPUT_JOYSTICK",
						"CONTROL_INPUT_MEDIA_RECORDING",
						"CONTROL_INPUT_TV",
						"READ_INPUT_DEVICE_LIST",
						"READ_NETWORK_STATE",
						"READ_TV_CHANNEL_LIST",
						"WRITE_NOTIFICATION_TOAST",
						"CONTROL_INPUT_TEXT",
						"CONTROL_MOUSE_AND_KEYBOARD",
						"READ_CURRENT_CHANNEL",
						"READ_RUNNING_APPS"
					]
				}
			}
		};
		if(localStorage && localStorage.getItem("client-key")){
			register.payload["client-key"] = localStorage.getItem("client-key");
		}
		that.ws.send(JSON.stringify(register));
	};
	this.ws.onmessage = function (event) {
		var message = JSON.parse(event.data);
        var request = message.id ? that.requests[message.id] : null;
        if (message.type === "response" || message.type === "error") {
            if (request) {
                if (request.callback)
                    request.callback(message.payload);
				if(that.requests[request])
					delete that.requests[request];
            }
        } else if (message.type === "registered") {
			if(localStorage && !localStorage.getItem("client-key") && message.payload["client-key"]){
				localStorage.setItem("client-key", message.payload["client-key"]);
			}
			//registering mouse
			that.sendRequest("ssap://com.webos.service.networkinput/getPointerInputSocket", null, null, function(data){
				if(data.socketPath)
					that.mouseWs = new WebSocket(data.socketPath);
				if(cb){
					cb(message.payload);
				}
			});
        }
	};
	this.keys = {
		power: function(cb){that.sendRequest("ssap://system/turnOff", null, null, cb)},
		volumeUp: function(cb){that.sendRequest("ssap://audio/volumeUp", null, null, cb)},
		volumeDown: function(cb){that.sendRequest("ssap://audio/volumeDown", null, null, cb)},
		mute: function(cb){that.sendRequest("ssap://audio/getMute", null, null, function(data){
			that.sendRequest("ssap://audio/setMute", null, {mute:!data.mute}, cb)
		})},
		channelUp: function(cb){that.sendRequest("ssap://tv/channelUp", null, null, cb)},
		channelDown: function(cb){that.sendRequest("ssap://tv/channelDown", null, null, cb)},
		play: function(cb){that.sendRequest("ssap://media.controls/play", null, null, cb)},
		stop: function(cb){that.sendRequest("ssap://media.controls/stop", null, null, cb)},
		pause: function(cb){that.sendRequest("ssap://media.controls/pause", null, null, cb)},
		rewind: function(cb){that.sendRequest("ssap://media.controls/rewind", null, null, cb)},
		forward: function(cb){that.sendRequest("ssap://media.controls/fastForward", null, null, cb)},
		home: function(cb){if(that.mouseWs)that.mouseWs.send("type:button\nname:HOME\n\n");},
		back: function(cb){if(that.mouseWs)that.mouseWs.send("type:button\nname:BACK\n\n");},
		up: function(cb){if(that.mouseWs)that.mouseWs.send("type:button\nname:UP\n\n");},
		down: function(cb){if(that.mouseWs)that.mouseWs.send("type:button\nname:DOWN\n\n");},
		left: function(cb){if(that.mouseWs)that.mouseWs.send("type:button\nname:LEFT\n\n");},
		right: function(cb){if(that.mouseWs)that.mouseWs.send("type:button\nname:RIGHT\n\n");}
	};
};
JSTVRemote.LGWebOS.prototype = JSTVRemote._TV;
JSTVRemote.LGWebOS.prototype.getFeatures = function(){
	return {"sendKey":true, "moveMouse":true, "click":true, "scroll":true, "inputText":true};
};
JSTVRemote.LGWebOS.prototype.sendRequest = function (uri, type, payload, cb) {
	var requestId = this.requestId++;
	this.ws.send(JSON.stringify({
		type: type || "request",
		id: requestId,
		uri: uri,
		payload: payload || {}
	}));

	this.requests[requestId] = {callback: cb};
};
JSTVRemote.LGWebOS.prototype.sendKey = function(key, cb){
	if(this.keys[key]){
		this.keys[key](cb);
	}
	else if(cb)
		cb("Key " + key + " is not supported");
};
JSTVRemote.LGWebOS.prototype.moveMouse = function(dx, dy, drag, cb){
	drag = (drag) ? 1 : 0;
	if(this.mouseWs)
		this.mouseWs.send("type:move\ndx:"+dx+"\ndy:"+dy+"\ndown:"+drag+"\n\n");
	else
		console.log("Could not connect as mouse");
};
JSTVRemote.LGWebOS.prototype.click = function(cb){
	if(this.mouseWs)
		this.mouseWs.send("type:click\n\n");
	else
		console.log("Could not connect as mouse");
};
JSTVRemote.LGWebOS.prototype.scroll = function(dx, dy, cb){
	if(this.mouseWs)
		this.mouseWs.send("type:scroll\ndx:"+dx+"\ndy:"+dy+"\n\n");
	else
		console.log("Could not connect as mouse");
};
JSTVRemote.LGWebOS.prototype.inputText = function(text, cb){
	this.sendRequest("ssap://com.webos.service.ime/insertText", null, {text:text, replace:0}, cb);
};