import { Hud } from "./hud";
import { BaightQueen } from "npm-pod/baight-ng/baight-queen";
import { ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

export class BaightComponentQueen extends BaightQueen{
    public hud: Hud
    constructor(httpClient: HttpClient, public router: Router, container: ViewContainerRef, resolver: ComponentFactoryResolver, ) {
        super(httpClient, router)
        this.hud = new Hud(container, resolver)
    }
}
