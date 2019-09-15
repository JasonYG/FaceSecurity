const doorNames = {
  strangerName: "stranger",
  updateName: function(name) {
    doorNames.strangerName = name.replace("_", " ");
  },
  acceptedUsers: ["Jason Guo"],
  addAcceptedUser: function(name) {
    doorNames.acceptedUsers.append(name.replace("_", " "));
  }
};

exports.doorNames = doorNames;
