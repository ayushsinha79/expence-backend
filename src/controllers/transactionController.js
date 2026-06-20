const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.createTransaction = async (req, res) => {
    try {
      const transaction =
        await Transaction.create(req.body);
  
      res.status(201).json({
        success: true,
        data: transaction,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('belongsTo', 'name')
            .populate('createdBy', 'name');

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllTransactionsByUser = async (
    req,
    res
  ) => {
    try {
      const user = await User.findById(
        req.params.userId
      );
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      let transactions;
  
      if (
        user.username.toLowerCase() ===
        "ayush"
      ) {
        transactions =
          await Transaction.find()
            .populate(
              "belongsTo",
              "name username"
            )
            .populate(
              "createdBy",
              "name username"
            );
      } else {
        transactions =
          await Transaction.find({
            belongsTo: user._id,
          })
            .populate(
              "belongsTo",
              "name username"
            )
            .populate(
              "createdBy",
              "name username"
            );
      }
  
      res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('user', 'name code role');

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(
            req.params.id
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};