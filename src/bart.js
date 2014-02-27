var b = ( function() {

	var events = {};

	//Subscribe for a custom event
	function on ( event, handler ) {
		if ( !events[event] ) {
			events[event] = [];
		}
		events[event].push( handler );
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