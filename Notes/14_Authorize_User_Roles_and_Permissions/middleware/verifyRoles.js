// Now here we will going to verify the roles assign to the user

const verifyRoles = (...allowedRoles) => {
  // on 'allowedRoles' we will going to get all the roles that we want to allow
  return (req, res, next) => {
    // If we did not find the 'roles' object inside 'req' then we will it is on authorized
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles]; // we will now adding those roles into array so that it would be easy to grab the roles
    // So, here 'req.roles' is the roles that user have
    // And 'rolesArray' content the allowedRoles for that specific route
    // now we will compare both of them and see if passed allowedRoles for that role match the users role that user have if the match only then we will going to allow to give access to the next() or give authorize
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true); // If even one role match and got true we will going to give access
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
