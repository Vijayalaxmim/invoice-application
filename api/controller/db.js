const { Level } = require("level");
const db = new Level("testDb", { valueEncoding: "json" });
module.exports = { db };