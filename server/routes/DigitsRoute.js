const router = require("express").Router();
const DigitController = require("../controllers/digitController");

//Getter
router.get("/getDigits", DigitController.getDigits);
router.get("/getDigit/:id", DigitController.getDigitId);
router.post("/addDigit", DigitController.addDigit);
router.delete("/deleteDigit/:id", DigitController.deleteDigit);

module.exports = router;
