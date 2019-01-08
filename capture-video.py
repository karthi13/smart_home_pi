from gpiozero import MotionSensor
from picamera import PiCamera
from datetime import datetime
from firebase.firebase import FirebaseApplication
from firebase.firebase import FirebaseAuthentication
from google.cloud import storage
import firebase_admin
from firebase_admin import credentials
import os
import subprocess
import os.path
import shlex
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="iotproject999-7849e5f382a0.json"
cred = credentials.Certificate('iotproject999-b5fee-firebase-adminsdk-g3cyz-55b28f69c0.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'iotproject999-b5fee.appspot.com'
})
pir= MotionSensor(4)

while True:
    motion = pir.motion_detected
    if motion == True :
        try:
            camera= PiCamera()
            camera.framerate = 20
            #filename= datatime.now().strftime("%y-%m-%d_%H.%M.%S.h264")
            filename= '/home/pi/Desktop/smart_home_pi/video.h264'
            camera.start_recording(filename)
            camera.wait_recording(5)
            #pir.wait_for_no_motion()
            camera.stop_recording()
            camera.close()
            command = "MP4Box -add {} {}.mp4".format(filename, os.path.splitext("forFirebase")[0])
            try:
                output = subprocess.check_output(command, stderr=subprocess.STDOUT, shell=True)
            except subprocess.CalledProcessError as e:
                print('error error in converting')
            print('conversion done')
            pass
        finally:
            break