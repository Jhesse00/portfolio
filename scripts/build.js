const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const esbuild = require('esbuild');

// Ensure the public directory exists
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function build() {
  try {
    // Build main application
    console.log('Building JavaScript...');
    await esbuild.build({
      entryPoints: ['src/main.tsx'],
      bundle: true,
      minify: true,
      sourcemap: true,
      target: ['es2020'],
      outfile: 'public/main.js',
      loader: {
        '.js': 'jsx',
        '.tsx': 'tsx',
        '.ts': 'tsx',
        '.jpeg': 'file',
        '.jpg': 'file',
        '.png': 'file',
        '.svg': 'file',
      },
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      alias: {
        '@': path.resolve(__dirname, '..', 'src')
      },
      format: 'iife',
      platform: 'browser'
    });

    // Run PostCSS/Tailwind build
    console.log('Building CSS...');
    execSync('npx tailwindcss -i ./src/index.css -o ./public/styles.css --minify', {
      stdio: 'inherit',
    });

    console.log('Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
