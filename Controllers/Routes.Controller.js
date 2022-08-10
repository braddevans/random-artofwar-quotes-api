"use strict";
const RoutesController = {};
const fs = require("fs");
const logger = require("../Utils/logger");

RoutesController.setupRoutes = (express, app) => {
    // setup api index route
    const routeCat = fs.readdirSync(`${app.appDir}/routes`, {withFileTypes: true}).filter(e => e.isDirectory()).map(d => d.name)
    const endpoints = [];
    let endpointsout = "";

    logger.log(`Loading ${routeCat.length} Route Categories`)
    for (const c of routeCat) {

        const cat = require(`${app.appDir}/routes/${c}/_index.js`);
        logger.log(`Loading Route: ${cat.emoji} ${cat.name}`)
        for (const f of (fs.readdirSync(`${app.appDir}/routes/${c}`).filter(x => !x.startsWith('_') && x.endsWith('.js')))) {
            try {
                logger.log(`Loading EndPoint: - ${f.split('.')[0]}`)
                if (c === "_") {
                    logger.log(`Adding Express Path: - /${f.split('.')[0]}`)
                    const route = require(`${app.appDir}/routes/${c}/${f}`)(express, app, `/${f.split('.')[0]}`, endpoints);
                    app.use(`/`, route.router);
                } else {
                    logger.log(`Adding Express Path: - /${c}/${f.split('.')[0]}`)
                    const route = require(`${app.appDir}/routes/${c}/${f}`)(express, app, `/${c}/${f.split('.')[0]}`, endpoints);
                    app.use(`/${c}/${f.split('.')[0]}`, route.router);
                }

            } catch (e) {
                logger.log(`Failure to load command: ${f}`)
                logger.log(e)
            }
        }
    }

    for (let i = 0; i < endpoints.length; i++) {
        endpointsout += endpoints[i] + "\n"
    }

    logger.log(`Endpoints: \n${endpointsout}`);

    app.use('/js/', express.static(__dirname + '/js/'));
};

module.exports = RoutesController;