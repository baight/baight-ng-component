import { Directive, ElementRef, OnDestroy, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[AlertInOutAnimation]'
})
export class AlertInOutAnimation {
    private _state: 'in' | 'out'
    @Input()
    set state(state: 'in' | 'out') {
        if (state == 'in' && this._state != 'in') {
            this.performShowAnimation()
        }
        else if (state == 'out' && this._state != 'out'){
            this.performHideAnimation()
        }
        this._state = state
    }
    get state(){
        return this._state
    }

    constructor(private host: ElementRef, private render:Renderer2) {
        this.render.setStyle(this.host.nativeElement, 'transform', "scale(1.16, 1.16)")
        this.render.setStyle(this.host.nativeElement, 'transition', "transform 0.16s")
    }

    performShowAnimation(){
        this.render.setStyle(this.host.nativeElement, 'transform', "scale(1.0, 1.0)")
    }
    performHideAnimation(){
        this.render.setStyle(this.host.nativeElement, 'transform', "scale(0.86, 0.86)")
    }
}