"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var Resizable = (function () {
    function Resizable(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        //console.log('resizable init', this.element);
        renderer.setElementClass(this.element.nativeElement, 'resizable', true);
    }
    Resizable.prototype.ngOnInit = function () {
        //console.log('resize direction: ', this.directions);
    };
    Resizable.prototype.onResizeStart = function (event, direction) {
        this.direction = direction;
        this.start = this.isHorizontalResize(this.direction) ? this.getClientX(event) : this.getClientY(event);
        this.width = this.element.nativeElement.clientWidth;
        this.height = this.element.nativeElement.clientHeight;
        if (event.stopPropagation)
            event.stopPropagation();
        if (event.preventDefault)
            event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
        // console.log("starting resize: ", this.direction, this.start);
    };
    Resizable.prototype.onResizeEnd = function (event) {
        if (this.direction) {
            //console.log("onResizeEnd");
            this.direction = null;
            this.start = 0;
        }
    };
    Resizable.prototype.onResize = function (event) {
        if (this.direction) {
            var offset = this.isHorizontalResize(this.direction) ? this.start - this.getClientX(event) : this.start - this.getClientY(event);
            // console.log('offset', offset);
            switch (this.direction) {
                case 'bottom':
                    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height - offset + 'px');
                    break;
                case 'left':
                    this.renderer.setElementStyle(this.element.nativeElement, 'width', this.width + offset + 'px');
                    break;
                case 'right':
                    this.renderer.setElementStyle(this.element.nativeElement, 'width', this.width - offset + 'px');
                    break;
            }
        }
    };
    Resizable.prototype.isHorizontalResize = function (direction) {
        return direction === 'left' || direction === 'right';
    };
    ;
    Resizable.prototype.getClientX = function (event) {
        if (event instanceof TouchEvent)
            return event.touches[0].clientX;
        else
            return event.clientX;
    };
    ;
    Resizable.prototype.getClientY = function (event) {
        if (event instanceof TouchEvent)
            return event.touches[0].clientY;
        else
            return event.clientY;
    };
    ;
    __decorate([
        core_1.Input
    ], Resizable.prototype, "directions");
    Resizable = __decorate([
        core_1.Component({
            selector: '[resizable]',
            host: {
                '(document:mousemove)': 'onResize($event)',
                '(document:mouseup)': 'onResizeEnd($event)'
            },
            directives: [common_1.NgClass, common_1.NgFor],
            template: "\n        <ng-content></ng-content>\n        <div class='grabber' [ngClass]=\"dir\" *ngFor=\"let dir of directions\" (mousedown)=\"onResizeStart($event, dir)\"></div>\n    "
        })
    ], Resizable);
    return Resizable;
}());
exports.Resizable = Resizable;
