import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ElementRef, Renderer, HostListener, Input, ViewChild } from '@angular/core';
@Component({
  selector: 'cdz-icon',
  templateUrl: './cdz-icon.component.html',
  styleUrls: ['./cdz-icon.component.css']
})
export class CDZIconComponent implements OnInit {

  private _src: string
  @Input() set src(src: string){
    this._src = src
    let value = "url('" + src + "')"
    this.renderer.setElementStyle(this.host.nativeElement, "mask-image", value)
    this.renderer.setElementStyle(this.host.nativeElement, "-webkit-mask-image", value)
  }
  get src(){
    return this._src
  }

  constructor(private renderer: Renderer, private host:ElementRef) { 
  }

  ngOnInit(){
  }
}
