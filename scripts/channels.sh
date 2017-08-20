#!/bin/bash

CHANNEL_ENDPOINT=http://localhost:3000/channel
CHANNELS_ENDPOINT=http://localhost:3000/channels

ID=$(http $CHANNELS_ENDPOINT | jq -M ".[] | select(.number == \"$1\") | .id")

http POST $CHANNEL_ENDPOINT channel:=$ID
