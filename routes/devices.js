import * as React from 'react';
import { Title, TextInput, Button, Portal, Dialog, List, DataTable, } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Store from '../Store/store.js';
import Devices from '../Store/devices.js';



const deviceStyle = StyleSheet.create({
  marginTop: 60,
  marginLeft: 5,
  marginRight: 5
})

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
      this.unsubscribe = Store.subscribe(function() {
        let state = Store.getState().devices.devices;
        that.setState({devices: state});
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
      
  
      const MyDTable = () => (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Member</DataTable.Title>
            <DataTable.Title numeric>Time</DataTable.Title>
          </DataTable.Header>
      
          <DataTable.Row>
            <DataTable.Cell>BobExample</DataTable.Cell>
            <DataTable.Cell numeric>4pm-5pm</DataTable.Cell>
          </DataTable.Row>
      
          <DataTable.Row>
            <DataTable.Cell>MaryExample</DataTable.Cell>
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
  
      return <View style={deviceStyle}>
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

export default DevicesRoute;