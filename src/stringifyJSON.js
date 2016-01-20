// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function( obj ) {
  var isValidObj = function( object ) {
    var type = typeof object;
    return ( type === 'object' &&
             object !== null );
  };

  var isInvalidObj = function( object ) {
    var type = typeof object;
    return ( type === 'function' ||
             type === 'undefined' );
  };

  var isValidNonObj = function( object ) {
    var type = typeof object;
    return ( object === null ||
     ( type !== 'undefined' &&
       type !== 'function' &&
       type !== 'object' ) );
  };

  var stringer = function( obj ) {
    var result = '';
    var temp = [];
    var temp2;
    var skip;
    if ( Array.isArray(obj) ) {
      result += "[";
      obj.forEach(function(e) {
        if( isValidObj( e ) ) {
          temp.push( stringer(e) );
        } else if ( typeof e === 'string' ) {
          temp.push('"' + e + '"');
        } else {
          temp.push(String(e));
        }
      });
      result += temp.join();
      result += "]";
    } else if ( isValidObj(obj) ) {
      result += "{";
      var keys = Object.keys( obj );
      keys.forEach( function( key ) {
        temp2 = [('"' + key + '":')];
        if ( isInvalidObj( obj[key] ) ) {
          skip = true;
        } else if( isValidObj( obj[key] ) ) {
          temp2.push( stringer( obj[key] ) );
        } else if ( typeof obj[key] === 'string' ) {
          temp2.push('"' + obj[key] + '"');
        } else {
          temp2.push(String( obj[key] ));
        }
        temp.push(temp2.join(''));
      });
      result += temp.join();
      result += "}";
      if ( skip ) { result = '{}'; }
    } else if ( isValidNonObj( obj ) ) {
      if ( typeof obj === 'string' ) {
        result += '"' + obj + '"';
      } else {
        result += String( obj );
      }
    }

    return result;
  };

  return stringer( obj );
};

