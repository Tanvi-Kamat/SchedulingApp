
import * as React from 'react';
import { BottomNavigation, Provider,} from 'react-native-paper';
import HomeRoute from './routes/home.js';
import PeopleRoute from './routes/people.js';
import DevicesRoute from './routes/devices.js';
import ScheduleRoute from './routes/schedule.js';
import SettingsRoute from './routes/settings.js';


const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'people', title: 'People', icon: 'account-supervisor' },
    { key: 'devices', title: 'Devices', icon: 'laptop-mac' },
    { key: 'schedule', title: 'Schedule', icon: 'plus'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    people: PeopleRoute,
    devices: DevicesRoute,
    schedule: ScheduleRoute,
  });

  return (
    <Provider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </Provider>

  );
};

export default MyComponent;
