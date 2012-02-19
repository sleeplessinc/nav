
// Copyright 2012  Sleepless Software Inc.  All Rights Reserved

function Nav(data, func) {

	// build a URL with query string from current path and the contents of 'data'
	var qs = ""
	for(var k in data) {
		qs += (qs ? "&" : "?") + k + "=" + encodeURIComponent(data[k])
	}
	var url = document.location.pathname + qs

	var state = { pageYOffset: 0, data: data }

	if(!Nav.show) {
		// first time through 
		Nav.show = func || function(){}
		var doc = document
		if(history.replaceState !== undefined) {
			// set state for the current/initial location
			history.replaceState(state, "", doc.location.pathname + doc.location.search)
			// wire in the pop handler
			window.onpopstate = function(evt) {
				if(evt.state) {
					var data = evt.state
					Nav.show(evt.state.data)
					// XXX window.pageYOffset = evt.state.pageYOffset
				}
			}
		}
	}
	else {
		if(history.pushState === undefined) {
			// dumb browser - just punt it
			document.location = url
			return
		}
		state.pageYOffset = window.pageYOffset
		history.pushState(state, "", url)
	}

	if(func)
		Nav.show = func
	Nav.show(data)

}

