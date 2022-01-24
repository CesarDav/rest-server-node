const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.post(
  "/login",
  [
    check("name", "The name is required ").not().isEmpty(),
    check("password", "Password must be at least 6 characters long ").isLength({
      min: 6,
    }),
    check("email", "The email is not valid ").isEmail(),
    validateFields,
  ],
  login
);

module.exports = router;
