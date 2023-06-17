const express = require('express')
const mssql = require('mssql')
const config = require('../../config/db-config.json')
const Joi = require('joi');

const router = express.Router();
const pool = new mssql.ConnectionPool(config);


router.post('/partner', async (req, res) => {
    try {
       
        await pool.connect();
        const request = await pool.request()
        .input('name', req.body.name)
        .input('propeerty_name', req.body.property_name)
        .input('property_location', req.body.location)
        .input('contact_number', req.body.contact_number)
        .input('email', req.body.email)
        .input('website', req.body.website)
        .input('propeerty_details', req.body.details)
        const contactus_response = await request.query(`INSERT INTO partner_master
        (name, propeerty_name, property_location, contact_number,email, website, propeerty_details) 
        OUTPUT INSERTED.partner_id values 
        (@name, @propeerty_name, @property_location, @contact_number, @email, @website, @propeerty_details)`);
        const response = {
            partner_id: contactus_response.recordsets[0][0].partner_id
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
