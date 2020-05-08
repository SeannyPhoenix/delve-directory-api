const express = require(`express`);
const router = express.Router();
const ctrl = require(`../controllers`);

router.get(`/:id`, ctrl.games.show);
router.get(`/`, ctrl.games.index);

module.exports = router;
