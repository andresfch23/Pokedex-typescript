import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(sampleUserData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler;

// import { compose, pipe } from "lodash/fp" -----> used for wrapping functional composition  compose(wrapInDiv, toLowerCase, trim) ----> pipe(trim, toLowerCase, wrapInDiv); This order the functions

// Currying ----> allows to take a function with N arguments and convert it into a function with a single argument 
  // Example => instead of const add = (a,b) => a + b  /// const add = a => b => a + b; 