angular.module('meteor-running')
  .directive('mrResetPassword', function ($state, $stateParams, $rootScope, $meteor) {
    return {
      restrict: 'A',
      scope: {},
      link: function($scope) {

        $scope.token = $stateParams.token;

        $scope.credentials = {
          email: ''
        };

        $scope.newPassword = '';

        $scope.error = '';

        $scope.reset = function () {
          $meteor.forgotPassword($scope.credentials).then(
            function () {
              $state.go('reset-password-sent');
            },
            function (err) {
              $scope.error = err;
            }
          );
        };

        $scope.setNewPassword = function () {
          $meteor.resetPassword($scope.token, $scope.newPassword).then(
            function() {
              $state.go('login');
            },
            function (err) {
              $scope.error = err;
            });
        };
      },
      templateUrl: 'simonv3_meteor-running_client/js/users/directives/reset-password-form.ng.html',
    };
  });
