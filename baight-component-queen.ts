import { Hud } from "./hud";
import { BaightQueen } from "npm-pod/baight-ng/baight-queen";
import { ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

export class BaightComponentQueen extends BaightQueen{
    constructor(httpClient: HttpClient, public router: Router, public hud: Hud) {
        super(httpClient, router)
    }
}
