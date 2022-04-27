const ROLES = {
  Admin: 'ADMIN',
  Customer: 'MEMBER',
  Seller: 'SELLER',
};

const findRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Not authorized to access');
    }

    const isAuthorized = roles.find((role) => req.user.role === role);
    if (!isAuthorized) {
      return res.status(403).send('You are not allowed');
    }
    return next();
  };

const role = { ROLES, findRole };

module.exports = role;
