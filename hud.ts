import { 
    Injector,
    ComponentFactoryResolver, 
    ComponentFactory, 
    ComponentRef, 
    ViewContainerRef,
    Type,
    EventEmitter,} from '@angular/core';
import { BaightAlertComponent } from './baight-alert/baight-alert.component';
import { BaightToastComponent } from './baight-toast/baight-toast.component';
import { BaightLoadingComponent } from './baight-loading/baight-loading.component';
import { BaightDialog, createBaightDialog } from './baight-dialog/baight-dialog';

export class Hud {
    constructor (private container: ViewContainerRef, private resolver: ComponentFactoryResolver) { }

    createDialog<T>(component: Type<T>, resolver: ComponentFactoryResolver) : ComponentRef<T> {
        let factory: ComponentFactory<T> = resolver.resolveComponentFactory(component);
        let componentRef : ComponentRef<BaightDialog> | any  = this.container.createComponent(factory);
        componentRef.instance.closed.subscribe(() => {
            let index = this.container.indexOf(componentRef.hostView)
            if (index >= 0) {
                this.container.remove(index)
            }
        });
        return componentRef
    }

    showDialog<T>(component: Type<T>, resolver: ComponentFactoryResolver) : void{
        let componentRef : ComponentRef<BaightDialog> | any  = this.createDialog(component, resolver)
        componentRef.instance.show()
        return 

        // let tmp : any = component
        // let selector : string = tmp.__annotations__[0].selector

        // // Create element
        // let element = document.createElement(selector);

        // // Create the component and wire it up with the element
        // let factory = this.resolver.resolveComponentFactory(component);
        // let componentRef : any = factory.create(this.injector, [], element);

        // // Attach to the view so that the change detector knows to run
        // this.applicationRef.attachView(componentRef.hostView);

        // // Listen to the close event
        // componentRef.instance.closed.subscribe(() => {
        //     alert("fff")
        //     document.body.removeChild(element);
        //     this.applicationRef.detachView(componentRef.hostView);
        // });
        // // Add to the DOM
        // document.body.appendChild(element);
        // componentRef.instance.show()
    }

    showToast(text: string) {
        let toast = createBaightDialog(BaightToastComponent, this.resolver, this.container);
        toast.instance.text = text
        toast.instance.show()
    }

    showAlert(title: string = '', message: string = '', next?: () => void) : void {
        let alert = createBaightDialog(BaightAlertComponent, this.resolver, this.container);
        alert.instance.title = title
        alert.instance.message = message
        alert.instance.next.subscribe(next)
        alert.instance.show()
    }

    private loadingComponentRef : ComponentRef<BaightLoadingComponent>
    loadingEle : any
    showLoading(){
        if (!this.loadingComponentRef) {
            this.loadingComponentRef = createBaightDialog(BaightLoadingComponent, this.resolver, this.container);
            this.loadingComponentRef.instance.show()
        }
    }

    hideLoading() {
        if (this.loadingComponentRef) {
            this.loadingComponentRef.instance.hide()
            this.loadingComponentRef = null
        }
    }
}
