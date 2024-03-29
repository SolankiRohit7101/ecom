const CheckRole = (...roles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res
        .status(401)
        .json({ success: false, message: "UnAuthorized User " });
    }
    const rolesArray = [...roles];
    /*   const result = req?.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true); */
    const result = rolesArray
      .map((role) => role === req?.roles)
      .find((val) => val === true);
    if (!result)
      return res
        .status(401)
        .json({ success: false, message: "UnAuthorized User" });
    next();
  };
};

export default CheckRole;
