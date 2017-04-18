/*eslint-disable no-console*/
import fs from 'fs';
console.log('Before cheerio');
import cheerio from 'cheerio';
console.log('After cheerio');

fs.readFile('src/index.html', 'utf8', (err, markup) => {
    if (err)
        console.log(err);

    const $ = cheerio.load(markup);

    $('head').prepend('<link rel="stylesheet" href="styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', err => {
        if (err)
            console.log(err);
        console.log('HTML file written to /dist');
    });
});