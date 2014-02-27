
'use strict';

angular.module('wepoApp').provider('chatBackend',

function(){
  var currentUser;
  var manipUser;

  return{
    configFunc: function(){
    },
    $get: ['socket', '$q', function(socket,$q){
      return {
        addUser: function(userName){
          var deferred = $q.defer();
          socket.emit('adduser', userName, function(available){
            deferred.resolve(available);
          });
          return deferred.promise;
        },
        getRoomList: function(){
          var deferred = $q.defer();
          socket.emit('rooms');
          return deferred.promise;
        },
        //Create a new chat room or join an existing one
        enterRoom: function(roomName){
          var deferred = $q.defer();
          socket.emit('joinroom', {room: roomName, pass: ''}, function(success, reason){
            if(success)
            {
              console.log('successfully created a new chat room.');
            }
            else
            {
              console.log(reason);
            }
          });
          return deferred.promise;
        },
        //Send a message to a chat room
        chatMessage: function(roomName,message){
          var deferred = $q.defer();
          socket.emit('sendmsg', {roomName: roomName, msg: message});
          return deferred.promise;
        },
        //set a topic for a chatroom
        setTopic: function(roomName, topic){
          var deferred = $q.defer();
          socket.emit('settopic', {room: roomName, topic: topic}, function(success, reason){
            if(success)
            {
              console.log('successfully set a topic for the room');
            }
            else
            {
              console.log(reason);
            }
          });
          return deferred.promise;
        },
        //send a private message to another user
        privateMessage: function(userName, privMessage){
          var deferred = $q.defer();
          socket.emit('privatemsg', {nick: userName, message: privMessage}, function(success){
            if(success)
            {
              console.log('Private message successfully sent.');
            }
            else
            {
              console.log('Unable to send private message!');
            }
          });
          return deferred.promise;
        },
        setCurrentUser: function(user){
          currentUser = user;
        },
        getCurrentUser: function(){
          return currentUser;
        },
        setManipUser: function(userM){
          manipUser = userM;
        },
        getManipUser: function(){
          return manipUser;
        },
        //leave the current chatroom (removes the user from the users list inside the chatroom)
        partRoom: function(room){
          var deferred = $q.defer();
          socket.emit('partroom', room);
          return deferred.promise;
        },
        //ban a user
        banUser: function(userName, roomName){
          var deferred = $q.defer();
          socket.emit('ban', {user: userName, room: roomName}, function(success){
            if(success)
            {
              console.log(userName + ' was successfully banned');
            }
            else
            {
              console.log('Unable to ban user: ' + userName);
            }
          });
          return deferred.promise;
        },
        //kick a user
        kickUser: function(userName, roomName){
          var deferred = $q.defer();
          socket.emit('kick', {user: userName, room: roomName}, function(success){
            if(success)
            {
              console.log(userName + ' was successfully kicked out of the chatroom');
            }
            else
            {
              console.log('Unable to kick user: ' + userName);
            }
          });
          return deferred.promise;
        }
        //TODO: henda inn rest af server dóti
      };
    }]
  };
});