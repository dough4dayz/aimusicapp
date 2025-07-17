'use client';
import { useEffect, useState } from 'react';
import { renderMusicXML } from '../lib/musicXmlUtils';

export default function MusicViewer({ xml }: { xml: string }) {
  const [mode, setMode] = useState<'notes' | 'chords' | 'tones'>('notes');

  useEffect(() => {
    const div = document.getElementById('osmd-container') as HTMLElement;
    renderMusicXML(div, xml, mode);
  }, [xml, mode]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {(['notes', 'chords', 'tones'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className="border px-2 py-1 rounded">
            {m}
          </button>
        ))}
      </div>
      <div id="osmd-container" />
    </div>
  );
}