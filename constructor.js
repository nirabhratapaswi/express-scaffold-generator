var fs = require('fs');

function checkExists(fileName, callback) {
	fs.exists(fileName, function(exists) {
		if (exists) {
			callback(true);
		} else {
			callback(false);
		}
	});
}

function makeFolder(folderArray, index, fileArray, copyArray, callback) {
	checkExists(folderArray[index], function(exists) {
		if (!exists) {
			fs.mkdir(folderArray[index], function(error) {
				if (error) {
					console.log("Error creating folder: " + error);
					callback(false, index);
				} else {
					index++;
					if (folderArray[index] != undefined) {
						makeFolder(folderArray, index, fileArray, copyArray, function(success, index) {
							console.log("Success creating folder :" + index + "!!");

							if (index >= folderArray.length) {
								for (items in fileArray) {
									console.log("File name: " + fileArray[items]);
									makeFile(fileArray[items], copyArray[items], function(success) {
										if (success) {
											console.log("Successfully created files!!");
										}
									});
								}
							}
						});
					}
					callback(true, index);
				}
			});
		} else {
			index++;
			if (folderArray[index] != undefined) {
				makeFolder(folderArray, index, fileArray, copyArray, function(success, index) {
					console.log("Success creating folder: " + index + "!!");
					if (index >= folderArray.length) {
						for (items in fileArray) {
							console.log("File name: " + fileArray[items]);
							makeFile(fileArray[items], copyArray[items], function(success) {
								if (success) {
									console.log("Successfully created files!!");
								}
							});
						}
					}
				});
			}
			callback(true, index);
		}
	});
}

function readFile(fileName, callback) {
	checkExists(fileName, function(exists) {
		if (exists) {
			fs.stat(fileName, function(error, stats) {
				fs.open(fileName, "r", function(error, fd) {
					if (error) {
						console.log("Error reading file: " + fileName);
						callback(false, null);
					}

					var buffer = new Buffer(stats.size);
					fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
						fs.close(fd);
						//console.log(buffer.toString("utf-8", 0, buffer.length));
						callback(true, buffer);
					});
				});

			});
		} else {
			console.log("File to be read does not exist!!: " + fileName);
			callback(false, null);
		}
	});
}

function makeFile(writeFileName, readFileName, callback) {
	fs.open(writeFileName, "w", function(error, fd) {
		if (error) {
			console.log("Error opening file: " + error);
			callback(false);
		} else {
			readFile(readFileName, function(success, buffer) {
				if (success) {
					fs.write(fd, buffer, 0, buffer.length, null, function(error, written, buffer) {
						if (error) {
							console.log("Error while writing to file: " + fd);
							callback(false);
						}
						console.log("Wrote to file!!");
						callback(true);
					});
				} else {
					console.log("Cannot write to file as problem was encountered while reading!!");
					callback(false);
				}
			});
		}
	})
}

module.exports = {

	checkExists: checkExists,
	makeFolder: makeFolder,
	readFile: readFile,
	makeFile: makeFile

}