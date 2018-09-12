import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import RoleView from './pages/auth/role';
import MenuView from './pages/menu';
import ProfileView from './pages/profile';

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
    },
    menu:{
      screen:MenuView,
      navigationOptions:{
        header:null
      }      
    },
    profile:{
      screen:ProfileView,
      navigationOptions:{
        header:null
      }
    }
},{
    initialRouteName:'Login',
});
export default RootNavigator;
