import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'public', 'images');

async function optimizeImages() {
  try {
    const files = fs.readdirSync(imagesDir);
    let totalSaved = 0;

    for (const file of files) {
      if (file.endsWith('.webp')) continue; // Already optimized
      
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.svg'].includes(ext)) continue;

      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(imagesDir, file.replace(ext, '.webp'));
      const oldSize = fs.statSync(inputPath).size;

      try {
        console.log(`Processing ${file}...`);
        
        // For SVGs, we might want to specify a density to ensure good rasterization quality
        // But since these SVGs are just embedded JPEGs/PNGs, default should be fine.
        // We resize them to a max width of 1080px to save even more space since they are just cards.
        await sharp(inputPath)
          .resize({ width: 1080, withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        const saved = oldSize - newSize;
        totalSaved += saved;

        console.log(`✅ ${file}: ${(oldSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024).toFixed(2)} KB (Saved ${(saved / 1024 / 1024).toFixed(2)} MB)`);
        
        // Delete original file
        fs.unlinkSync(inputPath);
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
