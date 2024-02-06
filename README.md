# Soundboard
Soundboard made in HTML, CSS, Javascript and built with Electron
App is already built and available in [releases](https://github.com/sankeer28/Soundboard/releases/tag/Soundboard)
Soundboard is also available online on [Github Pages](sankeer28.github.io/Soundboard/)
Test
## Features:
- Standalone app
- Sound meter with db
- Individual volume control for each audio clip
- Application remembers the volume for each clip even after closing
- Supports .ogg and mp3 files
  
## Prerequisites to build

Ensure you have met the following requirements:

* You have installed Node.js, Electron, and npm

## Building the Soundboard Executable

To install <Your-Project-Name>, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/sankeer28/Soundboard/
    ```
2. Navigate into the repository's directory:
    ```bash
    cd Soundboard
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Package the application:
    ```bash
    npm run dist
    ```
## Next Steps
- Keep the locations of the audio files in memory ( need to re-add all audio files each time application opens)
