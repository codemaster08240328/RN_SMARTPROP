import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';

const RootNavigator = createStackNavigator({
    Login:{
      screen:Login,
      navigationOptions:{
        header:null
      }
    }
},{
    initialRouteName:'Login',
});
export default RootNavigator;
