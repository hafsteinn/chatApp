'use strict';



angular.module('wepoApp').controller('chatRoomCtrl',
  ['$scope', '$http', '$location', '$routeParams','chatBackend','socket',
  function ($scope, $http, $location, $routeParams,chatBackend,socket) {

    if(chatBackend.getCurrentUser() === undefined)
    {
      $location.path('/main/').replace();
      return;
    }


    $scope.currentRoom = $routeParams.roomID;

    //join room
    chatBackend.enterRoom($scope.currentRoom);

    //will update the user's list for all clients in the current chatroom
    socket.on('updateusers', function(room,users){
      $scope.users = users;
    });

    //will bring a user who just joined the chat, the full message history
    socket.on('updatechat', function(room, allMessages) {
      $scope.messages = allMessages;
    });

    //update the topic for the current room
    socket.on('updatetopic', function(room, topic){
      $scope.topic = topic;
    });

    //listen for a 'private message received' event
    socket.on('recv_privatemsg', function(user, message){
        $scope.sendPrivateFrom = user;
        $scope.privateMessage = message;
        $('#privateEnvelope').show();
      });




    //send a message to the chatboard
    $scope.sendMessage = function(){
      //update message history for this chatroom (server side)
      chatBackend.chatMessage($scope.currentRoom, $scope.newMessage);
      //clear the input field
      $scope.newMessage = '';
    };

    $scope.closeMsg = function(){
      $('#privateMsgPanel').hide();
      $('#privateMessage').hide();
    };

    //send a private message to some user
    $scope.privateMsg = function(userName,msgText){
      chatBackend.privateMessage(userName, msgText);
      $scope.closeMsg();
      $('#privateMessage').hide();
    };

    $scope.showPrivateMessagePanel = function(userName){
      $scope.sendPrivateTo = userName;
      $('#privateMsgPanel').show();
    };

    $scope.showPrivateMessage = function(){
      $('#privateMessage').show();
      $('#privateEnvelope').hide();
    };

    $scope.settings = function(userName){
      chatBackend.setManipUser(userName);
      $('#settings').show();
    };

    $scope.banUser = function(){
      chatBackend.banUser(chatBackend.getManipUser(), $scope.currentRoom);
      $('#settings').hide();
    };

    $scope.kickUser = function(){
      chatBackend.kickUser(chatBackend.getManipUser(), $scope.currentRoom);
      var kickMessage = '***  ' + chatBackend.getManipUser() + ' was just kicked out of the room ***';
      chatBackend.chatMessage($scope.currentRoom, kickMessage);
      $('#settings').hide();
    };

    $scope.banUser = function(){
      chatBackend.banUser(chatBackend.getManipUser(), $scope.currentRoom);
      var banMessage = '***  ' + chatBackend.getManipUser() + ' has been banned ***';
      chatBackend.chatMessage($scope.currentRoom, banMessage);
      $('#settings').hide();
    };

    $scope.closeSettings = function(){
      $('#settings').hide();
    };

    //we want to know when the user leaves a chatroom.
    $scope.$on('$destroy', function(){
        chatBackend.partRoom($scope.currentRoom);
      });


  }]);