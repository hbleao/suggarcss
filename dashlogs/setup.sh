#!/bin/bash
# Setup script to copy log files to the public directory

# Create directory if it doesn't exist
mkdir -p public/data

# Copy the log file to the public directory
cp ../logs-insights-results.json public/data/

echo "Log files have been copied to the public/data directory."
