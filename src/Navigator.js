import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import RoleView from './pages/auth/role';
import MenuView from './pages/menu';
import ProfileView from './pages/profile';
import ProfileUpdateView from './pages/profile/update';
import PhoneVerify from './components/phoneverify';
import DashBoardView from './pages/dashboard';
import UnitView from './pages/unit/';

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
    },
    update:{
      screen:ProfileUpdateView,
      navigationOptions:{
        header:null
      }
    },
    verify:{
      screen:PhoneVerify,
      navigationOptions:{
        header:null
      }
    },
    dashboard:{
      screen:DashBoardView,
      navigationOptions:{
        header:null
      }
    }, 
    unit:{
      screen:UnitView,
      navigationOptions:{
        header:null
      }
    }
},{
    initialRouteName:'Login',
});
export default RootNavigator;
