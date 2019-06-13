import { Directive, HostListener, ElementRef, Input, ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, OnDestroy } from '@angular/core';
import { CDZTipComponent } from './cdz-tip.component';

@Directive({
  selector: '[cdz-tip]',
})
export class CDZTipDirective implements OnDestroy {
  @Input('cdz-tip') text = ''
  constructor(private el: ElementRef, private viewContainer: ViewContainerRef, 
    private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, public applicationRef: ApplicationRef) { }

  private isMouseInside = false
  private mouseX = 0
  private isShowing = false

  private tipElement
  private tipComponentRef: ComponentRef<CDZTipComponent>
 
  @HostListener('mouseenter', ['$event']) onMouseEnter(event : MouseEvent) {
    this.isMouseInside = true
    this.mouseX = event.pageX
    setTimeout(value => {
      this.showTipIfNeed(this.mouseX)
    }, 200)
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event : MouseEvent) {
    if (this.isMouseInside) {
      this.mouseX = event.pageX
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event : MouseEvent) {
    this.isMouseInside = false
    this.hideTipIfNeed()
  }

  showTipIfNeed(clientX: number){
    if (this.isShowing) {
      return;
    }
    if (!this.isMouseInside) {
      return;
    }

    this.tipElement = document.createElement('cdz-tip');
    let factory = this.componentFactoryResolver.resolveComponentFactory(CDZTipComponent);
    this.tipComponentRef = factory.create(this.injector, [], this.tipElement);
    
    this.tipComponentRef.instance.text = this.text
    this.tipComponentRef.instance.x = clientX
    var pos = this.el.nativeElement.getBoundingClientRect();
    // 与html或body元素的滚动距离相加就是元素相对于文档区域document的坐标位置
    var scrollTop = document.documentElement.scrollTop
    if (scrollTop == 0) {
      scrollTop = document.body.scrollTop
    }
    this.tipComponentRef.instance.y = pos.y + scrollTop
    this.isShowing = true;

    this.applicationRef.attachView(this.tipComponentRef.hostView);
    document.body.appendChild(this.tipElement);
  }
  hideTipIfNeed(){
    if (document.contains(this.tipElement)) {
      document.body.removeChild(this.tipElement);
      this.applicationRef.detachView(this.tipComponentRef.hostView);
      this.tipElement = null
      this.tipComponentRef = null
      this.isShowing = false
    }
  }

  ngOnDestroy(){
    this.hideTipIfNeed()
  }
}
