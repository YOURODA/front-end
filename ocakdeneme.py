
import pandas   as pd
import numpy    as np
import datetime as d
from   datetime import timedelta
from pandas.util.testing import rands
from datetime import timedelta
import datetime, time
from time import sleep
import Adafruit_PCA9685
import os
import sys
import termios
import tty
import pigpio
import time
from _thread import start_new_thread
import board
import busio
import adafruit_pca9685
i2c = busio.I2C(board.SCL, board.SDA)
hat = adafruit_pca9685.PCA9685(i2c)
hat.frequency = 60
led_channe0 = hat.channels[4]
led_channe1 = hat.channels[5]
led_channe2 = hat.channels[6]
led_channe3 = hat.channels[7]
led_channe4 = hat.channels[8]
led_channe5 = hat.channels[9]


#from mutagen.mp3 import MP3


RED_PIN   = 4
GREEN_PIN = 22
BLUE_PIN  = 27
STEPS     = 1

pwm = Adafruit_PCA9685.PCA9685()
bright = 255
r = 255.0
g = 0.0
b = 0.0
brightChanged = False
abort = False
state = True
pi = pigpio.pi()
print(pi.connected)
def set_servo_pulse(channel, pulse):
    pulse_length = 1000000    # 1,000,000 us per second
    pulse_length //= 60       # 60 Hz
    print('{0}us per period'.format(pulse_length))
    pulse_length //= 4096     # 12 bits of resolution
    print('{0}us per bit'.format(pulse_length))
    pulse *= 1000
    pulse //= pulse_length
    pwm.set_pwm(channel, 0, pulse)

def setLights(pin, brightness):
    realBrightness = int(int(brightness) * (float(bright) / 255.0))
    pi.set_PWM_dutycycle(pin, realBrightness)
def getCh():
    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)

    try:
        tty.setraw(fd)
        ch = sys.stdin.read(1)
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)

    return ch



# import LEDs1.py

pwm.set_pwm_freq(60)

tumsure=100

sarki_suresi = datetime.timedelta(seconds=tumsure)
sure=pd.timedelta_range(start='0 s', end=sarki_suresi, freq='01s')
sure=pd.DataFrame(dict(A=sure))
uzunluk =sure.__len__()
servo_aci_kon = pd.DataFrame(np.random.randint(200,600,size=(uzunluk, 4)), columns=list("BCDE"))
rgbled = pd.DataFrame(np.random.randint(0,65535,size=(uzunluk, 6)), columns=list('FGHIJK'))
flash= pd.DataFrame(np.random.randint(0,10,size=(uzunluk, 1)), columns=list('U'))
datamp3= pd.concat([sure,servo_aci_kon,rgbled,flash],axis=1)
then = datetime.datetime.now() + sarki_suresi
datamp3.to_csv('randomm')
def calmaBaslat(gelencsv,sarki_suresi):
    sarki_suresiTime = timedelta(seconds=sarki_suresi)
    then = datetime.datetime.now() + sarki_suresiTime
    i=1
    print('çalma başladı')
    datamp3=pd.read_json(gelencsv)
    print(datamp3)
    while sarki_suresi>i:
        birincia =datamp3.A[i-1]-1
        birincisaniye = pd.to_timedelta(datamp3.A[i-1], unit='s')
        ikincisaniye = pd.to_timedelta(datamp3.A[i], unit='s')
        print(birincisaniye)
        kalan_sure = then - datetime.datetime.now()
        sure = sarki_suresiTime - kalan_sure
        arazaman = ikincisaniye - birincisaniye
        # led1=datamp3.D[i-1]
        print("if kontrol")
        print(birincia)
        print(sure.seconds)
        if sure.seconds== birincia :
            print(datamp3.A[i-1])
            pwm.set_pwm(1, 0, int(datamp3.C[i-1]))
            print(datamp3.B[i-1])
            pwm.set_pwm(0, 0, int(datamp3.B[i-1]))
            print(datamp3.C[i-1])
            pwm.set_pwm(2, 0, int(datamp3.D[i-1]))
            pwm.set_pwm(3, 0, int(datamp3.E[i-1]))
            led_channe0 . duty_cycle = int(datamp3.F[i-1])
            led_channe1 . duty_cycle = int(datamp3.G[i-1])
            led_channe2 . duty_cycle = int(datamp3.H[i-1])
            led_channe3 . duty_cycle = int(datamp3.I[i-1])
            led_channe4 . duty_cycle = int(datamp3.J[i-1])
            led_channe5 . duty_cycle = int(datamp3.K[i-1])
            sefer=datamp3.K[ i - 1 ]
            sira=1
            while sefer>0:
                parca=sefer+1
                arazaman=(1/parca)
                while parca>sira:
                    print("led kapat")
                    led_channe0 . duty_cycle = 0
                    led_channe1 . duty_cycle = 0
                    led_channe2 . duty_cycle = 0
                    led_channe3 . duty_cycle = 0
                    led_channe4 . duty_cycle = 0
                    led_channe5 . duty_cycle = 0
                    print(arazaman)
                    sleep(arazaman)
                    print("led ac")
                    led_channe0 . duty_cycle = int(datamp3.F[i-1])
                    led_channe1 . duty_cycle = int(datamp3.G[i-1])
                    led_channe2 . duty_cycle = int(datamp3.H[i-1])
                    led_channe3 . duty_cycle = int(datamp3.I[i-1])
                    led_channe4 . duty_cycle = int(datamp3.J[i-1])
                    led_channe5 . duty_cycle = int(datamp3.K[i-1])
                    sleep(arazaman)
                    sira=sira+1
                print("led kapat")
                sleep(1/2)
                sefer=0

            sleep(arazaman)
            i=i+1
        elif sure.seconds < birincia :
            i=i
            print("data biraz ileride")
            sleep(0.001)
        else:
            i=i+2
            print("data biraz geride")
            sleep(0.001)
    print("gecmıs olsun")
    time.sleep(0.5)