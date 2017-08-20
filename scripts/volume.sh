#!/bin/bash

ENDPOINT=http://localhost:3000/mute

http POST $ENDPOINT volume:=$1
