const logger = require("../../Utils/logger");
const fs = require('fs');

// eslint-disable-next-line no-unused-vars
module.exports = function (express, app, endpoint, endpoints) {
    const module = {};
    const router = express.Router();
    const quoteList = new Map();

    endpoints.push(` - ${endpoint}/random`)

    fs.readFile('quotes.json',
        function (err, data) {
            const jsonParsed = JSON.parse(data);

            for (let i = 0; i < jsonParsed.quotes.length; i++) {
                quoteList.set(quoteList.size, jsonParsed.quotes[i])
            }
        });

    // list all database [key:values]
    router.get("/random", async (req, res) => {
        const reqTime = new Date().getTime();
        const output = [];
        const randomIndex = Math.floor(1 + Math.random() * (quoteList.size - 1 + 1))

        res.json({
            "quote": quoteList.get(randomIndex),
            "CheckedAt": reqTime,
        });
        return;
    });

    module.router = router;

    logger.log(`PATH: ${endpoint} successfully loaded.`);

    return module;
};