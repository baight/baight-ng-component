import { Component, OnInit, Input, Renderer, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'cdz-status',
  templateUrl: './cdzstatus.component.html',
  styleUrls: ['./cdzstatus.component.css']
})
export class CDZStatusComponent implements OnInit {
  @ViewChild("mum", { read: ElementRef }) 
  mum: ElementRef;

  tipText = ""

  @Input() slot: 'center' | 'gold';

  @Input()
  set status(status:string){
    if (!status) {
      return
    }
    if (status.startsWith("loading")) {
      this.renderer.setElementStyle(this.mum.nativeElement, "visibility", "visible")
    }
    else {
      this.renderer.setElementStyle(this.mum.nativeElement, "visibility", "hidden")
    }
    this.tipText = this.getTextFrom(status)
  }

  getTextFrom(text:string): string{
    let index = text.indexOf(":")
    if (index < 0) {
      return ""
    }
    else if (!text.endsWith(":")){
      return text.substring(index+1)
    }
    else {
      return ""
    }
  }

  
  constructor(private ele:ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }
}
