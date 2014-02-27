var b = ( function(){

	var events = {};

	function subscribe ( event, handler ) {
		if ( !events[event] ) {
			events[event] = [];
		}
		events[event].push( handler );
	}

	function publish ( event ) {
		if ( events[event] ) {
			events[event].forEach( function( handler ) {
				handler();
			} );
		}
	}

	return{
		publish: publish,
		subscribe: subscribe
	}

} )();