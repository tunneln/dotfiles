#!/bin/bash
for i in {1..30}; 
do 
	ping -c 1 time.nist.gov;
\done | grep "Time to live exceeded"
