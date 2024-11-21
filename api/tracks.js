const express = require("express");
const router = require("router");
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const tracks = await prisma.findMany();
        res.json(tracks);
    } catch (e) {
        next(e)
    }
});
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const track = await prisma.track.findUniqueOrThrow();
        res.json(track);
    } catch (e) {
        next(e);
    }
});
