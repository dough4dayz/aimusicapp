import type { NextApiRequest, NextApiResponse } from 'next';
import { crawlForSong } from '../../lib/crawler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  if (typeof q !== 'string') return res.status(400).json({ error: 'Missing query' });
  try {
    const results = await crawlForSong(q);
    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Crawler failed' });
  }
}