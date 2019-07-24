import { Component, OnInit, Input, Renderer, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'cdz-scroll',
  templateUrl: './cdzscroll.component.html',
  styleUrls: ['./cdzscroll.component.css']
})
export class CDZScrollComponent implements OnInit {
  @ViewChild("baight", {static: true, read: ElementRef}) positionDiv:ElementRef

  private _page: number
  @Input()
  set page(page:number){
    this._page = page
    let value = "-" + page*100 + "%"
    this.render.setElementStyle(this.positionDiv.nativeElement, "margin-left", value)
  }
  get page():number{
    return this.page
  }

  private _animate : string
  @Input()
  set animate(animate:string) {
    this._animate = animate
    if (animate == 'true') {
      this.render.setElementStyle(this.positionDiv.nativeElement, "transition", "margin-left 0.3s")
    }
    else {
      this.render.setElementStyle(this.positionDiv.nativeElement, "transition", null)
    }
  }
  get animate():string{
    return this._animate
  }

  constructor(private host:ElementRef, private render:Renderer) { }

  ngOnInit() {
  }

}
