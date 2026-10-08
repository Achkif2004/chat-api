const { messages, generateId } = require("../data/messages");

const findIndex = (id) => messages.findIndex((m) => m._id === String(id));

// GET /api/v1/messages  and  GET /api/v1/messages?user=username
const getAll = (req, res) => {
  const { user } = req.query;

  if (user) {
    const userMessages = messages.filter(
      (m) => m.user.toLowerCase() === String(user).toLowerCase()
    );
    return res.json({
      status: "success",
      message: `Messages from user ${user}`,
      data: { messages: userMessages },
    });
  }

  res.json({
    status: "success",
    message: "GETTING messages",
    data: { messages },
  });
};

// Fake message used when an id does not exist in our fake database
const fakeMessage = (id) => ({ _id: String(id), user: "pikachu", text: "Hi! I'm a message" });

// GET /api/v1/messages/:id
const getById = (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);
  // Unknown id: return one (fake) message, as allowed by the assignment
  const message = index === -1 ? fakeMessage(id) : messages[index];

  res.json({
    status: "success",
    message: `GETTING message ${id}`,
    data: { message },
  });
};

// Accept both { message: { user, text } } and { user, text }
const readBody = (body = {}) => body.message || body;

// POST /api/v1/messages
const create = (req, res) => {
  const { user, text } = readBody(req.body);

  if (!user || !text) {
    return res.status(400).json({
      status: "fail",
      message: "A message needs a user and a text",
      data: {
        user: !user ? "user is required" : undefined,
        text: !text ? "text is required" : undefined,
      },
    });
  }

  const message = { _id: generateId(), user, text };
  messages.push(message);

  res.json({
    status: "success",
    message: "Message saved",
    data: { message },
  });
};

// PUT /api/v1/messages/:id
const update = (req, res) => {
  const { id } = req.params;
  let index = findIndex(id);
  // PUT is an upsert: create the message with this id if it doesn't exist yet
  if (index === -1) index = messages.push(fakeMessage(id)) - 1;

  const { user, text } = readBody(req.body);
  if (user) messages[index].user = user;
  if (text) messages[index].text = text;

  res.json({
    status: "success",
    message: "Message updated",
    data: { message: messages[index] },
  });
};

// DELETE /api/v1/messages/:id
const remove = (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);
  // DELETE is idempotent: if the message is already gone we fake the delete
  if (index !== -1) messages.splice(index, 1);

  res.json({
    status: "success",
    message: "Message deleted",
    data: { message: { _id: String(id) } },
  });
};

module.exports = { getAll, getById, create, update, remove };
