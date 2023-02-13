const router = require('express').Router();
const gymController = require('../controllers/gymController');

router.post('/', gymController.createSession);
router.get('/', gymController.getSessions);
router.put('/complete/:id', gymController.completeSession);
router.put('/feedback/:id', gymController.addFeedback);
router.get('/completed/:id', gymController.getCompletedSessions);

module.exports = router;