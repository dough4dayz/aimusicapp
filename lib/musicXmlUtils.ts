import OSMD from 'opensheetmusicdisplay';
import type { SearchResult } from './crawler';

export async function fetchBestMusicXML(results: SearchResult[]): Promise<string | null> {
  for (const r of results) {
    if (r.type === 'musicxml') {
      try {
        const res = await fetch(r.url);
        if (res.ok) return await res.text();
      } catch (_) {
        /* ignore and continue */
      }
    }
  }
  return null;
}

export async function renderMusicXML(container: HTMLElement, xml: string, viewMode: 'notes' | 'chords' | 'tones') {
  const osmd = new OSMD(container, { drawTitle: false });
  await osmd.load(xml);
  if (viewMode !== 'notes') {
    // crude demo: show/hide chord symbols
    osmd.EngravingRules.RenderChordSymbols = viewMode === 'chords';
  }
  await osmd.render();
}