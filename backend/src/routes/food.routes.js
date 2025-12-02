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

// export router
module.exports = router;