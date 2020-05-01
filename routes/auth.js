const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.post(`/register`, ctrl.auth.register);
router.post(`/login`, ctrl.auth.register);
router.get(`/verify`, ctrl.auth.register);
router.delete(`/logout`, ctrl.auth.register);

module.exports = router;