import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'cdz-center',
  templateUrl: './cdzcenter.component.html',
  styleUrls: ['./cdzcenter.component.css']
})
export class CDZCenterComponent implements OnInit {

  @Input()
  set slot(slot:'center'|'gold'){
    if (slot == 'center') {
      this.render.setStyle(this.topHolder.nativeElement, 'height', '100.0%')
    }
    else {
      this.render.setStyle(this.topHolder.nativeElement, 'height', '76.4%')
    }
  }

  @ViewChild('topHolder', {static: true, read: ElementRef}) topHolder:ElementRef

  constructor(private render:Renderer2) { }

  ngOnInit() {
  }
}
