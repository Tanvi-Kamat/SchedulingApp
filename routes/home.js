import * as React from 'react';
import { Subheading, Title, TextInput, Paragraph, Button, Headline, Provider, Portal, Modal, Card, Avatar, DataTable } from 'react-native-paper';
import { View } from 'react-native';
import Store from '../Store/store.js';


class HomeRoute extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        familyName: "potter",
        devices: Store.getState().devices.devices,
        members: Store.getState().members.members,
        modalVisible: false,
        modalDay: 0
      }
      Store.subscribe(() => {
        this.setState({devices: Store.getState().devices.devices, members: Store.getState().members.members})
      })
  
      this.setFamilyName = this.setFamilyName.bind(this);
      this.setVisible = this.setVisible.bind(this);
      this.setDay = this.setDay.bind(this);
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
        <Button icon="camera" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Monday
        </Button>
      );
  
      const TuesdayButton = (props) => (
        <Button icon="camera" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Tuesday
        </Button>
      );
  
      const WednesdayButton = (props) => (
        <Button icon="camera" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Wednesday
        </Button>
      );
  
      const ThursdayButton = (props) => (
        <Button icon="camera" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Thursday
        </Button>
      );
  
      const FridayButton = (props) => (
        <Button icon="camera" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Friday
        </Button>
      );
  
      const SaturdayButton = (props) => (
        <Button icon="camera" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Saturday
        </Button>
      );
  
      const SundayButton = (props) => (
        <Button icon="camera" mode="contained" onPress={() => {props.onPress(); props.setDay()}}>
          Sunday
        </Button>
      );
  
      ////////

      const DayModal = (props) => {
        
        const containerStyle = {backgroundColor: 'white'};
        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
        const devices = Object.values(this.state.devices);
        let event = []
        // I want you to loop thru all devices, get the day (props.day), get the events that happen for that day for that device
        for(let i = 0; i < devices.length; i++) {
          console.log("--- SCHEDULE ---")
          let deviceEvents = (devices[i].calendar[props.day])
          for(let j = 0; j < deviceEvents.length; j++) {
      
            event.push([devices[i], deviceEvents[j]]);

          }
        }
        console.log(event);
        
// Ignore this for now
        let schedule = event.map(data => {
          const device = data[0]
          const event = data[1]

          return <DataTable.Row>
          <DataTable.Cell>{this.state.members[event.person].name}</DataTable.Cell>
          <DataTable.Cell >{device.name}</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

        })
        const ScheduleTable = () => {
                  
          return (
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Member</DataTable.Title>
                <DataTable.Title >Device</DataTable.Title>
                <DataTable.Title numeric>Time Slots</DataTable.Title>
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
          return <View>
              <Provider>
              
                <Headline>Welcome back to the Scheduling App, { this.state.familyName }!</Headline>
                  <Title> Here is this week's schedule. Click on a day to expand. </Title>
                  <DayModal visibility={this.state.modalVisible} onDismiss={hideModal} day={this.state.modalDay}/>
                  <MondayButton onPress={showModal} setDay={() => {this.setDay(0)}}/>
                  <TuesdayButton onPress={showModal} setDay={() => {this.setDay(1)}}/>
                  <WednesdayButton onPress={showModal} setDay={() => {this.setDay(2)}}/>
                  <ThursdayButton onPress={showModal} setDay={() => {this.setDay(3)}}/>
                  <FridayButton onPress={showModal} setDay={() => {this.setDay(4)}}/>
                  <SaturdayButton onPress={showModal} setDay={() => {this.setDay(5)}}/>
                  <SundayButton onPress={showModal} setDay={() => {this.setDay(6)}}/>
                
              </Provider>
          </View>
      }
  
      return <View>
          <Provider>
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
        </Provider>
      </View>
    }
  
  }

  
export default HomeRoute;
