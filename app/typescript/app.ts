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

        /**
         * Reporting Observer
         * @see https://developers.google.com/web/updates/2018/07/reportingobserver
         */
        //@ts-ignore
        const observer = new ReportingObserver((reports, observer) => {
            for (const report of reports) {
              console.log(report.type, report.url, report.body);
            }
        }, {buffered: true});
        observer.observe();
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

            // If we already have the module just create a new instance of it
            if(fileName === 'component.html' && typeof SampleModule === 'function'){
                new SampleModule();
                return;
            }

            const script = tempDocument.documentElement.querySelector('script');

            const scriptReponse = await fetch(script.src);
            const scriptText = await scriptReponse.text();

            const newScript:HTMLScriptElement = document.createElement('script');
            newScript.innerHTML = scriptText;
            document.body.appendChild(newScript);

            // If we're loading a module, create a new instance
            if(fileName === 'component.html'){
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