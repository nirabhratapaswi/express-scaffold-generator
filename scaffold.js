var fs = require('fs'),
	path = require('path'),
	dir = process.cwd(),
	htmlViewFile = [],
	htmlRouteFile = [],
	viewFolder = [],
	viewFile = [],
	routeFolder = [],
	routeFile = [],
	modelFolder = [],
	modelFile = [],
	modelReadFile = [],
	javascriptFolder = [],
	javascriptReadFile = [],
	javascriptFile = [],
	files = require('./formGenerators/files.json'),
	constructor = require('./constructor');

for (file in files.viewFiles) {
	viewFile.push(path.join(dir, "..", "views", "login", files.viewFiles[file]));
}

for (file in files.routeFiles) {
	routeFile.push(path.join(dir, "..", "routes", "login", files.routeFiles[file]));
}

for (file in files.htmlViewFiles) {
	htmlViewFile.push(path.join(dir, "formGenerators", "views", "login", files.htmlViewFiles[file]));
}

for (file in files.htmlRouteFiles) {
	htmlRouteFile.push(path.join(dir, "formGenerators", "routes", "login", files.htmlRouteFiles[file]));
}

for (file in files.modelFiles) {
	modelFile.push(path.join(dir, "..", "models", "login", files.modelFiles[file]));
}

for (file in files.modelReadFiles) {
	modelReadFile.push(path.join(dir, "formGenerators", "models", "login", files.modelReadFiles[file]));
}

for (file in files.javascriptFiles) {
	javascriptReadFile.push(path.join(dir, "formGenerators", "public", "javascripts", files.javascriptFiles[file]));
}

for (file in files.javascriptFiles) {
	javascriptFile.push(path.join(dir, "..", "public", "javascript", files.javascriptFiles[file]));
}

viewFolder.push(path.join(dir, "..", "views"));
viewFolder.push(path.join(dir, "..", "views", "login"));
routeFolder.push(path.join(dir, "..", "routes"));
routeFolder.push(path.join(dir, "..", "routes", "login"));
modelFolder.push(path.join(dir, "..", "models"));
modelFolder.push(path.join(dir, "..", "models", "login"));
javascriptFolder.push(path.join(dir, "..", "public"));
javascriptFolder.push(path.join(dir, "..", "public", "javascripts"));

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

constructor.makeFolder(modelFolder, 0, modelFile, modelReadFile, function(success, index) {
	if (success) {
		if (index >= modelFolder.length) {
			for (models in modelFile) {
				console.log("File name: " + modelFile[models]);
				constructor.makeFile(modelFile[models], modelReadFile[models], function(success) {
					if (success) {
						console.log("Successfully created files!!");
					}
				});
			}
		}
	}
});

constructor.makeFolder(javascriptFolder, 0, javascriptFile, javascriptReadFile, function(success, index) {
	if (success) {
		if (index >= javascriptFolder.length) {
			for (javascripts in javascriptFile) {
				console.log("File name: " + javascriptFile[javascripts]);
				constructor.makeFile(javascriptFile[javascripts], javascriptReadFile[javascripts], function(success) {
					if (success) {
						console.log("Successfully created files!!");
					}
				});
			}
		}
	}
});
