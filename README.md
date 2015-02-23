<h1>JSTVRemote</h1>
<h2>Control your Smart TV from your browser</h2>

This library allows you to develop web apps to control your Smart TVs.
Support of features depends on your TV, but it can send remote control keys to your TV, input text or control mouse cursor.

Current TVs supported are:
<ul>
<li>Philips with JointSpace APIs</li>
<li>LG with WebOS</li>
<li>LG with NetCast</li>
</ul>

<h2>Official page</h2>
<a href='http://webcodingeasy.com/JS-classes/Control-Smart-TV-from-browser' target="_blank">WebCodingEas.com - Control Smart TV from browser</a>

<h2>Usage</h2>

<h3>Initialization</h3>
    var tv = JSTVRemote.init(tv, ip, port, callback); 
providing tv as values like "philips", "lg_netcast", "lg_webos"
or directly initializing

    var tv = new JSTVRemote.Philips(ip, port, callback);
    var tv = new JSTVRemote.LGNetCast(ip, port, callback);
    var tv = new JSTVRemote.LGWebOS(ip, port, callback);

<h3>Feature query</h3>
Each tv instance can have different features.

    var features = tv.getFeatures(); 
returns features that API supports

    var keys = tv.getKeys(); 
returns keys that API supports sending as TV remote control

<h3>Sending key as remote control</h3>
    tv.sendKey(key, callback);

<h3>Input text</h3>
    tv.inputText(text, callback);

<h3>Mouse move</h3>
    tv.mouseMove(dx, dy, drag, callback);
    
<h3>Mouse click</h3>
    tv.click(callback);
    
<h3>Scroll</h3>
    tv.scroll(dx, dy, callback);
