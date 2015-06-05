
// Copyright 2015  Sleepless Software Inc.  All Rights Reserved

function Nav(arg) {

	if(!Nav.ready) {
		// first time Nav() has been called ... do some init stuff
	
		// default NOP showFunc
		Nav.showFunc = function(){}

		// Utility func to convert current query string to JS object
		Nav.getData = function() {
			var o = {}
			var s = document.location.search
			if(s) {
				var kv = s.substr(1).split("&")
				for(var i = 0; i < kv.length; i++) {
					var aa = kv[i].split("=")
					o[aa[0]] = decodeURIComponent(aa[1])
				}
			}
			return o
		}

		// set initial state for the current URL
		if(history.replaceState !== undefined) {
			var state = { pageYOffset: 0, data: Nav.getData() }
			history.replaceState(state, "", document.location.href)
		}

		// wire in the pop handler
		// if there was already something there ... oh well, sorry.
		window.onpopstate = function(evt) {
			if(evt.state) {
				Nav.showFunc(evt.state.data)
				// XXX window.pageYOffset = evt.state.pageYOffset
			}
		}

		Nav.ready = true
	}

	var data = arg
	var func = Nav.showFunc
	if(typeof arg === 'function') {
		func = Nav.showFunc = arg;
		data = Nav.getData()
	}

	// build a URL with query string from current path and the contents of 'data'
	var qs = ""
	for(var k in data) {
		qs += (qs ? "&" : "?") + k + "=" + encodeURIComponent(data[k])
	}
	var url = document.location.pathname + qs

	if(history.pushState === undefined) {
		// dumb browser - just punt it
		document.location = url
		return
	}

	var state = { pageYOffset: window.pageYOffset, data: data }
	history.pushState(state, "", url)

	Nav.showFunc(data)

}

