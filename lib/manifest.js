var fs = require("fs");
var path = require('path');
var brocWriter = require("broccoli-writer");
var helpers = require("broccoli-kitchen-sink-helpers");

var BroccoliManifest = function BroccoliManifest(inTree, options) {
  if (!(this instanceof BroccoliManifest)) {
    return new BroccoliManifest(inTree, options);
  }
  this.inTree = inTree;
  options = options || {};
  this.outputFile = options.outputFile || "/asset-manifest.json";
  this.includePaths = options.includePaths || [];

  this.network = options.network || ['*'];
  this.fallback = options.fallback || [];
  this.showCreateDate = options.showCreateDate;
};

BroccoliManifest.prototype = Object.create(brocWriter.prototype);
BroccoliManifest.prototype.constructor = BroccoliManifest;

BroccoliManifest.prototype.write = function(readTree, destDir) {
  var outputFile = this.outputFile;
  var includePaths = this.includePaths;
  var network = this.network;
  var fallback = this.fallback;
  var showCreateDate = this.showCreateDate;
  return readTree(this.inTree).then(function (srcDir) {
    var result = [/* "CACHE MANIFEST" */];

    // if (showCreateDate) {
    //   result.push("# created " + (new Date()).toISOString());
    // } else {
    //   result.push("# " + Math.random().toString(36).substr(2));
    // }

    // result.push("", "CACHE:");

    getFilesRecursively(srcDir, [ "**/*" ]).forEach(function (file) {
      var srcFile = path.join(srcDir, file);
      var stat = fs.lstatSync(srcFile);

      if (!stat.isFile() && !stat.isSymbolicLink())
        return;

      result.push(file);
    });

    includePaths.forEach(function (file) {
      result.push(file);
    });

    // result.push("","NETWORK:");

    // network.forEach(function (line) {
    //   result.push(line);
    // });

    // if (fallback.length) {
    //   result.push("", "FALLBACK:");
    //   result.push.apply(result, fallback);
    // }

    fs.writeFileSync(path.join(destDir, outputFile), JSON.stringify(result));
  });
};

BroccoliManifest.prototype.addExternalFile = function(file) {
  this.externalFiles.push(file);
}

function getFilesRecursively(dir, globPatterns) {
  return helpers.multiGlob(globPatterns, { cwd: dir });
}

module.exports = BroccoliManifest;
