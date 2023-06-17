const express = require('express')
const mssql = require('mssql')
const config = require('../../config/db-config.json')
const Joi = require('joi');

const router = express.Router();
const pool = new mssql.ConnectionPool(config);


router.post('/contact_us', async (req, res) => {
    try {
       
        await pool.connect();
        const request = await pool.request()
        .input('contact_name', req.body.contact_name)
        .input('email', req.body.email)
        .input('comment', req.body.comment)
        const contactus_response = await request.query('INSERT INTO Contact_us_Details(contact_name, email, comment) OUTPUT INSERTED.contact_us_id values (@contact_name, @email, @comment)');
        const response = {
            contact_us_id: contactus_response.recordsets[0][0].contact_us_id
        }
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
