# Dynamic Importing Demo
Testing the ability to dynamically import ES6 modules using the Fetch API and async/await.
[View the demo](https://codewithkyle.github.io/dynamic-importing-demo/)

### How It Works
When a button is clicked a fetch is sent to the server requesting the page content for the page associated with the button. When the server responds the application will create a temporary HTML document before injecting the new HTML into the `innerHTML` of the temporary document. This allows us to use `querySelector` to look for our `.js-container` class. Next we'll grab the current document's container and swap the `newContainer.innerHTML` with the `container.innerHTML`.

With the HTML swapped we need to handle loading any new scripts. We start by using the `querySelector` to look for any `script` elements. If an element is found another fetch is sent to the requesting the JavaScript. 

Once the server responds we create a new `<script>` element and inject our JavaScript. 
```
const script = tempDocument.documentElement.querySelector('script');
```

We then use `document.body.appendChild(script)` to append the new script to the DOM.

In the example of the "Load Ajax Test", we're loading a simple script that contains two console logs.
```
console.log('normal console log');

(()=>{
    console.log('iife console log');
})();
```
In the "Load Component Test" example we're loading a `SampleModule` class. Before we fetch the module we need to check to see if the module has already be loaded and is available within the global scope.
```
if(fileName === 'component.html' && typeof SampleModule === 'function'){
    new SampleModule();
    return;
}
```
If we have the module we'll just instantiate a new instance of it. If we don't have the module we'll use the Fetch API to retrieve the script and we'll append it to the body just as we did with the previous test.
