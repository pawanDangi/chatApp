import faker from 'faker';
import uniqid from 'uniqid';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const messages = (numberOfMessage = 10) => {
  let messageArray = []
  for (let i = 0; i < numberOfMessage; i++) {
    const statusChance = Math.random();
    const type = statusChance > 0.66 ? 'sender' : 'receiver';
    const text = faker.lorem.sentence(Math.floor(statusChance * 10), 6);
    messageArray.push({type, text})
  }
  return messageArray;
}

const newPerson = () => {
  const statusChance = Math.random();
  const fName = faker.name.firstName(statusChance > 0.66 ? 'male' : 'female');
  const lName = faker.name.firstName(statusChance > 0.66 ? 'male' : 'female');
  const email = faker.internet.email(fName.toLowerCase(), lName.toLowerCase());
  return {
    id: uniqid(`${fName}-${lName}-`),
    firstName: fName,
    lastName: lName,
    age: Math.floor(Math.random() * 30),
    email: email,
    messages: messages()
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson()
    };
  });
}
