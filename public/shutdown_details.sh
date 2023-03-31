#!/bin/bash

scheduled_shutdowns=$(atq | awk '{print $1}')
if [[ -z "$scheduled_shutdowns" ]]; then
  echo "No scheduled shutdowns found."
  exit 0
fi

for job in $scheduled_shutdowns; do
  shutdown_cmd=$(at -c "$job" | grep -i "shutdown")
  if [[ -n "$shutdown_cmd" ]]; then
    job_time=$(atq | grep "^$job" | awk '{print $2, $3, $4, $5}')
    echo "Job #$job: Shutdown scheduled at $job_time"
    echo "Command: $shutdown_cmd"
    echo ""
  fi
done
