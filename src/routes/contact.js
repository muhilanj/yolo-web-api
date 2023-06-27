const express = require("express");
const mssql = require("mssql");
const config = require("../../config/db-config.json");
const Joi = require("joi");

const router = express.Router();
const pool = new mssql.ConnectionPool(config);

router.post("/contact_us", async (req, res) => {
  try {
    await pool.connect();
    await pool
      .request()
      .input("contact_name", req.body.contact_name)
      .input("email", req.body.email)
      .input("comment", req.body.comment)
      .execute(`Add_contact_us_details`);

    const response = {
      message: `Contact us details added successfully`,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/contact_us_details", async (req, res) => {
  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.execute("get_contact_us_details");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
