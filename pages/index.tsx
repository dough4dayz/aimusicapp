import { useState } from 'react';
import axios from 'axios';
import MusicViewer from '../components/MusicViewer';

export default function Home() {
  const [query, setQuery] = useState('');
  const [xml, setXml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: results } = await axios.get('/api/search', { params: { q: query } });
    const res = await fetch('/api/fetch-xml', { method: 'POST', body: JSON.stringify(results) });
    const { xml } = await res.json();
    setXml(xml);
    setLoading(false);
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">AI Sheet‑Music Finder</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Song title"
          className="border flex-1 px-2"
        />
        <button className="border px-4">Go</button>
      </form>
      {loading && <p>Loading…</p>}
      {xml && <MusicViewer xml={xml} />}
    </main>
  );
}