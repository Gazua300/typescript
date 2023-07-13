"use strict";
class ClassUser {
    constructor(id, name, email) {
        this.sayMyName = () => {
            return this.name;
        };
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
class Employee extends ClassUser {
    constructor(id, name, email) {
        super(id, name, email);
        this.whatMyEmail = () => {
            return this.name;
        };
    }
}
const employee = new Employee(1, 'Flamarion', 'mesmo245@gmail.com');
const classUser = new ClassUser(3, 'Gazua', 'gazua@gmail.com');
console.log(employee);
