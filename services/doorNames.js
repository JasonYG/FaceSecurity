const doorNames = {
  strangerName: "stranger",
  updateName: function(name) {
    doorNames.strangerName = name.replace("_", " ");
  },
  acceptedUsers: [],
  addAcceptedUser: function(name) {
    doorNames.acceptedUsers.push(name.replace("_", " "));
  }
};

exports.doorNames = doorNames;
