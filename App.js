//

import * as React from 'react';
import { BottomNavigation, Subheading, Container, Text, Title, TextInput, Paragraph, Button, Provider, Portal, Dialog, Avatar, Headline, List, Card, DataTable, Modal, Menu } from 'react-native-paper';
import {ScrollView} from 'react-native';
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

    /*const MyModal = () => {
      const [visible, setVisible] = React.useState(false);
    
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {backgroundColor: 'white'};
      const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

      const MyCard = () => (
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />}
          <Card.Actions>
            <Button>Back</Button>
            <Button>Next</Button>
          </Card.Actions>
        </Card>
      );

      return (
        <Provider>
          <Portal>
            <MyCard/>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            </Modal>
          </Portal>
          <Button style={{height: '100vh'}} onPress={showModal}>
            Show
          </Button>
        </Provider>
      );
    };*/

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
        <Title> Here is this week's schedule for all devices and people: </Title>
        <MondayButton/>
        <TuesdayButton/>
        <WednesdayButton/>
        <ThursdayButton/>
        <FridayButton/>
        <SaturdayButton/>
        <SundayButton/>
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
    </View>
  }
}

class ScheduleRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: Store.getState().devices.devices,
      members: Store.getState().members.members,
      selectedMember: null,
      selectedDevice: null,
    }
    

    this.selectMember = this.selectMember.bind(this);
    this.selectDevice = this.selectDevice.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.selectHour = this.selectHour.bind(this);
    this.selectMinute = this.selectMinute.bind(this);
    this.selectAmPm = this.selectAmPm.bind(this);
    this.selectDuration = this.selectDuration.bind(this);
    this.scheduleEvent = this.scheduleEvent.bind(this);

    Store.subscribe(() => {
      this.setState({devices: Store.getState().devices.devices, members: Store.getState().members.members})
    })
  }
    /*
    1. Create a function called schedule Device
    2. onPress of schedule button run the function
    3. Inside the function validate that all this.state.selectedMember and (all the other ones like hour, minute, duration) exists.
    4. Dispatch from the store an event called devices.addEvent(put the required stuff here)
    */
  scheduleEvent() {
    
  }

  /*
  1. Create state
  2. Create the method
  3. Bind it
  4. Pass it to the main render as a prop.
  5. Pass it to the choosewhatever component.
  6. In the individual item component set the onPress to equal the onSelect.
  */
  selectMember(memberID){
    this.setState({selectedMember: memberID})
  }
  selectDevice(deviceID){
    this.setState({selectedDevice: deviceID})
  }
  selectDay(day){
    this.setState({selectedDay: day})
  }
  selectHour(hour){
    this.setState({selectedHour: hour})
  }
  selectMinute(minute){
    this.setState({selectedMinute: minute})
  }
  selectAmPm(AmPm){
    this.setState({selectedAmPm: AmPm})
  }
  selectDuration(duration){
    this.setState({selectedDuration: duration})
  }
    
  render() {
    const DeviceItem = (props) => (
      <List.Item
        title= {props.name}
        left={props => <List.Icon {...props} icon="folder" />}
        onPress={() => {props.onSelect(props.id)}}
      />
    );

    const ChooseMemAcc = (props) => {
      const members = Store.getState().members.members;
      const memberitems = Object.keys(members).map(memberId => {
        return <DeviceItem key={memberId} id={memberId} name={this.state.members[memberId].name} onSelect={props.onMemberSelect}/>
      })
      const [expanded, setExpanded] = React.useState(false);
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >

          <List.Accordion
            title={this.state.members[this.state.selectedMember] ? this.state.members[this.state.selectedMember].name : "Select a member"}
            left={props => <List.Icon {...props} icon="account" color="blue" />}
            expanded={expanded}
            onPress={handlePress}>
              {memberitems}
          </List.Accordion>
        </List.Section>
      );
    };

    const ChooseDevAcc = (props) => {
      console.log(Store.getState())
      const devices = Store.getState().devices?.devices;
      
      if(devices == null) devices = [];
      const deviceitems = Object.keys(devices).map(deviceid => {
        return <DeviceItem
        key={deviceid}
        id={deviceid}
        name={this.state.devices[deviceid].name} 
        onSelect={props.onDeviceSelect} 
        onPress={() => {props.onSelect(props.id)}}
        />
      })

      const [expanded, setExpanded] = React.useState(false);
    
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={this.state.devices[this.state.selectedDevice] ? this.state.devices[this.state.selectedDevice].name : "Select a device"}
            left={props => <List.Icon {...props} icon="laptop" color="blue" />}
            expanded={expanded}
            onPress={handlePress}>
              {deviceitems}
          </List.Accordion>
        </List.Section>
      );
    };

    const ChooseDayAcc = (props) => {

      const [expanded, setExpanded] = React.useState(false);
    
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={this.state.selectedDay ? this.state.selectedDay : "Select a day"}
            left={props => <List.Icon {...props} icon="calendar" color="blue"/>}
            expanded={expanded}
            onPress={handlePress}>
              <List.Item title="Monday" onPress={() => props.onDaySelect("Monday")}/>
              <List.Item title="Tuesday" onPress={() => props.onDaySelect("Tuesday")}/>
              <List.Item title="Wednesday" onPress={() => props.onDaySelect("Wednesday")}/>
              <List.Item title="Thursday" onPress={() => props.onDaySelect("Thursday")}/>
              <List.Item title="Friday" onPress={() => props.onDaySelect("Friday")}/>
              <List.Item title="Saturday" onPress={() => props.onDaySelect("Saturday")}/>
              <List.Item title="Sunday" onPress={() => props.onDaySelect("Sunday")}/>
          </List.Accordion>
        </List.Section>
      );
    };

    const ChooseHourAcc = (props) => {
      const [expanded, setExpanded] = React.useState(false);
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={this.state.selectedHour ? this.state.selectedHour: "Select the starting hour"}
            left={props => <List.Icon {...props} icon="calendar-clock" color="blue" />}
            expanded={expanded}
            onPress={handlePress}>
              <List.Item title="1" onPress={() => props.onHourSelect("1")}/>
              <List.Item title="2" onPress={() => props.onHourSelect("2")}/>
              <List.Item title="3" onPress={() => props.onHourSelect("3")}/>
              <List.Item title="4" onPress={() => props.onHourSelect("4")}/>
              <List.Item title="5" onPress={() => props.onHourSelect("5")}/>
              <List.Item title="6" onPress={() => props.onHourSelect("6")}/>
              <List.Item title="7" onPress={() => props.onHourSelect("7")}/>
              <List.Item title="8" onPress={() => props.onHourSelect("8")}/>
              <List.Item title="9" onPress={() => props.onHourSelect("9")}/>
              <List.Item title="10" onPress={() => props.onHourSelect("10")}/>
              <List.Item title="11" onPress={() => props.onHourSelect("11")}/>
              <List.Item title="12" onPress={() => props.onHourSelect("12")}/>
          </List.Accordion>
        </List.Section>
      );
    };

    const ChooseMinuteAcc = (props) => {
      const [expanded, setExpanded] = React.useState(false);
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={this.state.selectedMinute ? this.state.selectedMinute : "Select the starting minute"}
            left={props => <List.Icon {...props} icon="calendar-clock" color="blue" />}
            expanded={expanded}
            onPress={handlePress}>
              <List.Item title="05" onPress={() => props.onMinuteSelect("05")}/>
              <List.Item title="10" onPress={() => props.onMinuteSelect("10")}/>
              <List.Item title="15" onPress={() => props.onMinuteSelect("15")}/>
              <List.Item title="20" onPress={() => props.onMinuteSelect("20")}/>
              <List.Item title="25" onPress={() => props.onMinuteSelect("25")}/>
              <List.Item title="30" onPress={() => props.onMinuteSelect("30")}/>
              <List.Item title="35" onPress={() => props.onMinuteSelect("35")}/>
              <List.Item title="40" onPress={() => props.onMinuteSelect("40")}/>
              <List.Item title="45" onPress={() => props.onMinuteSelect("45")}/>
              <List.Item title="50" onPress={() => props.onMinuteSelect("50")}/>
              <List.Item title="55" onPress={() => props.onMinuteSelect("55")}/>
              <List.Item title="60" onPress={() => props.onMinuteSelect("60")}/>
          </List.Accordion>
        </List.Section>
      );
    };

    const ChooseAmPmAcc = (props) => {
      const [expanded, setExpanded] = React.useState(false);
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={this.state.selectedAmPm ? this.state.selectedAmPm : "Select AM or PM"}
            left={props => <List.Icon {...props} icon="calendar-clock" color="blue" />}
            expanded={expanded}
            onPress={handlePress}>
              <List.Item title="AM" onPress={() => props.onAmPmSelect("AM")}/>
              <List.Item title="PM" onPress={() => props.onAmPmSelect("PM")}/>
          </List.Accordion>
        </List.Section>
      );
    };

    const ChooseDurationAcc = (props) => {
      const [expanded, setExpanded] = React.useState(false);
      const handlePress = () => setExpanded(!expanded);
    
      return (
        <List.Section >
          <List.Accordion
            title={this.state.selectedDuration ? this.state.selectedDuration : "Select a duration (in minutes)"}
            left={props => <List.Icon {...props} icon="clock-outline" color="blue" />}
            expanded={expanded}
            onPress={handlePress}>
              <List.Item title="05" onPress={() => props.onDurationSelect("05 minutes")}/>
              <List.Item title="10" onPress={() => props.onDurationSelect("10 minutes")}/>
              <List.Item title="15" onPress={() => props.onDurationSelect("15 minutes")}/>
              <List.Item title="20" onPress={() => props.onDurationSelect("20 minutes")}/>
              <List.Item title="25" onPress={() => props.onDurationSelect("25 minutes")}/>
              <List.Item title="30" onPress={() => props.onDurationSelect("30 minutes")}/>
              <List.Item title="45" onPress={() => props.onDurationSelect("45 minutes")}/>
              <List.Item title="60" onPress={() => props.onDurationSelect("60 minutes")}/>
              <List.Item title="90" onPress={() => props.onDurationSelect("90 minutes")}/>
              <List.Item title="120" onPress={() => props.onDurationSelect("120 minutes")}/>
          </List.Accordion>
        </List.Section>
      );
    };

    const ScheduleButton = (props) => (
      <Button icon="calendar" mode="contained" onPress={() => this.props.onSchedule}>
        Schedule a new event
      </Button>
    );

    return <ScrollView>
      <Text> Input details to schedule a new event </Text>
      <ChooseMemAcc onMemberSelect={this.selectMember}/>
      <ChooseDevAcc onDeviceSelect={this.selectDevice}/>
      <ChooseDayAcc onDaySelect={this.selectDay}/>
      <ChooseHourAcc onHourSelect={this.selectHour}/>
      <ChooseMinuteAcc onMinuteSelect={this.selectMinute}/>
      <ChooseAmPmAcc onAmPmSelect={this.selectAmPm}/>
      <ChooseDurationAcc onDurationSelect={this.selectDuration}/>
      <Text> When you are finished, press the button below to create the new event </Text>
      <ScheduleButton onSchedule={this.scheduleEvent}/>
    </ScrollView>
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
    { key: 'schedule', title: 'Schedule', icon: 'plus'},
    { key: 'settings', title: 'Settings', icon: 'cogs' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    people: PeopleRoute,
    devices: DevicesRoute,
    schedule: ScheduleRoute,
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
