// In your server code: define a method that the client can call

Meteor.startup(function() {

  Meteor.methods({

    isSandstorm: function() {
      return Meteor.settings.public.isInSandstorm;
    },

    isSetUp: function() {
      if (Meteor.settings.public.isInSandstorm) {

        if (Meteor.user()) {
          var sandstorm = Meteor.user().services.sandstorm;
          if (sandstorm && sandstorm.permissions[0] === 'owner') {
            Meteor.users.update(Meteor.user()._id, {
              'is_admin': true
            });
          }
        }

        return true;

      }
      var users = Meteor.users.find({is_admin: true}).fetch()
      if (users.length === 0) {
        return false;
      } else {
        var sites = Sites.find({has_been_set_up: true}).fetch()

        if (sites.length === 0) {
          return false;
        }
      }
      return true;
    }
  });

})
