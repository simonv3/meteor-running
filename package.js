function getFilesFromFolder(packageName,folder){
  // local imports
  var _ = Npm.require("underscore");
  var fs = Npm.require("fs");
  var path = Npm.require("path");
  // helper function, walks recursively inside nested folders and return absolute filenames
  function walk(folder){
    var filenames=[];
    // get relative filenames from folder
    var folderContent=fs.readdirSync(folder);
    // iterate over the folder content to handle nested folders
    _.each(folderContent,function(filename){
      // build absolute filename
      var absoluteFilename=folder+path.sep+filename;
      // get file stats
      var stat=fs.statSync(absoluteFilename);
      if(stat.isDirectory()){
        // directory case => add filenames fetched from recursive call
        filenames=filenames.concat(walk(absoluteFilename));
      }
      else{
        // file case => simply add it
        filenames.push(absoluteFilename);
      }
    });
    return filenames;
  }
  // save current working directory (something like "/home/user/projects/my-project")
  var cwd = process.cwd();
  // chdir to our package directory
  var uri = "packages"+path.sep+packageName;
  console.log(uri);
  process.chdir(uri);
  // launch initial walk
  var result=walk(folder);
  // restore previous cwd
  process.chdir(cwd);
  return result;
}

Package.describe({
  name: "simonv3:meteor-running",
  summary: "Get Meteor Up and Running",
  version: "0.0.1",
  git: "https://github.com/simonv3/meteor-running.git"
});

Package.on_use(function (api) {

  api.use('accounts-password@1.1.1');
  api.use('email@1.0.6', 'server');

  api.use('angular:angular@1.4.4', 'client');
  api.use('urigo:angular@0.9.3', 'client');

  api.add_files('meteor-running.js', 'client');

  // var clientFiles = getFilesFromFolder("meteor-running", "client");
  // var serverFiles = getFilesFromFolder("meteor-running", "server");

  var clientFiles = [
  'client/config/accounts.js',
  'client/js/admin/controllers/adminCtrl.ng.js',
  'client/js/admin/controllers/setupCtrl.ng.js',
  'client/js/admin/views/admin.ng.html',
  'client/js/admin/views/setup.ng.html',
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
  'client/styles/account-buttons.import.less',
  'client/styles/admin.less',
  'client/styles/fonts/fonts.import.less',
  'client/styles/fonts/icon-font.import.less',
  'client/styles/main.less',
  'client/styles/survey.less',
  'client/styles/ui/buttons.import.less',
  'client/styles/ui/forms.import.less',
  'client/styles/ui/messages.import.less',
  'client/styles/variables.import.less' ];

  var serverFiles = [
  'server/config/accounts.js',
  'server/config/methods.js',
  'server/sites.js',
  'server/startup/initialDataLoad.js',
  'server/startup/setupSite.js',
  'server/users.js' ];
  // Files to load in Client only.
  api.add_files(clientFiles, 'client');
  api.add_files(serverFiles, 'server');
  // api.add_files(modelFiles);

});

Package.onTest(function(api) {

});
