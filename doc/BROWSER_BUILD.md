# Building for browsers

## Considerations 
> BeyondcoinJS will work with most modern up to date browsers. You should, however, perform your own testing to ensure BeyondcoinJS is working in your targeted browser environments. 

| Browser        | Version           | Status |
| :-------------: |:-------------:| :-------------:|
| Chrome | v11 (+) | Operational |
| Safari | v10 (+) | Operational |
| Firefox | v61 (+) | Operational |
| Opera | v55 (+) | Operational |
| Internet Explorer | v11 (+) | Operational |

BeyondcoinJS will work with most modern up to date  iOS and Android browsers.

### Installing with browsers
Client-side applications can build the browser version of BeyondcoinJS using the provided NPM scripts, this is made possible using [browserify](http://browserify.org), enabling you to use BeyondcoinJS in the browser, see the guide below. 

### Build information 
The builder will automagically compress and minify BeyondcoinJS.

### Download BeyondcoinJS from Github
In order to build the browser version of BeyondcoinJS you need to download the BeyondcoinJS source files to your machine, they are located [HERE](https://github.com/Tech1k/beyondcoinjs). 

#### Install dependencies
You must be in the same directory where you downloaded BeyondcoinJS in order to run any of the following commands. 
```
npm i
```
```
npm install -g browserify
```
```
npm install -g uglify-es
```

#### Browser build (Linux, Unix or macOS) 
```
npm run build-browser
```

#### Browser build (Windows) 
```
npm run build-browser-w
```
Then run the following command to minify/compress your BeyondcoinJS bundle.
```
npm run build-browser-c
```

#### Build output 

The bundle.js can be found relative to your build directory.

#### Webpack 

To use BeyondcoinJS with Webpack (v4) you need to include BeyondcoinJS as an external asset in your Webpack config, see example below.

```
externals: {
    beyondcoinjs: 'beyondcoinjs' 
}
```
**IMPORTANT**:  You must include the BeyondcoinJS bundle before your Webpack bundle file on your site. 
```
<script src="beyondcoinjs_bundle.js"></script>
<script src="bundle.js"></script> <!-- Webpack must always be after beyondcoinjs bundle -->
```

You can then use BeyondcoinJS as part of Webpack, see example below.
```
import beyondcoinjs from 'beyondcoinjs'; 

(async function call_test(){
var test_seed = "123";    
var seedPair = await beyondcoinjs.newTestSeedAddress(test_seed); 
console.log(seedPair.address);
})(); 
```

#### Deploy BeyondcoinJS in the browser environment
```
<html>
<body> 
<script src="beyondcoinjs_bundle.js"></script>    
    
<script>
(async function yourCustomFunction(){
    try {
        const exampleAddressPair = await beyondcoinjs.newAddress(); 
            console.log(exampleAddressPair.address); 
    } catch (error){
        console.error(`ERROR INSIDE yourCustomFunction MAIN CATCH BLOCK: ${error}`); 
    }
})()
</script>    
</body>
</html>
```

You should explore the [browserify](http://browserify.org) documentation for more complex build information.
