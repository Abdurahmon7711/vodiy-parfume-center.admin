const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment/:id")
  .get(auth, authAdmin, paymentCtrl.getAddressPayments)
  .delete(auth, authAdmin, paymentCtrl.deletePayment);

router
  .route("/payment")
  .post(auth, paymentCtrl.createPayment)
  .delete(auth, authAdmin, paymentCtrl.deletePayments);

router.route("/payment/:id").put(paymentCtrl.sendConfirm);
router.route("/paymentTrue").get(paymentCtrl.getTruePayments);

module.exports = router;
