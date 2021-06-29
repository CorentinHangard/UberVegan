var express = require("express");
var router = express.Router();
var Logs = require("../models/logs");
const { createJWT, checkJWT, JWTContent } = require("../modules/jwt");

router.get("/", async function(req, res, next) {
    console.log(req.originalUrl);
    const token = req.headers.authorization.split("Bearer ")[1];
    const tokenContent = JWTContent(token).user;

    if (tokenContent.role === 6) {
        if (req.query.type === "All") {
            var logs = await Logs.find();
            res.status(200).json(logs);
        } else {

            await Logs.find({ type: req.body.type })
                .then((log) => {
                    res.status(200).json(log);

                })
                .catch((err) => {
                    res.json(err);
                });
        }
    } else {
        res.status(401).send("Non authorized");
    }
});

router.post("/create", async function(req, res, next) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const tokenContent = JWTContent(token).user;

    if (tokenContent.role <= 6) {
        const log = new Logs({
            type: req.body.type,
            content: req.body.content,
        });

        log
            .save()
            .then((l) => {
                res.status(201).json({ log: l });
            })
            .catch((err) => console.log(err));
    } else {
        res.status(401).send("Non authorized");
    }
});

module.exports = router;