const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.post(`/`, ctrl.profiles.create);
router.get(`/:id`, ctrl.profiles.show);
router.put(`/:id`, ctrl.profiles.update);
router.delete(`/:id`, ctrl.profiles.deactivate);

module.exports = router;
