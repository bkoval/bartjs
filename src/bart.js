var b = ( function() {

	//Exceptions
	function InvalidArgumentException() {
   		this.message = 'Illegal Type Of Argument Passed To The Function';
   		this.name = "IllegalArgumentException";
	}

	//Holder of the event subscriptions
	var events = {};

	//Subscribe for a custom event
	function on ( event, handler ) {
		if( typeof event !== 'string' || typeof handler !== 'function' ){
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
		if ( events[event] ) {
			events[event].forEach( function( handler ) {
				handler();
			} );
		}
	}

	//Add covenient and short method for adding events
	HTMLElement.prototype.on ( event, handler ) {
		this.addEventListener( event, handler, false );
	}

	return{
		on: on,
		emit: emit
	}

} )();