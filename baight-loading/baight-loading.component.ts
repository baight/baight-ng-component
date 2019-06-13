import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer2, } from '@angular/core';
import { BaightDialog} from '../baight-dialog/baight-dialog';

@Component({
  selector: 'baight-loading',
  templateUrl: './baight-loading.component.html',
  styleUrls: ['./baight-loading.component.css'],
})
export class BaightLoadingComponent extends BaightDialog implements OnInit {
  constructor(protected host:ElementRef, protected render:Renderer2){
    super(host, render, 1001)
  }
  ngOnInit() {
    this.autoHide = false
  }
  show(fadeIn:boolean=true){
    super.show(fadeIn)
  }
}
