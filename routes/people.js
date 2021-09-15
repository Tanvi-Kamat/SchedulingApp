import * as React from 'react';
import { TextInput, Button, Portal, Dialog, Avatar, Headline, List, DataTable, } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Store from '../Store/store.js';
import Member from '../Store/member.js';


const peopleStyle = StyleSheet.create({
  marginTop: 60,
  marginLeft: 5,
  marginRight: 5
})

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
      this.unsubscribe = Store.subscribe(function() {
        let state = Store.getState().members.members;
        that.setState({peoples: state});
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
  
      const MyDTable = () => (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Device</DataTable.Title>
            <DataTable.Title numeric>Time</DataTable.Title>
          </DataTable.Header>
      
          <DataTable.Row>
            <DataTable.Cell>MacExample</DataTable.Cell>
            <DataTable.Cell numeric>4pm-5pm</DataTable.Cell>
          </DataTable.Row>
      
          <DataTable.Row>
            <DataTable.Cell>PhoneExample</DataTable.Cell>
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
  
      return <View style={peopleStyle}>
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

  
export default PeopleRoute;