const express = require("express");
const router = express.Router();

router.post("/getAnswer", async (req, res) => {
    let query = await req.body.query;
    try {
        
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