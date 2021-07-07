//

import * as React from 'react';
import { BottomNavigation, Subheading, Container, Text, Title, TextInput, Paragraph, Button, Provider, Portal, Dialog, Avatar, Headline, List, Card, DataTable, Modal, Menu } from 'react-native-paper';
import { View } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import Scheduling from './SchedulingApp.js'
import Store from './Store/store.js';
import Member from './Store/member.js';
import Devices from './Store/devices.js';
import { defaultProps } from 'antd-mobile/lib/search-bar/PropsType';

class HomeRoute extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      familyName: "potter",
      devices: Store.getState().devices.devices,
      members: Store.getState().members.members
    }
    Store.subscribe(() => {
      this.setState({devices: Store.getState().devices.devices, members: Store.getState().members.members})
    })

    this.setFamilyName = this.setFamilyName.bind(this);
  }

  setFamilyName(text){
    this.setState({familyName: text});
  }

  render() {
    const ScheduleButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Schedule a device
      </Button>
    );

    const MyModal = () => {
      const [visible, setVisible] = React.useState(false);
    
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {backgroundColor: 'white'};
      const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

      const DeviceItem = (props) => (
        <List.Item
          title= {props.name}
          left={props => <List.Icon {...props} icon="folder" />}
        />
      );

      const MyCard = () => (
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
          <Card.Actions>
            <Button>Back</Button>
            <Button>Next</Button>
          </Card.Actions>
        </Card>
      );

      const ChooseMemAcc = (props) => {
        const members = Store.getState().members.members;
        const memberitems = Object.keys(members).map(memberId => {
          return <DeviceItem key={memberId} name={this.state.members[memberId].name}/>
        })

        const [expanded, setExpanded] = React.useState(false);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
          <List.Section >

            <List.Accordion
              title={"Select a member"}
              left={props => <List.Icon {...props} icon="account" color="blue" />}
              expanded={expanded}
              onPress={handlePress}>
                {memberitems}
            </List.Accordion>
          </List.Section>
        );
      };

      const ChooseDevAcc = (props) => {
        const devices = Store.getState().devices.devices;
        const deviceitems = Object.keys(devices).map(deviceid => {
          return <DeviceItem key={deviceid} name={this.state.devices[deviceid].name}/>
        })

        const [expanded, setExpanded] = React.useState(false);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
          <List.Section >
            <List.Accordion
              title={"Select a device"}
              left={props => <List.Icon {...props} icon="laptop" color="blue" />}
              expanded={expanded}
              onPress={handlePress}>
                {deviceitems}
            </List.Accordion>
          </List.Section>
        );
      };

      const ChooseDayAcc = (props) => {
        const devices = Store.getState().devices.devices;
        const deviceitems = Object.keys(devices).map(deviceid => {
          return <DeviceItem key={deviceid} name={this.state.devices[deviceid].name}/>
        })

        const [expanded, setExpanded] = React.useState(false);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
          <List.Section >
            <List.Accordion
              title={"Select a day"}
              left={props => <List.Icon {...props} icon="calendar" color="blue" />}
              expanded={expanded}
              onPress={handlePress}>
                <List.Item title="Monday" />
                <List.Item title="Tuesday" />
                <List.Item title="Wednesday" />
                <List.Item title="Thursday" />
                <List.Item title="Friday" />
                <List.Item title="Saturday" />
                <List.Item title="Sunday" />
            </List.Accordion>
          </List.Section>
        );
      };

      //menu item
      const MyMenu = () => (
        <View style={{ flex: 1 }}>
          <Menu.Item icon="redo" onPress={() => {}} title="Redo" />
          <Menu.Item icon="undo" onPress={() => {}} title="Undo" />
          <Menu.Item icon="content-cut" onPress={() => {}} title="Cut" disabled />
          <Menu.Item icon="content-copy" onPress={() => {}} title="Copy" disabled />
          <Menu.Item icon="content-paste" onPress={() => {}} title="Paste" />
        </View>
      );

      const ChooseHourAcc = (props) => {
        const devices = Store.getState().devices.devices;
        const deviceitems = Object.keys(devices).map(deviceid => {
          return <DeviceItem key={deviceid} name={this.state.devices[deviceid].name}/>
        })

        const [expanded, setExpanded] = React.useState(false);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
          <List.Section >
            <List.Accordion
              title={"Select the starting hour"}
              left={props => <List.Icon {...props} icon="calendar-clock" color="blue" />}
              expanded={expanded}
              onPress={handlePress}>
                <List.Item title="1" />
                <List.Item title="2" />
                <List.Item title="3" />
                <List.Item title="4" />
                <List.Item title="5" />
                <List.Item title="6" />
                <List.Item title="7" />
                <List.Item title="8" />
                <List.Item title="9" />
                <List.Item title="10" />
                <List.Item title="11" />
                <List.Item title="12" />
            </List.Accordion>
          </List.Section>
        );
      };

      const ChooseMinuteAcc = (props) => {
        const devices = Store.getState().devices.devices;
        const deviceitems = Object.keys(devices).map(deviceid => {
          return <DeviceItem key={deviceid} name={this.state.devices[deviceid].name}/>
        })

        const [expanded, setExpanded] = React.useState(false);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
          <List.Section >
            <List.Accordion
              title={"Select the starting minute"}
              left={props => <List.Icon {...props} icon="calendar-clock" color="blue" />}
              expanded={expanded}
              onPress={handlePress}>
                <List.Item title="05" />
                <List.Item title="10" />
                <List.Item title="15" />
                <List.Item title="20" />
                <List.Item title="25" />
                <List.Item title="30" />
                <List.Item title="35" />
                <List.Item title="40" />
                <List.Item title="45" />
                <List.Item title="50" />
                <List.Item title="55" />
                <List.Item title="60" />
            </List.Accordion>
          </List.Section>
        );
      };

      const ChooseAmPmAcc = (props) => {
        const devices = Store.getState().devices.devices;
        const deviceitems = Object.keys(devices).map(deviceid => {
          return <DeviceItem key={deviceid} name={this.state.devices[deviceid].name}/>
        })

        const [expanded, setExpanded] = React.useState(false);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
          <List.Section >
            <List.Accordion
              title={"Select AM or PM"}
              left={props => <List.Icon {...props} icon="calendar-clock" color="blue" />}
              expanded={expanded}
              onPress={handlePress}>
                <List.Item title="AM" />
                <List.Item title="PM" />
            </List.Accordion>
          </List.Section>
        );
      };

      const ChooseDurationAcc = (props) => {
        const devices = Store.getState().devices.devices;
        const deviceitems = Object.keys(devices).map(deviceid => {
          return <DeviceItem key={deviceid} name={this.state.devices[deviceid].name}/>
        })

        const [expanded, setExpanded] = React.useState(false);
      
        const handlePress = () => setExpanded(!expanded);
      
        return (
          <List.Section >
            <List.Accordion
              title={"Select a duration (in minutes)"}
              left={props => <List.Icon {...props} icon="clock-outline" color="blue" />}
              expanded={expanded}
              onPress={handlePress}>
                <List.Item title="05" />
                <List.Item title="10" />
                <List.Item title="15" />
                <List.Item title="20" />
                <List.Item title="25" />
                <List.Item title="30" />
                <List.Item title="45" />
                <List.Item title="60" />
                <List.Item title="90" />
                <List.Item title="120" />
            </List.Accordion>
          </List.Section>
        );
      };

      return (
        <Provider>
          <Portal>
            <MyCard/>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <Text> Today's schedule </Text>
              <ChooseMemAcc/>
              <ChooseDevAcc/>
              <ChooseDayAcc/>
              <ChooseHourAcc/>
              <ChooseMinuteAcc/>
              <ChooseAmPmAcc/>
              {/*<ChooseStartTimeAcc/>
              <MyMenu/>*/}
              <ChooseDurationAcc/>
            </Modal>
          </Portal>
          <Button style={{height: '100vh'}} onPress={showModal}>
            Show
          </Button>
        </Provider>
      );
    };

    /*var ReadMeExampleSingle = (props) => {
      const [date, setDate] = React.useState(undefined);
      const [open, setOpen] = React.useState(false);
    
      const onDismissSingle = React.useCallback(() => {
        setOpen(false);
      }, [setOpen]);
    
      const onConfirmSingle = React.useCallback(
        (params) => {
          setOpen(false);
          setDate(params.date);
        },
        [setOpen, setDate]
      );
    
      return (
        <View>
          <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
            Pick single date
          </Button>
          <DatePickerModal
            // locale={'en'} optional, default: automatic
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
            // validRange={{
            //   startDate: new Date(2021, 1, 2),  // optional
            //   endDate: new Date(), // optional
            // }}
            // onChange={} // same props as onConfirm but triggered without confirmed by user
            // saveLabel="Save" // optional
            // label="Select date" // optional
            // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
          />
        </View>
      );
    }*/
    
      if(this.state.familyName != ""){
        return <View>
          <Headline>Welcome back to the Scheduling App, { this.state.familyName }!</Headline>
          <Title>How to use the Scheduling App: </Title>
        <Paragraph>
          Click here for tutorial : modal
        </Paragraph>
        <ScheduleButton/>
        {/*<ReadMeExampleSingle/>*/}
        <MyModal/>
        </View>
    }

    return <View>
      <Title> Welcome to the Scheduling App! </Title>
      <TextInput
          label="Family Name"
          value={this.state.familyName}
          onChangeText={text => this.setFamilyName(text)}
      />
      <Subheading>How to use the Scheduling App: </Subheading>
      <Paragraph>
        Enter your family name into the box above
      </Paragraph>
      <ScheduleButton/>
      <MyModal/>
    </View>
  }

}

class PeopleRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      count: 0,
      memberName: "",
      peoples: {}
    }
    
  }

  componentDidMount(){
    this.setState({peoples: Store.getState().members.members})

    let that = this;
    Store.subscribe(function() {
      let state = Store.getState().members.members;
      that.setState({peoples: state});
    })
  }

  addMember() {
    this.setState({ adding: true })
  }

  cancelMember() {
    this.setState({ adding: false, memberName: "" })
  }

  setMemberName(text) {
    this.setState({ memberName: text})
  }

  confirmPerson() {
    Store.dispatch(Member.addAction(this.state.memberName, "red"));
    this.setState({ memberName: "", adding: false});
  }

  render() {
    const MemberAvatar = () => (
      <Avatar.Icon color={"pink"} icon="folder" />
    );

    const MyDTable = () => (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Device Name</DataTable.Title>
          <DataTable.Title numeric>Time</DataTable.Title>
        </DataTable.Header>
    
        <DataTable.Row>
          <DataTable.Cell>Mac</DataTable.Cell>
          <DataTable.Cell numeric>4pm-5pm</DataTable.Cell>
        </DataTable.Row>
    
        <DataTable.Row>
          <DataTable.Cell>Phone</DataTable.Cell>
          <DataTable.Cell numeric>9am-11am</DataTable.Cell>
        </DataTable.Row>
    
      </DataTable>
    );

    const MemberAccordian = (props) => {
      const [expanded, setExpanded] = React.useState(false);
    
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={props.name}
            left={props => <List.Icon {...props} icon="account" color="blue" />}
            expanded={expanded}
            onPress={handlePress}>
            <MyDTable/>
          </List.Accordion>
        </List.Section>
      );
    };

    var listofpeople = Object.keys(this.state.peoples).map(personID => {
      return <MemberAccordian key={personID} name={this.state.peoples[personID].name}/>
    })

    return <View>
      <Button icon="account-plus" mode="contained" onPress={() => { this.addMember() }}>
        Add a person to your family
    </Button>
    <Portal>
      <Dialog visible = {this.state.adding} onDismiss={ () => { this.cancelMember() }}>
        <Dialog.Title> Add a member to your family </Dialog.Title>
        <Dialog.Content>
          <TextInput label = "Person Name" value = { this.state.memberName } onChangeText = { (text) => {this.setMemberName(text)}}></TextInput>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress = { () => { this.cancelMember()}}> Cancel</Button>
          <Button onPress={() => {this.confirmPerson()}}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
      <Headline> There are currently {Object.keys(this.state.peoples).length} people in your family </Headline>
      {listofpeople}
    </View>
  }

}
/*
1. Add component did mount
2. Get the store and set it as the state for devices.
3. Subscribe to the store and set the state if devices change
4. Fix our loop to make sure devices are probably shown
5. ConfirmDevice is fixed to work with the store
*/
class DevicesRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      count: 0,
      deviceName: "",
      devices: {}
    }
  }

  componentDidMount() {
    this.setState({devices: Store.getState().devices.devices})
    let that = this;
    Store.subscribe(function() {
      let state = Store.getState().devices.devices;
      that.setState({devices: state});
    })

  }

  addDevice() {
    this.setState({ adding: true })
  }

  cancelDevice() {
    this.setState({ adding: false, deviceName: "" })
  }

  setDeviceName(text) {
    this.setState({ deviceName: text})
  }

  confirmDevice() {
    Store.dispatch(Devices.addDevice(this.state.deviceName, "laptop"));
    this.setState({ deviceName: "", adding: false});
  }

  render() {
    

    const MyDTable = () => (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Member Name</DataTable.Title>
          <DataTable.Title numeric>Time</DataTable.Title>
        </DataTable.Header>
    
        <DataTable.Row>
          <DataTable.Cell>Bob</DataTable.Cell>
          <DataTable.Cell numeric>4pm-5pm</DataTable.Cell>
        </DataTable.Row>
    
        <DataTable.Row>
          <DataTable.Cell>Mary</DataTable.Cell>
          <DataTable.Cell numeric>9am-11am</DataTable.Cell>
        </DataTable.Row>
    
      </DataTable>
    );

    const DeviceAccordian = (props) => {
      const [expanded, setExpanded] = React.useState(false);
    
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={props.name}
            left={props => <List.Icon {...props} icon="cellphone-iphone" />} // laptop, television-classic, cellphone-iphone
            expanded={expanded}
            onPress={handlePress}>
            <MyDTable/>
          </List.Accordion>
        </List.Section>
      );
    };

    var listofdevices = Object.keys(this.state.devices).map(deviceID => {
      return <DeviceAccordian key={deviceID} name={ this.state.devices[deviceID].name }/> 
    })

    const MondayButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Monday
      </Button>
    );

    const TuesdayButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Tuesday
      </Button>
    );

    const WednesdayButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Wednesday
      </Button>
    );

    const ThursdayButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Thursday
      </Button>
    );

    const FridayButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Friday
      </Button>
    );

    const SaturdayButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Saturday
      </Button>
    );

    const SundayButton = () => (
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Sunday
      </Button>
    );

    return <View>
      <Button icon="account-plus" mode="contained" onPress={() => { this.addDevice() }}> Add a device to your family </Button>
    <Portal>
      <Dialog visible = {this.state.adding} onDismiss={ () => { this.cancelDevice() }}>
        <Dialog.Title> Add a device to your family </Dialog.Title>
        <Dialog.Content>
          <TextInput label = "Device Name" value = { this.state.deviceName } onChangeText = { (text) => {this.setDeviceName(text)}}></TextInput>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress = {() => {this.cancelDevice()}}> Cancel </Button>
          <Button onPress = {() => {this.confirmDevice()}}> Ok </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
      <Title> There are currently {Object.keys(this.state.devices).length} devices in your family </Title>
      {listofdevices}
      <MondayButton/>
      <TuesdayButton/>
      <WednesdayButton/>
      <ThursdayButton/>
      <FridayButton/>
      <SaturdayButton/>
      <SundayButton/>
    </View>
  }
}

function SettingsRoute() {
  return <View>
    <Title> About the app: </Title>
    <Subheading> explain why i wanted to make this app </Subheading>
  </View>
}

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'people', title: 'People', icon: 'account-supervisor' },
    { key: 'devices', title: 'Devices', icon: 'laptop-mac' },
    { key: 'settings', title: 'Settings', icon: 'cogs' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    people: PeopleRoute,
    devices: DevicesRoute,
    settings: SettingsRoute,
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
