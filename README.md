# Shutdown Helper

Shutdown Helper is an Electron app that allows you to schedule a shutdown for your computer regardless of the platform you're using (Windows, macOS, Linux). Additionally, you can also cancel existing scheduled shutdowns.

## Installation

To install Shutdown Helper, follow these steps:

1. Run the installer and follow the installation instructions.
2. Once the installation is complete, you can launch the app from your applications or start menu (on windows there is no installation, it is just an executable file).

## Usage

To schedule a shutdown, follow these steps:

1. Open Shutdown Helper.
2. Enter the desired time in the form. You can choose either minutes or hours.
3. Click the "Shutdown" button.

To cancel a scheduled shutdown click the "Cancel Shutdown" button.

## Development

To set up the development environment for Shutdown Helper, follow these steps:

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the app in development mode: `npm start` (starts react).
4. Build the react part (frontend): `npm run build`.
5. Start electron: `npm run electron-start`.
6. To build the app for distribution, use the following command: `npm run dist`.


This will create a distributable package for your operating system in the `dist` directory.

Note: To build for a specific platform, use the following commands instead:
- Windows: `npm run dist:win`
- macOS: `npm run dist:mac`
- Linux: `npm run dist:linux`

## License

This project is licensed under the MIT License.

