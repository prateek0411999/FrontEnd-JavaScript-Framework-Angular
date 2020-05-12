//So, I will create it in the shared folder in the filename feedback.ts.

//Now, this is the structure of the class that represents
//the data model corresponding to the form model that we're going to
//use within our Angular application
export class Feedback{
    firstname: string;
    lastname: string ;
    telnum: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;
}
//We're going to map this into the form model in
//one of the components there and also along with that,
//I will export a constant which is a string array called
//contacttype which as I
//mentioned is a string array containing three strings here,
//none, Tel, and email.
//So, now our data model structure is ready
export const ContactType =['None','Tel','Email'];
