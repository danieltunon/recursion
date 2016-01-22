// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function( className ){
  var matchedElements = [];

  var matchNodeWithClass = function( node ) {
    if ( node.classList.contains( className ) ) {
      matchedElements.push( node );
    }
    Array.prototype.forEach.call(node.children, matchNodeWithClass );
  };

  matchNodeWithClass( document.body );
  return matchedElements;
};
