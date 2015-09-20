angular.module('meteor-running')
  .directive('mrAccountButtons', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: true,
      link: function ($scope) {
        $scope.state = $state;
      },
      templateUrl: 'simonv3_meteor-running_client/js/directives/account-buttons.ng.html',
    };
  });
