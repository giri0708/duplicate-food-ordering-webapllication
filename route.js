const express=require('express');
const router=express.Router();

const location=require('./Controller/locationcontroller');
const rest=require('./Controller/restaurantcontroller');
const mealType=require('./Controller/mealtypecontroller');
const menu=require('./Controller/menuItemscon');
const auth=require('./Controller/User');


router.get('/getAllLocations',location.locationcontroller)
router.get('/api/getAllRestaurants',rest.restaurantcont)
router.get('/api/getAllRestaurants/location/:id',rest.restbyId)
router.get('/api/getAllRestaurants/:resId',rest.resId)
router.post('/api/filter',rest.filter);
router.get('/getAllMealType',mealType.mealtype);
router.get('/getAllMealType/:id',mealType.mealTypeById);
router.get('/menuItems/:resId',menu.menuItems);
router.post('/signup',auth.signUp);
router.post('/signin',auth.signIn);
router.delete("/:userId",auth.deleteId);



module.exports=router;
