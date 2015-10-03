angular.module('meteor-running')
  .directive('mrLogInForm', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: {},
      link: function($scope, $state) {


        $scope.credentials = {
          email: '',
          password: ''
        };

        $scope.error = '';

        $scope.sendEmailVerification = function() {
          Meteor.call('resendVerificationEmail', $scope.credentials.email);
        };

        $scope.login = function () {
          $meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password).then(
            function () {
              $state.go('index');
            },
            function (err) {
              $scope.error = err;
            }
          );
        };
      },
      templateUrl: 'simonv3_meteor-running_client/js/users/login-form.ng.html',
    };
  });
