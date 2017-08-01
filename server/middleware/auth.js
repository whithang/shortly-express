const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!req.cookies.shortlyid) {
    models.Sessions.create()
    .then((result) => {
      return result.insertId;
    })
    .then((id) => {
      return models.Sessions.get({id});
    })
    .then((session) => {
      req.session = {'hash': session.hash};
      res.cookies = {'shortlyid': {'value': session.hash}};
      next();
    });
  } else {
    req.session = {};
    var hash = req.cookies.shortlyid;
    models.Sessions.get({hash})
    .then((session) => {
      if (!session) {
        req.cookies.shortlyid = undefined;
        module.exports.createSession(req, res, next);
      } else if (session.user) {
        req.session.user = {'username': session.user.username};
        req.session.userId = session.user.id;
        req.session.hash = req.cookies.shortlyid;
      } else {
        req.session.hash = req.cookies.shortlyid;
      }
      next();
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

