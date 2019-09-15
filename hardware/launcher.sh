#!/bin/sh
# launcher.sh
# navigate to home directory, then to this directory, then execute python script, then back home

cd /
cd home/pi/Documents/hack-the-north-2019/hardware/
sudo python camera.py
cd /
