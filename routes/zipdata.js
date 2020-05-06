const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.get(`/:longitude/:latitude/:radius`, ctrl.zipdata.radius);
router.get(`/:zip/:radius`, ctrl.zipdata.radius);
router.get(`/:zip`, ctrl.zipdata.show);

module.exports = router;
