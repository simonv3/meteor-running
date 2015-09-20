Meteor.startup(function () {

  if (Sites.find().count() === 0) {
    console.log('running on startup');
    Sites.insert({
      'name': 'App',
      'has_been_set_up': false
    });
  }

  Accounts.config({
    'sendVerificationEmail': true,
  });
});
