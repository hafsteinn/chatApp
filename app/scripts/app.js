'use strict';

angular.module('wepoApp', ['ng', 'ngRoute','luegg.directives']).config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main/main.html',
        controller: 'mainCtrl'
      })
      .when('/rooms', {
        templateUrl: 'views/rooms/rooms.html',
        controller: 'roomsCtrl'
      })
      .when('/rooms/:roomID', {
        templateUrl: 'views/chatRoom/chatRoom.html',
        controller: 'chatRoomCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });