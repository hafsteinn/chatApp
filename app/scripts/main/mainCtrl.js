'use strict';

angular.module('wepoApp').controller('mainCtrl',
  ['$scope', '$http', '$location','chatBackend',
  function ($scope, $http,$location, chatBackend) {

  $scope.submit = function(){
    chatBackend.addUser($scope.nickName).then(function(available){
      if(available){
        chatBackend.setCurrentUser($scope.nickName);
        //change url to end with /rooms
        $location.path('/rooms').replace();
      }
      else {
        console.log('nick not available');
      }
    });
  };

}]);