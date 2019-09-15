# FaceSecurity - Hack the North 2019

Inspiration
---

Ever been stuck in a meeting, test, or don't have cell service? Want to ensure that your kids are safe, not leaving the house, or not letting anyone in? Has your friend ever forgot anything at your house and asked to get it while you are out? FaceSecurity solves all these problems.

What it does
---
FaceSecurity uses your social interaction on Facebook and Messenger to see who your friends are, and categorizes their permissions to access your dorm, apartment, or house with one simple message on Messenger. It can also pick times where certain people can come in, tell you which one of your friends from Facebook is at the door, or if its a random stranger.

How we built it
---
We used a Raspberry Pi + PiCamera to run a python script that uses the Graph API to grab images and names of your Facebook friends. It then builds a collection of user entries and uploads them to the AWS Recognition platform. Whenever someone comes to your door the lock queries the collection to identify if if the visitor is one of your close friends, distant friends, or a stranger on Facebook. A Node.js script runs on Heroku to handle the messenger calls to tell you who is at the door, and to grant them access or not. A servo control the doors lock and only activates it if the friend is in a special "allowed in" category.

Challenges we ran into
---
We first tried to run a python script that sends the image of the person at the door to a JS server that would then query the AWS ML, however sending the image was a large issue so we changed to handle all of that on the Rpi.

Accomplishments that we're proud of
---
We're proud of being able to merge hardware, software and 3D printing to create a product with an intuitive use case.

What's next for FaceSecurity
---
Initiate face calls when strangers are at the door, and better friend permission management.

Technologies
---
The Raspberry Pi was programmed using Python. The back-end server was created using Node.js, Express.js, Socket.io. We used Amazon Web Services for face recognition, Facebook Graph API for connecting the homeowner with friends, and the Facebook Messenger API for the chat bot.

The chatbot example on the Facebook API documentation was modified to complete the project. The example can be found [here](https://github.com/fbsamples/original-coast-clothings)
