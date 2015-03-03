#!/bin/bash
#########################################################################################
# Noel Negusse
# .setCorePath.sh
# A very simple script to temporarily set my core dump (made by seg faults) destination
# file as the current directory. 
# Uses: debugging segementation faults by using core dumps with a debugger like gdb
#########################################################################################

sudo bash -c 'echo core > /proc/sys/kernel/core_pattern'
ulimit -c unlimited
