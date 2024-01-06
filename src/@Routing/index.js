/**
 * Create By @name Sukumar_Abhijeet
 */

import { createSwitchNavigator } from '@react-navigation/compat';
import AuthNavigator from './AuthStack';
import BottomTabs from './BottomTabs';

const AppRouter = createSwitchNavigator(
    {
        AuthStack: AuthNavigator,
        CoreTabs: BottomTabs,
    },
    {
        initialRouteName: 'AuthStack'
    }
);

export default AppRouter;