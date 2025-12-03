const express = require('express');
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const router = express.Router();

// use multer
const upload = multer({
    storage: multer.memoryStorage(),
})


/*POST: /api/food/  {protected: only foodPartner} */
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFoodItem);

/*POST: /api/food/  {protected: only user} */
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems);

// export router
module.exports = router;