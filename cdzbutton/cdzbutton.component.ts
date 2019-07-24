import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ElementRef, Renderer, HostListener, Input, ViewChild } from '@angular/core';
import Color from "./color"
@Component({
  selector: 'cdz-button',
  templateUrl: './cdzbutton.component.html',
  styleUrls: ['./cdzbutton.component.css']
})
export class CDZButtonComponent implements OnInit, OnChanges {

  // titleColor, highlightedTitleColor, selectedTitleColor
  // backgroundColor, highlightedBackgroundColor, selectedBackgroundColor
  // borderRadius,
  // mask
  @Input() config = {}

  @Input() selected = false

  @Input() enable = true

  @ViewChild("button_mask", {static: true, read: ElementRef}) 
  buttonMask: ElementRef;

  @ViewChild("disable_mask", {static: true, read: ElementRef}) 
  disableMask: ElementRef;

  constructor(private renderer: Renderer, private host:ElementRef) { 
  }

  ngOnInit() {
    let borderRadius = this.borderRadius()
    if (this.borderRadius) {
      this.renderer.setElementStyle(this.host.nativeElement, 'border-radius', borderRadius);
    }
    this.updateUI();
  }

  ngOnChanges(changes: SimpleChanges) {
    this._highlightedBackgroundColor = null
    this._highlightedTitleColor = null
    this.updateUI();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.enable) {
      return;
    }
    if (this.highlightedTitleColor()) {
      this.renderer.setElementStyle(this.host.nativeElement, 'color', this.highlightedTitleColor());
    }
    if (this.highlightedBackgroundColor()) {
      this.renderer.setElementStyle(this.host.nativeElement, 'background-color', this.highlightedBackgroundColor());
    }
    if (this.mask()) {
      this.renderer.setElementStyle(this.buttonMask.nativeElement, 'visibility', "visible");
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.enable) {
      return;
    }
    this.updateUI();
  }

  private updateUI(){
    if (this.selected) {
      if (this.selectedTitleColor()) {
        this.renderer.setElementStyle(this.host.nativeElement, 'color', this.selectedTitleColor());
      }
      if (this.selectedBackgroundColor()) {
        this.renderer.setElementStyle(this.host.nativeElement, 'background-color', this.selectedBackgroundColor());
      } 
      if (this.mask()) {
        this.renderer.setElementStyle(this.buttonMask.nativeElement, 'visibility', "visible");
      }
    }
    else {
      this.renderer.setElementStyle(this.host.nativeElement, 'color', this.titleColor());
      this.renderer.setElementStyle(this.host.nativeElement, 'background-color', this.backgroundColor());
      if (this.mask()) {
        this.renderer.setElementStyle(this.buttonMask.nativeElement, 'visibility', "hidden");
      }
    }

    if (this.enable) {
      this.renderer.setElementStyle(this.disableMask.nativeElement, 'visibility', "hidden");
      this.renderer.setElementStyle(this.host.nativeElement, "pointer-events", "all")
    }
    else {
      this.renderer.setElementStyle(this.disableMask.nativeElement, 'visibility', "visible");
      this.renderer.setElementStyle(this.host.nativeElement, "pointer-events", "none")
    }
  }

  private titleColor():string{
    if ("titleColor" in this.config) {
      return this.config["titleColor"]
    }
    else {
      return null;
    }
  }

  private _highlightedTitleColor
  private highlightedTitleColor():string{
    if ("highlightedTitleColor" in this.config) {
      return this.config["highlightedTitleColor"];
    }
    else {
      if (this.mask()) {
        return null
      }
      if (this._highlightedTitleColor == null) {
        var color : any = Color(this.titleColor());
        var red = color.getRed()
        var green = color.getGreen()
        var blue = color.getBlue()
        this._highlightedTitleColor = color.setRed(red*0.8).setGreen(green*0.8).setBlue(blue*0.8)
      }
      return this._highlightedTitleColor
    }
  }
  private selectedTitleColor():string{
    if ("selectedTitleColor" in this.config) {
      return this.config["selectedTitleColor"];
    }
    else {
      return null
    }
  }

  private backgroundColor():string{
    if ("backgroundColor" in this.config){
      return this.config["backgroundColor"]
    }
    else {
      return null
    }
  }

  private _highlightedBackgroundColor
  private highlightedBackgroundColor():string{
    if ("highlightedBackgroundColor" in this.config){
      return this.config["highlightedBackgroundColor"]
    }
    else {
      if (this.mask()) {
        return null
      }
      if (this._highlightedBackgroundColor == null) {
        var color : any = Color(this.backgroundColor());
        var red = color.getRed()
        var green = color.getGreen()
        var blue = color.getBlue()
        this._highlightedBackgroundColor = color.setRed(red*0.8).setGreen(green*0.8).setBlue(blue*0.8)
      }
      return this._highlightedBackgroundColor
    }
  }

  private selectedBackgroundColor():string{
    if ("selectedBackgroundColor" in this.config){
      return this.config["selectedBackgroundColor"]
    }
    else {
      return null
    }
  }

  private borderRadius(): string{
    if ("borderRadius" in this.config){
      return this.config["borderRadius"]
    }
    else {
      return null
    }
  }

  private mask(): boolean{
    if ("mask" in this.config){
      return this.config["mask"]
    }
    else {
      return true
    }
  }

}
