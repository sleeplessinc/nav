
// Copyright 2015  Sleepless Software Inc.  All Rights Reserved


/*
	Nav()
	Nav({...})
	Nav({...}, function(){...})
	Nav(function(){...})
*/
function Nav(data, new_show) {

	if(typeof data === "function") {
		new_show = data;
		data = null;
	}

	if(!data) {
		// no data object passed in use current query data
		var data = {}
		var a = document.location.search.split(/[?&]/)
		a.shift()
		if(a.length == 0) {
			return
		}
		a.forEach(function(kv) {
			var p = kv.split("=")
			data[p[0]] = (p.length > 1) ? decodeURIComponent(p[1]) : ""
		})
	}

	var state = { pageYOffset: 0, data: data }

	// build URL + query-string from current path and contents of 'data'
	var qs = ""
	for(var k in data) {
		qs += (qs ? "&" : "?") + k + "=" + encodeURIComponent(data[k])
	}
	var url = document.location.pathname + qs

	// if browser doesn't support pushstate, just redirect to the url
	if(history.pushState === undefined) {
		document.location = url;
		return;
	}

	if(!Nav.current_show) {
		// 1st time Nav() has been called

		// set current show func to a simple default 
		Nav.current_show = function(data) {
			if(data["page"] !== undefined) {
				// hide all elements with class "page" by setting css display to "none"
				var pages = document.getElementsByClassName('page')
				for(var i = 0; i < pages.length; i++ ) {
					pages[ i ].style.display = "none";
				}
				// jump to top of document
				document.body.scrollIntoView()
				// show the new page by etting it's css display to ""
				var p = document.getElementById( "page_"+data.page ).style.display = "inherit"
			}
		}

		if(history.replaceState !== undefined) {
			// set state for the current/initial location
			history.replaceState(state, "", url)
			// wire in the pop handler
			window.onpopstate = function(evt) {
				if(evt.state) {
					var data = evt.state
					Nav.current_show(evt.state.data)
					// XXX window.pageYOffset = evt.state.pageYOffset
				}
			}
		}
	}
	else {
		// this is 2nd or later call to Nav()
		state.pageYOffset = window.pageYOffset;
		history.pushState(state, "", url);
	}

	// if new show func supplied, start using that one
	if(new_show) {
		Nav.current_show = new_show
	}

	Nav.current_show(data)
}

