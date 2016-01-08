angular.module('meteor-running')
  .directive('mrAccountButtons', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: true,
      link: function ($scope) {
        $scope.state = $state;
      },
      templateUrl: '/packages/simonv3:meteor-running/client/js/directives/account-buttons.html',
    };
  });
