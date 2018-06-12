var events = require('events');
var util = require('util');

//constructor
var Car = function (model) {
    this.model = model;
};

// implementation
util.inherits(Car, events.EventEmitter);

var bmw = new Car("BMW");
var ford = new Car("Ford");
var reno = new Car("Reno");

var cars = [bmw, ford, reno];
cars.forEach(function (car) {
    //event = "speed"
    car.on('speed', function (text) {
        console.log(car.model + " speed is " + text);
    });
});

bmw.emit('speed',"250 km/h");
reno.emit('speed',"150 km/h");

// example of functions
var hi = function (name) {
    console.log(`hi ${name}`);
}

function call(func) { func("rita"); }

call(hi);

setTimeout(function () {
    hi("ron");
}, 2000)
