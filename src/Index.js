const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connect, Schema, model } = require("mongoose");
const port = 5000;
const db = 'mongodb+srv://kmern12345:kmern12345@futurelog.7qgiz23.mongodb.net/db_first';


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  try {
    console.log(`Server is running ${port}`);
    connect(db);
    console.log("db connection established");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});
const DistrictSchemaStructure = new Schema({
  DistrictName: {
    type: String,
    required: true,
  },
});

const District = model("District", DistrictSchemaStructure);


// *********************
app.post("/District", async (req, res) => {
  try {
    const { DistrictName } = req.body;

    let existingDistrict = await District.findOne({ DistrictName });

    if (existingDistrict) {
      return res
        .status(400)
        .json({ errors: [{ msg: "District already exists" }] });
    }

    let newDistrict = new District({
      DistrictName,
    });

    await newDistrict.save();

    res.json({ message: "District inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// *********************************

app.get("/District", async (req, res) => {
  try {
    let district = await District.find();
    res.json({ district });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// **************************************


//   *******************************************************************************************



const PlaceSchemaStructure = new Schema({
  PlaceName: {
    type: String,
    required: true,
  },

  DistrictId: {
    type: Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
});

const Place = model("Place", PlaceSchemaStructure);

//   *******************


app.post("/Place", async (req, res) => {
  try {
    const { PlaceName, DistrictId } = req.body;

    let existingPlace = await Place.findOne({ PlaceName });

    if (existingPlace) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Place already exists" }] });
    }

    let newPlace = new Place({
      PlaceName,
      DistrictId,
    });

    await newPlace.save();

    res.json({ message: "Place inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// ******************************
app.get("/PlaceId/:id", async (req, res) => {
  try {
    let place = await Place.findById(req.params.id);

    res.json({ place });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//   *****************************************************
const CategorySchemaStructure = new Schema({
  CategoryName: {
    type: String,
    required: true,
  },
});

const Category = model("Category", CategorySchemaStructure);

app.post("/Category", async (req, res) => {
  try {
    const { CategoryName } = req.body;
    let existingCategory = await Category.findOne({ CategoryName });
    if (existingCategory) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Category already exists" }] });
    }
    let newCategory = new Category({
      CategoryName,
    });
    await newCategory.save();
    res.json({ message: "Category inserted Successfully" });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// *************************************
app.get("/Category", async (req, res) => {
  try {
    let category = await Category.find();
    res.json({ category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// *******************************************


const SubSchemaStructure = new Schema({
  SubcategoryName: {
    type: String,
    required: true,
  },

  CategoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Subcategory = model("Subcategory", SubSchemaStructure);

app.post("/Subcategory", async (req, res) => {
  try {
    const { CategoryId, SubcategoryName } = req.body;
    let existingSubcategory = await Subcategory.findOne({ SubcategoryName });
    if (existingSubcategory) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Subcategory already exists" }] });

    }
    let newsubcategory = new Subcategory({
      CategoryId,
      SubcategoryName,

    });
    await newsubcategory.save();
    res.json({ message: "Subcategory inserted Successfully" });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
})

// ********************************
app.get("/Subcategory/:id", async (req, res) => {
  try {
    let subcategory = await Subcategory.findById(req.params.id);

    res.json({ subcategory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//   ************************************************

const UserSchemaStructure = new Schema({
  UserName: {
    type: String,
    required: true,
  },

  Useremail: {
    type: String,
    required: true,
  },
  Usercontact: {
    type: String,
    required: true,
  },
  Userpassword: {
    type: String,
    required: true,
  },
  Useraddress: {
    type: String,
    required: true,
  },
  PlaceId: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  Userphoto: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchemaStructure);

// ***************************************
app.post("/User",async(req,res)=>{
  try{
    const {UserName,PlaceId,Useremail,Usercontact,Userpassword,Useraddress,Userphoto }=res.body;
    let existingUser = await User.findOne({UserName,Useremail,Usercontact,Userpassword,Useraddress,Userphoto});
    if(existingUser){
      return res
      .status(400)
      .json({errors:[{msg:"Shop already exists "}]});
    }
    let newUser= new User({
      PlaceId,
      UserName,
      Useremail,
      Usercontact,
      Userpassword,
      Useraddress,
      Userphoto,
     
    });
    await newShop.save();
    res.json({message:"User inserted successfully"});
  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
// ***********************
app.get("/User/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// **************************************************************


const ShopSchemaStructure = new Schema({
  ShopName: {
    type: String,
    required: true,
  },

  Shopemail: {
    type: String,
    required: true,
  },
  Shopcontact: {
    type: String,
    required: true,
  },
  Shoppassword: {
    type: String,
    required: true,
  },
  Shopaddress: {
    type: String,
    required: true,
  },
  PlaceId: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  Shopphoto: {
    type: String,
    required: true,
  },
});

const Shop = model(" Shop ", ShopSchemaStructure);

app.post("/Shop",async(req,res)=>{
  try{
    const {PlaceId,ShopName,Shopemail,Shopcontact,Shoppassword,Shopaddress,Shopphoto }=res.body;
    let existingShop = await Shop.findOne({ShopName,Shopemail,Shopcontact,Shoppassword,Shopaddress,Shopphoto});
    if(existingShop){
      return res
      .status(400)
      .json({errors:[{msg:"Shop already exists "}]});
    }
    let newShop= new Shop({
      PlaceId,
      ShopName,
      Shopemail,
      Shopcontact,
      Shoppassword,
      Shopaddress,
      Shopphoto,
    });
    await newShop.save();
    res.json({message:"Shop inserted successfully"});
  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// ***************************
app.get("/Shop/:id", async (req, res) => {
  try {
    let shop = await Shop.findById(req.params.id);

    res.json({ shop });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ******************************************************

const ProductsSchemaStructure = new Schema({
  ProductsName: {
    type: String,
    required: true,
  },
  ProductsPhoto: {
    type: String,
    required: true,
    unique: true,
  },
  ProductsDetails: {
    type: String,
    required: true,
  },
  ProductsPrice: {
    type: String,
    required: true,
  },
  brandid: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  sellerid: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
});

const Product = model("Product", ProductsSchemaStructure);
app.post("/Product",async(req,res) => {
  try{
    const {BrandId,ShopId,ProductsName,ProductsPhoto,ProductsDetails,ProductsPrice} = req.body;
    let existingProduct = await Product.findOne({ProductsName,ProductsPhoto,ProductsDetails,ProductsPrice});
    if(existingProduct) {
      return res
      .status(400)
      .json({errors:[{msg:"Product already exists"}]});
    }
    let newProduct = new Product({
      BrandId,
      ShopId,
      ProductsName,
      ProductsPhoto,
      ProductsDetails,
      ProductsPrice,
    });
    await newProduct.save();
    res.json({errors:[{message:"Product inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})
// *************************
app.get("/Product/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    res.json({ product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ***********************************************************  
const GallerySchemaStructure = new Schema({
  GalleryImage: {
    type: String,
    required: true,
    unique: true,
  },
  Gallerycaption: {
    type: String,
    required: true,
  },
  Productid: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const Gallery = model("Gallery", GallerySchemaStructure);

app.post("/Gallery",async(req,res) => {
  try{
    const {GalleryImage,Gallerycaption,Productid} = req.body;
    let existingGallery = await Gallery.findOne({ProductsName,ProductsPhoto,ProductsDetails,ProductsPrice});
    if(existingGallery) {
      return res
      .status(400)
      .json({errors:[{msg:"Product already exists"}]});
    }
    let newGallery = new Gallery({
      GalleryImage,
      Gallerycaption,
      Productid,
    });
    await newGallery.save();
    res.json({errors:[{message:"Gallery inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})

// *****************************
app.get("/Gallery/:id", async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params.id);

    res.json({ gallery });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//   ***************************************************************

const BookingSchemaStructure = new Schema({
  Bookingdata: {
    type: String,
    required: true,
  },
  Bookingtotalamount: {
    type: String,
    required: true,
  },
  BookingStatus: {
    type: String,
    required: true,
  },
  Paymentstatus: {
    type: String,
    required: true,
  },
  Userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Booking = model("Booking", BookingSchemaStructure);


app.post("/Booking",async(req,res) => {
  try{
    const {Bookingdata,Bookingtotalamount,BookingStatus,Paymentstatus,Userid} = req.body;
    let existingBooking = await Booking.findOne({Bookingdata,Bookingtotalamount,BookingStatus,Paymentstatus});
    if(existingBooking) {
      return res
      .status(400)
      .json({errors:[{msg:"Product already exists"}]});
    }
    let newBooking = new Booking({
      Bookingdata,
      Bookingtotalamount,
      BookingStatus,
      Userid,
      Paymentstatus,
    });
    await newBooking.save();
    res.json({errors:[{message:"Booking inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})

// ***************************
app.get("/Booking/:id", async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    res.json({ booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//   *******************************************************************


const CartSchemaStructure = new Schema({
  CartQuantity: {
    type: Number,
    required: true,
  },

  Bookingid: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  Productid: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  Cartstatus: {
    type: String,
    required: true,
  }
});

const Cart = model("Cart", CartSchemaStructure);

// ****************

app.post("/Cart",async(req,res) => {
  try{
    const {CartQuantity,Bookingid,Productid,Cartstatus} = req.body;
    let existingCart = await Booking.findOne({CartQuantity,Cartstatus});
    if(existingCart) {
      return res
      .status(400)
      .json({errors:[{msg:"Product already exists"}]});
    }
    let newCart = new Cart({
      Bookingid,
      Productid,
      CartQuantity,
      Cartstatus,
    });
    await newCart.save();
    res.json({errors:[{message:"Cart inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})

// ***************************
app.get("/Cart/:id", async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);

    res.json({ cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});





//   **********************************************************


const ReviewSchemaStructure = new Schema({
  Reviewrating: {
    type: String,
    required: true,
  },

  Reviewcontent: {
    type: String,
    required: true,
  },
  Userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Shopid: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },

  Reviewdateandtime: {
    type: String,
    required: true,
  },
  Cutomername: {
    type: String,
    required: true,
  }
});

const Review = model("Review", ReviewSchemaStructure);

// *************************************
app.post("/Review",async(req,res) => {
  try{
    const {Reviewrating,Reviewcontent,Userid,Shopid,Reviewdateandtime,Cutomername} = req.body;
    let existingReview = await Review.findOne({Reviewrating,Reviewcontent,Reviewdateandtime,Cutomername});
    if(existingReview) {
      return res
      .status(400)
      .json({errors:[{msg:"Product already exists"}]});
    }
    let newReview = new Review({
      Reviewrating,
      Reviewcontent,
      Userid,
      Shopid,
      Reviewdateandtime,
      Cutomername,

    });
    await newReview.save();
    res.json({errors:[{message:"Review inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})

// ***************************
app.get("/Review/:id", async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    res.json({ review });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//   ***********************************************************

const ComplaintSchemaStructure = new Schema({
  Complainttitle: {
    type: String,
    required: true,
  },

  Complaintcontent: {
    type: String,
    required: true,
  },
  Userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  complaintdate: {
    type: String,
    required: true,
  },
  Complaintstatus: {
    type: String,
    required: true,
  },
  Complaintreply: {
    type: String,
    required: true,
  }
});

const Complaint = model("Complaint", ComplaintSchemaStructure);
// *************************************
app.post("/Complaint",async(req,res) => {
  try{
    const {Complainttitle,Complaintcontent,Userid,complaintdate,Complaintstatus,Complaintreply} = req.body;
    let existingComplaint= await Complaint.findOne({Complainttitle,Complaintcontent,complaintdate,Complaintstatus,Complaintreply});
    if(existingComplaint) {
      return res
      .status(400)
      .json({errors:[{msg:"Product already exists"}]});
    }
    let newReview = new Review({
      Complainttitle,
      Complaintcontent,
      Userid,
      complaintdate,
      Complaintstatus,
      Complaintreply,

    });
    await newReview.save();
    res.json({errors:[{message:"Review inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})

// ***************************
app.get("/Complaint/:id", async (req, res) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    res.json({ complaint });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



//   *****************************************************************

const FeedbackSchemaStructure = new Schema({

  Feedbackcontent: {
    type: String,
    required: true,
  },
  Userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Feedbackdate: {
    type: String,
    required: true,
  },
});

const Feedback = model("Feedback", FeedbackSchemaStructure);
// *************************************
app.post("/Feedback",async(req,res) => {
  try{
    const {Feedbackcontent,Userid,Feedbackdate} = req.body;
    let existingFeedback= await Feedback.findOne({Feedbackcontent,Feedbackdate});
    if(existingFeedback) {
      return res
      .status(400)
      .json({errors:[{msg:"Product already exists"}]});
    }
    let newFeedback = new Feedback({
      Feedbackcontent,
      Feedbackdate,
      Userid,
    });
    await newFeedback.save();
    res.json({errors:[{message:"Feedback inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})

// ***************************
app.get("/Complaint/:id", async (req, res) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    res.json({ complaint });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//   ******************************************************************

const WishlistSchemaStructure = new Schema({


  Userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Productid: {
    type: Schema.Types.ObjectId,
    ref: " Product",
    required: true,
  },


});

const Wishlist = model("Wishlist", WishlistSchemaStructure);
// *************************************
app.post("/Wishlist",async(req,res) => {
  try{
    const {Productid,Userid} = req.body;
    let existingWishlist= await Wishlist.findOne({});
    if(existingWishlist) {
      return res
      .status(400)
      .json({errors:[{msg:"Wishlist already exists"}]});
    }
    let newWishlist = new Wishlist({
      Productid,
      Userid,
     

    });
    await newWishlist.save();
    res.json({errors:[{message:"Wishlist inserted Successfully"}]});
  }
catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
}
  
})

// ***************************
app.get("/Wishlist/:id", async (req, res) => {
  try {
    let wishlist = await Wishlist.findById(req.params.id);

    res.json({ wishlist });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

