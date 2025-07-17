import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchBestMusicXML } from '../../lib/musicXmlUtils';
import { SearchResult } from '../../lib/crawler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const results = JSON.parse(req.body ?? '[]') as SearchResult[];
  const xml = await fetchBestMusicXML(results);
  if (!xml) return res.status(404).json({ error: 'No MusicXML found' });
  res.status(200).json({ xml });
}
