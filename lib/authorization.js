var authorizeUser = function (req, res, next) {
  if (req.session.user) {
    db.Users.findById(req.params.userId).then(function (user) {
      if(req.session.user === user._id.toString()){
        next();
      } else {
        req.flash('flash', 'You do not have access to that page');
        res.redirect('/');
      }
    });
  } else {
    req.flash('flash', 'You do not have access to that page, try logging in');
    res.redirect('/');
  }
}

var authorizeAdmin = function (req, res, next) {
  if (req.session.user) {
    db.Users.findById(req.params.userId).then(function (user) {
      if(req.session.user === user._id.toString()){
        next();
      } else {
        req.flash('flash', 'You do not have access to that page');
        res.redirect('/');
      }
    });
  } else {
    req.flash('flash', 'You do not have access to that page, try logging in');
    res.redirect('/');
  }
}
