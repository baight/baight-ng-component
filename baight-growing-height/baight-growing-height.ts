import { Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[baight-growing-height]'
})
export class BaightGrowingHeight implements OnDestroy {
    mutationObserver : MutationObserver
    private maximumHiehgt: number = 0
    constructor(private host: ElementRef, private render:Renderer2) {
        this.mutationObserver = new MutationObserver((mutationList) => {
            let heightString: string = getComputedStyle(this.host.nativeElement).getPropertyValue('height')
            let height: number = 0
            if (heightString.endsWith("px")) {
                height = Number(heightString.substr(0, heightString.length-2))
            }
            if (height > this.maximumHiehgt) {
                this.maximumHiehgt = height
                this.render.setStyle(this.host.nativeElement, "min-height", this.maximumHiehgt + "px")
            }
        })
        this.mutationObserver.observe(this.host.nativeElement, { attributes: true, childList: true, subtree: true })
    }

    ngOnDestroy(){
        if (this.mutationObserver) {
            this.mutationObserver.disconnect()
            this.mutationObserver.takeRecords()
            this.mutationObserver = null
        }
    }
}