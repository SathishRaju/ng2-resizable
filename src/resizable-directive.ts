import {ElementRef, Renderer, Input, Component, OnInit, } from 'angular2/core';
import {NgClass, NgFor} from "angular2/common";
import './resizable-directive.scss';

@Component({
    selector: '[resizable]',
    host: {
        '(document:mousemove)': 'onResize($event)',
        '(document:mouseup)': 'onResizeEnd($event)',
    },
    directives: [NgClass, NgFor],
    template: `
        <ng-content></ng-content>
        <div class=grabber [ngClass]="dir" *ngFor="#dir of directions" (mousedown)="onResizeStart($event, dir)"></div>
    `
})
export class Resizable implements OnInit {
    @Input('resizable') directions:Array<String>;

    private direction:String;
    private start:number;
    private width:number;
    private height:number;


    constructor(private renderer:Renderer, private element:ElementRef) {
        console.log('resizable init', this.element);
        renderer.setElementClass(this.element, 'resizable', true);
    }

    ngOnInit() {
        console.log('resize direction: ', this.directions);
    }

    private onResizeStart(event:MouseEvent, direction:String) {
        this.direction = direction;
        this.start = this.isHorizontalResize(this.direction) ? this.getClientX(event) : this.getClientY(event);
        this.width = this.element.nativeElement.clientWidth;
        this.height = this.element.nativeElement.clientHeight;

        console.log("starting resize: ", this.direction, this.start);
    }

    private onResizeEnd(event:MouseEvent) {
        if (this.direction) {
            console.log("onResizeEnd");
            this.direction = null;
            this.start = 0;
        }
    }

    private onResize(event:MouseEvent) {
        if (this.direction) {
            let offset = this.isHorizontalResize(this.direction) ? this.start - this.getClientX(event) : this.start - this.getClientY(event);
            switch (this.direction) {
                case 'top':
                    this.renderer.setElementStyle(this.element, 'height', this.height + offset + 'px');
                    break;
                case 'bottom':
                    this.renderer.setElementStyle(this.element, 'height', this.height - offset + 'px');
                    break;
                case 'left':
                    this.renderer.setElementStyle(this.element, 'width', this.width + offset + 'px');
                    break;
                case 'right':
                    this.renderer.setElementStyle(this.element, 'width', this.width - offset + 'px');
                    break;
            }
        }
    }


    private isHorizontalResize(direction:String) {
        return direction === 'left' || direction === 'right';
    };

    // TODO handle TouchEvent as well
    private getClientX(event:MouseEvent) {
        return event.clientX;
    };

    // TODO handle TouchEvent as well
    private getClientY(event:MouseEvent) {
        return event.clientY;
    };

}