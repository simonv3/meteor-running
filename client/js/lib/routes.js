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
    console.log('currentUser', $rootScope.currentUser);
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
      .state('admin', {
        url: '/admin',
        templateUrl: 'meteor-running_client/js/admin/views/admin.ng.html',
        controller: 'AdminCtrl',
        resolve: {
          'currentUser': ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
              if (user.is_admin) return true;
              return 'UNAUTHORIZED';
            });
          }]
        }
      })
      .state('setup', {
        url: '/setup',
        templateUrl: 'meteor-running_client/js/admin/views/setup.ng.html',
        controller: 'SetupCtrl',
        controllerAs: 'sc',
        resolve: {
          // 'currentUser': ['$meteor', function($meteor) {
          //   return $meteor.waitForUser();
          // }],
          'checkAdmin': ['$meteor', '$state', '$q', '$rootScope',
            function($meteor, $state, $q, $rootScope) {
              return $q(function(resolve, reject) {
                $q.all([
                  $meteor.subscribe('sites'),
                  $meteor.subscribe('users')
                ])
                .then(function() {
                  var site = $meteor.collection(Sites, false)[0]
                  var numOfAdmin = $meteor.object(Counts ,'numberOfAdmin', false);

                  if (numOfAdmin.count !== 0 && site.has_been_set_up === true) {
                    reject('SET_UP_COMPLETE');
                  } else if (numOfAdmin.count !== 0) {
                    reject('UNAUTHORIZED');
                  } else {
                    resolve();
                  }
                });
              });
          }]
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'meteor-running_client/js/users/views/login.ng.html',
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
        templateUrl: 'meteor-running_client/js/users/views/register.ng.html',
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
        templateUrl: 'meteor-running_client/js/users/views/register-success.ng.html',
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
        templateUrl: 'meteor-running_client/js/users/views/reset-password-email-sent.ng.html',
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
        templateUrl: 'meteor-running_client/js/users/views/reset-password.ng.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'rpc'
      })
      .state('reset-password-with-token', {
        url: '/reset-password/:token',
        templateUrl: 'meteor-running_client/js/users/views/reset-password.ng.html',
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
