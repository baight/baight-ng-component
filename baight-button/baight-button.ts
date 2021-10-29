import { Directive, ElementRef, OnDestroy, Renderer2, OnInit, Input, Output, EventEmitter, HostListener, SimpleChanges } from '@angular/core';
import Color from "../cdzbutton/color"

@Directive({
  selector: '[baight-button]'
})
export class BaightButton {
    @Input() color: string = null

    @Input() selected: boolean | string = false
    @Input() selectedColor: string = null

    @Input() disabled: boolean | string = false
    @Input() disabledColor: string = null

    @Input() clear: boolean | string = false

    

    constructor(private host: ElementRef, private render:Renderer2) {
        this.render.setStyle(this.host.nativeElement, 'border', "none")
        this.render.setStyle(this.host.nativeElement, 'background-color', "transparent")
        this.render.setStyle(this.host.nativeElement, 'cursor', "pointer")
    }

    ngOnChanges(changes: SimpleChanges) {
        this._disabledColor = null
        this._selectedColor = null
        this.updateUI();
    }

    private updateUI(){
        if (!this.color){
            return
        }
        if (this.disabled || typeof this.disabled == 'string') {
            this.render.setStyle(this.host.nativeElement, "pointer-events", "none")
            this.render.setStyle(this.host.nativeElement, "color", this.generateDisableColor())
        }
        else {
            this.render.setStyle(this.host.nativeElement, "pointer-events", "all")
            if (this.selected || typeof this.selected == 'string') {
                this.render.setStyle(this.host.nativeElement, "color", this.generateSelectedColor())
            }
            else{
                this.render.setStyle(this.host.nativeElement, "color", this.color)
            }
        }
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        if (!(this.clear || typeof this.clear == "string")){
            this.render.setStyle(this.host.nativeElement, 'background-color', "rgba(0,0,0,0.1)")
        }
        if (this.color) {
            if (!(this.disabled || typeof this.disabled == 'string')) {
                if (!this.selected) {
                    this.render.setStyle(this.host.nativeElement, "color", this.generateSelectedColor())
                }
            }
        }
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        if (!(this.clear || typeof this.clear == "string")){
            this.render.setStyle(this.host.nativeElement, 'background-color', "transparent")
        }
        if (this.color) {
            if (!(this.disabled || typeof this.disabled == 'string')) {
                if (!(this.selected || typeof this.selected == 'string')) {
                    this.render.setStyle(this.host.nativeElement, "color", this.color)
                }
            }
        }
    }

    private _disabledColor = null
    generateDisableColor(){
        if (this.disabledColor){
            return this.disabledColor
        }
        else {
            if (!this._disabledColor) {
                var color : any = Color(this.color);
                var red = color.getRed()
                var green = color.getGreen()
                var blue = color.getBlue()
                this._disabledColor = color.setRed(0.5+red/2).setGreen(0.5+green/2).setBlue(0.5+blue/2)
                console.log(color)
            }
            return this._disabledColor
        }
    }

    private _selectedColor = null
    generateSelectedColor(){
        if (this.selectedColor){
            return this.selectedColor
        }
        else {
            if (!this._selectedColor) {
                var color : any = Color(this.color);
                var red = color.getRed()
                var green = color.getGreen()
                var blue = color.getBlue()
                this._selectedColor = color.setRed(red*0.8).setGreen(green*0.8).setBlue(blue*0.8)
            }
            return this._selectedColor
        }
    }
}