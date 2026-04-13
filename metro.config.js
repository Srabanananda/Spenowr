const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // redux-thunk@3 (and other packages) use "main": "dist/cjs/*.cjs"; without this, Metro
    // keeps appending .native.js / .android.js to the basename and never resolves the file.
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs', 'mjs'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    assetPlugins: ['react-native-svg-asset-plugin'],
  },
  watchFolders: [path.resolve(__dirname, 'node_modules')],
};

module.exports = mergeConfig(defaultConfig, config);
