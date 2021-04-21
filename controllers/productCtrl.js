const Products = require("../models/productModel");
const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");

const newDate = (a) => {
  return a.toISOString().split("T")[0];
};

const cartSumQuantity = (cart) => {
  if (cart.length !== 0) {
    let sum = cart
      .map((o) => o.quantity)
      .reduce((a, c) => {
        return a + c;
      });

    return sum;
  } else {
    return 0;
  }
};

const getDayProducts = (products, cart) => {
  products2 = products;
  cart.map((product) => {
    if (products2.filter((item) => item.id === product._id).length !== 0) {
      products2[
        products2.findIndex((item2) => item2.id === product._id)
      ].quantity += product.quantity;
    } else {
      products2.push({
        id: product._id,
        title: product.title,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        images: product.images,
      });
    }
  });
  return products2;
};

// Filter, sorting and paginating

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

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStatics: async (req, res) => {
    const payments_number = (await Payments.find({ status: false })).length;
    const products_number = (await Products.find()).length;
    const users_number = (await Users.find({ role: 0 })).length;
    const common_numbers = {
      payments_number,
      products_number,
      users_number,
    };
    res.json(common_numbers);
  },
  getLastTenDayStatics: async (req, res) => {
    try {
      const today_date = new Date();
      const payments = await Payments.find();
      days = parseInt(req.params.id);

      dates = Array(days).fill(0);

      days_payments = [];

      for (i = 0; i < days; i++) {
        days_payments.push(
          payments.filter(
            (item) =>
              newDate(item.createdAt) ===
              newDate(new Date(today_date.getTime() - i * 24 * 60 * 60 * 1000))
          )
        );
        dates[i] = newDate(
          new Date(today_date.getTime() - i * 24 * 60 * 60 * 1000)
        );
      }

      numbers = Array(days).fill(0);
      days_products = Array(days).fill(0);

      days_payments.forEach((item, index) => {
        days_products[index] = {
          date: "",
          products: [],
        };
        item.forEach((item2) => {
          numbers[index] += cartSumQuantity(item2.cart);
          days_products[index].date = item2.createdAt;
          // days_products[index].products = days_products[index].products.concat(
          //   item2.cart
          // );
          days_products[index].products = getDayProducts(
            days_products[index].products,
            item2.cart
          );
        });
      });
      res.json({ numbers, dates, days_products });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { title, price, description, images, number, category } = req.body;
      if (!images) return res.status(400).json({ msg: "Rasm joylanmagan !" });

      const product = await Products.findOne({ title });
      if (product) return res.status(400).json({ msg: "Bu mahsulot mavjud !" });

      const newProduct = new Products({
        title,
        price,
        description,
        images,
        number,
        category,
      });

      await newProduct.save();
      res.json({ msg: "Mahsulot yaratildi" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Mahsulot o'chirildi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, images, number, category } = req.body;
      if (!images) return res.status(400).json({ msg: "Rasm joylanmadi !" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          price,
          description,
          images,
          number,
          category,
        }
      );

      res.json({ msg: "Mahsulot o'zgartirildi" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
