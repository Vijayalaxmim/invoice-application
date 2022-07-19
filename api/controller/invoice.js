/**
 * invoice controller for following operations
 * - list all invoices
 * - create invoice
 * - update invoice such as status , description
 * - send email
 *
 */
"use strict";
const { randomUUID } = require("crypto");
const { db } = require("./db");
const createInvoice = async (req, res) => {
    try {
        const data = req.body;
        data.id = randomUUID();
        data.createdAt = new Date().toUTCString();
        await db.put(data.id, data);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Technical error while saving invoices" });
    }
};
const getInvoiceList = async (req, res) => {
    try {
        const values = await db.values().all();
        res.status(200).send(values);
    } catch (err) {
        res.status(500).send(err);
    }
};
const updateInvoice = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (id) {
            let dbData = await db.get(id);
            const newData = { ...dbData, ...data };
            console.log(newData);
            newData.lastUpdatedAt = new Date().toUTCString();
            await db.put(dbData.id, newData);
            res.status(200).send("ok");
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
const deleteInvoice = async (req, res) => {
    try {
        const values = await db.values().all();
        for (const each of values) {
            if (each.id) await db.del(each.id);
            else await db.del(each.uuid);
        }
        res.status(200).send("deleted");
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createInvoice,
    getInvoiceList,
    deleteInvoice,
    updateInvoice,
};
