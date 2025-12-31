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

/* POST: /api/food/like*/
router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood);

/* POST: /api/food/save */
router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFood);

/*GET: '/api/food/saved' */
router.get('/:id/saved', authMiddleware.authUserMiddleware, foodController.getSavedReels);
// export router
module.exports = router;