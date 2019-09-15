import config as keys

from picamera import PiCamera
from time import sleep
import base64
import requests

import boto3
from botocore.exceptions import ClientError
import facebook

import RPi.GPIO as GPIO


GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)
pwm = GPIO.PWM(12, 100)


camera = PiCamera()
trustedPeople = ["Brian_Machado"]
COLLECTION = "htn2019collection"

rekognition = boto3.client(
    "rekognition",
    "us-east-1",
    aws_access_key_id=keys.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=keys.AWS_SECRET_ACCESS_KEY,
)

# Rekognition functions
def search_faces_by_image(bytes, collection_id, threshold=80):
	response = rekognition.search_faces_by_image(
		Image={
			"Bytes": bytes
		},
		CollectionId=collection_id,
		FaceMatchThreshold=threshold,
	)
	return response['FaceMatches']

# Taking pictures
print("capturing...")
camera.capture('/home/pi/Desktop/image.jpg')
print("retrieving file...")
source_bytes = open('/home/pi/Desktop/image.jpg', 'rb')
print("searching in collection...")
#add all the friends to the indexing collection and add their nme as img id
#if you send a messenger thing that has their name it adds them to trusted

#index_faces(source_bytes.read(), COLLECTION, "NAME FROM FACEBOOK")

searchResult = 2
try:
    for record in search_faces_by_image(source_bytes.read(), COLLECTION):
        searchResult = 1
        face = record['Face']
        print "Matched Face ({}%)".format(record['Similarity'])
        print "  FaceId : {}".format(face['FaceId'])
        print "  ImageId : {}".format(face['ExternalImageId'])
        imageId = face['ExternalImageId']
except ClientError as e:
        searchResult = 0
        print("Unexpected error: %s" % e)
        print "no one at door"

source_bytes.close()


if(searchResult == 1 and imageId in trustedPeople):
    print "Let them in"
    #pwm.start(50)
    time.sleep(1)
elif(searchResult == 1):
    print "Untrusted friend"
elif(searchResult == 0):
    print "unknown person"

sleep(1)


