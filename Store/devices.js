import { createAction, createReducer, configureStore } from '@reduxjs/toolkit'
import Scheduling from '../SchedulingApp.js'

const addDevice = createAction('device/add')
const deleteDevice = createAction('device/delete')
const updateDevice = createAction('device/update')
const deleteEvent = createAction('member/deleteevent')
const addCal = createAction('calendar/add')

// adds device's name and icon
function deviceAdd(name, icon) {
    return {
        type: addDevice.type,
        payload: {
            name: name,
            icon: icon
        }
    }
}
// deletes device using its id
function deviceDelete(deviceID) {
    return {
        type: deleteDevice.type,
        payload: {
            id: deviceID,
        }
    }
}
// updates device using its id
function deviceUpdate(deviceID, changeset) {
    return {
        type: updateDevice.type,
        payload: {
            id: deviceID,
            changeset: changeset,
        }
    }
}
// deletes device's event using id, day and index 
function eventDelete(deviceID, day, index) {
    return {
        type: deleteEvent.type,
        payload: {
            id: deviceID,
            day: day,
            index: index,
        }
    }
}
// adds an event to the calendar using the id, day, start hour/min and duration
function calAdd(memberID, deviceID, day, startHour, startMin, duration) {
    return {
        type: addCal.type,
        payload: {
            memberId: memberID,
            deviceId: deviceID,
            day: day,
            startHour: startHour,
            startMinute: startMin,
            duration: duration,
        }
    }
}

const DeviceState = { latestdeviceid: 1, devices: {} }
// reducer carries out the 
const deviceReducer = createReducer(DeviceState, (builder) => {
    builder
        // adds device by updating data and creating new device
        .addCase(addDevice, (state, action) => {
            let deviceId = state.latestdeviceid;
            let name = action.payload.name;
            let icon = action.payload.icon;
            let newDevice = Scheduling.devices.createDevice(deviceId, name, icon);

            state.devices[deviceId] = newDevice;

            state.latestdeviceid += 1
        })
        // deletes device by updating data and deleting device based on id
        .addCase(deleteDevice, (state, action) => {
            let deviceId = action.payload.id;
            delete state.devices[deviceId];
        })
        // updates device by updating data and changing specific feature
        .addCase(updateDevice, (state, action) => {
            let deviceId = action.payload.id;
            state.devices[deviceId] = Object.assign(state.devices[deviceId], action.payload.changeset);
        })
        // deletes event by updating data and removing event from device's calendar
        .addCase(deleteEvent, (state, action) => {
            let deviceId = action.payload.id;
            let day = action.payload.day;
            let index = action.payload.index;
            Scheduling.calendar.deleteEvent(state.devices[deviceId], day, index);
        })
        // adds event by updating data and creating new event with all features
        .addCase(addCal, (state, action) => {
            let memberId = action.payload.memberId;
            let deviceId =  action.payload.deviceId
            let day = action.payload.day;
            let startHour = action.payload.startHour;
            let startMinute = action.payload.startMinute;
            let duration = action.payload.duration;
            
            action.payload.success = Scheduling.calendar.createEvent(memberId, state.devices[deviceId], day, startHour, startMinute, duration);
            
        })
})
// Renaming the actions (like a dictionary) so that it has the payload (the changes themselves) when we export the functions that make the payloads
// This makes the payloads public so that it's easier to use them without having to create additional structures
const modules = {
    reducer: deviceReducer,
    addDevice: deviceAdd,
    deleteDevice: deviceDelete,
    updateDevice: deviceUpdate,
    deleteEvent: eventDelete,
    addEvent: calAdd,
}

export default modules