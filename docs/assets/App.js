"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class App {
    constructor() {
        this.handleLoad = (e) => {
            const target = e.currentTarget;
            const fileName = target.getAttribute('data-src');
            (() => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(`${window.location.origin}${window.location.pathname}${fileName}`);
                const responseText = yield response.text();
                const tempDocument = document.implementation.createHTMLDocument('temp-doc');
                tempDocument.documentElement.innerHTML = responseText;
                const newContainer = tempDocument.documentElement.querySelector('.js-container');
                this._container.innerHTML = newContainer.innerHTML;
                // If we already have the module just create a new instance of it
                if (fileName === 'component.html' && typeof SampleModule === 'function') {
                    new SampleModule();
                    return;
                }
                const script = tempDocument.documentElement.querySelector('script');
                const scriptReponse = yield fetch(script.src);
                const scriptText = yield scriptReponse.text();
                const newScript = document.createElement('script');
                newScript.innerHTML = scriptText;
                document.body.appendChild(newScript);
                // If we're loading a module, create a new instance
                if (fileName === 'component.html') {
                    new SampleModule();
                }
            }))();
        };
        this.init();
        console.log('App started');
    }
    /**
     * Called when the class has be initiated
     */
    init() {
        this._buttons = Array.from(document.body.querySelectorAll('.js-load'));
        this._container = document.body.querySelector('.js-container');
        for (let button of this._buttons) {
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
        }, { buffered: true });
        observer.observe();
    }
}
exports.default = App;
/**
 * IIFE for launching the application
 */
(() => {
    new App();
})();
//# sourceMappingURL=app.js.map