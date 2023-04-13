#!/bin/bash node

rm -rf dist
tsc
chmod +x dist/index.js
