#/bin/bash

#########################################################################################
# Noel negusse
# set_key_maps.sh 
# Simple script to map IBM trackpads & buttons to their proper roles at startup
# My Laptop: X1 Carbon ThinkPad
#########################################################################################

xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation" 1
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Button" 2
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Timeout" 200
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Axes" 6 7 4 5
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Middle Button Emulation" 1
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Middle Button Timeout" 50
synclient TouchpadOff=1

### temporary inelegant solution to alsa mute issue at boot
amixer -c 0 sset Master playback unmute
amixer -c 0 sset Headphone playback unmute
amixer -c 0 sset Speaker playback unmute
###

### Mounting NAS at boot up when home
#sudo mount -t cifs //192.168.0.7/Volume_1 ~/NAS/Volume_1 -o guest,rw,uid=1000,gid=1000,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777
#sudo mount -t cifs //192.168.0.7/Volume_2 ~/NAS/Volume_2 -o guest,rw,uid=1000,gid=1000,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777
###
