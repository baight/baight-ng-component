import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ElementRef, Renderer, HostListener, Input, ViewChild } from '@angular/core';
@Component({
  selector: 'cdz-icon',
  templateUrl: './cdz-icon.component.html',
  styleUrls: ['./cdz-icon.component.css']
})
export class CDZIconComponent implements OnInit, OnChanges {

  private _src: string
  @Input() set src(src: string){
    this._src = src
    let value = "url('" + src + "')"
    console.log(value)
    this.renderer.setElementStyle(this.host.nativeElement, "mask-image", "url(/assets/icon/power.png)")
    this.renderer.setElementStyle(this.host.nativeElement, "-webkit-mask-image", "url(/assets/icon/power.png)")
  }
  get src(){
    return this._src
  }

  private _color: string
  @Input() set color(color: string){
    this._color = color
    this.renderer.setElementStyle(this.host.nativeElement, "background-color", color)
  }
  get color(){
    return this._color
  }

  constructor(private renderer: Renderer, private host:ElementRef) { 

  }

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.host.nativeElement.class)
  }
}
