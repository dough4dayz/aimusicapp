import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

export interface SearchResult {
  title: string;
  url: string;
  type: 'musicxml' | 'pdf' | 'youtube' | 'chord';
}

export async function crawlForSong(query: string): Promise<SearchResult[]> {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(query + ' piano sheet music')}`);
  const html = await page.content();
  await browser.close();

  const $ = cheerio.load(html);
  const links: SearchResult[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    if (/\.mxl?|\.musicxml|\.xml|\.pdf/i.test(href)) {
      links.push({ title: $(el).text(), url: href, type: /\.pdf/i.test(href) ? 'pdf' : 'musicxml' });
    } else if (/youtube\.com\/watch/.test(href)) {
      links.push({ title: $(el).text(), url: href, type: 'youtube' });
    } else if (/chord|tabs|ultimate-guitar/i.test(href)) {
      links.push({ title: $(el).text(), url: href, type: 'chord' });
    }
  });
  return links.slice(0, 20);
}