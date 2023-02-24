const express = require('express')
const mssql = require('mssql')
const config = require('../../config/db-config.json')
const Joi = require('joi');

const router = express.Router();
const pool = new mssql.ConnectionPool(config);

router.get('/vendor_dashboard', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().input('vendor_id',req.query.vendor_id).
        execute(`get_vendor_dashboard`);
        const homePageResponse = result.recordset;

        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/vendor_products', async (req, res) => {
   
    try {
        await pool.connect();
        const result = await pool.request().input('vendor_id',req.query.vendor_id).
        execute(`get_vendor_Products`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/vendor_login', async (req, res) => {
    try {
       
        await pool.connect();
        const joiResponse = _validateSearchRequest(req.body);
        console.log(joiResponse)
        if(joiResponse.error){
            console.log(req.body)
            throw new Error(`Exception occured in validating login input, ${joiResponse.error}`);
        }
        
        const result = await pool.request()
        .input('login_id', req.body.login_id)
        .input('password', req.body.password)
        .execute(`vendor_login_details`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/add_vendor_product', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const joiResponse = _validateAddVendoRequest(req.body);
        console.log(joiResponse)
        if(joiResponse.error){
            console.log(req.body)
            throw new Error(`Exception occured in validating login input, ${joiResponse.error}`);
        }
        
        const result = await pool.request()
        .input('vendor_id', req.body.vendor_id)
        .input('product_name', req.body.product_name)
        .input('package_of_unit', req.body.package_of_unit)
        .input('uom', req.body.uom)
        .input('price', req.body.price)
        .input('user_id', req.body.user_id)
        .input('image', req.body.image)
        .execute(`add_vendor_Product`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

//**Use this proc for Add Role **//
router.post('/add_role', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('Role_Name', req.body.role_name)
        .input('Reportiing_Role', req.body.reporting_role)
        .input('userid', req.body.user_id)
        .execute(`Add_Role`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for Post the order **//
router.post('/add_order', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('product', req.body.products)
        .input('vendor_id', req.body.vendor_id)
        .input('userid', req.body.user_id)
        .execute(`Add_Order`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for Post the order **//
router.post('/add_property_facilities', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('facility_name', req.body.facility_name)
        .input('userid', req.body.user_id)
        .execute(`Add_Property_Facilities`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for delete the order **//
router.delete('/delete_property_facilities', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('facility_name', req.body.facility_name)
        .input('userid', req.body.user_id)
        .execute(`Delete_Property_Facility`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for post the order **//
router.post('/add_property_category', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('Category', req.body.category)
        .input('userid', req.body.user_id)
        .execute(`Add_Property_Category`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for dlete the order **//
router.delete('/delete_category', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('Category', req.body.category)
        .input('userid', req.body.user_id)
        .execute(`Delete_Category`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for post the Add_Room_Facility **//
router.post('/add_room_facility', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('facility_name', req.body.facility_name)
        .input('userid', req.body.user_id)
        .execute(`Add_Room_Facility`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for dlete the Delete_Room_Facility **//
router.delete('/delete_Room_Facility', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('facility_name', req.body.facility_name)
        .input('userid', req.body.user_id)
        .execute(`Delete_Room_Facility`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
//**use this proc for post the Add_Room_Type **//
router.post('/add_room_type', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('Room_Type', req.body.room_type)
        .input('Dimension', req.body.dimension)
        .input('userid', req.body.user_id)
        .execute(`Add_Room_Type`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
/**use this proc for delete the Add_Room_Type **/
router.delete('/delete_room_type', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('Room_Type', req.body.room_type)
        .input('userid', req.body.user_id)
        .execute(`Delete_Room_Type`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
/**use this proc for add the user **/
router.post('/add_user', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('User_Name', req.body.user_name)
        .input('Email', req.body.email)
        .input('password', req.body.password)
        .input('phone', req.body.phone)
        .input('role', req.body.role)
        .input('Report_To', req.body.report_to)
        .input('userid', req.body.user_id)
        .execute(`Add_User`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
/**use this proc for add the user **/
router.put('/update_user_password', async (req, res) => {
    try {
       
        await pool.connect();
        console.log(req.body)
        const result = await pool.request()
        .input('password', req.body.password)
        .input('userid', req.body.user_id)
        .execute(`Update_User_Password`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/get_user_details', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().
        execute(`Get_User_Details`);
        const homePageResponse = result.recordset;

        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/get_roles', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().
        execute(`Get_Roles`);
        const homePageResponse = result.recordset;

        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

const _validateSearchRequest = (input)=>{
    const schema = Joi.object().keys({
        login_id: Joi.string().optional().allow(null, ''),
        password: Joi.string().optional().allow(null, ''),
    });

    return schema.validate(input, {abortEarly: false});
}

const _validateAddVendoRequest = (input)=>{
    const schema = Joi.object().keys({
        vendor_id: Joi.number().optional().allow(null, ''),
        product_name: Joi.string().optional().allow(null, ''),
        package_of_unit: Joi.string().optional().allow(null, ''),
        uom: Joi.string().optional().allow(null, ''),
        price: Joi.number().optional().allow(null, ''),
        user_id: Joi.number().optional().allow(null, ''),
        status: Joi.string().optional().allow(null, ''),
        image: Joi.string().optional().allow(null, ''),
        
    });

    return schema.validate(input, {abortEarly: false});
}

module.exports = router;