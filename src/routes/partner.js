const express = require("express");
const mssql = require("mssql");
const config = require("../../config/db-config.json");
const Joi = require("joi");

const router = express.Router();
const pool = new mssql.ConnectionPool(config);

router.post("/partner", async (req, res) => {
  try {
    await pool.connect();
    await pool
      .request()
      .input("name", req.body.name)
      .input("property_name", req.body.property_name)
      .input("location", req.body.location)
      .input("contact_number", req.body.contact_number)
      .input("email", req.body.email)
      .input("website", req.body.website)
      .input("details", req.body.details)
      .execute(`Add_Partner_Master`);
    const response = {
      message: "New Partner Added Successfully",
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/partner_list", async (req, res) => {
  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.execute("get_Partner_List");
    const response = {
      data: result.recordsets[0],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
