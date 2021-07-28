// Members
// a class to make a member, takes and retrns the id name and color
function createMember(id, name, color) {
    return { id: id,
    name: name,
    color: color,
    }
}
// a class to get member's id, takes member, returns id
function getId(member){
    return member.id;
}
// a class to get member's name, takes member, returns name
function getName(member) {
    return member.name;
}
// a class to get member's color, takes member, returns color
function getColor(member) {
    return member.color;
}

// Devices
// a class to make a device, takes and returns id name and icon, returns calendar of 8 lists
function createDevice(id, name, icon) {
    return { id: id,
    name: name,
    icon: icon,
    calendar: {0: [], 1:[], 2:[], 3: [], 4: [], 5: [], 6: [], 7: [], },
    }
}
// a class to get device's id, takes device, returns id
function getDeviceId(device){
    return device.id;
}
// a class to get device's name, takes device, returns name
function getDeviceName(device){
    return device.name;
}
// a class to get device's icon, takes device, returns icon
function getDeviceIcon(device){
    return device.icon;
}
// a class to get device's calendar, takes device, returns calendar
function getDeviceCal(device){
    return device.calendar;
}

// Create Event
// a class to make event, takes member device day starting hour/minute and duration
function createEvent(member, device, day, startHour, startMinute, duration) {
    // makes dates for start and end times
    var dateStartTime = new Date(0, 0, 0, startHour, startMinute);
    var dateEndTime = new Date(dateStartTime.valueOf() + (duration*60*1000))
    // goes through every event in calendar and ensures new event doesn't overlap preexisting events
    for(var i = 0; i < device.calendar[day].length; i++) {
        var ev = device.calendar[day][i];
        // if start is in between an event
        if(ev.startTime >= dateStartTime && ev.startTime < dateEndTime) {
            return false;
        }
        // if end is in between an event
        if(ev.endTime >= dateStartTime && ev.endTime < dateEndTime) {
            return false;
        }
    }
    // creates new event in device's calendar
    device.calendar[day].push(
        { person: member,
        startTime: dateStartTime,
        endTime: dateEndTime,
        }
    ) 
    return true;
} 

/*
function deleteEvent(device, day, index) {
    delete device.calendar[day][index];
}*/

// Calendar
// a class to get the device's events on each day of the week
function getMonday(device) {
    return device.calendar[0];
}
function getTuesday(device) {
    return device.calendar[1];
}
function getWednesday(device) {
    return device.calendar[2];
}
function getThursday(device) {
    return device.calendar[3];
}
function getFriday(device) {
    return device.calendar[4];
}
function getSaturday(device) {
    return device.calendar[5];
}
function getSunday(device) {
    return device.calendar[6];
}

/*function printSchedule(device){
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    device.calendar.forEach((events, i) => {
        console.log(days[i]);
        events.forEach((event, i) => {
            console.log(members[event.person].name, event.startTime);
        })
        console.log("===========================")
    });
}*/

// create general structures for members, devices and calendars
let structure = {
    members: {
        createMember: createMember,
        getId: getId,
        getName: getName,
        getColor: getColor,
    },
    devices: {
        createDevice: createDevice,
        getId: getDeviceId,
        getName: getDeviceName,
        getIcon: getDeviceIcon,
        getCal: getDeviceCal,
    },
    calendar: {
        createEvent: createEvent,
        getMonday: getMonday,
        getTuesday: getTuesday,
        getWednesday: getWednesday,
        getThursday: getThursday,
        getFriday: getFriday,
        getSaturday: getSaturday,
        getSunday: getSunday,
    },
}

export default structure;