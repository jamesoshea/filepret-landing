import { S3GetObjectPromisified } from '../util/promisified-functions';

export default async (req, res, next) => {
  try {
    const data = await S3GetObjectPromisified(
      `${req.params.fileName.replace('-formatted', '')}.js`,
    );
    res.send(data.Body.toString());
  } catch (error) {
    next(new Error(error));
  }
};
