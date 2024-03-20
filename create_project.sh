#!/bin/bash

# Prompt for the name of the new folder
echo "Please enter the name for the new folder:"
read FOLDER_NAME

# Define the destination path
DESTINATION_PATH="../../Projects/${FOLDER_NAME}"

# Create the new folder
mkdir -p "$DESTINATION_PATH" &> /dev/null
if [ $? -eq 0 ]; then
    echo "Directory created successfully."
else
    echo "Failed to create directory."
    exit 1
fi

# Copy all files and folders except the specified ones
rsync -av --progress . "$DESTINATION_PATH" --exclude .git --exclude-from=.gitignore &> /dev/null
if [ $? -eq 0 ]; then
    echo "All files copied successfully."
else
    echo "Failed to copy files."
    exit 1
fi

# Initialize a new git repository and make the first commit
cd "$DESTINATION_PATH"
git init &> /dev/null
git add . &> /dev/null
git commit -m "Initial commit" &> /dev/null
if [ $? -eq 0 ]; then
    echo "Git repository initialized and first commit made."
else
    echo "Failed to initialize git repository."
    exit 1
fi

# Open the new folder in Visual Studio Code
code .
if [ $? -eq 0 ]; then
    echo "Visual Studio Code opened successfully."
else
    echo "Failed to open Visual Studio Code."
    exit 1
fi

echo "Process completed successfully."
