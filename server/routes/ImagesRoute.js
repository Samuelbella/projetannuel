const router = require("express").Router();
const ImageController = require("../controllers/imagecontroller");

//Getter
router.get("/getImages", ImageController.getImages);
router.get("/getImage/:id", ImageController.getImageId);
router.post("/addImage", ImageController.addImage);
router.delete("/deleteImage/:id", ImageController.deleteImage);

module.exports = router;
