import fs from 'fs';
import prettier from 'prettier';
import {
  ExpressMoveFilePromisified,
  S3PutObjectPromisified,
} from '../util/promisified-functions';

export default async (req, res, next) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
  }
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const file = req.files[0];
    const currentTime = Date.now();
    const fileName = `/tmp/${file.md5}-${currentTime}.js`;
    await ExpressMoveFilePromisified(file, fileName);

    const unformattedFile = fs.readFileSync(fileName).toString();
    const formattedFile = prettier.format(unformattedFile);
    const base64data = Buffer.from(formattedFile, 'binary');
    await S3PutObjectPromisified(fileName, base64data);

    fs.writeFileSync(
      `/tmp/${file.md5}-${currentTime}-formatted.js`,
      formattedFile,
    );
    res.status(200).send({
      fileName: `${file.md5}-${currentTime}-formatted`,
      file: formattedFile,
    });
  } catch (error) {
    next(new Error(error));
  }
  return 0;
};
