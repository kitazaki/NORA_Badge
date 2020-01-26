#!/bin/bash
if [ $# -ne 1 ]; then
  echo "usage: send.sh message" 1>&2
  exit 1
fi
python3 ./message.py $1
python3 ./led_badge_send.py message.png

