
const asyncHandler = require('express-async-handler');
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY );

exports.handleStripeWebhook=asyncHandler(async(request,response,next)=>{



//Validate the stripe webhook secret, then call the handler for the event type
 

    let event = request.body;
    const sig = request.headers['stripe-signature'];
    const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
         sig,
          endpointSecret
          );
       // Extract the object from the event.
       const dataObject = event.data.object;
       if (dataObject['billing_reason'] == 'subscription_create') {
        const subscription_id = dataObject['subscription']
        const payment_intent_id = dataObject['payment_intent']

        await stripe.customers.create({
          description: 'abcd',
          email:request.body.email,
        });

        await stripe.customers.update(
          payment_intent.customer,
          {invoice_settings: {default_payment_method: payment_intent.payment_method}}
        );

        const payment_intent = await stripe.paymentIntents.retrieve(
          payment_intent_id
        );

        await stripe.subscriptions.update(
          subscription_id,
          {
            default_payment_method: payment_intent.payment_method,
          },
        );
    
    // Handle the event
  switch (event.type) {
/* 
    case 'checkout.session.completed':
      const checkoutSessionCompleted =dataObject
      // Then define and call a function to handle the event checkout.session.completed

      console.log(`checkout_session_completed: ${checkoutSessionCompleted.status}`);

       
      console.log(`payment_succeeded: ${dataObject.status}`);
      break; */
    case 'customer.created':
        const customerCreated = dataObject;
        // Then define and call a function to handle the event customer.created
      
          console.log(`${customerCreated.status} , ${customerCreated.id}`)
      break;
    case 'customer.updated':
      const customerUpdated = dataObject;
      // Then define and call a function to handle the event customer.updated
      console.log(`${customerUpdated.status} , ${customerUpdated.id}`)

      break;
    case 'customer.subscription.created':
      const customerSubscriptionCreated = dataObject;
      // Then define and call a function to handle the event customer.subscription.created
      console.log(`${customerSubscriptionCreated.status} , ${customerSubscriptionCreated.id}`)
      break;
    /* case 'payment_intent.canceled':
      const paymentIntentCanceled = dataObject;
      // Then define and call a function to handle the event payment_intent.canceled
      console.log(`${paymentIntentCanceled.status} , ${paymentIntentCanceled.id}`)
      break;
    case 'payment_intent.created':
      const paymentIntentCreated = dataObject;
      // Then define and call a function to handle the event payment_intent.created
      console.log(`${paymentIntentCreated.status} , ${paymentIntentCreated.id}`)
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = dataObject;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log(`${paymentIntentSucceeded.status} , ${paymentIntentSucceeded.id}`)  
      break; */
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  //response.send();
  // Return a response to acknowledge receipt of the event
  response.json({received: true})
}}
catch (err) {
  console.log(`❌ Error message: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
   
}
}
)
