// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function( className ){
  var checkAllChildren = function ( node, cb ) {
    cb( node );

    var i = 0;
    var nodeChildren = node.children;
    var childCount = nodeChildren.length;

    for ( i; i < childCount; i++ ) {
      checkAllChildren( nodeChildren[i], cb );
    }
  };

  var matchedElements = [];
  var testForClass = function( node ) {
    if ( node.classList.contains( className ) ) {
      matchedElements.push( node );
    }
  };

  checkAllChildren( document.body, testForClass );
  return matchedElements;
};

