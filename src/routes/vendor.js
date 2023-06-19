const express = require('express')
const mssql = require('mssql')
const config = require('../../config/db-config.json')
const Joi = require('joi');

const router = express.Router();
const pool = new mssql.ConnectionPool(config);


router.post('/vendor', async (req, res) => {
    try {
       
        await pool.connect();
         await pool.request()
        .input('name', req.body.name)
        .input('company_name', req.body.company_name)
        .input('contact_number', req.body.contact_number)
        .input('details', req.body.details)
        .input('email', req.body.email).execute(`Add_Vendor`)
        const response = {
            message: 'New Vendor Added successfully'
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
