import { defineConfig } from 'vite'

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        emptyOutDir: true
    },
    optimizeDeps: {
        exclude: ['three']
    },
    server: {
        port: 3000,
        open: true,
        cors: true
    }
})
