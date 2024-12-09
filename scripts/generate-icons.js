const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const sizes = [16, 32, 192, 512];
  const inputSvg = path.join(__dirname, '../public/logo.svg');
  
  // Generate PNGs
  for (const size of sizes) {
    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/logo${size}.png`));
    
    console.log(`Generated ${size}x${size} PNG`);
  }
  
  // Create favicon.ico (contains both 16x16 and 32x32)
  const favicon16 = await sharp(inputSvg)
    .resize(16, 16)
    .png()
    .toBuffer();
  
  const favicon32 = await sharp(inputSvg)
    .resize(32, 32)
    .png()
    .toBuffer();
    
  await sharp(favicon16)
    .toFile(path.join(__dirname, '../public/favicon.ico'));
  
  console.log('Generated favicon.ico');
  
  // Rename logo192.png and logo512.png
  await fs.rename(
    path.join(__dirname, '../public/logo192.png'),
    path.join(__dirname, '../public/logo192.png')
  );
  await fs.rename(
    path.join(__dirname, '../public/logo512.png'),
    path.join(__dirname, '../public/logo512.png')
  );
}

generateIcons().catch(console.error);
