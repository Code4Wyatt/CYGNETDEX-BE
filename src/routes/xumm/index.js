import { Router } from "express";
import axios from 'axios';
import {XummSdk} from 'xumm-sdk';
import crypto from 'crypto';

const Sdk = new XummSdk('3fc00c1e-2478-4696-810d-f6e432f64b96', 'c9854581-f8b1-4d5e-b809-cc50f3c0b079');

const xummRouter = Router();

// Generate Signature

function generateSignature(params, secret) {
    const sortedParams = {};
    Object.keys(params)
      .sort()
      .forEach(key => {
        if (params[key] !== null) {
          sortedParams[key] = params[key];
        }
      });
  
    const stringA = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  
    const stringSignTemp = `${stringA}&secret=${secret}`;
  
    const signature = crypto
      .createHmac('sha256', secret)
      .update(stringSignTemp)
      .digest('hex')
      .toUpperCase();
  
    return signature;
  }

  xummRouter.get('/getSignature', async (req, res) => {
    try {
      generateSignature();
    } catch (error) {
      console.log('Error Getting Signature', error);
    }
  })

  // Define the endpoint for getting the account balance
  xummRouter.get('/getAccountBalance', async (req, res) => {
    try {
      // Define the request parameters
      const host = 'https://www.swftc.info'; // Replace with your actual host
      const channelId = '3fc00c1e-2478-4696-810d-f6e432f64b96'; // Replace with your channelId
      const secret = process.env.XUMM_SECRET; // Replace with your API secret
      const timestamp = Date.now().toString(); // Current timestamp in milliseconds
  
      // Create a signature using the provided algorithm
      const signature = generateSignature({ channelId, timestamp }, secret);
  
      // Construct the request data
      const requestData = {
        channelId,
        sign: signature,
        timestamp,
      };
  
      // Make a request to the API
      const response = await axios.post(`${host}/marketApi/accounts`, requestData);
  
      // Send the response data to the client
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching account balance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Get Account Info

xummRouter.post(
  "/send",
  async (req, res, next) => {
    try {
        const xummRequest = {
            "TransactionType": "Payment",
            "Destination": req.body.destination,
            "Amount": req.body.amount
        }
        console.log('xumm req', req.body)
        const payload = await Sdk.payload.create(xummRequest, true);

        console.log('XUMM API Payload:', payload);
    
        res.json(payload);
      } catch (error) {
        console.error('Error connecting to Ripple API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
);

// Get Account Currencies

xummRouter.post(
  "/account_currencies",
  async (req, res, next) => {
    try {
        const rippleResponse = await axios({
          method: 'post',
          url: 'http://s1.ripple.com:51234/',
          headers: { 'Content-Type': 'application/json' },
          data: req.body,
        });

        console.log('Ripple API Currencies Response:', rippleResponse.data);
    
        res.json(rippleResponse.data);
      } catch (error) {
        console.error('Account Currencies: Error connecting to Ripple API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
);

// Get Account Currencies

xummRouter.post(
  "/gateway_balances",
  async (req, res, next) => {
    try {
        const balancesResponse = await axios({
          method: 'post',
          url: 'http://s1.ripple.com:51234/',
          headers: { 'Content-Type': 'application/json' },
          data: req.body,
        });

        console.log('balancesResponse Response:', balancesResponse.data);
    
        res.json(balancesResponse.data);
      } catch (error) {
        console.error('Account Currencies: Error connecting to Ripple API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
);

xummRouter.post('/queryOrderState', async (req, res) => {
  try {
    // Extract orderNo from request
    const { orderNo } = req.body;

    // Validate orderNo
    if (!orderNo) {
      return res.status(400).send({ error: 'Order number is required' });
    }

    // Prepare request parameters
    const params = {
      orderNo: orderNo,
      // Add other required parameters here, like sign
    };

    // Generate the signature (sign) as per SWFT documentation

    // Make the request to SWFT API
    const host = 'www.swftc.info';
    let response = await fetch(`https://${host}/api/v2/queryOrderState`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add other headers as required
      },
      body: JSON.stringify(params)
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Error fetching order status');
    }

    // Parse the response
    const data = await response.json();

    // Send the response back to the client
    res.json(data);
  } catch (error) {
    // Handle errors
    res.status(500).send({ error: error.message });
  }
});

xummRouter.post('/swap', async (req, res) => {
  const { destination, amount } = req.body;
  
  if (!destination || !amount) {
    return res.status(400).json({ error: 'Destination and Amount are required.' });
  }

  try {
    const request = {
      TransactionType: 'Payment',
      Destination: destination,
      Amount: amount
    };

    const sdk = new XummSdk('3fc00c1e-2478-4696-810d-f6e432f64b96', '6ba46924-3662-473b-8ddd-97ef60a280da');
    const payload = await sdk.payload.create(request, true);

    console.log('payload PAYLOAD', payload);

    return res.json(payload);
  } catch (error) {
    console.error('Error creating payload:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default xummRouter;
