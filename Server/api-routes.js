// Import Modules
let router = require('express').Router();
const accountController = require("./controllers/accountController");
const familyController = require("./controllers/familyController");

router.get('/', (_req, res) => {
    res.json({
        status: "Success!",
        message: "Welcome to COMP30022 Project 1 API"
    });
});

// Route to /family
router.route('/families')
    .get(familyController.index)
    .post(familyController.new)

router.route('/families/:family_id')
    .get(familyController.view)
    .put(familyController.update)
    .delete(familyController.delete);

router.route('/families/members/:family_id')
    .get(familyController.getmembers)
    .put(familyController.addrelationship);
    
// Route to accounts
router.route('/accounts')
    .get(accountController.index)
    .post(accountController.new)

router.route('/accounts/:account_id')
	.get(accountController.view)
    .put(accountController.update)
    .delete(accountController.delete);

router.route('/accounts/join/:account_id')
    .put(accountController.joinfamily);

router.route('/accounts/relations/:account_id')
    .get(familyController.findRelations);

// Exports API Routes
module.exports = router;
