import { Component, Input, Output, EventEmitter, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FlexibleShowcaseComponent = /** @class */ (function () {
    function FlexibleShowcaseComponent() {
        this.translatedPosition = 0;
        this.selectedIndex = 0;
        this.paginate = false;
        this.zoomOnHover = false;
        this.peekOnHover = false;
        this.enableEventTracking = false;
        this.message = "click to select ";
        this.onEventTracking = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.selectedIndex = 0;
        this.thumbnails[0].selected = true;
        this.selectedItem = this.thumbnails[0];
        this.paginate = (this.thumbnails.length * 60) > this.width;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.position && this.slider) {
            this.translatedPosition = 0;
            this.slider.nativeElement.style.transform = "translate(0px,0px)";
        }
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.hoverOver = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        if (this.zoomOnHover && event.target.nodeName === 'IMG') {
            this.fireTrackingEvent(item.title, item.thumbnailId, "zoomed");
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.hoverOut = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.hoverViewPort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.zoomOnHover && event.target.nodeName === 'IMG') {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    };
    /**
     * @param {?} position
     * @param {?} toEnd
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.shiftDisplay = /**
     * @param {?} position
     * @param {?} toEnd
     * @return {?}
     */
    function (position, toEnd) {
        if (position === "top" || position === "bottom") {
            this.translatedPosition += (toEnd ? -60 : 60);
            this.translatedPosition = this.translatedPosition > 0 ? 0 : this.translatedPosition;
            this.slider.nativeElement.style.transform = "translateX(" + this.translatedPosition + "px)";
        }
        else {
            this.translatedPosition += (toEnd ? -60 : 60);
            this.translatedPosition = this.translatedPosition > 0 ? 0 : this.translatedPosition;
            this.slider.nativeElement.style.transform = "translateY(" + this.translatedPosition + "px)";
        }
        if (this.enableEventTracking) {
            this.onEventTracking.emit({
                productId: this.productId,
                action: "thombnail shift",
                time: new Date()
            });
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.videoPlayed = /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    function (item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "play-video", trackingTime);
    };
    /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.videoPaused = /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    function (item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "pause-video", trackingTime);
    };
    /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.videoEnded = /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    function (item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "end-video", trackingTime);
    };
    /**
     * @param {?} i
     * @param {?} onhover
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.hoverTab = /**
     * @param {?} i
     * @param {?} onhover
     * @return {?}
     */
    function (i, onhover) {
        if (this.peekOnHover) {
            this.hoverItem = this.thumbnails[i];
        }
        this.fireTrackingEvent(this.thumbnails[i].title, this.thumbnails[i].thumbnailId, onhover ? "hover" : "focus");
    };
    /**
     * @param {?} i
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.selectTab = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        this.thumbnails.map(function (tab) {
            tab.selected = false;
        });
        this.selectedIndex = i;
        this.thumbnails[i].selected = true;
        this.selectedItem = this.thumbnails[i];
        this.fireTrackingEvent(this.thumbnails[i].title, this.thumbnails[i].thumbnailId, "select");
    };
    /**
     * @param {?} name
     * @param {?} id
     * @param {?} event
     * @param {?=} track
     * @return {?}
     */
    FlexibleShowcaseComponent.prototype.fireTrackingEvent = /**
     * @param {?} name
     * @param {?} id
     * @param {?} event
     * @param {?=} track
     * @return {?}
     */
    function (name, id, event, track) {
        if (this.enableEventTracking) {
            if (track) {
                this.onEventTracking.emit({
                    productId: this.productId,
                    thumbnailId: id,
                    action: event,
                    title: name,
                    currentTime: track,
                    time: new Date()
                });
            }
            else {
                this.onEventTracking.emit({
                    productId: this.productId,
                    thumbnailId: id,
                    action: event,
                    title: name,
                    time: new Date()
                });
            }
        }
    };
    FlexibleShowcaseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'showcase',
                    template: "\r\n<div class=\"showcase {{position}}\">\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'top' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'left' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'top' || position === 'left'\">\r\n        <div class=\"slide-control\" \r\n            [class.left]=\"position == 'top'\"\r\n            [class.up]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, false)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport\" [class.paginate]=\"paginate\" #slider>\r\n        <a *ngFor=\"let item of thumbnails; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (focus)=\"hoverTab(i, false)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            (mouseleave)=\"hoverItem = undefined\"\r\n            [title]=\"item.title\" \r\n            [class.selected]=\"item.selected\">\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n            <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n            <video height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\r\n                <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n            </video>\r\n        </a>\r\n        </div>\r\n        <div class=\"slide-control\" \r\n            [class.right]=\"position == 'top'\"\r\n            [class.down]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, true)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n    <div \r\n        class=\"showcase-viewport\" \r\n        [style.width]=\"width + 'px'\" \r\n        [style.height]=\"height + 'px'\"\r\n        (mouseout)=\"hoverOut($event)\"\r\n        (mouseover)=\"hoverOver($event, selectedItem)\"\r\n        (mousemove)=\"hoverViewPort($event)\">\r\n        <img  class=\"content\" \r\n                [src]=\"hoverItem ? hoverItem.src.medium : selectedItem.src.medium\" \r\n                *ngIf=\"(hoverItem ? hoverItem.type === 'image' : selectedItem.type === 'image')\" />\r\n        <img  class=\"hover\" #largeImage\r\n                [style.width]=\"(width*2) + 'px'\"\r\n                [style.height]=\"(height*2) + 'px'\"\r\n                [src]=\"selectedItem.src.large\" \r\n                *ngIf=\"zoomOnHover && selectedItem.type === 'image'\" />\r\n        <video  \r\n            class=\"content\" #video\r\n            [style.width]=\"width + 'px'\" \r\n            [style.height]=\"height + 'px'\"\r\n            (play)=\"videoPlayed(selectedItem, video.currentTime)\"\r\n            (pause)=\"videoPaused(selectedItem, video.currentTime)\"\r\n            (ended)=\"videoEnded(selectedItem, video.currentTime)\"\r\n            *ngIf=\"(hoverItem ? hoverItem.type === 'video' : selectedItem.type === 'video')\" controls>\r\n            <source [src]=\"hoverItem ? hoverItem.src.mp4 : selectedItem.src.mp4\" type=\"video/mp4\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.webm : selectedItem.src.webm\" type=\"video/webm\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.egg : selectedItem.src.egg\" type=\"video/ogg\">\r\n        </video>\r\n    </div>\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'bottom' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'right' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <div class=\"slide-control\" \r\n            [class.left]=\"position == 'bottom'\"\r\n            [class.up]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, false)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport\" [class.paginate]=\"paginate\" #slider>\r\n        <a *ngFor=\"let item of thumbnails; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (focus)=\"hoverTab(i, false)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"item.title\" \r\n            [class.selected]=\"item.selected\">\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n            <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n            <video  height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\r\n                <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n            </video>\r\n        </a>\r\n        </div>\r\n        <div class=\"slide-control\" \r\n            [class.right]=\"position == 'bottom'\"\r\n            [class.down]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, true)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
                    styles: [".showcase{display:flex;width:100%}.showcase .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.showcase .showcase-viewport{box-sizing:border-box;border:1px solid #bcd;min-height:150px;overflow:hidden;position:relative}.showcase .showcase-viewport ::ng-deep img,.showcase .showcase-viewport video{width:100%}.showcase .showcase-viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}.showcase .showcase-control{border:1px solid #bcd;box-sizing:border-box;display:flex}.showcase .showcase-control.bottom,.showcase .showcase-control.top{flex-direction:row;overflow:hidden}.showcase .showcase-control.bottom .slide-control,.showcase .showcase-control.top .slide-control{width:20px;height:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.bottom .slide-control.left,.showcase .showcase-control.top .slide-control.left{border-right:1px solid #bcd}.showcase .showcase-control.bottom .slide-control.right,.showcase .showcase-control.top .slide-control.right{border-left:1px solid #bcd}.showcase .showcase-control.bottom .slide-control .fa,.showcase .showcase-control.top .slide-control .fa{font-weight:700;margin:99% 30%;font-size:1.6rem}.showcase .showcase-control.bottom .sliding-viewport.paginate,.showcase .showcase-control.top .sliding-viewport.paginate{width:calc(100% - 40px)}.showcase .showcase-control.left,.showcase .showcase-control.right{flex-direction:column;overflow:hidden}.showcase .showcase-control.left .slide-control,.showcase .showcase-control.right .slide-control{height:20px;width:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.left .slide-control.up,.showcase .showcase-control.right .slide-control.up{border-bottom:1px solid #bcd}.showcase .showcase-control.left .slide-control.down,.showcase .showcase-control.right .slide-control.down{border-top:1px solid #bcd}.showcase .showcase-control.left .slide-control .fa,.showcase .showcase-control.right .slide-control .fa{font-weight:700;margin:0 29%;font-size:1.6rem}.showcase .showcase-control.left .sliding-viewport.paginate,.showcase .showcase-control.right .sliding-viewport.paginate{height:calc(100% - 40px)}.showcase .showcase-control .sliding-viewport{display:flex}.showcase .showcase-control .sliding-viewport a{box-sizing:border-box;white-space:nowrap;border:0;cursor:pointer}.showcase .showcase-control .sliding-viewport a ::ng-deep img,.showcase .showcase-control .sliding-viewport a video{width:60px}.showcase.top{flex-direction:column}.showcase.top .showcase-control{flex-wrap:nowrap}.showcase.top .showcase-control .sliding-viewport{flex-direction:row}.showcase.bottom{flex-direction:column}.showcase.bottom .showcase-control{flex-wrap:nowrap}.showcase.bottom .showcase-control .sliding-viewport,.showcase.left{flex-direction:row}.showcase.left .showcase-control{flex-wrap:nowrap;flex:1}.showcase.left .showcase-control .sliding-viewport{flex-direction:column}.showcase.right{flex-direction:row}.showcase.right .showcase-control{flex-wrap:nowrap;flex:1}.showcase.right .showcase-control .sliding-viewport{flex-direction:column}@media screen and (max-width:600px){.showcase{display:table}.showcase-control{display:block}.showcase-control a{width:100%;display:table}.showcase-viewport{margin:5px 0}}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleShowcaseComponent.ctorParameters = function () { return []; };
    FlexibleShowcaseComponent.propDecorators = {
        largeImage: [{ type: ViewChild, args: ["largeImage",] }],
        slider: [{ type: ViewChild, args: ["slider",] }],
        position: [{ type: Input, args: ["position",] }],
        width: [{ type: Input, args: ["width",] }],
        height: [{ type: Input, args: ["height",] }],
        productId: [{ type: Input, args: ["productId",] }],
        zoomOnHover: [{ type: Input, args: ["zoomOnHover",] }],
        peekOnHover: [{ type: Input, args: ["peekOnHover",] }],
        enableEventTracking: [{ type: Input, args: ["enableEventTracking",] }],
        thumbnails: [{ type: Input, args: ["thumbnails",] }],
        message: [{ type: Input, args: ["message",] }],
        onEventTracking: [{ type: Output, args: ['onEventTracking',] }]
    };
    return FlexibleShowcaseComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FlexibleShowcaseModule = /** @class */ (function () {
    function FlexibleShowcaseModule() {
    }
    FlexibleShowcaseModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        FlexibleShowcaseComponent
                    ],
                    exports: [
                        FlexibleShowcaseComponent
                    ],
                    entryComponents: [],
                    providers: [],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return FlexibleShowcaseModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { FlexibleShowcaseComponent, FlexibleShowcaseModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZmxleGlibGUtc2hvd2Nhc2UuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC9mbGV4aWJsZS1zaG93Y2FzZS9zcmMvYXBwL2ZsZXhpYmxlLXNob3djYXNlL2ZsZXhpYmxlLXNob3djYXNlLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ZsZXhpYmxlLXNob3djYXNlL3NyYy9hcHAvZmxleGlibGUtc2hvd2Nhc2UvZmxleGlibGUtc2hvd2Nhc2UtbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdEVsZW1lbnRSZWYsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdFZpZXdDaGlsZCxcclxuXHRPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ3Nob3djYXNlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtc2hvd2Nhc2UuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLXNob3djYXNlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlU2hvd2Nhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMgIHtcclxuXHRwcml2YXRlIHRyYW5zbGF0ZWRQb3NpdGlvbiA9IDA7XHJcblx0c2VsZWN0ZWRJbmRleCA9IDA7XHJcblx0c2VsZWN0ZWRJdGVtOiBhbnk7XHJcblx0aG92ZXJJdGVtOiBhbnk7XHJcblx0cGFnaW5hdGUgPSBmYWxzZTtcclxuXHJcblx0QFZpZXdDaGlsZChcImxhcmdlSW1hZ2VcIilcclxuXHRwcml2YXRlIGxhcmdlSW1hZ2U6IEVsZW1lbnRSZWY7XHJcblxyXG5cdEBWaWV3Q2hpbGQoXCJzbGlkZXJcIilcclxuXHRwcml2YXRlIHNsaWRlcjogRWxlbWVudFJlZjtcclxuXHJcbiAgICBASW5wdXQoXCJwb3NpdGlvblwiKVxyXG4gICAgcHVibGljIHBvc2l0aW9uOiBzdHJpbmc7IC8vIHRvcCwgbGVmdCwgYm90dG9tLCByaWdodFxyXG5cclxuXHRASW5wdXQoXCJ3aWR0aFwiKVxyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcblxyXG5cdEBJbnB1dChcImhlaWdodFwiKVxyXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG5cclxuXHRASW5wdXQoXCJwcm9kdWN0SWRcIilcclxuICAgIHB1YmxpYyBwcm9kdWN0SWQ6IHN0cmluZztcclxuXHRcclxuICAgIEBJbnB1dChcInpvb21PbkhvdmVyXCIpXHJcbiAgICBwdWJsaWMgem9vbU9uSG92ZXIgPSBmYWxzZVxyXG5cclxuICAgIEBJbnB1dChcInBlZWtPbkhvdmVyXCIpXHJcbiAgICBwdWJsaWMgcGVla09uSG92ZXIgPSBmYWxzZVxyXG5cclxuICAgIEBJbnB1dChcImVuYWJsZUV2ZW50VHJhY2tpbmdcIilcclxuICAgIHB1YmxpYyBlbmFibGVFdmVudFRyYWNraW5nID0gZmFsc2VcclxuXHJcbiAgICBASW5wdXQoXCJ0aHVtYm5haWxzXCIpXHJcbiAgICBwdWJsaWMgdGh1bWJuYWlsczogYW55W107XHJcblxyXG4gICAgQElucHV0KFwibWVzc2FnZVwiKVxyXG4gICAgcHVibGljIG1lc3NhZ2UgPSBcImNsaWNrIHRvIHNlbGVjdCBcIjtcclxuXHJcblx0QE91dHB1dCgnb25FdmVudFRyYWNraW5nJylcclxuXHRwcml2YXRlIG9uRXZlbnRUcmFja2luZyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcblx0XHR0aGlzLnRodW1ibmFpbHNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnRodW1ibmFpbHNbMF07XHJcblx0XHR0aGlzLnBhZ2luYXRlID0gKHRoaXMudGh1bWJuYWlscy5sZW5ndGggKiA2MCkgPiB0aGlzLndpZHRoO1xyXG5cdH1cclxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XHJcblx0XHRpZiAoY2hhbmdlcy5wb3NpdGlvbiAmJiB0aGlzLnNsaWRlcikge1xyXG5cdFx0XHR0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiA9IDA7XHJcblx0XHRcdHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMHB4LDBweClcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJPdmVyKGV2ZW50LCBpdGVtKSB7XHJcblx0XHRpZiAodGhpcy56b29tT25Ib3ZlciAmJiBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdJTUcnKSB7XHJcblx0XHRcdHRoaXMuZmlyZVRyYWNraW5nRXZlbnQoaXRlbS50aXRsZSwgaXRlbS50aHVtYm5haWxJZCwgXCJ6b29tZWRcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyT3V0KGV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlKSB7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBcIi0xMDAwMHB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBcIi0xMDAwMHB4XCI7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyVmlld1BvcnQoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLnpvb21PbkhvdmVyICYmIGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gJ0lNRycpIHtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IC1ldmVudC5sYXllclkgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAtZXZlbnQubGF5ZXJYICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzaGlmdERpc3BsYXkocG9zaXRpb24sIHRvRW5kKSB7XHRcdFxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSBcInRvcFwiIHx8IHBvc2l0aW9uID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uICs9ICh0b0VuZCA/IC02MCA6IDYwKTtcclxuXHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gPSB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiA+IDAgPyAwIDogdGhpcy50cmFuc2xhdGVkUG9zaXRpb247XHJcblx0XHRcdHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKFwiICsgdGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKyBcInB4KVwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKz0gKHRvRW5kID8gLTYwIDogNjApO1xyXG5cdFx0XHR0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiA9IHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uID4gMCA/IDAgOiB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbjtcclxuXHRcdFx0dGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoXCIgKyB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArIFwicHgpXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZW5hYmxlRXZlbnRUcmFja2luZykge1xyXG5cdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdElkLFxyXG5cdFx0XHRcdGFjdGlvbjogXCJ0aG9tYm5haWwgc2hpZnRcIixcclxuXHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXl1cChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR2aWRlb1BsYXllZChpdGVtLCB0cmFja2luZ1RpbWUpIHtcclxuXHRcdHRoaXMuZmlyZVRyYWNraW5nRXZlbnQoXHJcblx0XHRcdGl0ZW0udGl0bGUsXHJcblx0XHRcdGl0ZW0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFwicGxheS12aWRlb1wiLFxyXG5cdFx0XHR0cmFja2luZ1RpbWVcclxuXHRcdCk7XHJcblx0fVxyXG5cdHZpZGVvUGF1c2VkKGl0ZW0sIHRyYWNraW5nVGltZSkge1xyXG5cdFx0dGhpcy5maXJlVHJhY2tpbmdFdmVudChcclxuXHRcdFx0aXRlbS50aXRsZSxcclxuXHRcdFx0aXRlbS50aHVtYm5haWxJZCxcclxuXHRcdFx0XCJwYXVzZS12aWRlb1wiLFxyXG5cdFx0XHR0cmFja2luZ1RpbWVcclxuXHRcdCk7XHJcblx0fVxyXG5cdHZpZGVvRW5kZWQoaXRlbSwgdHJhY2tpbmdUaW1lKSB7XHJcblx0XHR0aGlzLmZpcmVUcmFja2luZ0V2ZW50KFxyXG5cdFx0XHRpdGVtLnRpdGxlLFxyXG5cdFx0XHRpdGVtLnRodW1ibmFpbElkLFxyXG5cdFx0XHRcImVuZC12aWRlb1wiLFxyXG5cdFx0XHR0cmFja2luZ1RpbWVcclxuXHRcdCk7XHJcblx0fVxyXG5cdGhvdmVyVGFiKGksIG9uaG92ZXIpIHtcclxuXHRcdGlmICh0aGlzLnBlZWtPbkhvdmVyKSB7XHJcblx0XHRcdHRoaXMuaG92ZXJJdGVtID0gdGhpcy50aHVtYm5haWxzW2ldO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJlVHJhY2tpbmdFdmVudChcclxuXHRcdFx0dGhpcy50aHVtYm5haWxzW2ldLnRpdGxlLFxyXG5cdFx0XHR0aGlzLnRodW1ibmFpbHNbaV0udGh1bWJuYWlsSWQsXHJcblx0XHRcdG9uaG92ZXIgPyBcImhvdmVyXCIgOiBcImZvY3VzXCJcclxuXHRcdCk7XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpKSB7XHJcblx0XHR0aGlzLnRodW1ibmFpbHMubWFwKCh0YWIpPT57XHJcblx0XHRcdHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xyXG5cdFx0dGhpcy50aHVtYm5haWxzW2ldLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy50aHVtYm5haWxzW2ldO1xyXG5cdFx0dGhpcy5maXJlVHJhY2tpbmdFdmVudChcclxuXHRcdFx0dGhpcy50aHVtYm5haWxzW2ldLnRpdGxlLFxyXG5cdFx0XHR0aGlzLnRodW1ibmFpbHNbaV0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFwic2VsZWN0XCJcclxuXHRcdCk7XHJcblx0fVxyXG5cdHByaXZhdGUgZmlyZVRyYWNraW5nRXZlbnQobmFtZSwgaWQsIGV2ZW50LCB0cmFjaz8pIHtcclxuXHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0aWYgKHRyYWNrKSB7XHJcblx0XHRcdFx0dGhpcy5vbkV2ZW50VHJhY2tpbmcuZW1pdCh7XHJcblx0XHRcdFx0XHRwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdElkLFxyXG5cdFx0XHRcdFx0dGh1bWJuYWlsSWQ6IGlkLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBldmVudCxcclxuXHRcdFx0XHRcdHRpdGxlOiBuYW1lLFxyXG5cdFx0XHRcdFx0Y3VycmVudFRpbWU6IHRyYWNrLFxyXG5cdFx0XHRcdFx0dGltZTogbmV3IERhdGUoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMub25FdmVudFRyYWNraW5nLmVtaXQoe1xyXG5cdFx0XHRcdFx0cHJvZHVjdElkOiB0aGlzLnByb2R1Y3RJZCxcclxuXHRcdFx0XHRcdHRodW1ibmFpbElkOiBpZCxcclxuXHRcdFx0XHRcdGFjdGlvbjogZXZlbnQsXHJcblx0XHRcdFx0XHR0aXRsZTogbmFtZSxcclxuXHRcdFx0XHRcdHRpbWU6IG5ldyBEYXRlKClcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBmbGV4aWJsZSB0YWJzIGluIGEgbGF6eSBsb2FkIGZhc2hpb24uXHJcbiovXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGbGV4aWJsZVNob3djYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4aWJsZS1zaG93Y2FzZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBGbGV4aWJsZVNob3djYXNlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEZsZXhpYmxlU2hvd2Nhc2VDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVNob3djYXNlTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7SUE0REk7a0NBMUMwQixDQUFDOzZCQUNkLENBQUM7d0JBR04sS0FBSzsyQkFxQlEsS0FBSzsyQkFHTCxLQUFLO21DQUdHLEtBQUs7dUJBTWpCLGtCQUFrQjsrQkFHWixJQUFJLFlBQVksRUFBRTtLQUV6Qjs7OztJQUVuQixzREFBa0I7OztJQUFsQjtRQUNDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQzNEOzs7OztJQUNELCtDQUFXOzs7O0lBQVgsVUFBWSxPQUFPO1FBQ2xCLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztTQUNqRTtLQUNEOzs7Ozs7SUFDRCw2Q0FBUzs7Ozs7SUFBVCxVQUFVLEtBQUssRUFBRSxJQUFJO1FBQ3BCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMvRDtLQUNEOzs7OztJQUNE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