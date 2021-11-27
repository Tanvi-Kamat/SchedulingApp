import * as React from 'react';
import { Headline, TextInput, Button, Portal, Dialog, List, DataTable, Title, } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Store from '../Store/store.js';
import Devices from '../Store/devices.js';
import i18n from 'i18n-js';


const deviceStyle = {
  marginTop: 20,
  marginLeft: 5,
  marginRight: 5,
  flexDirection: "column",
  justifyContent: "center",
  flex: 1,
}

class DevicesRoute extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        adding: false,
        count: 0,
        deviceName: "",
        devices: {},
        members: Store.getState().members.members
      }
    }
  
    componentDidMount() {
      this.setState({devices: Store.getState().devices.devices})
      let that = this;
      this.unsubscribe = Store.subscribe(function() {
        let state = Store.getState().devices.devices;
        that.setState({devices: state, members: Store.getState().members.members});
      })
  
    }

    componentWillUnmount(){
      this.unsubscribe();
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
      
      const MyDTable = (props) => {
        //let deviceID = props.id;
        let calendar = props.calendar;
        
        let events = [];
        
        for(let i = 0; i < 7; i++) {
          // We need to go thru each day
          for(let j = 0; j < calendar[i].length; j++) {
            events.push(calendar[i][j]);
          }
        }
        // need to do an update so that times show up under each device dropdown
        let schedule = events.map((event, index) => {
          const startEvent = new Date(event.startTime)
          const endEvent = new Date(event.endTime)
          const startTimeString = (i18n.strftime(startEvent, "%I:%M %P"))
          const endTimeString = (i18n.strftime(endEvent, "%I:%M %P"))
  
          return <DataTable.Row key={index}>
          <DataTable.Cell>{this.state.peoples[event.person].name}</DataTable.Cell>
          <DataTable.Cell >{startTimeString}</DataTable.Cell>
          <DataTable.Cell >{endTimeString}</DataTable.Cell>
        </DataTable.Row>
        })

        return <DataTable>
          <DataTable.Header>
            <DataTable.Title>Member</DataTable.Title>
            <DataTable.Title >Start Time</DataTable.Title>
            <DataTable.Title >End Time</DataTable.Title>
          </DataTable.Header>
          {schedule}
        </DataTable>
      };
  
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
              <MyDTable id={props.deviceid} calendar={props.calendar}/>
            </List.Accordion>
          </List.Section>
        );
      };
  
      var listofdevices = Object.keys(this.state.devices).map(deviceID => {
        return <DeviceAccordian key={deviceID} deviceid={deviceID} calendar={this.state.devices[deviceID].calendar} name={ this.state.devices[deviceID].name }/> 
      })
  
      return <View style={deviceStyle}>
        <Title> Devices currently in your family: {Object.keys(this.state.devices).length} </Title>
        {listofdevices}
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
        
      </View>
    }
  }

export default DevicesRoute;