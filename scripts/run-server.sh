#!/bin/bash

echo "Starting uSpeak Server "
echo "Enter in the following url http://0.0.0.0:8000/"

cd ../app && exec python -m SimpleHTTPServer

