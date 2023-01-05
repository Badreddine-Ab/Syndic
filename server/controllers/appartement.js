const Apartment = require("../models/appartement");
const apiError = require('../utils/apiError')

// Create an apartment
exports.createApartment = async (req, res, next) => {
  try {
    const apartment = new Apartment({
      name: req.body.name,
      address: req.body.address,
      owner: req.body.owner,
    });
    await apartment.save();
    res.status(201).json({ message: "Apartment created successfully" });
  } catch (error) {
    return next(new apiError(error));
  }
};

// Get all apartments
exports.getApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find().populate("paymentHistory");
    res.status(200).json(apartments);
  } catch (error) {
    return next(new apiError(error));
  }
};

// Get a single apartment
exports.getApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId).populate(
      "paymentHistory"
    );
    if (!apartment) {
      return next( new apiError("Apartment not found",404));
    }
    res.status(200).json(apartment);
  } catch (error) {
    next(error);
  }
};

// Update an apartment
exports.updateApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(
      req.params.apartmentId,
      {
        name: req.body.name,
        address: req.body.address,
        owner: req.body.owner,
      },
      { new: true }
    );
    if (!apartment) {
     return next (new apiError("Apartment not found", 404));
    }
    res.status(200).json({ message: "Apartment updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete an apartment
exports.deleteApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.apartmentId);
    if (!apartment) {
      return next (new apiError("Apartment not found", 404));
    }
    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
