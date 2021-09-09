import { beforeEach, expect, it } from '@jest/globals';
import JestSnapshot from 'jest-snapshot';
import contactOptions from './class';
import contact from './class';

jest.mock('./class.js')
// beforeEach(() => {
//     // Clear all instances and calls to constructor and all methods:
//     contactOptions.mockClear();
// });

// const contactOptions = require('./class')
// const contact = require('./class')
test('We can check if the consumer called the class constructor', () => {
    let contacts = new contactOptions()
    contacts.newContact("John Doe","Jphn@brdg.app",0,14)

    // expect(contactOption.mock.calls.length).toBe(1)
    expect(contacts.contactOptions[0].firstName).toBe('John')
})
