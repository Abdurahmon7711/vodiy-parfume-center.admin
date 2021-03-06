const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");
const Addresses = require("../models/addressModel");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find({ status: req.params.id });
      res.json(payments);
      // const features = new APIfeatures(Payments.find(), req.query)
      //   .filtering()
      //   .sorting()
      //   .paginating();

      // const payments = await features.query;

      // res.json({
      //   status: "success",
      //   result: payments.length,
      //   payments: payments,
      // });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getTruePayments: async (req, res) => {
    try {
      const payments = await Payments.find({ status: true });
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getFalsePayments: async (req, res) => {
    try {
      const payments = await Payments.find({ status: false });
      const addresses = await Addresses.find();
      let falseAddresses = addresses.filter((item) =>
        payments.map((item2) => item2.address).includes(item.id)
      );

      falseAddresses = falseAddresses.map((item) => {
        return {
          _id: item.id,
          name: item.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          bookNumber: payments.filter((item2) => item2.address === item.id)
            .length,
        };
      });
      res.json(falseAddresses);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAddressPayments: async (req, res) => {
    try {
      const payments = await Payments.find({
        address: req.params.id,
        status: false,
      });
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePayments: async (req, res) => {
    try {
      await Payments.deleteMany({ status: true });
      res.json({ msg: "Barcha buyurtmalar o'chirildi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePayment: async (req, res) => {
    try {
      await Payments.findByIdAndDelete(req.params.id);
      res.json({ msg: "Buyurtma o'chirildi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select(
        "name lname login phoneNumber address"
      );
      if (!user)
        return res.status(400).json({ msg: "Foydalanuvchi mavjud emas !" });
      const { cart, comment } = req.body;

      const { _id, name, lname, login, phoneNumber, address } = user;

      // cart.forEach((item) => {
      //   if (item.quantity > item.number) {
      //     return res
      //       .status(400)
      //       .json({ msg: "Bizda buncha mahsulot mavjud emas !" });
      //   }
      // });

      const newPayment = new Payments({
        user_id: _id,
        name,
        lname,
        login,
        phoneNumber,
        address,
        cart,
        comment,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold, item.number);
      });

      await newPayment.save();
      res.json({ msg: "Muvaffaqqatliyatli yakunlandi", newPayment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  sendConfirm: async (req, res) => {
    try {
      const product = await Payments.findOne({ _id: req.params.id });
      product.status = true;
      await Payments.findOneAndUpdate({ _id: req.params.id }, product);
      res.json({ msg: "Buyurtma yetkazib berildi !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold, number) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
      number: number - quantity,
    }
  );
};

module.exports = paymentCtrl;
