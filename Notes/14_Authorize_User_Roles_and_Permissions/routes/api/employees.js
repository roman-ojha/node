const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeesController.getAllEmployees) // On get request we will not require any authorization middleware
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), // but in case of Post/ Put/ Delete request here we are using the authorization middleware to verify the roles and if it match the we can move to the controller
    // So here we can only allow this route for those user who are 'Admin' & 'Editor'
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
