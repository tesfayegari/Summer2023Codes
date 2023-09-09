//Scope of a Variable: private, public, protected


export class Person {
    name: string;
    dateOfBirth: Date;
    countryOfOrigin: string;
    protected crime: string;

    constructor(n: string, dob: string, country: string) {
        this.name = n;
        this.dateOfBirth = new Date(dob);
        this.countryOfOrigin = country;
        this.crime = "";
    }
}

export class Student extends Person{    
    email: string;
    phone: string;
    constructor(fname: string, em: string, ph: string) {
        super(fname, "3/3/2000", "Ethiopia");        
        this.email = em;
        this.phone = ph;      
    }

    sayName() {
        console.log('My name is ' + this.name + " and email is " + this.email + " and his/her crime is " + this.crime);
    }
}

export interface iStudent {
    id: string;
    email: string;
}







