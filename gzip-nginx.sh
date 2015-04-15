#!/bin/bash

FILETYPES=("*.html" "*.css" "*.js" "*.ttf" "*.svg")
DIRECTORIES=$PWD/prod
 
for currentdir in $DIRECTORIES; do
    for i in "${FILETYPES[@]}"; do
        for f in $(find $currentdir -iname "$i"); do
            gzip -1 -c $f > $f.gz
        done
    done
done