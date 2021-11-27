import * as React from 'react';
import { Title, TextInput, Paragraph, Button, Headline, Portal, Modal, Card, Avatar, DataTable } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Store from '../Store/store.js';
import i18n from 'i18n-js';

const homeStyle = {
  marginTop: 10,
  marginLeft: 5,
  marginRight: 5,
  justifyContent: "center",
  padding: 10,
  flexDirection: "column",
  flex:1,
}

class HomeRoute extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        familyName: "",
        devices: Store.getState().devices.devices,
        members: Store.getState().members.members,
        modalVisible: false,
        modalDay: 0
      }
      
  
      this.setFamilyName = this.setFamilyName.bind(this);
      this.setVisible = this.setVisible.bind(this);
      this.setDay = this.setDay.bind(this);
    }

    componentDidMount(){
      this.unsubscribe = Store.subscribe(() => {
        this.setState({devices: Store.getState().devices.devices, members: Store.getState().members.members})
      })
    }

    componentWillUnmount(){
      this.unsubscribe();
    }
  
    setFamilyName(text){
      this.setState({familyName: text});
    }

    setVisible(status){
      this.setState({modalVisible: status})
    }

    setDay(number) {
      this.setState({modalDay: number})
    }
  
    render() {
      const MondayButton = (props) => (
        <Button icon="calendar-today" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Monday
        </Button>
      );
  
      const TuesdayButton = (props) => (
        <Button icon="calendar-today" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Tuesday
        </Button>
      );
  
      const WednesdayButton = (props) => (
        <Button icon="calendar-today" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Wednesday
        </Button>
      );
  
      const ThursdayButton = (props) => (
        <Button icon="calendar-today" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Thursday
        </Button>
      );
  
      const FridayButton = (props) => (
        <Button icon="calendar-today" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Friday
        </Button>
      );
  
      const SaturdayButton = (props) => (
        <Button icon="calendar-today" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Saturday
        </Button>
      );
  
      const SundayButton = (props) => (
        <Button icon="calendar-today" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Sunday
        </Button>
      );
  
      ////////

      const DayModal = (props) => {
        
        const containerStyle = {backgroundColor: 'white'};
        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
        const devices = Object.values(this.state.devices);
        let event = []
        
        for(let i = 0; i < devices.length; i++) {
          let deviceEvents = (devices[i].calendar[props.day])
          for(let j = 0; j < deviceEvents.length; j++) {
            event.push([devices[i], deviceEvents[j]]);
          }
        }
        
// Ignore this for now
        let schedule = event.map((data, index) => {
          const device = data[0]
          const event = data[1]
          //const options = {hour: '2-digit', minute: '2-digit', hour12: true}
          const startEvent = new Date(event.startTime)
          const endEvent = new Date(event.endTime)

          const startTimeString =  (i18n.strftime(startEvent, "%I:%M %P"))
          const endTimeString = (i18n.strftime(endEvent, "%I:%M %P"))

          return <DataTable.Row key={index}>
          <DataTable.Cell>{this.state.members[event.person].name}</DataTable.Cell>
          <DataTable.Cell >{device.name}</DataTable.Cell>
          <DataTable.Cell >{startTimeString}</DataTable.Cell>
          <DataTable.Cell >{endTimeString}</DataTable.Cell>
        </DataTable.Row>

        })
        const ScheduleTable = () => {
                  
          return (
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Member</DataTable.Title>
                <DataTable.Title >Device</DataTable.Title>
                <DataTable.Title >Start Time</DataTable.Title>
                <DataTable.Title >End Time</DataTable.Title>
              </DataTable.Header>
              
              {schedule}
              
            </DataTable>
          );
        }

        
        const MyCard = () => (
          <Card>
            <Card.Title title="Day's Schedule" subtitle="Subtitle" left={LeftContent} />
            <Card.Content>
              <ScheduleTable/>
            </Card.Content>
            <Card.Actions>
              <Button onPress={props.onDismiss}>Exit</Button>
            </Card.Actions>
          </Card>
        );
  
        return (
          <Portal>
              <Modal visible={props.visibility} onDismiss={props.onDismiss} contentContainerStyle={containerStyle}>
                <MyCard/>
              </Modal>
              </Portal>
        );


        
      };
        ///////
        if(this.state.familyName != ""){
      
          const showModal = () => this.setVisible(true);
          const hideModal = () => this.setVisible(false);
          return <View style={homeStyle}>
              
            <Headline>Welcome back to the Scheduling App, { this.state.familyName } family! Here is this week's schedule!</Headline>
              <Title> Click on a day to expand. </Title>
              <DayModal visibility={this.state.modalVisible} onDismiss={hideModal} day={this.state.modalDay}/>
              <MondayButton onPress={showModal} setDay={() => {this.setDay(0)}}/>
              <TuesdayButton onPress={showModal} setDay={() => {this.setDay(1)}}/>
              <WednesdayButton onPress={showModal} setDay={() => {this.setDay(2)}}/>
              <ThursdayButton onPress={showModal} setDay={() => {this.setDay(3)}}/>
              <FridayButton onPress={showModal} setDay={() => {this.setDay(4)}}/>
              <SaturdayButton onPress={showModal} setDay={() => {this.setDay(5)}}/>
              <SundayButton onPress={showModal} setDay={() => {this.setDay(6)}}/>
                
          </View>
      }
  
      const FamilyNameBox = () => {
        const [name, setName] = React.useState('');
      
        return <View>
          <TextInput
            label="Family Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <Button onPress={() => this.setFamilyName(name)}> Set Name </Button>
        </View>
      };

      return <View style={homeStyle}>
        <Headline> Welcome to the Scheduling App! </Headline>
        
        <View style={{flexGrow: 1, flexDirection: "column", justifyContent: "center"}}>
          <Paragraph>
            Enter your family name into the box below, and click "Set Name":
          </Paragraph>
          <FamilyNameBox/>
        </View>
        <View style={{flexGrow: 0, opacity: 0}}>
          <Headline>s</Headline>
        </View>
      </View>
    }
  
  }

  
export default HomeRoute;
