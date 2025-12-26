const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const Url = require("../models/Url");

// create short url
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = shortid.generate();

  const newUrl = new Url({
    originalUrl,
    shortCode
  });

  await newUrl.save();

  res.json({
    shortUrl: `http://productionXivamXinha/${shortCode}`
  });
});

// redirect
router.get("/:code", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });

  if (!url) {
    return res.status(404).send("URL not found");
  }

  url.clicks++;
  await url.save();

  res.redirect(url.originalUrl);
});

module.exports = router;
