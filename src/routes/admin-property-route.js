const express = require("express");
const mssql = require("mssql");
const config = require("../../config/db-config.json");
const Joi = require("joi");
const generator = require("generate-password");

const router = express.Router();
const pool = new mssql.ConnectionPool(config);

router.get("/state", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("country_name", req.query.country_name)
      .execute(`Get_State_List`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/admin_login", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("login_id", req.body.login_id)
      .input("password", req.body.login_id)
      .execute(`User_login_details`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/country", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("state_name", req.query.state_name)
      .execute(`Get_City_List`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_property_facilities", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Property_Facilities`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_property_list", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Property_List`);
    res.json({
      data: result.recordset,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_admin_dashboard", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`get_Admin_dashboard`);
    res.json({
      data: result.recordset,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_room_facilities", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Room_Facilities`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_flat_type", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("categoryid", req.query.categoryid)
      .execute(`Get_Flat_Type`);
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

router.post("/add_basic_property", async (req, res) => {
  try {
    await pool.connect();
    const joiResponse = _validateBasicPropertyRequest(req.body);
    console.log(joiResponse);
    if (joiResponse.error) {
      console.log(req.body);
      throw new Error(
        `Exception occured in validating basic property input, ${joiResponse.error}`
      );
    }

    const result = await pool
      .request()
      .input("property_name", req.body.property_name)
      .input("area_id", req.body.area_id)
      .input("phone_number", req.body.phone_number)
      .input("email", req.body.email)
      .input("address", req.body.address)
      .input("property_details", req.body.property_details)
      .input("user_id", req.body.user_id)
      .execute(`Add_Basic_Property`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
      status: 200,
      message: "Succeefully Registered",
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/add_advanced_property", async (req, res) => {
  try {
    await pool.connect();
    const joiResponse = _validateAdvancedPropertyRequest(req.body);
    if (joiResponse.error) {
      console.log(req.body);
      throw new Error(
        `Exception occured in validating basic property input, ${joiResponse.error}`
      );
    }

    const result = await pool
      .request()
      .input("property_id", req.body.property_id)
      .input("categories", req.body.categories)
      .input("status", req.body.status)
      .input("facilities", req.body.facilities)
      .input("user_id", req.body.user_id)
      .input("images", req.body.Images)
      .input("videos", req.body.videos)
      .input('total_floors', req.body.total_floors)
      .execute(`Add_Advanced_Property`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
      status: 200,
      message: "Succeefully Registered",
    };
    res.json(response);
  } catch (error) {
    console.log({ error }); 
    res.status(500).json(error);
  }
});
router.post("/add_flat_details", async (req, res) => {
  try {
    await pool.connect();
    const joiResponse = _validateFlatDetailsRequest(req.body);
    console.log(joiResponse);
    if (joiResponse.error) {
      console.log(req.body);
      throw new Error(
        `Exception occured in validating add flat details input, ${joiResponse.error}`
      );
    }

    const result = await pool
      .request()
      .input("property_id", req.body.property_id)
      .input("category_id", req.body.category_id)
      .input("flat_type", req.body.flat_type)
      .input("dimension", req.body.dimension)
      .input("floor_number", req.body.floor_number)
      .input("total_rooms", req.body.total_rooms)
      .input("flat_facilities", req.body.flat_facilities)
      .input("images", req.body.images)
      .input("videos", req.body.videos)
      .input("flat_number", req.body.flat_number)
      .input("occupancy_type", req.body.occupancy_type)
      .input("user_id", req.body.user_id)
      .execute(`Add_flat_Details`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
      status: 200,
      message: "Succeefully Registered",
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add_flats_price", async (req, res) => {

  try {

    // const result = await pool.query`exec Add_Flats_Price @property_id = 1, @category_name = 'Single Occupancy',  @Floor_number = 1,   
    // @room_size = 'Small', @Dimension='8 X 6', @rooms = 'A101,A102', @rent = 1000,@duration='Monthly',   
    // @advance_amount = 5000, @occupancy_type = 'Any',@flat_facilities = '', @images = '', @videos = '', @user_id = 1`;

    const result = await pool
      .request()
      .input("property_id", req.body.property_id)
      .input("category_name", req.body.category_name)
      .input("Floor_number", req.body.Floor_number)
      .input("Dimension", req.body.dimension)
      .input("room_size", req.body.room_size)
      .input("rent", req.body.rent)
      .input("duration", req.body.duration)
      .input("advance_amount", req.body.advance_amount)
      .input("occupancy_type", 'Any')
      .input("flat_facilities", req.body.flat_facilities)
      .input("images", req.body.images)
      .input("videos", req.body.videos)
      .input("user_id", req.body.user_id)
      .input('rooms', req.body.flat_number)
      .execute(`Add_Flats_Price`);

    const response = {
      data: result,
      status: 200,
      message: "Succeefully Registered",
    };
    res.json(response);
  } catch (error) {
    console.log({ error })
    res.status(500).json(error);
  }
});

//**Use this proc for Add Role **//
router.post("/add_role", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("Role_Name", req.body.role_name)
      .input("Reportiing_Role", req.body.reporting_role)
      .input("userid", req.body.user_id)
      .execute(`Add_Role`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

//**use this proc for Post the order **//
router.post("/add_order", async (req, res) => {
  try {
    let vendor_product = new mssql.Table();
    vendor_product.columns.add("Product_ID", mssql.Int());
    vendor_product.columns.add("Price_Per_Unit", mssql.Money());
    vendor_product.columns.add("Quantity", mssql.Int());

    req.body.products.forEach((product) => {
      vendor_product.rows.add(
        product.Product_ID,
        product.Price_Per_Unit,
        product.Quantity
      );
    });

    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("product", vendor_product)
      .input("vendor_id", req.body.vendor_id)
      .input("userid", req.body.user_id)
      .execute(`Add_Order`);
    const homePageResponse = result.recordset;
    console.log({ result });
    const response = {
      data: result,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

//**use this proc for Post the order **//
router.post("/add_property_facilities", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("facility_name", req.body.facility_name)
      .input("userid", req.body.user_id)
      .execute(`Add_Property_Facilities`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//**use this proc for delete the order **//
router.delete("/delete_property_facilities", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("facility_name", req.body.facility_name)
      .input("userid", req.body.user_id)
      .execute(`Delete_Property_Facility`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//**use this proc for post the order **//
router.post("/add_property_category", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("Category", req.body.category)
      .input("userid", req.body.user_id)
      .execute(`Add_Property_Category`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//**use this proc for dlete the order **//
router.delete("/delete_category", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("Category", req.body.category)
      .input("userid", req.body.user_id)
      .execute(`Delete_Category`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//**use this proc for post the Add_Room_Facility **//
router.post("/add_room_facility", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("facility_name", req.body.facility_name)
      .input("userid", req.body.user_id)
      .execute(`Add_Room_Facility`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//**use this proc for dlete the Delete_Room_Facility **//
router.delete("/delete_Room_Facility", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("facility_name", req.body.facility_name)
      .input("userid", req.body.user_id)
      .execute(`Delete_Room_Facility`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//**use this proc for post the Add_Room_Type **//
router.post("/add_room_type", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("Room_Type", req.body.room_type)
      .input("Dimension", req.body.dimension)
      .input("userid", req.body.user_id)
      .execute(`Add_Room_Type`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**use this proc for delete the Add_Room_Type **/
router.delete("/delete_room_type", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("Room_Type", req.body.room_type)
      .input("userid", req.body.user_id)
      .execute(`Delete_Room_Type`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**use this proc for add the user **/
router.post("/add_user", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("User_Name", req.body.user_name)
      .input("Email", req.body.email)
      .input("password", req.body.password)
      .input("phone", req.body.phone)
      .input("role", req.body.role)
      .input("Report_To", req.body.report_to)
      .input("userid", req.body.user_id)
      .execute(`Add_User`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**use this proc for add the user **/
router.put("/update_user_password", async (req, res) => {
  try {
    await pool.connect();
    console.log(req.body);
    const result = await pool
      .request()
      .input("password", req.body.password)
      .input("userid", req.body.user_id)
      .execute(`Update_User_Password`);
    const homePageResponse = result.recordset;
    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/get_user_details", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_User_Details`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/get_roles", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Roles`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/get_vendor_list", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Vendor_List`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/get_user_list", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_User_List`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_orders", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().execute(`Get_Orders`);
    const homePageResponse = result.recordset;

    const response = {
      data: homePageResponse,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

const _validateFlatDetailsRequest = (input) => {
  const schema = Joi.object().keys({
    property_id: Joi.number().optional().allow(null, ""),
    category_id: Joi.number().optional().allow(null, ""),
    flat_type: Joi.string().optional().allow(null, ""),
    dimension: Joi.string().optional().allow(null, ""),
    floor_number: Joi.number().optional().allow(null, ""),
    total_rooms: Joi.number().optional().allow(null, ""),
    flat_facilities: Joi.string().optional().allow(null, ""),
    images: Joi.array().optional().allow(null, ""),
    videos: Joi.string().optional().allow(null, ""),
    flat_number: Joi.string().optional().allow(null, ""),
    occupancy_type: Joi.string().optional().allow(null, ""),
    user_id: Joi.number().optional().allow(null, ""),
  });

  return schema.validate(input, { abortEarly: false });
};

const _validateBasicPropertyRequest = (input) => {
  const schema = Joi.object().keys({
    property_id: Joi.number().optional().allow(null, ""),
    property_name: Joi.string().optional().allow(null, ""),
    area_id: Joi.number().optional().allow(null, ""),
    phone_number: Joi.string().optional().allow(null, ""),
    email: Joi.string().optional().allow(null, ""),
    address: Joi.string().optional().allow(null, ""),
    user_id: Joi.number().optional().allow(null, ""),
    property_details: Joi.string().optional().allow(null, ""),
  });

  return schema.validate(input, { abortEarly: false });
};
const _validateAdvancedPropertyRequest = (input) => {
  const schema = Joi.object().keys({
    property_id: Joi.number().optional().allow(null, ""),
    Images: Joi.string().optional().allow(null, ""),
    videos: Joi.string().optional().allow(null, ""),
    facilities: Joi.string().optional().allow(null, ""),
    categories: Joi.string().optional().allow(null, ""),
    status: Joi.number().optional().allow(null, ""),
    user_id: Joi.number().optional().allow(null, ""),
    total_floors: Joi.number().optional().allow(null, "")
  });

  return schema.validate(input, { abortEarly: false });
};

module.exports = router;
