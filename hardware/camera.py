from picamera import PiCamera
from time import sleep
import requests

camera = PiCamera()
camera.start_preview()

while(True):
    print("capturing...")
    camera.capture('/home/pi/Desktop/image.jpg')
    print("retrieving file...")
    files = {'file': open('/home/pi/Desktop/image.jpg', 'rb')}
    print("posting file...")
    #r = requests.post('https://2adc0fc4.ngrok.io/upload/1', files=files)
    #r.text
    sleep(1)


camera.stop_preview()