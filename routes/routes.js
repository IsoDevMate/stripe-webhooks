const express = require("express");
const router=require('express').Router();

const  logic=require('../controllers/logic')

 // Webhook listener
router.post("/handleStripeWebhook",express.raw({ type: 'application/json' }),logic.handleStripeWebhook)



module.exports=router;