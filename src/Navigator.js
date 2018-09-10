import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import RoleView from './pages/auth/role';

const RootNavigator = createStackNavigator({
    Login:{
      screen:Login,
      navigationOptions:{
        header:null
      }
    },
    role:{
      screen:RoleView,
      navigationOptions:{
        header:null
      }
    }
},{
    initialRouteName:'Login',
});
export default RootNavigator;
