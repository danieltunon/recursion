// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function( obj ) {
  var getType = function ( object ) {
    var type = typeof object;
    if ( Array.isArray( object ) ) {
      return 'array';
    } else if ( object !== null &&
                type   === 'object' ) {
      return 'object';
    } else if ( type === 'string' ) {
      return type;
    } else if ( type   !== 'undefined' &&
                type   !== 'function' ) {
      return 'simpleObj';
    } else {
      return 'invalid';
    }
  };

  var quotify = function ( string ) {
    return '"' + string + '"';
  };

  var stringmogrify = function( obj ) {
    var type = getType( obj );
    var isValid = ( type !== 'invalid' );
    var jsonString = '';
    var commaSeparator = [];
    var objectBuilder = '';
    var valType;

    if ( type === 'array' ) {
      obj.forEach( function( value ) {
        valType = getType( value );

        if ( valType === 'invalid' ) {
          // skip it
        } else if ( valType === 'string' ) {
          commaSeparator.push( quotify(value) );
        } else if ( valType === 'simpleObj' ) {
          commaSeparator.push( String( value ) );
        } else {
          commaSeparator.push( stringmogrify( value ) );
        }
      } );
      jsonString += "[" + commaSeparator.join() + "]";
    } else if ( type === 'object' ) {
      var keys = Object.keys( obj );

      keys.forEach( function( key ) {
        valType = getType( obj[key] );
        objectBuilder = quotify( key ) + ":";
        if ( valType === 'invalid' ) {
          // lets function skip it
          objectBuilder = '';
        } else if ( valType === 'string' ) {
          objectBuilder += quotify( obj[key] );
        } else if ( valType === 'simpleObj' ) {
          objectBuilder += String( obj[key] );
        } else {
          objectBuilder += stringmogrify( obj[key] );
        }
        commaSeparator.push( objectBuilder );
      } );
      jsonString += "{" + commaSeparator.join() + "}";
    } else if ( type === 'string' ) {
      jsonString += quotify( obj );
    } else if ( type === 'simpleObj' ){
      jsonString += String( obj );
    }

    return jsonString;
  };

  return stringmogrify( obj );
};


stringifyJSON([]);
