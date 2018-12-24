export const people = [
  {
    id: 1,
    name: "Nicolas",
    age: 18,
    gender: "male"
  },
  {
    id: 2,
    name: "Nicolas2",
    age: 28,
    gender: "male"
  },
  {
    id: 3,
    name: "Nicola3",
    age: 38,
    gender: "male"
  }
];

export const getById = id => {
  const filteredPeople = people.filter(person => person.id === id);
  return filteredPeople[0];
};
