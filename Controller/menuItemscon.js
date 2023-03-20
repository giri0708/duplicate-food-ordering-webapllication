const MenuItems=require('../Model/menuItems')

exports.menuItems=(req,res)=>{
    const resId=req.params.resId;
    // console.log(resId)
    // var k=JSON.stringify(resId)
    // console.log(k)
    MenuItems.find({restaurantId:resId})
    .then(result=>{
        // let menuItem=result.filter( obj => {
        //  return obj.restaurantId == resId} );
        // console.log(result)
         res.status(200).json({
            message:"MenuItems fetched Successfully",
            menuItems:result
            
        })
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
}
