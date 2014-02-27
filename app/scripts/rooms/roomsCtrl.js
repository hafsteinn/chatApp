'use strict';

angular.module('wepoApp').controller('roomsCtrl',
  ['$scope', '$http', '$routeParams','$location', 'chatBackend','socket',
  function ( $scope, $http, $routeParams,$location, chatBackend,socket) {

    if(chatBackend.getCurrentUser() === undefined)
    {
      $location.path('/main/').replace();
      return;
    }

    //ask server to bring list of currently active chat rooms
    chatBackend.getRoomList();

    //listen for server to send list of currently active chatrooms
    socket.on('roomlist', function(data){
      $scope.rooms = data;
    });

    $scope.createRoom = function(){
      //create the room
      chatBackend.enterRoom($scope.nameOfRoom);
      //set a topic for the room
      chatBackend.setTopic($scope.nameOfRoom, $scope.topic);
      //routing
      var url = '/rooms/' + $scope.nameOfRoom;
      $location.path(url).replace();
    };

  }]);