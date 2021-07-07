import { createAction, createReducer, configureStore } from '@reduxjs/toolkit'
import Scheduling from '../SchedulingApp.js'

const addDevice = createAction('device/add')
const deleteDevice = createAction('device/delete')
const updateDevice = createAction('device/update')
const deleteEvent = createAction('member/deleteevent')

const addCal = createAction('calendar/add')

function deviceAdd(name, icon) {
    return {
        type: addDevice.type,
        payload: {
            name: name,
            icon: icon
        }
    }
}

function deviceDelete(id) {
    return {
        type: deleteDevice.type,
        payload: {
            id: id,
        }
    }
}

function deviceUpdate(id, changeset) {
    return {
        type: updateDevice.type,
        payload: {
            id: id,
            changeset: changeset,
        }
    }
}

function eventDelete(id, day, index) {
    return {
        type: deleteEvent.type,
        payload: {
            id: id,
            day: day,
            index: index,
        }
    }
}

function calAdd(id, day, startHour, startMin, duration) {
    return {
        type: addCal.type,
        payload: {
            id: id,
            day: day,
            startHour: startHour,
            startMin: startMin,
            duration: duration,
        }
    }
}

const DeviceState = { latestdeviceid: 1, devices: {} }

const deviceReducer = createReducer(DeviceState, (builder) => {
    builder
        .addCase(addDevice, (state, action) => {
            let deviceId = state.latestdeviceid;
            let name = action.payload.name;
            let icon = action.payload.icon;
            let newDevice = Scheduling.devices.createDevice(deviceId, name, icon);

            state.devices[deviceId] = newDevice;

            state.latestdeviceid += 1
        })
        .addCase(deleteDevice, (state, action) => {
            let deviceId = action.payload.id;
            delete state.devices[deviceId];
        })
        .addCase(updateDevice, (state, action) => {
            let deviceId = action.payload.id;
            state.devices[deviceId] = Object.assign(state.devices[deviceId], action.payload.changeset);
        })
        .addCase(deleteEvent, (state, action) => {
            let deviceId = action.payload.id;
            let day = action.payload.day;
            let index = action.payload.index;
            Scheduling.calendar.deleteEvent(state.devices[deviceId], day, index);
        })
        .addCase(addCal, (state, action) => {
            let deviceId =  action.payload.id
            let day = action.payload.day;
            let startHour = action.payload.startHour;
            let startMinute = action.payload.startMinute;
            let duration = action.payload.duration;
            
            Scheduling.calendar.createEvent(member, state.devices[deviceId], day, startHour, startMinute, duration);
        })
})

const modules = {
    reducer: deviceReducer,
    addDevice: deviceAdd,
    deleteDevice: deviceDelete,
    updateDevice: deviceUpdate,
    deleteEvent: eventDelete,
    addEvent: calAdd,
}

export default modules