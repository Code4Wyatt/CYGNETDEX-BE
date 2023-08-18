import { Router } from "express";
import Moralis from "moralis";
import createHttpError from "http-errors";

const moralisRouter = Router();

moralisRouter.get("/tokenPrice", async (req, res, next) => {
    try {
        await Moralis.start({
          apiKey: process.env.REACT_APP_MORALIS_KEY
        });
      
        const response = await Moralis.EvmApi.balance.getNativeBalancesForAddresses({
            "chain": "0x1",
            "walletAddresses": [
              "0xE92d1A43df510F82C66382592a047d288f85226f"
            ]
        });
      
        console.log(response.raw);
      } catch (e) {
        console.error(e);
      }
});

export default moralisRouter;
