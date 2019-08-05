import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'cdz-status',
  templateUrl: './cdzstatus.component.html',
  styleUrls: ['./cdzstatus.component.css']
})
export class CDZStatusComponent implements OnInit {
  @ViewChild("mum", {static: true, read: ElementRef}) 
  mum: ElementRef;

  @ViewChild("statusDiv", {static: true, read: ElementRef}) 
  statusDiv: ElementRef;

  tipText = ""

  @Input() slot: 'center' | 'gold';

  @Input()
  set status(status:string){
    if (!status) {
      return
    }
    if (status == 'none'){
      this.renderer.setStyle(this.statusDiv.nativeElement, "display", "none")
    }
    else {
      this.renderer.setStyle(this.statusDiv.nativeElement, "display", "block")
      if (status.startsWith("loading")) {
        this.renderer.setStyle(this.mum.nativeElement, "visibility", "visible")
      }
      else {
        this.renderer.setStyle(this.mum.nativeElement, "visibility", "hidden")
      }
      this.tipText = this.getTextFrom(status)
    }
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

  
  constructor(private ele:ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }
}
