Package.describe({
  name: "simonv3:meteor-running",
  summary: "Add sensible authentication patterns and an admin panel to your app.",
  version: "0.2.3",
  git: "https://github.com/simonv3/meteor-running.git"
});

Package.on_use(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('accounts-password@1.1.1');
  api.use('email@1.0.6', 'server');
  api.use('mongo@1.1.0', ['client', 'server']);

  api.use('angular@1.3.2', 'client');

  api.use('simonv3:meteor-running-models@0.0.2', ['client', 'server']);
  api.use('simonv3:meteor-running-admin@0.2.3', 'client');

  api.addFiles('meteor-running.js', 'client');

  var clientFiles = [
    'client/config/accounts.js',
    'client/js/directives/account-buttons.directive.js',
    'client/js/directives/account-buttons.html',
    'client/js/filters/displayName.js',
    'client/js/lib/routes.js',
    'client/js/navbar/navBarCtrl.ng.js',
    'client/js/splash/controllers/splashCtrl.ng.js',
    'client/js/splash/views/splash.ng.html',
    'client/js/users/controllers/loginCtrl.ng.js',
    'client/js/users/controllers/registerCtrl.ng.js',
    'client/js/users/controllers/resetPasswordCtrl.ng.js',
    'client/js/users/directives/log-in-form.ng.html',
    'client/js/users/directives/log-in-form.directive.ng.js',
    'client/js/users/directives/reset-password-form.ng.html',
    'client/js/users/directives/reset-password-form.directive.ng.js',
    'client/js/users/directives/register-form.ng.html',
    'client/js/users/directives/register-form.directive.ng.js',
    'client/js/users/views/login.ng.html',
    'client/js/users/views/register-success.ng.html',
    'client/js/users/views/register.ng.html',
    'client/js/users/views/reset-password-email-sent.ng.html',
    'client/js/users/views/reset-password.ng.html',
  ];

  var serverFiles = [
    'server/config/accounts.js',
    'server/config/methods.js',
    'server/startup/initialDataLoad.js',
    'server/startup/setupSite.js',
  ];

  api.addFiles(clientFiles, 'client');
  api.addFiles(serverFiles, 'server');

  api.export('Groups', ['client','server']);
  api.export('Sites', ['client','server']);

});

Package.onTest(function(api) {

});
