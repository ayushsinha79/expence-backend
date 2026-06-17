const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/create', transactionController.createTransaction);

router.get('/get', transactionController.getAllTransactions);

router.get('/get/:userId', transactionController.getAllTransactionsByUser);

router.get('/get/:id', transactionController.getTransactionById);

router.put('/update/:id', transactionController.updateTransaction);

router.delete('/delete/:id', transactionController.deleteTransaction);

module.exports = router;