import { ElementRef, Renderer, OnInit } from '@angular/core';
export declare class Resizable implements OnInit {
    private renderer;
    private element;
    directions: Array<String>;
    private direction;
    private start;
    private width;
    private height;
    constructor(renderer: Renderer, element: ElementRef);
    ngOnInit(): void;
    private onResizeStart(event, direction);
    private onResizeEnd(event);
    private onResize(event);
    private isHorizontalResize(direction);
    private getClientX(event);
    private getClientY(event);
}
