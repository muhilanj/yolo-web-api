const express = require('express')
const mssql = require('mssql')
const config = require('../../config/db-config.json')
const Joi = require('joi');
const generator = require('generate-password');

const router = express.Router();
const pool = new mssql.ConnectionPool(config);

router.get('/state', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().input('country_name',req.query.country_name).
        execute(`Get_State_List`);
        const homePageResponse = result.recordset;

        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/country', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().input('state_name',req.query.state_name).
        execute(`Get_City_List`);
        const homePageResponse = result.recordset;

        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/get_property_facilities', async (req, res) => {
   
    try {
        await pool.connect();
        const result = await pool.request().execute(`Get_Property_Facilities`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/get_room_facilities', async (req, res) => {
   
    try {
        await pool.connect();
        const result = await pool.request().execute(`Get_Room_Facilities`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/get_flat_type', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().input('categoryid',req.query.categoryid).
        execute(`Get_Flat_Type`);
        console.log(result)
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/add_basic_property', async (req, res) => {
    try {
       
        await pool.connect();
        const joiResponse = _validateBasicPropertyRequest(req.body);
        console.log(joiResponse)
        if(joiResponse.error){
            console.log(req.body)
            throw new Error(`Exception occured in validating basic property input, ${joiResponse.error}`);
        }
        
        const result = await pool.request()
        .input('property_name', req.body.property_name)
        .input('area_id', req.body.area_id)
        .input('phone_number', req.body.phone_number)
        .input('email', req.body.email)
        .input('address', req.body.address)
        .input('property_details',req.body.property_details)
        .input('user_id', req.body.user_id)
        .execute(`Add_Basic_Property`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse,
            status:200,
            message: 'Succeefully Registered'
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/add_advanced_property', async (req, res) => {
    try {
       
        await pool.connect();
        const joiResponse = _validateAdvancedPropertyRequest(req.body);
        console.log(joiResponse)
        if(joiResponse.error){
            console.log(req.body)
            throw new Error(`Exception occured in validating basic property input, ${joiResponse.error}`);
        }
        
        const result = await pool.request()
        
        .input('property_id', req.body.property_id)
        .input('categories', req.body.categories)
        .input('status', req.body.status)
        .input('facilities', req.body.facilities)
        .input('user_id', req.body.user_id)
        .input('images',req.body.Images)
        .input('videos',req.body.videos)
        .execute(`Add_Advanced_Property`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse,
            status:200,
            message: 'Succeefully Registered'
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/add_flat_details', async (req, res) => {
    try {
       
        await pool.connect();
        const joiResponse = _validateFlatDetailsRequest(req.body);
        console.log(joiResponse)
        if(joiResponse.error){
            console.log(req.body)
            throw new Error(`Exception occured in validating add flat details input, ${joiResponse.error}`);
        }
        
        const result = await pool.request()
        .input('property_id', req.body.property_id)
        .input('category_id', req.body.category_id)
        .input('flat_type', req.body.flat_type)
        .input('dimension', req.body.dimension)
        .input('floor_number', req.body.floor_number)
        .input('total_rooms', req.body.total_rooms)
        .input('flat_facilities', req.body.flat_facilities)
        .input('images', req.body.images)
        .input('videos', req.body.videos)
        .input('flat_number', req.body.flat_number)
        .input('occupancy_type', req.body.occupancy_type)
        .input('user_id',req.body.user_id)
        .execute(`Add_flat_Details`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse,
            status:200,
            message: 'Succeefully Registered'
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

const _validateFlatDetailsRequest=(input)=>{
    const schema = Joi.object().keys({
        property_id: Joi.number().optional().allow(null, ''),
        category_id: Joi.number().optional().allow(null, ''),
        flat_type: Joi.string().optional().allow(null, ''),
        dimension: Joi.string().optional().allow(null, ''),
        floor_number: Joi.number().optional().allow(null, ''),
        total_rooms: Joi.number().optional().allow(null, ''),
        flat_facilities: Joi.string().optional().allow(null, ''),
        images: Joi.array().optional().allow(null, ''),
        videos: Joi.string().optional().allow(null, ''),
        flat_number: Joi.string().optional().allow(null, ''),
        occupancy_type: Joi.string().optional().allow(null, ''),
        user_id: Joi.number().optional().allow(null, ''),
    });

    return schema.validate(input, {abortEarly: false});
}


const _validateBasicPropertyRequest = (input)=>{
    const schema = Joi.object().keys({
        property_id: Joi.number().optional().allow(null, ''),
        property_name: Joi.string().optional().allow(null, ''),
        area_id: Joi.number().optional().allow(null, ''),
        phone_number: Joi.string().optional().allow(null, ''),
        email: Joi.string().optional().allow(null, ''),
        address: Joi.string().optional().allow(null, ''),
        user_id: Joi.number().optional().allow(null, ''),
        property_details:Joi.string().optional().allow(null, ''),

    });

    return schema.validate(input, {abortEarly: false});
}
const _validateAdvancedPropertyRequest = (input)=>{
    const schema = Joi.object().keys({
        property_id: Joi.number().optional().allow(null, ''),
        Images: Joi.string().optional().allow(null, ''),
        videos: Joi.string().optional().allow(null, ''),
        facilities: Joi.string().optional().allow(null, ''),
        categories: Joi.string().optional().allow(null, ''),
        status: Joi.number().optional().allow(null, ''),
        user_id: Joi.number().optional().allow(null, ''),

    });

    return schema.validate(input, {abortEarly: false});
}


module.exports = router;