// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function( obj ) {
  var valid = o => o !== undefined && typeof o !== 'function';

  if ( ! valid( obj ) ) {
    return undefined;
  } else if ( typeof obj === 'string' ) {
    return '"' + obj + '"';
  } else if ( obj === null || typeof obj !== 'object' ) {
    return String( obj );
  } else if ( Array.isArray( obj ) ) {
    return "[" + obj.map( v => stringifyJSON( v ) ) + "]";
  } else {
    var keys = Object.keys(obj);
    return "{" + keys.filter( k => valid( obj[k] ) ).map(
      k => '"' + k + '":' + stringifyJSON( obj[k] ) ) + "}";
  }
};
