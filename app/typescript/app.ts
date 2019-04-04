export default class App{

    private _buttons:   Array<HTMLButtonElement>;
    private _container: HTMLElement;

    constructor(){
        this.init();
        console.log('App started');
    }

    /**
     * Called when the class has be initiated
     */
    private init():void{
        this._buttons   = Array.from(document.body.querySelectorAll('.js-load'));
        this._container = document.body.querySelector('.js-container');

        for(let button of this._buttons){
            button.addEventListener('click', this.handleLoad);
        }
    }

    private handleLoad:EventListener = (e:Event)=>{
        const target = <HTMLElement>e.currentTarget;
        const fileName = target.getAttribute('data-src');
        (async ()=>{
            const response = await fetch(`${ window.location.origin }/${ fileName }`);
            const responseText = await response.text();

            const tempDocument:HTMLDocument = document.implementation.createHTMLDocument('temp-doc');
            tempDocument.documentElement.innerHTML = responseText;
            
            const newContainer = tempDocument.documentElement.querySelector('.js-container');
            this._container.innerHTML = newContainer.innerHTML;

            const script = tempDocument.documentElement.querySelector('script');

            const scriptReponse = await fetch(script.src);
            const scriptText = await scriptReponse.text();

            const newScript:HTMLScriptElement = document.createElement('script');
            newScript.innerHTML = scriptText;
            document.body.appendChild(newScript);

            if(fileName === 'component.html'){
                //@ts-ignore
                new SampleModule();
            }
        })();
    }
}

/**
 * IIFE for launching the application
 */
(()=>{
    new App();
})();