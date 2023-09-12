
exports.webhook =asyncHandler(async(req,res,next)=>{

    //create  a webhook 
 /*    const webhookEndpoint = await stripe.webhookEndpoints.create({
  url: 'https://example.com/my/webhook/endpoint',
  enabled_events: [
    'charge.failed',
    'charge.succeeded',
  ],
}); */
    const event = request.body;
    const sig = request.headers['stripe-signature'];
    const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Handle the event
  switch (event.type) {

 

    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'customer.created':
      const customerCreated = event.data.object;
      // Then define and call a function to handle the event customer.created
      break;
    case 'customer.updated':
      const customerUpdated = event.data.object;
      // Then define and call a function to handle the event customer.updated
      break;
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'payment_intent.canceled':
      const paymentIntentCanceled = event.data.object;
      // Then define and call a function to handle the event payment_intent.canceled
      break;
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object;
      // Then define and call a function to handle the event payment_intent.created
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  //response.send();
  // Return a response to acknowledge receipt of the event
  response.json({received: true});
})
