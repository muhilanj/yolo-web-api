const express = require('express')
const mssql = require('mssql')
const config = require('../../config/db-config.json')
const Joi = require('joi');

const router = express.Router();
const pool = new mssql.ConnectionPool(config);


router.post('/vendor', async (req, res) => {
    try {
       
        await pool.connect();
        const request = await pool.request()
        .input('vendor_name', req.body.name)
        .input('company_name', req.body.company_name)
        .input('contact_number', req.body.contact_number)
        .input('details', req.body.details)
        .input('email', req.body.email)
        .input('area_id', req.body.area_id)
        .input('vendor_type_id', req.body.vendor_type_id)
        const contactus_response = await request.query(`INSERT INTO vendor_master
        (vendor_name, company_name, contact_number,email, details, area_id, vendor_type_id) 
        OUTPUT INSERTED.vendor_id values 
        (@vendor_name, @company_name, @contact_number, @email, @details,@area_id, @vendor_type_id)`);
        const response = {
            vendor_id: contactus_response.recordsets[0][0].vendor_id
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
