const Users = require("../models/userModel");
const Addresses = require("../models/addressModel");

const addressCtrl = {
  getAddresses: async (req, res) => {
    try {
      const addresses = await Addresses.find();
      res.json(addresses);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createAddress: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      const { name } = req.body;
      const address = await Addresses.findOne({ name });
      if (address) return res.status(400).json({ msg: "Bu manzil mavjud" });

      const newAddress = new Addresses({ name });

      await newAddress.save();
      res.json({ msg: "Manzil yaratildi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      const addresses = await Addresses.findOne({ address: req.params.id });
      if (addresses)
        return res.status(400).json({
          msg: "Avval manzilga tegishli mahsulotlarni o'chiring",
        });

      await Addresses.findByIdAndDelete(req.params.id);
      res.json({ msg: "Manzil o'chirildi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAddress: async (req, res) => {
    try {
      const { name } = req.body;
      await Addresses.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Manzil yangilandi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = addressCtrl;
