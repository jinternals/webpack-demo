# webpack-demo


## Webpack:

Webpack is a module bundler for modern JavaScript applications. It puts all of your assets, including js, images, fonts, css and etc. in a dependency graph and bundle them so that they can shipped with your application.

It provides fundamental solution web application problems:
* transpile
* combine
* minify and uglify
* Split dependency
* dev server
* cache Busting
* commons Chunk dependency fixing

## Configuration: 

Entry:  		The starting point of the dependency graph is known as an entry point. 

Output: 	Where to bundle your application.

Loaders:   	Process all required files in your project so that these files can be added to 
dependency graph(webpack only understands JS).
	    	
Plugin:    	Plugins are mostly used performing actions and custom functionality on 
"compilations" or "chunks" of your bundled modules.


## Placeholder:

[path] 			- file path.

[name] 		- file name.

[ext] 			-  file extension.

[hash] 			- Returns the build hash. If any portion of the build changes, this changes as well.

[chunkhash] 		- Returns an entry chunk-specific hash. Each entry defined at the configuration receives a hash of own. If any portion of the entry changes, the hash changes as well.

[contenthash]		- Returns a hash specific to content. [contenthash] is available for ExtractTextPlugin only and is the most specific option available.
