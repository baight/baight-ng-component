import { Directive, ElementRef, OnDestroy, Renderer2, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[FadeOutAnimation]'
})
export class FadeOutAnimation {
    private _state: 'in' | 'out'
    @Input("FadeOutAnimation")
    set state(state: 'in' | 'out') {
        if (state == 'in' && this._state != 'in') {
            //this.performShowAnimation()
        }
        else if (state == 'out' && this._state != 'out'){
            this.performHideAnimation()
        }
        this._state = state
    }
    get state(){
        return this._state
    }

    @Output('done') done = new EventEmitter

    constructor(private host: ElementRef, private render:Renderer2) {
        //this.render.setStyle(this.host.nativeElement, 'opacity', "0")
        this.render.setStyle(this.host.nativeElement, 'transition', "opacity 0.16s")
        this.render.listen(this.host.nativeElement, 'transitionend', (event:any)=>{
            if (this.state == 'out' && event.propertyName == 'opacity' &&
            event.target == this.host.nativeElement) {
                this.done.emit()
            }
        })
    }

    performShowAnimation(){
        this.render.setStyle(this.host.nativeElement, 'opacity', "1")
    }
    performHideAnimation(){
        this.render.setStyle(this.host.nativeElement, 'opacity', "0")
    }
}