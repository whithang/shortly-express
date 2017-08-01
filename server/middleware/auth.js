const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  console.log('********** request ', req);
  if (!req.cookies.shortlyid) {
    console.log('****** body ', req.body);
    models.Users.find(req.body.username)
    .then((userEntry) => {
      console.log('******* userEntry ', userEntry.id);
    });
    // models.Sessions.create(userId)
    // .then(() => {
    //   var userId = models.Users.find(req.body.username).id;
    //   console.log('entered first then statement');
    //   console.log('******* userId ', userId);
    //   return models.Sessions.get({userId});
    // })
    // .then((results) => {
    //   console.log('******** results ', results);
    //   req.session = results;
    // });
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

