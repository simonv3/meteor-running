Package.describe({
  name: "simonv3:meteor-running",
  summary: "Get Meteor Up and Running",
  version: "0.0.2",
  git: "https://github.com/simonv3/meteor-running.git"
});

Package.on_use(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('accounts-password@1.1.1');
  api.use('email@1.0.6', 'server');
  api.use('mongo@1.1.0', ['client', 'server']);

  api.use('angular:angular@1.4.4', 'client');
  api.use('urigo:angular@0.9.3', 'client');

  api.use('simonv3:meteor-running-admin@0.0.1', 'client');

  api.addFiles('meteor-running.js', 'client');

  // var clientFiles = getFilesFromFolder("meteor-running", "client");
  // var serverFiles = getFilesFromFolder("meteor-running", "server");

  var clientFiles = [
  'client/config/accounts.js',
  // 'client/js/admin/controllers/adminCtrl.ng.js',
  // 'client/js/admin/controllers/setupCtrl.ng.js',
  // 'client/js/admin/views/admin.ng.html',
  // 'client/js/admin/views/setup.ng.html',
  'client/js/directives/account-buttons.directive.ng.js',
  'client/js/directives/account-buttons.ng.html',
  'client/js/directives/log-in.directive.ng.js',
  'client/js/directives/log-in.ng.html',
  'client/js/filters/displayName.js',
  'client/js/lib/routes.js',
  'client/js/navbar/navBarCtrl.ng.js',
  'client/js/splash/controllers/splashCtrl.ng.js',
  'client/js/splash/views/splash.ng.html',
  'client/js/users/controllers/loginCtrl.ng.js',
  'client/js/users/controllers/registerCtrl.ng.js',
  'client/js/users/controllers/resetPasswordCtrl.ng.js',
  'client/js/users/views/login.ng.html',
  'client/js/users/views/register-success.ng.html',
  'client/js/users/views/register.ng.html',
  'client/js/users/views/reset-password-email-sent.ng.html',
  'client/js/users/views/reset-password.ng.html',
  ];

  var serverFiles = [
  'server/config/accounts.js',
  'server/config/methods.js',
  'server/sites.js',
  'server/startup/initialDataLoad.js',
  'server/startup/setupSite.js',
  'server/users.js',
  'server/groups.js' ];
  // Files to load in Client only.
  api.addFiles(clientFiles, 'client');
  api.addFiles(serverFiles, 'server');
  api.addFiles([
      'model/site.js',
      'model/users.js',
      'model/groups.js']);
  // api.add_files(modelFiles);

});

Package.onTest(function(api) {

});
