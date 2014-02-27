var b = ( function() {

	//Exceptions
	function InvalidArgumentException () {
   		this.message = ': Illegal Type Of Argument Passed To The Function';
   		this.name = 'IllegalArgumentException';
   		this.toString = function(){ return this.name + this.message; };
	}

	function MissingArgumentException () {
   		this.message = ': One Of The Arguments Is Missing';
   		this.name = 'IllegalArgumentException';
   		this.toString = function(){ return this.name + this.message; };
	}

	//Holder of the event subscriptions
	var events = {};

	//Subscribe for a custom event
	function on ( event, handler ) {
		if ( typeof event !== 'string' || typeof handler !== 'function' ){
			throw new InvalidArgumentException();
		}
		if ( !event ){
			throw new MissingArgumentException();
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
			throw new MissingArgumentException();
		}
		if ( events[event] ) {
			events[event].forEach( function( handler ) {
				handler();
			} );
		}
	}

	//Add covenient and short method for adding events
	HTMLElement.prototype.on = function ( event, handler ) {
		this.addEventListener( event, handler, false );
	}
	HTMLDocument.prototype.on = HTMLElement.prototype.on;

	return{
		on: on,
		emit: emit
	}

} )();