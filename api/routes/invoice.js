/**
 * endpoints associated with invoice object
 */
const express = require("express");
const router = express.Router();
const { createInvoice, getInvoiceList, deleteInvoice, updateInvoice } = require("../controller/invoice");

router.get("/", getInvoiceList);
router.post("/", createInvoice);
router.delete("/delete", deleteInvoice);
router.put("/:id", updateInvoice);
module.exports = router;