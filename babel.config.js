module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts'],
        alias: {
          '@Config': './src/@Config',
          '@Assets': './src/assets',
          '@Redux': './src/@Redux',
          '@GlobalStyles': './src/@GlobalStyles',
          '@GlobalComponents': './src/@GlobalComponents',
          '@Endpoints': './src/@Endpoints',
          '@Context': './src/@Context',
          '@Utils': './src/@Utils',
          '@Common': './src/@Screens/@Common',
          '@Spoints': './src/@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/SPoints',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
