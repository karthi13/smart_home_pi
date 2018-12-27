from gpiozero import MotionSensor
from picamera import PiCamera
from datetime import datetime

from firebase.firebase import FirebaseApplication
from firebase.firebase import FirebaseAuthentication
from google.cloud import storage
#from google.cloud.storage import client

import firebase_admin
from firebase_admin import credentials


import os
import subprocess
import os.path
import shlex

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="iotproject999-7849e5f382a0.json"


#import subprocess
#subprocess.call('ls &', shell=True)

print("tesstiiiing")

camera= PiCamera()
pir= MotionSensor(4)
while True:
    motion = pir.motion_detected
    if motion == True :
        print("Motion Detected!")
        try:
            camera.framerate = 20
            #filename= datatime.now().strftime("%y-%m-%d_%H.%M.%S.h264")
            filename= '/home/pi/Nordic-Thingy52-Nodejs/examples/video.h264' 
            camera.start_recording(filename)
            
            camera.wait_recording(5)
            #pir.wait_for_no_motion()
            
            print("Motion stopped!")
            camera.stop_recording()
            perform_upload_operations()
            pass
        finally:    
            camera.close()
        
    
#authenticaton = FirebaseAuthentication(EMAIL, True, True, extra={'id': '<the user id>'})
#app = FirebaseApplication('https://iotproject999-b5fee.firebaseapp.com', authenticaton)

def perform_upload_operations():
    cred = credentials.Certificate('iotproject999-b5fee-firebase-adminsdk-g3cyz-55b28f69c0.json')
    firebase_admin.initialize_app(cred, {
    'storageBucket': 'iotproject999-b5fee.appspot.com'
    })


    bucket_name='iotproject999-b5fee.appspot.com'
    client = storage.Client() #.from_service_account_json('iotproject999-7849e5f382a0.json')
    bucket = client.get_bucket(bucket_name)
    blob = bucket.blob('theVideo') #destination
    #blob.delete()
    #bucket = client.get_bucket(bucket_name)
    #blob = bucket.blob('theVideo') #destination

    print("conversion start")

    from subprocess import CalledProcessError
    command = "MP4Box -add {} {}.mp4".format("/home/pi/Nordic-Thingy52-Nodejs/examples/video.h264", os.path.splitext("forFirebase")[0])
    try:
        output = subprocess.check_output(command, stderr=subprocess.STDOUT, shell=True)
    except subprocess.CalledProcessError as e:
        print('god damn shit happenbed')

    print("conversion ended")
    #os.system("sudo MP4Box -add /home/pi/Desktop/video.h264 filename.mp4")
    #.Popen('ls /home/pi

    print("upload to storage start")
    downloadURL = blob.upload_from_filename(filename='/home/pi/Nordic-Thingy52-Nodejs/examples/forFirebase.mp4')   #/home/pi/Downloads/image.jpeg'
    print("upload to storage finished")

    print("removing files")
    os.remove("forFirebase.mp4")
    os.remove("video.h264")
    print("removing files finished")
    #print(downloadURL);

    imageBlob = bucket.get_blob('theVideo')
    imageBlob.download_as_string()
    imageBlob.make_public()
    print (format(imageBlob.public_url))




#os.system("cat /home/pi/package-lock.json")

