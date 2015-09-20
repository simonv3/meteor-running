angular.module('meteor-running').controller("ResetPasswordCtrl",
  function ($meteor, $state, $stateParams) {

    var vm = this;

    vm.token = $stateParams.token;

    vm.credentials = {
      email: ''
    };

    vm.newPassword = '';

    vm.error = '';

    vm.reset = function () {
      $meteor.forgotPassword(vm.credentials).then(
        function () {
          $state.go('reset-password-sent');
        },
        function (err) {
          vm.error = err;
        }
      );
    };

    vm.setNewPassword = function () {
      $meteor.resetPassword(vm.token, vm.newPassword).then(
        function() {
          $state.go('login');
        },
        function (err) {
          vm.error = err;
        });
    };
  }
);

