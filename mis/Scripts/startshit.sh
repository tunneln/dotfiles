#!/bin/bash

#########################################################################################
# Noel negusse
# .startshit.sh 	sorry not very descriptive :p
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
