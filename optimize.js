import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'public', 'images');

async function optimizeImages() {
  try {
    const files = fs.readdirSync(imagesDir);
    let totalSaved = 0;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(ext)) continue;

      // Skip the newly optimized hero image so we don't double compress it
      if (file === 'yeni_sezon.webp') continue;

      const inputPath = path.join(imagesDir, file);
      const tempOutputPath = path.join(imagesDir, 'temp_' + file.replace(ext, '.webp'));
      const finalOutputPath = path.join(imagesDir, file.replace(ext, '.webp'));
      const oldSize = fs.statSync(inputPath).size;

      try {
        console.log(`Processing ${file}...`);
        
        await sharp(inputPath)
          .resize({ width: 800, withoutEnlargement: true }) // Reduce max width to 800
          .webp({ quality: 65, effort: 6 }) // Lower quality slightly for better compression
          .toFile(tempOutputPath);

        const newSize = fs.statSync(tempOutputPath).size;
        const saved = oldSize - newSize;
        
        // Replace original with temp
        fs.unlinkSync(inputPath);
        fs.renameSync(tempOutputPath, finalOutputPath);

        if (saved > 0) {
            totalSaved += saved;
            console.log(`✅ ${file}: ${(oldSize / 1024).toFixed(2)} KB -> ${(newSize / 1024).toFixed(2)} KB (Saved ${(saved / 1024).toFixed(2)} KB)`);
        } else {
            console.log(`⚠️ ${file}: Kept original size (${(newSize / 1024).toFixed(2)} KB) as compression didn't help.`);
        }
        
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
      }
    }

    console.log(`\n🎉 Optimization complete! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

optimizeImages();
