## Website Performance Optimization portfolio project

The project goal is to optimize the website for both mobile and desktop usage. There are 2 parts that are optimized: 
- PageSpeed Insights score for index.html
- Scrolling and resizing pizzas performances in pizza.html 

### Getting started

To get started, check out the github repository [here](https://tiffanymtlo.github.io/). 

####Part 1: Optimize PageSpeed Insights score for index.html

Here are a list of things that were edited to optimize for higher PageSpeed Insights score for [index.html](index.html):

1. The external font `<link href="//fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">` is render blocking. 
	- `@font-face` is used to remove the render blocking external font
2. The external stylesheet `<link href="css/style.css" rel="stylesheet">` is render blocking. 
	- Since `style.css` is not too large, the entire `style.css` is inlined within the `<style>` tags, so as to remove CSS render blocking 
3. The external stylesheet `<link href="css/print.css" rel="stylesheet">` is render blocking. 
	- Add media query, `media = "print"`, to tell the browser to only look at [print.css](css/print.css) when it is printing 
4. The images can be compressed to speed up rendering. 
	- Download all the images required for index.html and use `grunt` to compress all of them: 
		- `grunt responsive_images` to lower the image quality so as to lower the images' sizes
		- `grunt imagemin` is a grunt plugin to compress all the images so as to further lower the images' sizes 
5. All files can be further minified. 
	- Use `grunt cssmin` and `grunt htmlmin` to remove whitespaces and comments from all files (including HTML, CSS and Javascript)  
6. Put all Javascripts (including analytics.js and perfmatters.js) towards the end of index.html, and use `preload` to prevent parse blocking. 
	- Use `preload` to prevent delay rendering 
7. Set the width and height of the images as a style attribute like `<img style="width: 100px; height: 50px;"` to prioritize visible content (as recommended in the Project Details) 


####Part 2: Optimize scrolling and resizing pizzas performances in pizza.html

There are 2 parts that need to be optimized in pizza.html: 
	- Scrolling performance: optimize until scrolling action is 60 fps or more 
	- Resizing pizza performance: optimize until resizing pizza action is less than 5 ms 

##### Scrolling performance 
In [main.js](views/js/main.js), to smooth the scrolling performance: 

1. The `updatePositions` function is edited:  
	- To increase fps, the repeating calculations parts are extracted out of the for-loop: 
		- Variables are defined to store reused numbers, eg. `.mover` class elements, `document.body.scrollTop/1250`, the five phases, etc. 
	- A more efficient way is used to access DOM: 
		- Instead of `querySelectorAll(.mover)`, `getElementsByClassName('mover')` is used. 
	- To reduce triggering for re-layout: 
		- In the for-loop, instead of editing `items[i].style.left` every time, `items[i].style.transform` and `translateX()` are used
2. The `addEventListener('DOMContentLoaded')` function is edited: 
	- The screen only displays a handful of moving pizzas 
		- After testing with different mobile and desktop devices in dev tools, the maximum number of moving pizzas display is 8 rows, ie. 64 pizzas. So, the number of moving pizzas being generated is reduced to 64 from 200. 
3. The `.mover` class CSS style in `views/css/style.css` is edited: 
	- To reduce the time needed to paint: 
		- Use `will-change: transform` and `transform: translateZ(0)` to move the moving pizzas to their individual layers to prevent painting the entire page every time 

##### Resizing pizzas performance 
In [main.js](views/js/main.js), to smooth the resizing pizza performance: 

1. The `changePizzaSizes` function is edited: 
	- The repeating `querySelectorAll(".randomPizzaContainer")` part is extracted out of the for-loop: 
		- Variable `randomPizzas` is defined to store all the elements with `.randomPizzaContainer` class, so `querySelectorAll(".randomPizzaContainer")` only gets called once 
2. The `determineDx` function is simplified:
	- The easier way is to directly change the percentage widths of pizzas when the pizzas get resized
	- The calculation of `dx` is unnecessary 

### Grunt

#### Getting Started with Grunt

##### Updating npm 
Before setting up Grunt, ensure `npm` is up-to-date by running: 
```npm update -g npm``` 

##### Installing CLI
To put `grunt` commands in the system path, run: 
```npm install -g grunt-cli```

##### Working with an existing Grunt project
To run an existing Grunt project, including the one in this project: 
0. Check to make sure there are `Gruntfile.js` and `package.json`
1. Change to the project's root directory 
2. Install all project dependencies by running ```npm install```
3. Run Grunt with ```grunt```

##### Grunt and gruntplugins
There are 7 plugins in this project's `Gruntfile.js` file. 
They first compress and store the optimized images in an appropriate directory, then optimize CSS and HTML files. They are listed below: 
- "grunt" runs all the options to create new, compressed images in the appropriate directories, and minified all files
- "grunt htmlmin" minifies index-dev.html
- "grunt cssmin" minifies print.css
- "grunt imagemin" compresses all images and store them in images-opt
- "grunt responsive_images" compresses images to desired width and quality and store them in images-opt
- "grunt clean" cleans the directory for storing compressed images 
- "grunt mkdir" makes the directory for storing compressed images 
- "grunt copy" copies the images that do not need compression to the appropriate directory 
