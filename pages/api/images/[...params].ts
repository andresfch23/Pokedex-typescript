import Cors from 'cors';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '../../../utils/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET']
  })
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const { params } = req.query;

  try {
    const urlImage = `http://assets.pokemon.com/assets/cms2/img/pokedex/${params[0]}/${params[1]}.png`;

    const image = await axios
      .get(urlImage, { responseType: 'arraybuffer' })
      .then(response => `data:image/png;base64, ${Buffer.from(response.data, 'binary').toString('base64')}`);

    res.status(200).json({ image });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler;