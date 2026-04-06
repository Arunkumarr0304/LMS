const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// SVG Transformer configuration
const { resolver } = config;

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

resolver.sourceExts = [...resolver.sourceExts, 'svg'];
resolver.assetExts = resolver.assetExts.filter(ext => ext !== 'svg');

module.exports = config;
