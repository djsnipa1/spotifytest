const puppeteer = require('puppeteer');

let tracks = [];

async function scrape() {
  // open browser  
  // use this so it works in gitpod 
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  // this was the original code before the gitpod fix
  // const browser = await puppeteer.launch({});

  const url = 'https://everynoise.com/new_releases_by_genre.cgi?genre=psychedelic%20trance&region=US';

  // opens a new page to scrape
  const page = await browser.newPage();

  // goes to supplied url
  await page.goto(url);
  await Promise.all([
    // page.click('button[type=submit]'),
    page.click('input[type=checkbox]'),
    page.waitForNavigation({
      waitUntil: 'networkidle2'
    })
  ]);

  const rows = await page.$$('body > form > table > tbody > tr > td:nth-child(2) > div:nth-child(2) > div');
  const genres = await page.$$('.genrename');

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];

    const genreName = await genre.$eval('a', x => x.textContent);
    console.log('genre: ', genreName);
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    const artist = await row.$eval('a:nth-child(3)', element => element.textContent);
    const track = await row.$eval('a:nth-child(5)', element => element.textContent);
    const href = await row.$eval('a:nth-child(5)', element => element.getAttribute('href'));

    console.log(artist, ' - ', track, ': ', href);
    tracks.push(href);
  }

  // console.log(rows.length);
  // console.log(genres.length);

  console.log('------ TRACKS -------');
  console.log(tracks);

  // console.log(text);
  browser.close();
}
scrape();
