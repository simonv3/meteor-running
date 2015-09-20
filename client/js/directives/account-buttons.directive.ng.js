angular.module('meteor-running')
  .directive('mrAccountButtons', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: true,
      link: function ($scope) {
        $scope.state = $state;
      },
      templateUrl: 'meteor-running_client/js/directives/account-buttons.ng.html',
    };
  });
