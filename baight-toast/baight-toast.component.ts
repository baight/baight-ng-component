import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2} from '@angular/core';
import { BaightDialog} from '../baight-dialog/baight-dialog';

@Component({
  selector: 'baight-toast',
  templateUrl: './baight-toast.component.html',
  styleUrls: ['./baight-toast.component.css'],
})
export class BaightToastComponent extends BaightDialog implements OnInit {
  @Input() text = '';

  constructor(protected host:ElementRef, protected render:Renderer2){
    super(host, render, 1001)
  }

  ngOnInit() {
    this.autoHide = false
  }

  show(fadeIn:boolean=true){
    super.show(fadeIn)
    setTimeout(value => {
      this.hide()
    }, 2600)
  }
}
