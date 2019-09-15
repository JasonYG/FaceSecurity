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

print "Seeding collection:"

friendProfiles = getProfiles.getProfiles()

names = friendProfiles.keys()
pictures = friendProfiles.values()

for(i in range len(names)){
    index_faces(pictures[i], COLLECTION, names[i])
}
