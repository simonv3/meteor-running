Package.describe({
  name: "simonv3:meteor-running",
  summary: "Add sensible authentication patterns and an admin panel to your app.",
  version: "0.3.1",
  git: "https://github.com/simonv3/meteor-running.git"
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('mongo@1.1.0', ['client', 'server']);
  api.use('accounts-password@1.1.1');
  api.use('email@1.0.6', 'server');

  api.use('angular@1.0.1', 'client');

  api.use('simonv3:meteor-running-models@0.0.2', ['client', 'server']);
  api.use('simonv3:meteor-running-auth@0.3.0', ['client', 'server']);
  api.use('simonv3:meteor-running-admin@0.2.3', 'client');

  api.addFiles('meteor-running.js', 'client');

  var clientFiles = [
    'client/js/directives/account-buttons.directive.ng.js',
    'client/js/directives/account-buttons.ng.html',
    'client/js/filters/displayName.js',
    'client/js/navbar/navBarCtrl.ng.js',
    'client/js/splash/controllers/splashCtrl.ng.js',
    'client/js/splash/views/splash.ng.html',
  ];

  api.addFiles(clientFiles, 'client');

  api.export('Groups', ['client','server']);
  api.export('Sites', ['client','server']);

});

Package.onTest(function(api) {

});
