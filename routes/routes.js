const express = require("express");
const bodyParser = require('body-parser');
const router=require('express').Router();
const  logic=require('../controllers/logic')

 // Webhook listener
router.post("/handleStripeWebhook"/*,bodyParser.raw({type: 'application/json'})*/,logic.handleStripeWebhook)
router.post("/callback",express.raw({ type: 'application/json' }),logic.callback)
module.exports=router;