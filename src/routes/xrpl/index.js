import { Router } from "express";
import axios from 'axios';
const xrplRouter = Router();

// Get Account Info

xrplRouter.post(
  "/account_info",
  async (req, res, next) => {
    try {
        const rippleResponse = await axios({
          method: 'post',
          url: 'http://s1.ripple.com:51234/',
          headers: { 'Content-Type': 'application/json' },
          data: req.body,
        });

        console.log('Ripple API Response:', rippleResponse.data);
    
        res.json(rippleResponse.data);
      } catch (error) {
        console.error('Error connecting to Ripple API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
);

// Get Account Currencies

xrplRouter.post(
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

export default xrplRouter;
