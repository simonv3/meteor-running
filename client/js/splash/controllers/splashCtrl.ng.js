
angular.module('meteor-running').controller('SplashCtrl',
  function ($scope, $meteor, $state, $rootScope, $q) {
    $scope.loaded = false;

    // $q.all([
    //   $scope.$meteorSubscribe('users'),
    //   $scope.$meteorSubscribe('sites'),
    //   ])
    // .then(function(responses) {
    //   $scope.loaded = true;

    //   var site = $meteor.object(Sites, {has_been_set_up: true}, false);

    //   // if (site.has_been_set_up === undefined &&
    //   //   !$rootScope.currentUser &&
    //   //   !$rootScope.loggingIn) {
    //   //   $state.go('setup');
    //   // }
    // });

});
