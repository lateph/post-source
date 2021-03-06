const DataLoader = require('dataloader');

const Source = require('../../models/source');
const User = require('../../models/user');
const Type = require('../../models/type');
const Tag = require('../../models/tag');

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const typeLoader = new DataLoader(typeIds => {
  console.log("typeLoader",typeIds)
  return Type.find({ _id: { $in: typeIds } });
});

const tagLoader = new DataLoader(typeIds => {
  console.log("typeLoader",typeIds)
  return Tag.find({ _id: { $in: typeIds } });
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
  return {
      ...source._doc,
      _id: source.id,
      creator: user.bind(this, source._doc.creator),
      type: type.bind(this, source._doc.type),
      tags: () => tagLoader.loadMany(source._doc.tags),
      thumbUrl: () => source._doc.thumb ?  `${process.env.BASE_URL}/thumb/${source._doc._id}${source._doc.thumb}`  : "",
      fileUrl: () => source._doc.file ? `${process.env.BASE_URL}/file/${source._doc.file}`  : ""
  };
};

exports.transformSource = transformSource;
exports.transformUser = transformUser;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
