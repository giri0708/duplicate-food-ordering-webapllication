let Restaurant=require('../Model/restaurant');



exports.restaurantcont=(req,res)=>{
    Restaurant.find().then(result=>{
       res.status(200).json({
           message:"Restaurant Fetched",
           Restaurants:result
       });
   }).catch(error=>{
       res.status(500).json({
           message:"Error in Database",
           error:error
       });
   });
};

exports.restbyId=(req,res)=>{
  
  let location_id = req.params.id;
  Restaurant.find().then(result=>{
     let locationBasedRes =  result.filter( obj => {
      return obj.location_id == location_id} );

     res.status(200).json({
         message:"Restaurant Fetched",
         Restaurants:locationBasedRes
     });
 }).catch(error=>{
     res.status(500).json({
         message:"Error in Database",
         error:error
     });
 });
};

exports.resId=(req,res)=>{
  
    let resId = req.params.resId;
    Restaurant.findById(resId).then(response=>{
      res.status(200).json({
           message:"Restaurant Fetched",
           restaraunt:response
       });
   })
   .catch(error=>{
       res.status(500).json({
           message:"Error in ResId ",
           error:error
       });
   });
  };

// router.get('/getAllRestaurants/:id',(req,res)=>{
  
//   let _id = req.params.id;
//   Restaurant.find().then(result=>{
//      let restaraunt =  result.filter( obj => {
//       return obj._id == _id} );

//      res.status(200).json({
//          message:"Restaurant Fetched",
//          Restaurants:restaraunt
//      });
//  })
//  .catch(error=>{
//      res.status(500).json({
//          message:"Error in Database",
//          error:error
//      });
//  });
// });
//route.post('/fiter',restaurantcontroller.restaurantfilter)

// router.get('/getAllRestaurantsByLocation',(req,res)=>{
//     const cityName=req.params.cityName;
//     Restaurant.find({city:cityName}).then(result=>{
//        res.status(200).json({
//            message:`Restaurant Fetched for city ${cityName}`,
//            Restaurants:result
//        });
//    }).catch(error=>{
//        res.status(500).json({
//            message:"Error in Database",
//            error:error
//        });
//    });
// });

exports.filter=(req,res)=>{
let {mealtype,location,cuisine,lcost,hcost,sort,page}=req.body;
sort=sort?sort:1;
page=page?page:1;

let ItemsPerPage=2;

let startIndex=ItemsPerPage*page-ItemsPerPage;
let endIndex=ItemsPerPage*page+1;

let filterObj={};

mealtype && (filterObj['mealtype_id']=mealtype);
location && (filterObj['location_id']=location);
cuisine && (filterObj['cuisine.id']={$in:cuisine});
lcost && hcost && (filterObj['min_price']={$lte:hcost,$gte:lcost});
// console.log("filterObj::::::::",filterObj);
Restaurant.find(filterObj).sort({min_price:sort})
.then(response=>{
  //Pagenation Logic

  const paginatedResponse=response.slice(startIndex,endIndex);

  let arr=[];
  for(let i=1;i<=Math.ceil(response.length/ItemsPerPage);i++){
    arr.push(i);
  }

  res.status(200).json(
    {message:"Restaurants Fetched Successfully",
    restaurants:paginatedResponse,
    pageCount:arr,
    currentPage:page
  }
  )
})
.catch(error=>{
    res.status(500).json({
        message:"Error",
        error:error
    });
});
}

// router.get("/Rest",async(req,res)=>{
//     try{
//         const page = parseInt(req.query.page)-1 || 0;
//         const limit = parseInt(req.query.limit) || 5;
//         const search = req.query.search || "";
//         let sort = req.query.sort || "aggregate_rating" & "min_price";
//         let Restaurants = req.query.Restaurants || "All";
        
        
//         const RestOptions=[
//             "meal type", 
//             "locality", 
//             "cuisine.name", 
//             "low cost", 
//             "high cost", 
//             "sort", 
//             "page number",
//             "name"

//         ];

//         Restaurants === "All"
//         ?(Restaurants = [...RestOptions])
//         :(Restaurants = req.query.Restaurants.split(','))
//     req.query.sort?(sort=req.query.sort.split(',')):(sort=[sort]);
//     let sortBy={};
//     if(sort[1]){
//         sortBy[sort[0]]=sort[1];
//     }else{
//         sortBy[sort[0]]="asc";
//     }
  
//     const Rest = await Restaurant.find({
//         $or: [
//           {
//             name: {
//               $regex: search,
//               $options: "i"
//             }
//           },
//           {
//             locality: {
//               $regex: search,
//               $options: "i"
//             }
//           },
//           {
//             "cuisine.name": {
//               $regex: search,
//               $options: "i"
//             }
//           }
//         ]
//       })
//     .where("Restaurants")
//     .in([...RestOptions])
//     .sort(sortBy)
//     .skip(page*limit)
//     .limit(limit);

//     const total = await Restaurant.countDocuments({
//         Restaurants:{$in:[...RestOptions]},
//         name:{$regex:search,$options:'i'},
//     "cuisine.name":{$regex:search,$options:'i'},
//     });

//     const response={
//         error:false,
//         total,
//         page:page + 1,
//         limit,
//         Restaurants:RestOptions,
//          Rest,
//        };

//     res.status(200).json(response);

//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:true,message:"Internal Server Error"});
//     }
// });

