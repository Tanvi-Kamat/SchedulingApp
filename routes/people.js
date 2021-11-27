import * as React from 'react';
import { TextInput, Button, Portal, Dialog, Avatar, Headline, List, DataTable, Title, } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';
import Store from '../Store/store.js';
import Member from '../Store/member.js';
import { Calendar } from 'antd-mobile';
import i18n from 'i18n-js';


const peopleStyle = {
  marginTop: 20,
  marginLeft: 5,
  marginRight: 5,
  flexDirection: "column",
  justifyContent: "center",
  flex: 1,
}

class PeopleRoute extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        adding: false,
        count: 0,
        memberName: "",
        peoples: {},
        devices: Store.getState().devices.devices
      }
    }
  
    componentDidMount(){
      this.setState({peoples: Store.getState().members.members})
  
      let that = this;
      this.unsubscribe = Store.subscribe(function() {
        let state = Store.getState().members.members;
        let devices = Store.getState().devices.devices;
        that.setState({peoples: state, devices: devices});
      })
    }

    componentWillUnmount(){
      this.unsubscribe();
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
  
      const MyDTable = (props) => {
         
        const membername = props.name;
        
        const device = Object.values(this.state.devices);

        let ownedByMember = [];
        for(let i = 0; i < device.length; i++) { // Devices
          
          let calendar = Object.values(device[i].calendar)
          for(let j = 0; j < calendar.length; j++){ // Each day
            for(let k = 0; k < device[i].calendar[j].length; k++){ 
              // Each event in that day
              if( membername == Store.getState().members.members[device[i].calendar[j][k].person].name ){
                ownedByMember.push([device[i], j, device[i].calendar[j][k]]);
              }
            }
          }

        }
        let schedule = ownedByMember.map((data, index) => {
          let [device, day, event] = data;
          const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          const startEvent = new Date(event.startTime)
          const endEvent = new Date(event.endTime)

          const startTimeString =  (i18n.strftime(startEvent, "%I:%M %P"))
          const endTimeString = (i18n.strftime(endEvent, "%I:%M %P"))

        return <DataTable.Row key={index}>
        
          <DataTable.Cell >{device.name}</DataTable.Cell>
          <DataTable.Cell >{days[day]}</DataTable.Cell>
          <DataTable.Cell >{startTimeString}</DataTable.Cell>
          <DataTable.Cell >{endTimeString}</DataTable.Cell>
        </DataTable.Row>
        })
        
        return (<DataTable>
          <DataTable.Header>
            <DataTable.Title>Device</DataTable.Title>
            <DataTable.Title >Day</DataTable.Title>
            <DataTable.Title >Start Time</DataTable.Title>
            <DataTable.Title >End Time</DataTable.Title>
          </DataTable.Header>
      
          {schedule}
      
        </DataTable>)
    };
  
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
              <MyDTable name={props.name}/>
            </List.Accordion>
          </List.Section>
        );
      };
  
      var listofpeople = Object.keys(this.state.peoples).map(personID => {
        return <MemberAccordian key={personID} name={this.state.peoples[personID].name}/>
      })
  
      return <View style={peopleStyle}>
        <Title> Members currently in your family: {Object.keys(this.state.peoples).length} </Title>
        {listofpeople}
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
        
      </View>
    }
  
  }

  
export default PeopleRoute;