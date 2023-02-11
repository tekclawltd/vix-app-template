import { defineConfig, Extension } from '@tekclaw/vix-core';
import dns from 'dns';
import path from 'path';

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  browserBuild: {
    // base: '/dev',
    root: path.resolve('./src'),
    outDir: path.resolve('./dist/static'),
    publicDir: path.resolve('./public'),
    build: {
      emptyOutDir: true
    }
  },
  devServer: {
    host: true,
    port: 8000,
    entry: './build/devServer/index.ts'
  },
  serverBuild: {
    entry: './server/lambda.ts',
    outfile: './dist/server.js',
    minify: false,
    metafile: false,
    define: {
      'process.env.NODE_ENV': JSON.stringify('production')
    }
  },
  plugins: [
    Extension.copy([{
      from: './serverless.yml',
      to: './dist'
    }])
  ]
});
