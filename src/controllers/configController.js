const AppConfig = require("../models/AppConfig");

exports.getConfig = async (req, res) => {
    try {
      let config = await AppConfig.findOne();
  
      if (!config) {
        config = await AppConfig.create({
          paymentSources: [
            "AXIS Flipkart",
            "HDFC Swiggy",
            "ICICI Amazon",
            "One Card",
            "Kiwi CC",
            "Gpay-HDFC",
            "Gpay-Axis",
            "Gpay-SBI",
          ],
  
          transactionTitles: [
            "Food",
            "Swiggy",
            "Myntra",
            "Flipkart",
            "Amazon",
            "Swish",
            "Zomato",
            "Refund",
            "Sent",
            "Bus",
            "Fruits",
            "Eggs",
            "Store",
            "EMI",
            "Dmart",
            "Others",
            "Shopping",
            "Fuel",
            "Train",
            "Metro",
            "Rent",
            "Sports",
            "Recharge",
            "Subscription",
            "Medicine",
          ],
        });
      }
  
      return res.status(200).json({
        success: true,
        data: config,
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to fetch config",
      });
    }
  };