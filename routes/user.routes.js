const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, validateFields, hasRoles } = require("../middlewares/");

const {
  validateRole,
  validateEmail,
  validateUserById,
} = require("../helpers/db-validate");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users.controller");
const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "The name is required ").not().isEmpty(),
    check("password", "Password must be at least 6 characters long ").isLength({
      min: 6,
    }),
    check("email", "The email is not valid ").isEmail(),
    check("email").custom(validateEmail),
    // check("role", "Role not allowed ").isIn(["ADMIN_ROLE", "USER_ROLE"])
    check("role").custom(validateRole),
    validateFields,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id").custom(validateUserById),
    check("role").custom(validateRole),
    validateFields,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    // isAdminRole,
    check("id").custom(validateUserById),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
