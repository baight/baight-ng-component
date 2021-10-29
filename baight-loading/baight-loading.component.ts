import { Component, OnInit, ElementRef, Renderer2, } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'baight-loading',
  templateUrl: './baight-loading.component.html',
  styleUrls: ['./baight-loading.component.css'],
  animations: [trigger('FadeInOutAnimation', [
    state('void, out', style({ opacity: '0'})),
    state('*, in', style({ opacity: '1'})),
    transition(':enter, * => in', animate('100ms ease-in-out')),
    transition(':leave, * => out', animate('100ms ease-in-out')),
  ])]
})
export class BaightLoadingComponent implements OnInit {
  state = 'in'
  constructor(){ }
  ngOnInit() { }

  hide(callback:()=>void){
    this.state = "out"
    // 等待动画完成
    setTimeout(value => {
      if (callback) {
        callback()
      }
    }, 200)
  }
}
