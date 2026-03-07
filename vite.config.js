import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Custom plugin to copy assets
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    closeBundle() {
      // Use closeBundle instead of writeBundle to ensure it runs after all Vite processing
      const copyDir = (src, dest) => {
        if (!existsSync(src)) {
          console.warn(`Source directory ${src} does not exist`)
          return
        }
        
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true })
        }
        
        const items = readdirSync(src)
        items.forEach(item => {
          const srcPath = join(src, item)
          const destPath = join(dest, item)
          
          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
          } else {
            copyFileSync(srcPath, destPath)
          }
        })
      }
      
      // Copy assets to dist/assets (this runs after Vite's publicDir copy)
      // This ensures files are at dist/assets/images/prenup/ as expected by the code
      console.log('Copying assets to dist/assets...')
      copyDir('assets', 'dist/assets')
      console.log('Assets copied successfully')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyAssetsPlugin()],
  server: {
    port: 3001,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  publicDir: 'assets' // Needed for dev server, but custom plugin ensures correct build output
}) 