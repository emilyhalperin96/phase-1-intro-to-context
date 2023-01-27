function createEmployeeRecord(array) {

    const newObject = {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": [],

    }
    return newObject;
}


function createEmployeeRecords(employeeArray) {
    return employeeArray.map(rowOfEmployees => {
        return createEmployeeRecord(rowOfEmployees)
    })
}

function createTimeInEvent(employeeObject, dateStamp){
    
    let dateTimeArray = dateStamp.split(' ')

    employeeObject.timeInEvents.push({
        "type": "TimeIn",
        "hour": parseInt(dateTimeArray[1]),
       "date": dateTimeArray[0]
    })
    return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp){

    let dateTimeArray = dateStamp.split(' ')
    employeeObject.timeOutEvents.push({
        "type": "TimeOut",
        "hour": parseInt(dateTimeArray[1]),
       "date": dateTimeArray[0]
    })
    return employeeObject;
}

// this function takes in an employee object and the date of the form 
// given the date, find the number of hours between timein and timeout
//return the hours worked


function hoursWorkedOnDate(employeeObject, dateofForm) {
    //the in event will be the employee object's time in events
    //returns the date within the timeintEvents 
    let inEvent = employeeObject.timeInEvents.find(event => {
        return event.date === dateofForm
    })
    //the out event will be the employee objects time out events 
    //returns the date within the timeoutevents 
    let outEvent = employeeObject.timeOutEvents.find(event => {
        return event.date === dateofForm
    })
    //take their sign out and subtract the sign in
    return (outEvent.hour - inEvent.hour) / 100
}

//wagesEarnedOnDate takes in an employeeobject and the date of the form 
// uses the hoursWorkedOnDate function and multiplies the hours of PayRate
//returns the pay owed as an int 
//payPerHour
//employeeObject.payPerHour 

// function wagesEarnedOnDate(employeeObject, dateOfForm) {
//     let rawPay = hoursWorkedOnDate(employeeObject, dateOfForm) * employeeObject.payPerHour
//     return parseFloat(rawPay.toString())
// }


function wagesEarnedOnDate(employeeObject, dateOfForm) {

    return hoursWorkedOnDate(employeeObject, dateOfForm) * employeeObject.payPerHour

}

//this function takes in the employee object, and returns the pay owed for all dates
//accumulates the value of all dates worked by the employee in the record 
//find available dates
//return as a number 

//.reduce is an accumulation

function allWagesFor(employeeObject) {

    let allDates = employeeObject.timeInEvents.map(event => {
        return event.date
    })

    let wages = 0
    for (let date of allDates) {
        wages += wagesEarnedOnDate(employeeObject,date)
    }
    //after it loops through you will have total wages
    return wages
}


//takes in an array of employee records
//returns the sum of pay owed to all employees for all dates as a number 
//uses wagesEarnedOnDate to accumulate the value of all dates worked by the employee in the record
//returned as a number 
function calculatePayroll(arrayofEmployeeRecords) {
    let totalPayroll = 0 
    for (let employee of arrayofEmployeeRecords){
        totalPayroll += allWagesFor(employee)
    }

    return totalPayroll
}

