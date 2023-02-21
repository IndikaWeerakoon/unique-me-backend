import { Person } from "../dto/person.dto"

export class PersonService {
    retrive(id: string, name: string) {
        return { response: `user retrieved ${id}: ${name}` }
    }

    create(person: Person) {
        return { response: 'User created', person }
    }
}