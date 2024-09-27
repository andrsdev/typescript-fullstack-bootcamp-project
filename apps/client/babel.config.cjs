// babel.config.cjs
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Asegúrate de tener este plugin si usas características modernas de JavaScript
  ],
};
