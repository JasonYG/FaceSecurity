import config as keys
import ast
from picamera import PiCamera
from time import sleep
import base64
import requests

import boto3
from botocore.exceptions import ClientError
import facebook

import RPi.GPIO as GPIO

camera = PiCamera()
GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)
GPIO.output(12, GPIO.HIGH)
pwm = GPIO.PWM(12, 50)
pwm.start(0)

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

while (True):

    # Taking pictures
    print("capturing...")
    camera.capture('/home/pi/Desktop/image.jpg')
    print("retrieving file...")
    source_bytes = open('/home/pi/Desktop/image.jpg', 'rb')
    print("searching in collection...")
    #add all the friends to the indexing collection and add their nme as img id
    #if you send a messenger thing that has their name it adds them to trusted
    searchResult = 2
    imageId = "stranger"
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

    if(searchResult >= 1):
        print "Friend detected"
        requests.post("https://still-escarpment-52187.herokuapp.com/webhook", data = {"name": imageId, "hardcode":"true"})

    # Get request for lock
    allowedIn = ""
    allowedIn= requests.get("http://still-escarpment-52187.herokuapp.com/open").content
    print allowedIn
    if 'true' in allowedIn:
        print "cpock"
        pwm.ChangeDutyCycle(7.5)

    else:
        pwm.ChangeDutyCycle(2.5)

    #pwm.stop()
    sleep(1) # delays 2 seconds
