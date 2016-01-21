// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function( obj ) {
  var commaSeparator = [];

  if ( obj === undefined || typeof obj === 'function' ) {
    return undefined;
  } else if ( typeof obj === 'string' ) {
    return '"' + obj + '"';
  } else if ( obj === null || typeof obj !== 'object' ) {
    return String( obj );
  } else if ( Array.isArray( obj ) ) {
    obj.forEach( function(value) {
      commaSeparator.push( stringifyJSON( value ) );
    });
    return "[" + commaSeparator.join() + "]";
  } else {
    var keys = Object.keys(obj);
    keys.forEach( function(key) {
      if ( obj[key] !== undefined && typeof obj[key] !== 'function' ) {
        commaSeparator.push( '"' + key + '":' + stringifyJSON( obj[key] ) );
      }
    });
    return "{" + commaSeparator.join() + "}";
  }

};
