import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { BaightDialog } from '../baight-dialog/baight-dialog';

@Component({
  selector: 'baight-alert',
  templateUrl: './baight-alert.component.html',
  styleUrls: ['./baight-alert.component.css'],
})
export class BaightAlertComponent extends BaightDialog implements OnInit {
  @ViewChild("title", {static: true, read: ElementRef}) 
  titleEle: ElementRef;

  @ViewChild("message", {static: true, read: ElementRef}) 
  messageEle: ElementRef;

  _title;
  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value
    if (value && value.length > 0) {
      this.render.setStyle(this.titleEle.nativeElement, 'display', "block");
    }
    else {
      this.render.setStyle(this.titleEle.nativeElement, 'display', "none");
    }
  }

  _message;
  @Input()
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value
    if (value && value.length > 0) {
      this.render.setStyle(this.messageEle.nativeElement, 'display', "block");
    }
    else {
      this.render.setStyle(this.messageEle.nativeElement, 'display', "none");
    }
  }

  constructor(protected host:ElementRef, protected render:Renderer2){
    super(host, render, 1001)
  }

  ngOnInit() {
  }

  @Output()
  next = new EventEmitter();

  clickCancel(event : Event){
    this.hide()
  }

  clickNext(event : Event){
    this.next.next()
    this.hide()
  }

  alertButtonConfig = {
    "titleColor": "black",
    "backgroundColor": "white",
    "borderRadius": 0,
  }
}


