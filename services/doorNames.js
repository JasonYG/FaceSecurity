const doorNames = {
  strangerName: "stranger",
  updateName: name => {
    strangerName = name;
  }
};
console.log(`stranger name is ${strangerName}`);

exports.doorNames = doorNames;
