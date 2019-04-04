export default class App{

    private _button:    HTMLButtonElement;
    private _container: HTMLElement;

    constructor(){
        this.init();
    }

    /**
     * Called when the class has be initiated
     */
    private init():void{
        this._button    = document.body.querySelector('.js-load');
        this._container = document.body.querySelector('.js-container');

        this._button.addEventListener('click', this.handleLoad);
    }

    private handleLoad:EventListener = (e:Event)=>{
        fetch(`${ window.location.origin }/ajax.html`).then((response:Response)=>{
            response.text().then((responseText)=>{
                const tempDocument:HTMLDocument = document.implementation.createHTMLDocument('temp-doc');
                tempDocument.documentElement.innerHTML = responseText;

                const newContainer = tempDocument.documentElement.querySelector('.js-container');
                this._container.innerHTML = newContainer.innerHTML;

                const script = tempDocument.documentElement.querySelector('script');
                
                fetch(script.src).then((response:Response)=>{
                    response.text().then((responseText)=>{
                        const newScript:HTMLScriptElement = document.createElement('script');
                        newScript.innerHTML = responseText;
                        document.body.appendChild(newScript);
                    });
                });
            });
        });
    }
}

/**
 * IIFE for launching the application
 */
(()=>{
    new App();
})();