# Dynamic Importing Demo
Testing the ability to dynamically import ES6 modules using the Fetch API.

### How It Works
When a button is clicked a fetch is sent requesting the new pages contents. When the server responds the application will create a temporary document. Then it injects the new HTML into the `innerHTML` of the temporary document. This allows us to use `querySelector` to look for our `.js-container` class. We grab our container and swap the `newContainer.innerHTML` with the current documents `container.innerHTML`.

With the HTML swapped we need to handle loading any scripts. Another fetch is sent requesting the JavaScript of the file. Once the server responds we simply create a new `<script>` element and inject our JavaScript. We then use `document.body.appendChild(script)` to append the new script to the DOM. In the example of the "Load Ajax Test" button, we're loading two console logs where one of the logs is wrapped within an immediately invoked function expression.

In our "Load Component Test" example we're loading a SampleModule class. Before we fetch the module we check to see if we already have the class within our global scope.
```
if(fileName === 'component.html' && typeof SampleModule === 'function'){
    new SampleModule();
    return;
}
```
If we have the module we'll just instantiate a new instance of it. If we don't have the module we'll use the Fetch API to retrieve the script and we'll append it to the body just as we did for the previous test.
