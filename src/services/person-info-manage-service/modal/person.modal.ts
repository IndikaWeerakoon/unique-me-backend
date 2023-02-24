import mongoose, { Schema } from "mongoose";

export interface IPerson {
    name: { first: string, last: string};
    mobile: string;
}

const personSchema = new Schema<IPerson>({
    name: {
        first: { type: String, required: true},
        last: { type: String, required: true}
    },
    mobile: { type: String, required: true},
}, {
    collection: 'person',
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        },
        set(v: string) {
          this.name.first = v.substring(0, v.indexOf(' '));
          this.name.last = v.substring(v.indexOf(' ') + 1);
        }
      }
    }
});

export const Person = mongoose.model('Person', personSchema, 'person');