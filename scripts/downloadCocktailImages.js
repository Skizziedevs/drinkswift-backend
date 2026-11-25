const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../public/bundles');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high-resolution, commercial-grade cocktail photos representing each of the 8 packs
const images = [
  {
    filename: 'pink_berry_chapman.jpg',
    url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=1000&auto=format&fit=crop' // Vibrant pink berry cocktail with ice and citrus
  },
  {
    filename: 'blue_lagoon.jpg',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop' // Vivid azure blue lagoon with lemon & crushed ice
  },
  {
    filename: 'sunset_cosmo.jpg',
    url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1000&auto=format&fit=crop' // Sunset crimson/orange cosmopolitan punch
  },
  {
    filename: 'sex_on_the_beach.jpg',
    url: 'https://images.unsplash.com/photo-1508254627334-d4fa3a515b22?q=80&w=1000&auto=format&fit=crop' // Layered sunrise peach/cranberry tropical cocktail
  },
  {
    filename: 'sangria_fiesta.jpg',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop' // Deep burgundy red wine sangria bowl with fruits
  },
  {
    filename: 'velvet_mudslide.jpg',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop' // Rich creamy mocha chocolate mudslide with cream
  },
  {
    filename: 'rum_malt_cooler.jpg',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop' // Amber mahogany dark rum cooler with lime
  },
  {
    filename: 'whiskey_smash.jpg',
    url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1000&auto=format&fit=crop' // Golden whiskey smash with mint and ice
  }
];

function downloadImage(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, item.filename);
    const file = fs.createWriteStream(dest);

    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(dest);
            console.log(`Downloaded ${item.filename} (${Math.round(stats.size / 1024)} KB)`);
            resolve();
          });
        }).on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          console.log(`Downloaded ${item.filename} (${Math.round(stats.size / 1024)} KB)`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const img of images) {
    await downloadImage(img);
  }
  console.log('All 8 cocktail assets downloaded successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Download error:', err);
  process.exit(1);
});
