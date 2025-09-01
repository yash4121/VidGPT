const express = require("express");
const router = express.Router();
const qaAns = require("../index.js");
router.post("/getAnswer", async (req, res) => {
    let query = await req.body.question;
    try {
        const ans = qaAns(query);
        console.log(ans);
        res.send({
            success: true,
            answer: ans
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
});

module.exports = router;