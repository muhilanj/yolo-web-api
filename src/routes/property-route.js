const express = require("express");
const mssql = require("mssql");
const config = require("../../config/db-config.json");
const Joi = require("joi");
const generator = require("generate-password");

const router = express.Router();
const pool = new mssql.ConnectionPool(config);

router.get("/homepage", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Home_Page_Data`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/property_facilities", async (req, res) => {
  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.execute("Get_Property_Facilities");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/room_facilities", async (req, res) => {
  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.execute("Get_Room_Facilities");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/property_search", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Property_Search`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/property_search_filter", async (req, res) => {
  try {
    await pool.connect();
    const joiResponse = _validateSearchRequest(req.body);
    console.log(joiResponse);
    if (joiResponse.error) {
      console.log(req.body);
      throw new Error(
        `Exception occured in validating Property search filter input, ${joiResponse.error}`
      );
    }
    const result = await pool
      .request()
      .input("proerty_name", req.body.property_name)
      .input("area", req.body.area)
      .input("city", req.body.city)
      .input("isAvaiable", req.body.isAvailable)
      .input("category", req.body.category)
      .input("occupancy_Type", req.body.occupancy_type)
      .input("Highest_price", req.body.highest_price)
      .input("Starting_price", req.body.starting_price)
      .execute(`Get_Property_Search`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/city", async (req, res) => {
  console.log(req.query);
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_City_List`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/area", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("City_id", "1")
      .execute(`Get_Area_List`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/category", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Category_List`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/occupancy_types", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Occupancy_Types`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/flat_list", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("property_id", req.query.id)
      .execute(`get_flat_list`);
    console.log(result);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/flat_detail", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("flat_id", req.query.id)
      .execute(`get_flat_details`);
    console.log(result);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/flat_facilities", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("flat_id", req.query.id)
      .execute(`get_flat_Property_Facilities`);
    console.log(result);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/room_facilities", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("flat_id", req.query.id)
      .execute(`get_flat_Facilities`);
    console.log(result);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//occupancy types
router.get("/property_type", async (req, res) => {
  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.execute("Get_Occupancy_Types");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/user_register", async (req, res) => {
  try {
    await pool.connect();
    //const joiResponse = _validateUserRequest(req.body);
    // console.log(joiResponse)
    // if(joiResponse.error){
    //     console.log(req.body)
    //     throw new Error(`Exception occured in validating User input, ${joiResponse.error}`);
    // }
    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const result = await pool
      .request()
      .input("first_name", req.body.first_name)
      .input("last_name", req.body.last_name)
      .input("email", req.body.email)
      .input("isemail_verified", req.body.isEmailVerified)
      .input("phone_number", req.body.phone_number)
      .input("isPhone_verified", req.body.isPhoneVerified)
      .input("flat_id", req.body.flat_id)
      .input("password", password)
      .execute(`Add_web_Guest`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add_flat_price", async (req, res) => {
  try {
    await pool.connect();
    // const result = await pool
    //   .request()
    //   .input("property_id", 1)
    //   .input("category_name", "Single Occupancy")
    //   .input("Floor_number", req.body.Floor_number)
    //   .input("room_size", req.body.room_size)
    //   .input("Dimension", req.body.Dimension)
    //   .input("rooms", req.body.rooms)
    //   .input("rent", req.body.rent)
    //   .input("duration", req.body.duration)
    //   .input("advance_amount", req.body.advance_amount)
    //   .input("occupancy_type", req.body.occupancy_type)
    //   .input("user_id", req.body.user_id)
    //   .execute(`Add_Flats_Price`);
    // const homePageResponse = result.recordset;
    const response = {
      data: {},
      status: 200,
      message: "Succeefully Registered",
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get("/basic_property_by_id/:propertyId", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().input("property_id", req.params.propertyId).execute("Get_Basic_Property");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/basic_property_by_id/:propertyId", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request()
    .input("property_id", req.params.propertyId)
    .input("property_name", req.body.property_name)
    .input("area_id", req.body.area_id)
    .input("phone_number", req.body.phone_number)
    .input("email", req.body.email)
    .input("address", req.body.address)
    .input("property_details", req.body.property_details)
    .input("user_id", req.body.user_id)
    .execute("Add_Basic_Property");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/advanced_property_by_id/:propertyId", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().input("property_id", req.params.propertyId).execute("Get_Advanced_Property");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/get_flat_Property_Facilities_by_id/:flat_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().input("flat_id", req.params.flat_id).execute("get_flat_Property_Facilities_new");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/update_flat_Property_Facilities", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request()
    .input("property_id", req.body.property_id)
    .input("floor_no", req.body.floor_no)
    .input("flat_number", req.body.flat_number)
    .input("Occupancy_Type", req.body.occupancy_Type)
    .input("Room_Size", req.body.room_Size)
    .input("dimension", req.body.dimension)
    .input("unit", req.body.unit)
    .input("total_rooms", req.body.total_rooms)
    .input("facilities", req.body.facilities)
    .input("images", req.body.images)
    .input("videos", req.body.videos)
    .input("rent", req.body.rent)
    .input("duration", req.body.duration)
    .input("advance_payment", req.body.advance_payment)
    .input("userid", req.body.userid)
    .execute("Update_flat_Property_Facilities");
    const response = {
      data: {message: "Updated Successfully"},
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/advanced_property_by_id/:flat_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request()
    .input("property_id", req.params.propertyId)
    .input("property_Details", req.body.property_Details)
    .input("Images", req.body.Images)
    .input("videos", req.body.videos)
    .input("facilities", req.body.facilities)
    .input("categories", req.body.categories)
    .input("status", req.body.status)
    .input("total_floors", req.body.total_floors)
    .input("user_id", req.body.user_id)
    .execute("Add_Advanced_Property");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

const _validateUserRequest = () => {
  const schema = Joi.object().keys({
    first_name: Joi.string().optional().allow(null, ""),
    last_name: Joi.string().optional().allow(null, ""),
    email: Joi.string().optional().allow(null, ""),
    isEmailVerified: Joi.number().optional().allow(null, ""),
    phone_number: Joi.string().optional().allow(null, ""),
    isPhoneVerified: Joi.number().optional().allow(null, ""),
    flat_id: Joi.number().optional().allow(null, ""),
    password: Joi.string().optional().allow(null, ""),
  });

  return schema.validate(input, { abortEarly: false });
};

const _validateSearchRequest = (input) => {
  const schema = Joi.object().keys({
    property_name: Joi.string().optional().allow(null, ""),
    area: Joi.string().optional().allow(null, ""),
    city: Joi.string().optional().allow(null, ""),
    isAvailable: Joi.number().optional().allow(null, ""),
    category: Joi.string().optional().allow(null, ""),
    occupancy_type: Joi.string().optional().allow(null, ""),
    starting_price: Joi.number().optional().allow(null, ""),
    highest_price: Joi.number().optional().allow(null, ""),
  });

  return schema.validate(input, { abortEarly: false });
};

module.exports = router;
