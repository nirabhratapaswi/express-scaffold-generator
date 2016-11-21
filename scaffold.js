var fs = require('fs'),
	path = require('path'),
	dir = process.cwd(),
	htmlViewFile = [],
	htmlRouteFile = [],
	viewFolder = [],
	viewFile = [],
	routeFolder = [],
	routeFile = [],
	files = require('./formGenerators/files.json'),
	constructor = require('./constructor');

for (file in files.viewFiles) {
	viewFile.push(path.join(dir, "..", "views", "login", files.viewFiles[file]));
	console.log("File name: " + files.viewFiles[file]);
}

for (file in files.routeFiles) {
	routeFile.push(path.join(dir, "..", "routes", "login", files.routeFiles[file]));
	console.log("File name: " + files.routeFiles[file]);
}

for (file in files.htmlViewFiles) {
	htmlViewFile.push(path.join(dir, "formGenerators", "views", "login", files.htmlViewFiles[file]));
	console.log("File name: " + files.htmlViewFiles[file]);
}

for (file in files.htmlRouteFiles) {
	htmlRouteFile.push(path.join(dir, "formGenerators", "routes", "login", files.htmlRouteFiles[file]));
	console.log("File name: " + files.htmlRouteFiles[file]);
}

viewFolder.push(path.join(dir, "..", "views"));
viewFolder.push(path.join(dir, "..", "views", "login"));
routeFolder.push(path.join(dir, "..", "routes"));
routeFolder.push(path.join(dir, "..", "routes", "login"));

constructor.makeFolder(viewFolder, 0, viewFile, htmlViewFile, function(success, index) {
	if (success) {
		if (index >= viewFolder.length) {
			for (views in viewFile) {
				console.log("File name: " + viewFile[views]);
				constructor.makeFile(viewFile[views], htmlViewFile[views], function(success) {
					if (success) {
						console.log("Successfully created files!!");
					}
				});
			}
		}
	}
});

constructor.makeFolder(routeFolder, 0, routeFile, htmlRouteFile, function(success, index) {
	if (success) {
		if (index >= routeFolder.length) {
			for (routes in routeFile) {
				console.log("File name: " + routeFile[routes]);
				constructor.makeFile(routeFile[routes], htmlRouteFile[routes], function(success) {
					if (success) {
						console.log("Successfully created files!!");
					}
				});
			}
		}
	}
});
