import { Input, Output, EventEmitter, ComponentFactoryResolver, ComponentRef, Type, ComponentFactory, ViewContainerRef, OnInit, ElementRef, Renderer2, RendererStyleFlags2 } from '@angular/core';

export class BaightDialog{
  state: 'in' | 'out';
  backgroundLocalName = 'cdz-center'

  @Input() autoHide = true;
  
  @Output()
  closed = new EventEmitter();

  private mouseDownTarget = null
  constructor(protected host:ElementRef, protected render:Renderer2, ZIndex=1000){
    this.render.setStyle(this.host.nativeElement, "z-index", ZIndex.toString())
    this.render.setStyle(this.host.nativeElement, "position", "fixed")
    this.render.setStyle(this.host.nativeElement, "top", "0")
    this.render.setStyle(this.host.nativeElement, "bottom", "0")
    this.render.setStyle(this.host.nativeElement, "left", "0")
    this.render.setStyle(this.host.nativeElement, "right", "0")
    this.render.setStyle(this.host.nativeElement, "display", "inline-flex")

    this.render.listen(this.host.nativeElement, "mousedown", (event:MouseEvent)=>{
      this.mouseDownTarget = event.target;
    })

    this.render.listen(this.host.nativeElement, "mouseup", (event:any)=>{
      if (this.autoHide && this.mouseDownTarget == event.target &&
        event.target.localName == this.backgroundLocalName ) {
          this.hide()
      }
      this.mouseDownTarget = null;
    })

    this.render.listen(this.host.nativeElement, 'transitionend', (event:any)=>{
      if (this.state == 'out' && event.propertyName == 'opacity' &&
      event.target == this.host.nativeElement) {
        this.closed.next();
      }
    })
    this.setOpacityAnimated()
  }

  private _hasSetAnimated = false
  show(fadeIn:boolean=false){
    if (fadeIn) {
      this.render.setStyle(this.host.nativeElement, 'opacity', "0")
      this.setOpacityAnimated()
    }
    window.setTimeout(event=>{
        this.render.setStyle(this.host.nativeElement, 'opacity', "1")
        this.state = 'in'
    }, 0.1)
  }

  hide(fadeOut:boolean=true){
      if (fadeOut) {
        this.setOpacityAnimated()
      }
      else {
        this.render.setStyle(this.host.nativeElement, 'transition', null)
        this.render.setStyle(this.host.nativeElement, 'opacity', "0")
        this.closed.next();
      }
      window.setTimeout(event=>{
        this.state = 'out'
        this.render.setStyle(this.host.nativeElement, 'opacity', "0")
      }, 0.1)
  }

  setOpacityAnimated(){
    if (!this._hasSetAnimated) {
      this.render.setStyle(this.host.nativeElement, 'transition', "opacity 0.16s", RendererStyleFlags2.DashCase)
      this._hasSetAnimated = true
    }
  }
}


export function createBaightDialog<T>(component: Type<T>, resolver: ComponentFactoryResolver, container: ViewContainerRef) : ComponentRef<T> {
  let factory: ComponentFactory<T> = resolver.resolveComponentFactory(component);
  let componentRef : ComponentRef<BaightDialog> | any  = container.createComponent(factory);
  componentRef.instance.closed.subscribe(() => {
      let index = container.indexOf(componentRef.hostView)
      if (index >= 0) {
          container.remove(index)
      }
  });
  return componentRef
}

export function showBaightDialog<T>(component: Type<T>, resolver: ComponentFactoryResolver) : void {
  let componentRef : ComponentRef<BaightDialog> | any  = this.createDialog(component, resolver)
  componentRef.instance.show()
}


