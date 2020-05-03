const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.post(`/`, ctrl.sessions.login);
router.get(`/`, ctrl.sessions.verify);
router.delete(`/`, ctrl.sessions.logout);

module.exports = router;
