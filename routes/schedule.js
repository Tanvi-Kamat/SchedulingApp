import * as React from 'react';
import { Text, Button, List, } from 'react-native-paper';
import {ScrollView} from 'react-native';
import Store from '../Store/store.js';
import Devices from '../Store/devices.js';

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
      this.onSchedule = this.onSchedule.bind(this);
  
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
  
    onSchedule() {
      console.log("Dispatch new calendar event")
      if(this.state.selectedMember == null) {
        console.log("1")
        return;
      }
      if(this.state.selectedDevice == null) {
        console.log("2")
        return;
      }
      if(this.state.selectedDay == null) {
        console.log("3")
        return;
      }
      if(this.state.selectedHour == null) {
        console.log("4")
        return;
      }
      if(this.state.selectedMinute == null) {
        console.log("5")
        return;
      }
      if(this.state.selectedAmPm == null) {
        console.log("6")
        return;
      }
      if(this.state.selectedDuration == null) {
        console.log("7")
        return;
      }
      let realHour = this.state.selectedHour;
      if(this.state.selectedAmPm == "PM") {
        realHour = ""+(parseInt(realHour) + 12)
      } 
      let that = this;
      Store.dispatch(Devices.addEvent(this.state.selectedMember, this.state.selectedDevice, this.state.selectedDay, realHour, this.state.selectedMinute, this.state.selectedDuration));
      that.setState({selectedMember: null, selectedDevice: null, selectedDay: null, selectedHour: null, selectedMinute: null, selectedAmPm: null, selectedDuration: null})
      
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
      this.setState({selectedMinute: parseInt(minute)})
    }
    selectAmPm(AmPm){
      this.setState({selectedAmPm: AmPm})
    }
    selectDuration(duration){
      this.setState({selectedDuration: parseInt(duration)})
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
        <Button icon="calendar" mode="contained" onPress={() => {console.log("t"); this.onSchedule()}}>
          Schedule a new event
        </Button>
      </ScrollView>
    }
  }

  
export default ScheduleRoute;