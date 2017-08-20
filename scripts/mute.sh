#!/bin/bash

ENDPOINT=http://localhost:3000/mute
MUTED=$(http $ENDPOINT | jq '.muted')

[[ "$MUTED" == "true" ]] && VAL=false || VAL=true

http POST $ENDPOINT mute:=$VAL
