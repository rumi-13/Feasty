const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

// FoodPartner auth-middleware
async function authFoodPartnerMiddleware(req, res, next){
    const token = req.cookies.token;

    if(!token){
       return res.status(401)
        .json({
            message: "Unauthorized access!"
        })
    }

    try{
        /*Verify the token:
            if Verified -> return the tokenData {i.e; id here} (object form)   
            uf !verified -> error is returned 
        */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // after getting tokenData {id} get the foodPartner;
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner; /* Create a new property */

        
        next(); /* Forward flow to controller */

    }catch(err){
        return res.status(401)
        .json({
            message: "Invalid Token!"
        })
    }
}

module.exports ={
    authFoodPartnerMiddleware,
}