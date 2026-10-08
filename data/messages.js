// Fake database: a static array that lives in memory
let nextId = 3;

const messages = [
  { _id: "1", user: "pikachu", text: "Hi! I'm a message" },
  { _id: "2", user: "john", text: "Hello" },
];

const generateId = () => String(nextId++);

module.exports = { messages, generateId };
