const doorNames = {
  strangerName: "stranger",
  updateName: function(name) {
    doorNames.strangerName = name;
  }
};

exports.doorNames = doorNames;
