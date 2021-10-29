import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild, Renderer2, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import {  } from '../baight-dialog/baight-dialog';

@Component({
  selector: 'baight-alert',
  templateUrl: './baight-alert.component.html',
  styleUrls: ['./baight-alert.component.css'],
})
export class BaightAlertComponent implements OnInit {
  @ViewChild("title", {static: true, read: ElementRef}) 
  titleEle: ElementRef;

  @ViewChild("message", {static: true, read: ElementRef}) 
  messageEle: ElementRef;

  @Output()
  state: "in" | "out" | string

  @Output()
  closed = new EventEmitter();

  constructor(protected host:ElementRef, protected render:Renderer2){
    //this.render.setAttribute(this.host.nativeElement, "FadeInOutAnimation", "")
  }

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

  _messageAlign: "left" | "center" | "right" = "center"
  get messageAlign(){
    return this._messageAlign
  }
  set messageAlign(align: string) {
    this.render.setStyle(this.messageEle.nativeElement, "text-align", align)
  }

  isConfirmStyle = false
  ngOnInit() {
    this.isConfirmStyle = (this.next.observers.length > 0) ? false : true;
    setTimeout(() => {
      this.state = "in"
    });
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

  hide(){
    this.state = 'out'
  }

  animationDone(){
    if (this.state == 'out') {
      this.closed.emit()
    }
  }

  alertButtonConfig = {
    "titleColor": "black",
    "backgroundColor": "white",
    "borderRadius": 0,
  }
}


