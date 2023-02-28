import { HydratedDocument } from "mongoose";
import { IPerson, Person } from "../modal/person.modal"

export class PersonService {
    async retrivePerson(id: string) {
        return Person.findById({_id: id}).exec();
    }

    async createPerson(person: IPerson) {
        try {
            const newPerson: HydratedDocument<IPerson> = new Person({
                mobile: person.mobile,
                name: person.name
            });
            console.log(newPerson)
            return newPerson.save();
        } catch (err) {
            console.log(err);
        }
        
    }
}