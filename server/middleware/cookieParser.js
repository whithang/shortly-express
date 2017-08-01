const parseCookies = (req, res, next) => {
  req.cookies = {};
  if (req.headers.cookie) {
    cookieString = req.headers.cookie;
    var cookieArray = cookieString.split('; ');
    cookieArray.forEach((cookie) => {
      var cleanedCookie = cookie.split('=');
      req.cookies[cleanedCookie[0]] = cleanedCookie[1];
    });
  } 
  next();
};

module.exports = parseCookies;