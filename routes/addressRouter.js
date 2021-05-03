const router = require("express").Router();
const addressCtrl = require("../controllers/addressCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/address")
  .get(addressCtrl.getAddresses)
  .post(auth, authAdmin, addressCtrl.createAddress);

router
  .route("/address/:id")
  .delete(auth, authAdmin, addressCtrl.deleteAddress)
  .put(auth, authAdmin, addressCtrl.updateAddress);

module.exports = router;
