# Meteor Running

> A biased package that gives you admin and authorization functionality for an Angular-Meteor project.

# Goals

* [x] Basic authentication
* [ ] Basic model management

# To use

```
meteor add simonv3:meteor-running
```

and then add the library to your angular app:

```javascript
angular.module('ideaotter',
  ['angular-meteor',
   'ui.router',
   'meteor-running']);
```

If you want to include the directive that shows log in / registration buttons, add this anywhere in your code:

```
<div mr-account-buttons></div>
```

You'll also need to define a base route called `index` in your routes, if you want your redirecting to work. (If you have ideas on how to fix this, let me know!).

If you don't want a state named index, you can set this up to just redirect to whatever:

```javascript
  .state('index', {
    controller: ['$state', function($state) {
      return $state.go('whatever-state-you-want');
    }]
  });
```

## Overwriting an auth state

If you want to overwrite one of the auth states, when you run your app do:

```
angular.module('yourappname')
  .run(function($state) {
    var state = $state.get('register')
    if (state) {
      state.controller = 'CustomRegisterCtrl';
      state.templateUrl = 'path/to/custom/register/template.ng.hml';
    }
  });
```

# Contributing

What's needed:

* Feedback
* Angular / Meteor expertise to go over the code
* Security holes found?

Specifically:

* The package can probably be broken down into several smaller packages. For example, routes can be its own thing, the user & sites models can be their own thing, and the directives can be their own thing. Each one might be usable on their own, but together is what makes it Meteor Running.

# Attribution

* Entypo icon font used for icons. It's beautiful. http://www.entypo.com/
