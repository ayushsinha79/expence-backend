const mongoose = require("mongoose");

const appConfigSchema =
  new mongoose.Schema(
    {
      paymentSources: {
        type: [String],
        default: [],
      },

      transactionTitles: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "AppConfig",
  appConfigSchema
);