import getProfiles
import config as keys

import boto3

COLLECTION = "htn2019collection"

rekognition = boto3.client(
    "rekognition",
    "us-east-1",
    aws_access_key_id=keys.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=keys.AWS_SECRET_ACCESS_KEY,
)

def index_faces(bytes, collection_id, image_id=None, attributes=()):
	response = rekognition.index_faces(
		Image={
			"Bytes": bytes
		},
		CollectionId=collection_id,
		ExternalImageId=image_id,
	    DetectionAttributes=attributes,
	)
	return response['FaceRecords']

def return_faces():
    response = rekognition.list_faces(CollectionId=COLLECTION)
    return response

oldPeopleImageID = []
oldPeopleFaceID = []
deletingNames = []
print "Seeding collection:"
for i in return_faces()["Faces"]:
    oldPeopleImageID.append(i["ExternalImageId"])
    oldPeopleFaceID.append(i["FaceId"])
friendProfiles = getProfiles.get_profiles()

names = [name.replace(' ', '_') for name in friendProfiles.keys()]
pictures = friendProfiles.values()

for j in range(0, len(names)):
    if oldPeopleImageID[j] in names:
	deletingNames.append(oldPeopleFaceID[j])
	response=rekognition.delete_faces(CollectionId=COLLECTION,
                               FaceIds=deletingNames)

for i in range(0, len(names)):
    index_faces(pictures[i], COLLECTION, names[i])

