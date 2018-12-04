const nicolas = {
  name: "Nicolas",
  age: 18,
  gender: "male"
};

const resolvers = {
  Query: {
    person: () => nicolas
  }
};

export default resolvers;
