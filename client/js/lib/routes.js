angular.module('meteor-running').run(['$rootScope', '$state',
  function($rootScope, $state) {

  Meteor.subscribe("userData");

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    console.log('state change error', error);
    // We can catch the error thrown when the $requireUser promise is rejected

    // and redirect the user back to the main page
    if (error === 'UNAUTHORIZED' ||
        error === 'AUTH_REQUIRED' ||
        error === 'ALREADY_LOGGED_IN') {
      $state.go('index');
    }

  });

  $rootScope.$watch('currentUser', function() {
    if (!$rootScope.loggingIn && $rootScope.currentUser === null) {
      $state.go('index');
    }
  });

}]);

angular.module('meteor-running').config([
  '$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'simonv3_meteor-running_client/js/users/views/login.ng.html',
        controller: 'LoginCtrl',
        controllerAs: 'lc',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('register',{
        url: '/register',
        templateUrl: 'simonv3_meteor-running_client/js/users/views/register.ng.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rc',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('register-success', {
        url: '/register/success',
        templateUrl: 'simonv3_meteor-running_client/js/users/views/register-success.ng.html',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('reset-password-sent', {
        url: '/reset-password-sent',
        templateUrl: 'simonv3_meteor-running_client/js/users/views/reset-password-email-sent.ng.html',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('reset-password', {
        url: '/reset-password',
        templateUrl: 'simonv3_meteor-running_client/js/users/views/reset-password.ng.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'rpc'
      })
      .state('reset-password-with-token', {
        url: '/reset-password/:token',
        templateUrl: 'simonv3_meteor-running_client/js/users/views/reset-password.ng.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'rpc'
      })
      .state('logout', {
        url: '/logout',
        resolve: {
          "logout": ['$meteor', '$state', function($meteor, $state) {
            return $meteor.logout().then(function(){
              $state.go('index');
            }, function(err){
              console.log('logout error - ', err);
            });
          }]
        }
      });

    $urlRouterProvider.otherwise("/");
  }]);
