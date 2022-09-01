const express = require('express')
const mssql = require('mssql')
const config = require('../../config/db-config.json')
const Joi = require('joi');

const router = express.Router();
const pool = new mssql.ConnectionPool(config);

router.get('/homepage', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().execute(`Get_Home_Page_Data`);
        const homePageResponse = result.recordset;

        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/property_search', async (req, res) => {
   
    try {
        await pool.connect();
        const result = await pool.request().execute(`Get_Property_Search`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/property_search_filter', async (req, res) => {
    try {
       
        await pool.connect();
        const joiResponse = _validateSearchRequest(req.body);
        console.log(joiResponse)
        if(joiResponse.error){
            console.log(req.body)
            throw new Error(`Exception occured in validating Property search filter input, ${joiResponse.error}`);
        }
        
        const result = await pool.request()
        .input('proerty_name', req.body.property_name)
        .input('area', req.body.area)
        .input('city', req.body.city)
        .input('isAvaiable', req.body.isAvailable)
        .input('category', req.body.category)
        .input('occupancy_Type', req.body.occupancy_type)
        .input('Highest_price', req.body.highest_price)
        .input('Starting_price', req.body.starting_price)
        .execute(`Get_Property_Search`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/city', async (req, res) => {
    console.log(req.query)
    try {
        await pool.connect();
        const result = await pool.request()
        .
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

router.get('/area', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().input('City_id','1').
        execute(`Get_Area_List`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/category', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request()
        .execute(`Get_Category_List`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/occupancy_types', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request()
        .execute(`Get_Occupancy_Types`);
        const homePageResponse = result.recordset;
        const response = {
            data: homePageResponse
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/flat_list', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().input('property_id',req.query.id).
        execute(`get_flat_list`);
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
router.get('/flat_detail', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().input('flat_id',req.query.id).
        execute(`get_flat_details`);
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

const _validateSearchRequest = (input)=>{
    const schema = Joi.object().keys({
        property_name: Joi.string().optional().allow(null, ''),
        area: Joi.string().optional().allow(null, ''),
        city: Joi.string().optional().allow(null, ''),
        isAvailable: Joi.number().optional().allow(null, ''),
        category: Joi.string().optional().allow(null, ''),
        occupancy_type: Joi.string().optional().allow(null, ''),
        starting_price: Joi.number().optional().allow(null, ''),
        highest_price: Joi.number().optional().allow(null, ''),
    });

    return schema.validate(input, {abortEarly: false});
}


module.exports = router;