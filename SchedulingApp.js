// Members
function createMember(id, name, color) {
    return { id: id,
    name: name,
    color: color,
    }
}
function getId(member){
    return member.id;
}
function getName(member) {
    return member.name;
}
function getColor(member) {
    return member.color;
}


//  Devices
function createDevice(id, name, icon) {
    return { id: id,
    name: name,
    icon: icon,
    calendar: {0: [], 1:[], 2:[], 3: [], 4: [], 5: [], 6: [], 7: [], },
    }
}

function getDeviceId(device){
    return device.id;
}
function getDeviceName(device){
    return device.name;
}
function getDeviceIcon(device){
    return device.icon;
}
function getDeviceCal(device){
    return device.calendar;
}
// create event
function createEvent(member, device, day, startHour, startMinute, duration) {

    var dateStartTime = new Date(0, 0, 0, startHour, startMinute);
    var dateEndTime = new Date(dateStartTime.valueOf() + (duration*60*1000))
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

    device.calendar[day].push(
        { person: member,
        startTime: dateStartTime,
        endTime: dateEndTime,
        }
    ) 
    return true;
} 

function deleteEvent(device, day, index) {
    delete device.calendar[day][index];
}


// Calendar
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



function printSchedule(device){
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    device.calendar.forEach((events, i) => {
        console.log(days[i]);
        events.forEach((event, i) => {
            console.log(members[event.person].name, event.startTime);
        })
        console.log("===========================")
    });
}


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