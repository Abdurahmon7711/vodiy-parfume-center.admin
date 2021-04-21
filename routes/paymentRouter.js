const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/payment/:id").get(auth, authAdmin, paymentCtrl.getPayments);

router.route("/payment").post(auth, paymentCtrl.createPayment);

router.route("/payment/:id").put(paymentCtrl.sendConfirm);

module.exports = router;
