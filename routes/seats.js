const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.post(`/`, ctrl.seats.add);
router.put(`/:id`, ctrl.seats.update);
router.delete(`/:id`, ctrl.seats.remove);

module.exports = router;
