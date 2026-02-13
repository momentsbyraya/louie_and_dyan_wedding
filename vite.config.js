import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Custom plugin to copy assets
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const copyDir = (src, dest) => {
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
      
      copyDir('assets', 'dist/assets')
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
  publicDir: 'assets'
}) 