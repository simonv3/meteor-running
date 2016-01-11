// In your server code: define a method that the client can call

Meteor.startup(function() {
  Meteor.methods({
    isSetUp: function() {
      var sites = Sites.find({has_been_set_up: true}).fetch()
      if (sites.length > 0)
        return true;
      Meteor.call('isAdmin', function(err, resp) {
        if (resp) {
          Sites.update({has_been_set_up: false}, {$set: {has_been_set_up: true}})
          return true;
        }
        return false;
      })

    },

    isSandstorm: function() {
      var user = Meteor.users.find({'services.sandstorm': {$exists: true, $ne: null}}).fetch()[0]
      if (user.services.sandstorm)
        return true;
      return false;
    },

    isSiteSetUp: function() {
      var users = Meteor.users.find({is_admin: true}).fetch()
      if (users.length === 0) {
        return false
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
