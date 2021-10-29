import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CDZButtonComponent } from './cdzbutton/cdzbutton.component';
import { CDZTipComponent } from './cdz-tip/cdz-tip.component';
import { CDZCenterComponent } from './cdzcenter/cdzcenter.component';
import { CDZStatusComponent } from './cdzstatus/cdzstatus.component';
import { CDZTipDirective } from './cdz-tip/cdz-tip.directive';
import { CDZMumComponent } from './cdzmum/cdzmum.component';
import { CDZScrollComponent } from './cdzscroll/cdzscroll.component';
import { CDZScrollItemComponent } from './cdzscroll/cdzscroll-item/cdzscroll-item.component';
import { BaightAlertComponent } from './baight-alert/baight-alert.component';
import { BaightToastComponent } from './baight-toast/baight-toast.component';
import { BaightLoadingComponent } from './baight-loading/baight-loading.component';
import { BaightGrowingHeight } from './baight-growing-height/baight-growing-height';
import { CDZIconComponent } from './cdz-icon/cdz-icon.component';
import { AlertInOutAnimation } from './animations/alert-in-out-animation';
import { FadeInOutAnimation } from './animations/fade-in-out-animation';
import { FadeOutAnimation } from './animations/fade-out-animation';
import { Hud } from './hud';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CDZButtonComponent,
    CDZTipComponent,
    CDZTipDirective,
    CDZCenterComponent,
    CDZStatusComponent,
    CDZMumComponent,
    CDZIconComponent,
    CDZScrollComponent,
    CDZScrollItemComponent,
    BaightAlertComponent,
    BaightToastComponent,
    BaightLoadingComponent,
    BaightGrowingHeight,

    FadeInOutAnimation,
    FadeOutAnimation,
    AlertInOutAnimation
  ],
  exports: [
    CDZButtonComponent,
    CDZTipDirective,
    CDZCenterComponent,
    CDZStatusComponent,
    CDZMumComponent,
    CDZIconComponent,
    CDZScrollComponent,
    CDZScrollItemComponent,
    BaightAlertComponent,
    BaightToastComponent,
    BaightLoadingComponent,
    BaightGrowingHeight,

    FadeInOutAnimation,
    FadeOutAnimation,
    AlertInOutAnimation
  ],
  entryComponents: [
    CDZTipComponent,
    BaightAlertComponent,
    BaightToastComponent,
    BaightLoadingComponent,
    CDZMumComponent
  ],
  providers: [Hud]
})

export class BaightComponentModule { }

export * from "./baight-dialog/baight-dialog"
export * from "./animations/baight-animations"

