const express = require("express");
const verifyToken = require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/roleMiddleware")

const router = express.Router();

//only admin
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin !" });
});

//both admin and manager

router.get("/manager", verifyToken, authorizeRoles("admin", " manager"), (req, res) => {
    res.json({ message: "Welcome Manager !" });
});

//all access

router.get("/user", verifyToken, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({ message: "Welcome User !" });
});

module.exports = router;