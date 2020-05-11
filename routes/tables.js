const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.post(`/`, ctrl.tables.create);
router.get(`/`, ctrl.tables.index);
router.get(`/near/:longitude/:latitude/:radius`, ctrl.tables.indexInRadius);
router.get(`/near/:zip/:radius`, ctrl.tables.indexInRadius);
router.get(`/user/:id?`, ctrl.tables.userIndex);
router.get(`/:id`, ctrl.tables.show);
router.put(`/:id`, ctrl.tables.update);
router.delete(`/:id`, ctrl.tables.destroy);

router.post(`/:tableId/seats`, ctrl.seats.add);
router.put(`/:tableId/seats/:seatId`, ctrl.seats.update);
router.delete(`/:tableId/seats/:seatId`, ctrl.seats.remove);

router.post(`/:tableId/request/:userId`, ctrl.seats.request);

module.exports = router;
