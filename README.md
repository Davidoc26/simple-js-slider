# simple-js-slider
It's a simple vanilla js slider

## Example
Your site should already have some markup. Only 1 block with images is enough

```html
<div class="slider">
    <img src="img/1.jpg">
    <img src="img/2.jpg">
    <img src="img/3.jpg">
</div>
```
Then you have to create a slider object.
```javascript
// parent class, images, maxwidth, maxheight, autoslide
let slider = new Slider('.slider', '.slider img', 600, 900, true); 
// also you must set images for your buttons
slider.setButtons("img/icons/previous.png", "img/icons/next.png");

// And finally render it
slider.render();
```

## Options
Before rendering, you can also change the duration of the auto slide.
```javascript
slider.options.transitionDuration = 2;
```
