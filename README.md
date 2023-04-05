# Shutdown Helper
Shutdown Helper is an Electron app that allows you to schedule a shutdown for your computer regardless of the platform you're using (Windows, macOS, Linux). Additionally, you can also cancel existing scheduled shutdowns.

## Installation
To install Shutdown Helper, follow these steps:

Download the appropriate installer for your operating system from the releases page.
Run the installer and follow the installation instructions.
Once the installation is complete, you can launch the app from your applications or start menu.
Usage
To schedule a shutdown, follow these steps:

Open Shutdown Helper.
Enter the desired time in the form. You can choose either minutes or hours.
Click the "Shutdown" button.
To cancel a scheduled shutdown click the "Cancel Shutdown" button.

## Development
To set up the development environment for Shutdown Helper, follow these steps:

Clone the repository.
Install dependencies: ***npm install***
Start the app in development mode: ***npm start*** (starts react).
Build the react part(frontend): ***npm run build***.
Start electron: ***npm run electron-start***.
To build the app for distribution, use the following command:

sh
Copy code
***npm run dist***
This will create a distributable package for your operating system in the dist directory.

License
This project is licensed under the MIT License.