const doorNames = {
  strangerName: "stranger",
  updateName: function(name) {
    doorNames.strangerName = name.replace("_", " ");
  }
};

exports.doorNames = doorNames;
