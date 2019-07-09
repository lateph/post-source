const DataLoader = require('dataloader');

const Source = require('../../models/source');
const User = require('../../models/user');

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const typeLoader = new DataLoader(typeIds => {
  console.log("typeLoader",typeIds)
  return Bank.find({ _id: { $in: typeIds } });
});

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

const type = async typeId => {
  try {
    const type = await typeLoader.load(typeId.toString());
    return {
      ...type._doc,
      _id: type.id,
    };
  } catch (err) {
    throw err;
  }
};

const transformUser = user => {
  return {
      ...user._doc,
      _id: user.id,
  };
};

const transformSource = source => {
  console.log("source")
  return {
      ...source._doc,
      _id: source.id,
      user: user.bind(this, source._doc.user),
      type: type.bind(this, source._doc.type),
  };
};

exports.transformSource = transformSource;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
