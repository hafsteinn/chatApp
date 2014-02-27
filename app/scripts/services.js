'use strict';
/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('wepoApp').factory('socket',
  ['$rootScope',
  function ($rootScope) {

  //TODO: Breyta þessu í angular constant í app.js og injecta hingað
  var socket = io.connect('http://localhost:8080');

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);