angular.module('meteor-running').directive('mrLogIn', function () {
  return {
    restrict: 'A',
    scope: {
      // TODO
    },
    controller: function ($scope) {
      console.log('loaded');
    },
    templateUrl: 'meteor-running_client/js/directives/log-in.ng.html',
  };
});
