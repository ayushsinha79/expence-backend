const express = require("express");

const {
  getConfig,
  updateConfig,
} = require(
  "../controllers/configController"
);

const router = express.Router();

router.get(
  "/get",
  getConfig
);

router.put(
  "/update",
  updateConfig
);

module.exports = router;