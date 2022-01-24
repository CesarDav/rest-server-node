const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.authenticatedUser) {
    return res.status(500).json({
      msg: "The token needs to be verified first",
    });
  }
  const { role, name } = req.authenticatedUser;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not an administrator - You do not have permissions to perform this operation. `,
    });
  }
  next();
};

const hasRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.authenticatedUser) {
      return res.status(500).json({
        msg: "The token needs to be verified first",
      });
    }

    if (!roles.includes(req.authenticatedUser.role)) {
      return res.status(401).json({
        msg: `The service requires one of these roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRoles,
};
