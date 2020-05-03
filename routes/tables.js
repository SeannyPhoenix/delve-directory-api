const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.post(`/`, ctrl.tables.create);
router.get(`/`, ctrl.tables.index);
router.get(`/:id`, ctrl.tables.show);
router.put(`/:id`, ctrl.tables.update);
router.delete(`/:id`, ctrl.tables.destroy);

module.exports = router;
