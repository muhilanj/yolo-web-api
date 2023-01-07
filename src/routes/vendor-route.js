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
