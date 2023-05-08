import bcrypt from "bcrypt";
import { Router } from "express";
import createHttpError from "http-errors";

const accountRouter = Router();

accountRouter.post(`account/queryCoinList`, async (req, res, next) => {
  try {
    let params = {
        "depositCoinCode": req.depositCoinCode,
        "receiveCoinCode": req.receiveCoinCode,
    }

    const response = await axios.post(
        `${host}/api/v1/getBaseInfo`,
        params,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    let baseInfo = await response.data

    console.log('getBaseInfo data', baseInfo)

    return baseInfo
} catch (error) {
    console.error(error)
    return []
}
});

export default accountRouter;