broccoli-asset-manifest
=================

asset manifest compilation for broccoli

a list of assets can be friendly to a precacheing of assets in a progressive web app.


Usage for Ember Cli
-------------------

`npm install --save-dev broccoli-asset-manifest`

```JavaScript
//app/config/environment.js

ENV.manifest = {
  enabled: true,
  outputFile: "/asset-manifest.json",
  excludePaths: ['index.html', 'someother.html'],
  includePaths: ['/']
}
````


Usage for Broccoli.js
---------------------

`npm install --save broccoli-asset-manifest`

Use `broccoli-asset-manifest` as your last filter in the `Brocfile.js` like this

```JavaScript
var writeManifest = require('broccoli-asset-manifest');

...

var completeTree = mergeTrees([appJs, appCss, publicFiles]);

module.exports = mergeTrees([completeTree, writeManifest(completeTree)]);
```

Options
-------

You can pass some options as the second argument to `writeManifest`:

```JavaScript

writeManifest(completeTree, {
	outputFile: '/asset-manifest.json', // Name of the generated file - default value shown
});
```


Thanks to https://github.com/racido/broccoli-manifest/pull/9 files can be filtered using
regular expressions:

```JavaScript
{
  excludePaths: ['index.html', new RegExp(/.\.map$/)],
  includePaths: ['']
}
```

### External Files


```JavaScript
var mergeTrees = require('broccoli-merge-trees');
var manifest = require('broccoli-manifest');

...
  all app.import statements go here
...

// Write a html5 manifest.appcache file with jquery external
var completeTree = app.toTree();
var manifestTree = manifest(completeTree)
manifestTree.includePaths(["https://code.jquery.com/jquery-2.1.1.min.js"])

module.exports = mergeTrees([completeTree, manifestTree]);
```





credit:

based on the fine work of https://github.com/racido/broccoli-manifest
