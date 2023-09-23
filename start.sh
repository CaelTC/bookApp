#!/bin/bash 

SESSION_NAME="test"

tmux has_session -t $SESSION_NAME 2>/dev/null>&1
if [ $? != 0 ]; then

    tmux new-session -d -s $SESSION_NAME
    tmux split-window -v -t $SESSION_NAME

    tmux send-keys -t $SESSION_NAME:0.0 'cd web && nvm use --lts && npm run dev' C-m
    tmux send-keys -t $SESSION_NAME:0.1 'cd server && FLASK_ENV=development && flask run' C-m

    tmux attach-session -t $SESSION_NAME
else 
    echo "SESSION ALREADY EXIST"
    tmux attach-session -t $SESSION_NAME
fi