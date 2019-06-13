import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'cdz-tip',
  templateUrl: './cdz-tip.component.html',
  styleUrls: ['./cdz-tip.component.css'],
})
export class CDZTipComponent implements OnInit {

  @Input() text = ''
  @Input()
  set x(x:number){
    this.renderer.setElementStyle(this.ele.nativeElement, 'left', x + "px");
  }
  @Input()
  set y(y:number){
    this.renderer.setElementStyle(this.ele.nativeElement, 'top', y + "px");
  }

  constructor(private ele:ElementRef, private renderer: Renderer) { 
  }

  ngOnInit() {
    this.renderer.setElementStyle(this.ele.nativeElement, "transform", "translate(-50%, -100%)")
  }
}
