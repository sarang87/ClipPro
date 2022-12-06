README

# CLEARLY, ClipPro is bound to version 11.5.0 of electron and changing it might be the reason i cant build master or updates. fucked up shit. anyway, this branch will always have a stable running version

# Run locally

	1. Make sure electron is installed. Run the following command 
	`npm install electron`

	2. Start the app
	`npm start`

	3. Package app
	https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging

	--npm install --save-dev @electron-forge/cli-- already added to package.json

	npx electron-forge import

# Build application for platform
	npm run make

	#Copy to Mac Applications

	cp out/ClipPro-darwin-arm64/ClipPro.app/Contents/MacOS/ClipPro /Applications/