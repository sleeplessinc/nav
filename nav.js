
// Copyright 2012  Sleepless Software Inc.  All Rights Reserved

function Nav(func, data) {
	this.show = func
	var loc = document.location
	var state = {
		pageYOffset: 0,
		data: data
	}
	history.replaceState(state, "", loc.pathname + loc.search)
	window.onpopstate = this.pop
}
Nav.prototype = {
	push: function(data) {
		var qs = ""
		for(var k in data) {
			qs += (qs ? "&" : "?") + k + "=" + encodeURIComponent(data[k])
		}
		var url = document.location.pathname+qs
		if(history.pushState === undefined) {
			document.location = url
		}
		else {
			var state = {
				pageYOffset: window.pageYOffset,
				data: data
			}
			history.pushState(state, "", url)
			this.show(data)
		}
	},
	pop: function(evt) {
		if(evt.state) {
			var data = evt.state
			this.show(evt.state.data)
			// XXX window.pageYOffset = evt.state.pageYOffset
		}
	},
	show: function(data) {
	}
}

