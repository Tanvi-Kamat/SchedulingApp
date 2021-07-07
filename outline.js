

var person = {
    id: "num",
    name: "String",
    color: "choose color",
    calendar: PersonCalendarEvent,
    devCalendar: DeviceCalendarEvent,
}

var device = {
    id: "num",
    name: "String",
    icon: "choose icon",
    calendar: DeviceCalendarEvent,
}

var PersonCalendarEvent = {
    name: person,
    color: "what is your identification color",
    device: device,
    times: DeviceCalendarEvent,
    startTime: "what time do you need to use this",
    endTime: "when will you stop using this",
    frequency: "how often will this happen within a week",
}

var DeviceCalendarEvent = {
    person: "who is using this",
    startTime: "what time is this being used",
    endTime: "when will this stop being used",
}