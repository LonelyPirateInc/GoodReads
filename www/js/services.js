angular.module('starter.services', [])
.factory('$ionicGesture', [function() {
  return {    
      on: function(eventType, cb, $element, options) {
      return window.ionic.onGesture(eventType, cb, $element[0], options);
    },
        off: function(gesture, eventType, cb) {
      return window.ionic.offGesture(gesture, eventType, cb);
    }
  };
}]);