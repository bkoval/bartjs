var b = ( function( w, d ) {

	//Holder of the event subscriptions
	var events = {};

	//Exceptions
	function InvalidArgumentException () {
   		this.message = ': Empty Or Illegal Argument Passed To The Function';
   		this.name = 'IllegalArgument';
   		this.toString = function(){ return this.name + this.message; };
	}

	//Subscribe for a custom event
	function on ( event, handler ) {
		if ( typeof event !== 'string' || !event || typeof handler !== 'function' ){
			throw new InvalidArgumentException();
		}

		if ( !events[event] ) {
			events[event] = [];
		}
		if ( typeof handler === 'function' ) {
			events[event].push( handler );
		}
	}

	//Emit a custom event to all subscribers
	function emit ( event ) {
		if ( !event ){
			throw new InvalidArgumentException();
		}
		if ( events[event] ) {
			events[event].forEach( function( handler ) {
				handler();
			} );
		}
	}

	//Short method for adding events
	HTMLElement.prototype.on = function ( event, handler ) {
		this.addEventListener( event, handler, false );
	}

	HTMLDocument.prototype.on = HTMLElement.prototype.on;

	//Shortcuts for selectors API
	find = d.querySelector;
	findAll = d.querySelectorAll;
	findId = d.getElementById;
	findClass = d.getElementsByClassName;
	findTag = d.getElementsByTagName;

	return{
		on : on,
		emit : emit,
		find : find,
		findAll : findAll,
		findId : findId,
		findClass : findClass,
		findTag : findTag
	}

} )( window, document );