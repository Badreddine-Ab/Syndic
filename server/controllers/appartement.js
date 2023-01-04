const Apartment = require('../models/appartement');
const Payment = require('../models/payment');

// Create a new apartment
exports.createApartment = async (req, res) => {
  try {
    const apartment = new Apartment(req.body);
    await apartment.save();
    res.status(201).send(apartment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all apartments
exports.getApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.send(apartments);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get an apartment by ID
exports.getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).send();
    }
    res.send(apartment);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an apartment
exports.updateApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!apartment) {
      return res.status(404).send();
    }
    res.send(apartment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an apartment
exports.deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) {
      return res.status(404).send();
    }
    res.send(apartment);
  } catch (error) {
    res.status(500).send(error);
  }
};
