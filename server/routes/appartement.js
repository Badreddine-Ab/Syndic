const express = require("express");
const router = express.Router();
const { createApartment, getApartments, getApartment, updateApartment, deleteApartment } = require("../controllers/appartement");
const { authorization } = require("../middlewares/authenticate");

// Create an apartment
router.post("/", authorization, createApartment);

// Get all apartments
router.get("/", authorization, getApartments);

// Get a single apartment
router.get("/:apartmentId", authorization, getApartment);

// Update an apartment
router.patch("/:apartmentId", authorization, updateApartment);

// Delete an apartment
router.delete("/:apartmentId", authorization, deleteApartment);

module.exports = router;
