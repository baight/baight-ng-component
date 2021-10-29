import { ComponentFactoryResolver, ComponentRef, Type, Injectable, Injector,} from '@angular/core';
import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BaightAlertComponent } from './baight-alert/baight-alert.component';
import { BaightToastComponent } from './baight-toast/baight-toast.component';
import { BaightLoadingComponent } from './baight-loading/baight-loading.component';
import { BaightDialog, createBaightDialog } from './baight-dialog/baight-dialog';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CDZMumComponent } from './cdzmum/cdzmum.component';

@Injectable()
export class Hud {
    constructor (private modal: NzModalService, private message: NzMessageService, public overlay: Overlay, private injector: Injector) { }

    createDialog<T>(component: Type<T>, resolver: ComponentFactoryResolver=null) : ComponentRef<T> {
        const overlayRef = this.createOverlay()
        //overlayRef.overlayElement.style.zIndex = '100'
        const componentPortal = new ComponentPortal<T>(component, null, this.injector, resolver);
        const componentRef:ComponentRef<BaightDialog> | any = overlayRef.attach(componentPortal);
        componentRef.instance.closed.subscribe(() => {
            overlayRef.dispose()
        });
        return componentRef

        // let factory: ComponentFactory<T> = resolver.resolveComponentFactory(component);
        // let componentRef : ComponentRef<BaightDialog> | any  = this.container.createComponent(factory);
        // componentRef.instance.closed.subscribe(() => {
        //     let index = this.container.indexOf(componentRef.hostView)
        //     if (index >= 0) {
        //         this.container.remove(index)
        //     }
        // });
        // return componentRef
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

    public showToast(text: string, type: string='info') {
        const overlayRef = this.createOverlay()
        //overlayRef.overlayElement.style.zIndex = '2100'
        const componentPortal = new ComponentPortal(BaightToastComponent, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);
        componentRef.instance.text = text
        setTimeout(value => {
            componentRef.instance.hide(()=>{
                overlayRef.dispose()
            })
        }, 2600)
        // switch (type){
        //     case "info": this.message.info(text); break
        //     case "success": this.message.success(text); break
        //     case "error": this.message.error(text); break
        //     case "warning": this.message.warning(text); break
        //     case "loading": this.message.loading(text); break
        //     default: this.message.info(text); break
        // }
    }

    public showAlert(title: string, message: string, next: ()=>any, type: string='confirm') {
        // let alert = createBaightDialog(BaightAlertComponent, this.resolver, this.container);
        // alert.instance.title = title
        // alert.instance.message = message
        // if (next) {
        //     alert.instance.next.subscribe(next)
        // }
        // alert.instance.show()


        const overlayRef = this.createOverlay()
        const componentPortal = new ComponentPortal(BaightAlertComponent, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);
        componentRef.instance.title = title
        componentRef.instance.message = message
        if (next) {
            componentRef.instance.next.subscribe(next)
        }
        componentRef.instance.closed.subscribe(() => {
            overlayRef.dispose()
        });
        return;

        switch (type){
            case "confirm": 
                this.modal.confirm({ nzTitle: title, nzContent: message, 
                    nzOkText: '确定', nzOkType: 'primary', nzOnOk: next,
                    nzCancelText: "取消", }); 
                break
            case "success": 
                this.modal.success({ nzTitle: title, nzContent: message, 
                    nzOkText: '确定', nzOkType: 'primary', nzOnOk: next,
                    nzCancelText: null, }); 
                break
            case "error": 
                this.modal.error({ nzTitle: title, nzContent: message, 
                    nzOkText: '确定', nzOkType: 'primary', nzOnOk: next,
                    nzCancelText: null, }); 
                break
            case "warning": 
                this.modal.warning({ nzTitle: title, nzContent: message, 
                    nzOkText: '确定', nzOkType: 'primary', nzOnOk: next,
                    nzCancelText: null, }); 
                break
            case "info":  
                this.modal.info({ nzTitle: title, nzContent: message, 
                    nzOkText: '确定', nzOkType: 'primary', nzOnOk: next,
                    nzCancelText: null, }); 
                    break
            default: 
                this.modal.confirm({ nzTitle: title, nzContent: message, 
                    nzOkText: '确定', nzOkType: 'primary', nzOnOk: next,
                    nzCancelText: "取消", }); 
                break
        }
    }

    // showToast(text: string) {
    //     let toast = createBaightDialog(BaightToastComponent, this.resolver, this.container);
    //     toast.instance.text = text
    //     toast.instance.show()
    // }

    // showAlert(title: string = '', message: string = '', next?: () => void) : void {
    //     let alert = createBaightDialog(BaightAlertComponent, this.resolver, this.container);
    //     alert.instance.title = title
    //     alert.instance.message = message
    //     if (next) {
    //         alert.instance.next.subscribe(next)
    //     }
    //     alert.instance.show()
    // }

    private loadingOverlayRef : OverlayRef = null
    private loadingComponentRef: ComponentRef<BaightLoadingComponent> = null
    private loadingComponentPortal: ComponentPortal<BaightLoadingComponent> = null
    showLoading(){
        if (this.loadingOverlayRef == null) {
            this.loadingOverlayRef = this.createOverlay()
            //this.loadingOverlayRef.overlayElement.style.zIndex = '2100'
            console.log(this.loadingOverlayRef.overlayElement.style.zIndex)
        }
        this.loadingComponentPortal = new ComponentPortal(BaightLoadingComponent, null, this.injector);
        this.loadingComponentRef = this.loadingOverlayRef.attach(this.loadingComponentPortal);
    }

    hideLoading() {
        this.loadingComponentRef.instance.state = 'out'
        this.loadingComponentRef.instance.hide(()=>{
            this.loadingOverlayRef.detach()
        })
    }

    private createOverlay(){
        var overlayRef: OverlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay.position().global()
        });
        const overlayPane = overlayRef.overlayElement;
        //overlayPane.style.zIndex = '100';
        // overlayRef.backdropClick().subscribe(()=>{
        //     overlayRef.dispose()
        // })
        return overlayRef
    }
}
