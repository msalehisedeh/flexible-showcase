import { Component, Input, Output, EventEmitter, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    FlexibleShowcaseComponent.prototype.ngAfterContentInit = function () {
        this.selectedIndex = 0;
        this.thumbnails[0].selected = true;
        this.selectedItem = this.thumbnails[0];
        this.paginate = (this.thumbnails.length * 60) > this.width;
    };
    FlexibleShowcaseComponent.prototype.ngOnChanges = function (changes) {
        if (changes.position && this.slider) {
            this.translatedPosition = 0;
            this.slider.nativeElement.style.transform = "translate(0px,0px)";
        }
    };
    FlexibleShowcaseComponent.prototype.hoverOver = function (event, item) {
        if (this.zoomOnHover && event.target.nodeName === 'IMG') {
            this.fireTrackingEvent(item.title, item.thumbnailId, "zoomed");
        }
    };
    FlexibleShowcaseComponent.prototype.hoverOut = function (event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    };
    FlexibleShowcaseComponent.prototype.hoverViewPort = function (event) {
        if (this.zoomOnHover && event.target.nodeName === 'IMG') {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    };
    FlexibleShowcaseComponent.prototype.shiftDisplay = function (position, toEnd) {
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
    FlexibleShowcaseComponent.prototype.keyup = function (event) {
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    FlexibleShowcaseComponent.prototype.videoPlayed = function (item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "play-video", trackingTime);
    };
    FlexibleShowcaseComponent.prototype.videoPaused = function (item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "pause-video", trackingTime);
    };
    FlexibleShowcaseComponent.prototype.videoEnded = function (item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "end-video", trackingTime);
    };
    FlexibleShowcaseComponent.prototype.hoverTab = function (i, onhover) {
        if (this.peekOnHover) {
            this.hoverItem = this.thumbnails[i];
        }
        this.fireTrackingEvent(this.thumbnails[i].title, this.thumbnails[i].thumbnailId, onhover ? "hover" : "focus");
    };
    FlexibleShowcaseComponent.prototype.selectTab = function (i) {
        this.thumbnails.map(function (tab) {
            tab.selected = false;
        });
        this.selectedIndex = i;
        this.thumbnails[i].selected = true;
        this.selectedItem = this.thumbnails[i];
        this.fireTrackingEvent(this.thumbnails[i].title, this.thumbnails[i].thumbnailId, "select");
    };
    FlexibleShowcaseComponent.prototype.fireTrackingEvent = function (name, id, event, track) {
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
    return FlexibleShowcaseComponent;
}());
FlexibleShowcaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'showcase',
                template: "\n<div class=\"showcase {{position}}\">\n    <div class=\"showcase-control {{position}}\"\n        role=\"list\"\n        [style.width]=\"position === 'top' ? width + 'px' : null\"\n        [style.height]=\"position === 'left' ? height + 'px' : null\"\n        *ngIf=\"position === 'top' || position === 'left'\">\n        <div class=\"slide-control\"\n            [class.left]=\"position == 'top'\"\n            [class.up]=\"position == 'left'\"\n            *ngIf=\"paginate\"\n            (click)=\"shiftDisplay(position, flase)\">\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\n        </div>\n        <div class=\"sliding-viewport\" [class.paginate]=\"paginate\" #slider>\n        <a *ngFor=\"let item of thumbnails; let i = index\"\n            role=\"listitem\"\n            tabindex=\"0\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"selectTab(i)\"\n            (focus)=\"hoverTab(i, false)\"\n            (mouseenter)=\"hoverTab(i, true)\"\n            (mouseleave)=\"hoverItem = undefined\"\n            [title]=\"item.title\"\n            [class.selected]=\"item.selected\">\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\n            <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\n            <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\n            <video height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\n                <source [src]=\"item.src.mp4\" type=\"video/mp4\">\n                <source [src]=\"item.src.webm\" type=\"video/webm\">\n                <source [src]=\"item.src.egg\" type=\"video/ogg\">\n            </video>\n        </a>\n        </div>\n        <div class=\"slide-control\"\n            [class.right]=\"position == 'top'\"\n            [class.down]=\"position == 'left'\"\n            *ngIf=\"paginate\"\n            (click)=\"shiftDisplay(position, true)\">\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\n        </div>\n    </div>\n    <div\n        class=\"showcase-viewport\"\n        [style.width]=\"width + 'px'\"\n        [style.height]=\"height + 'px'\"\n        (mouseout)=\"hoverOut($event)\"\n        (mouseover)=\"hoverOver($event, selectedItem)\"\n        (mousemove)=\"hoverViewPort($event)\">\n        <img  class=\"content\"\n                [src]=\"hoverItem ? hoverItem.src.medium : selectedItem.src.medium\"\n                *ngIf=\"(hoverItem ? hoverItem.type === 'image' : selectedItem.type === 'image')\" />\n        <img  class=\"hover\" #largeImage\n                [style.width]=\"(width*2) + 'px'\"\n                [style.height]=\"(height*2) + 'px'\"\n                [src]=\"selectedItem.src.large\"\n                *ngIf=\"zoomOnHover && selectedItem.type === 'image'\" />\n        <video\n            class=\"content\" #video\n            [style.width]=\"width + 'px'\"\n            [style.height]=\"height + 'px'\"\n            (play)=\"videoPlayed(selectedItem, video.currentTime)\"\n            (pause)=\"videoPaused(selectedItem, video.currentTime)\"\n            (ended)=\"videoEnded(selectedItem, video.currentTime)\"\n            *ngIf=\"(hoverItem ? hoverItem.type === 'video' : selectedItem.type === 'video')\" controls>\n            <source [src]=\"hoverItem ? hoverItem.src.mp4 : selectedItem.src.mp4\" type=\"video/mp4\">\n            <source [src]=\"hoverItem ? hoverItem.src.webm : selectedItem.src.webm\" type=\"video/webm\">\n            <source [src]=\"hoverItem ? hoverItem.src.egg : selectedItem.src.egg\" type=\"video/ogg\">\n        </video>\n    </div>\n    <div class=\"showcase-control {{position}}\"\n        role=\"list\"\n        [style.width]=\"position === 'bottom' ? width + 'px' : null\"\n        [style.height]=\"position === 'right' ? height + 'px' : null\"\n        *ngIf=\"position === 'bottom' || position === 'right'\">\n        <div class=\"slide-control\"\n            [class.left]=\"position == 'bottom'\"\n            [class.up]=\"position == 'right'\"\n            *ngIf=\"paginate\"\n            (click)=\"shiftDisplay(position, flase)\">\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\n        </div>\n        <div class=\"sliding-viewport\" [class.paginate]=\"paginate\" #slider>\n        <a *ngFor=\"let item of thumbnails; let i = index\"\n            role=\"listitem\"\n            tabindex=\"0\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"selectTab(i)\"\n            (focus)=\"hoverTab(i)\"\n            (mouseenter)=\"hoverTab(i)\"\n            [title]=\"item.title\"\n            [class.selected]=\"item.selected\">\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\n            <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\n            <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\n            <video  height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\n                <source [src]=\"item.src.mp4\" type=\"video/mp4\">\n                <source [src]=\"item.src.webm\" type=\"video/webm\">\n                <source [src]=\"item.src.egg\" type=\"video/ogg\">\n            </video>\n        </a>\n        </div>\n        <div class=\"slide-control\"\n            [class.right]=\"position == 'bottom'\"\n            [class.down]=\"position == 'right'\"\n            *ngIf=\"paginate\"\n            (click)=\"shiftDisplay(position, true)\">\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\n        </div>\n    </div>\n</div>\n",
                styles: [".showcase{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.showcase .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.showcase .showcase-viewport{-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #bcd;min-height:150px;overflow:hidden;position:relative}.showcase .showcase-viewport ::ng-deep img,.showcase .showcase-viewport video{width:100%}.showcase .showcase-viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}.showcase .showcase-control{border:1px solid #bcd;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex}.showcase .showcase-control.bottom,.showcase .showcase-control.top{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;overflow:hidden}.showcase .showcase-control.bottom .slide-control,.showcase .showcase-control.top .slide-control{width:20px;height:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.bottom .slide-control.left,.showcase .showcase-control.top .slide-control.left{border-right:1px solid #bcd}.showcase .showcase-control.bottom .slide-control.right,.showcase .showcase-control.top .slide-control.right{border-left:1px solid #bcd}.showcase .showcase-control.bottom .slide-control .fa,.showcase .showcase-control.top .slide-control .fa{font-weight:700;margin:99% 30%;font-size:1.6rem}.showcase .showcase-control.bottom .sliding-viewport.paginate,.showcase .showcase-control.top .sliding-viewport.paginate{width:calc(100% - 40px)}.showcase .showcase-control.left,.showcase .showcase-control.right{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:hidden}.showcase .showcase-control.left .slide-control,.showcase .showcase-control.right .slide-control{height:20px;width:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.left .slide-control.up,.showcase .showcase-control.right .slide-control.up{border-bottom:1px solid #bcd}.showcase .showcase-control.left .slide-control.down,.showcase .showcase-control.right .slide-control.down{border-top:1px solid #bcd}.showcase .showcase-control.left .slide-control .fa,.showcase .showcase-control.right .slide-control .fa{font-weight:700;margin:0 29%;font-size:1.6rem}.showcase .showcase-control.left .sliding-viewport.paginate,.showcase .showcase-control.right .sliding-viewport.paginate{height:calc(100% - 40px)}.showcase .showcase-control .sliding-viewport{display:-webkit-box;display:-ms-flexbox;display:flex}.showcase .showcase-control .sliding-viewport a{-webkit-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;border:0;cursor:pointer}.showcase .showcase-control .sliding-viewport a ::ng-deep img,.showcase .showcase-control .sliding-viewport a video{width:60px}.showcase.top{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.showcase.top .showcase-control{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.showcase.top .showcase-control .sliding-viewport{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.showcase.bottom{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.showcase.bottom .showcase-control{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.showcase.bottom .showcase-control .sliding-viewport,.showcase.left{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.showcase.left .showcase-control{-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-flex:1;-ms-flex:1;flex:1}.showcase.left .showcase-control .sliding-viewport{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.showcase.right{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.showcase.right .showcase-control{-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-flex:1;-ms-flex:1;flex:1}.showcase.right .showcase-control .sliding-viewport{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}@media screen and (max-width:600px){.showcase{display:table}.showcase-control{display:block}.showcase-control a{width:100%;display:table}.showcase-viewport{margin:5px 0}}"]
            },] },
];
FlexibleShowcaseComponent.ctorParameters = function () { return []; };
FlexibleShowcaseComponent.propDecorators = {
    "largeImage": [{ type: ViewChild, args: ["largeImage",] },],
    "slider": [{ type: ViewChild, args: ["slider",] },],
    "position": [{ type: Input, args: ["position",] },],
    "width": [{ type: Input, args: ["width",] },],
    "height": [{ type: Input, args: ["height",] },],
    "productId": [{ type: Input, args: ["productId",] },],
    "zoomOnHover": [{ type: Input, args: ["zoomOnHover",] },],
    "peekOnHover": [{ type: Input, args: ["peekOnHover",] },],
    "enableEventTracking": [{ type: Input, args: ["enableEventTracking",] },],
    "thumbnails": [{ type: Input, args: ["thumbnails",] },],
    "message": [{ type: Input, args: ["message",] },],
    "onEventTracking": [{ type: Output, args: ['onEventTracking',] },],
};
var FlexibleShowcaseModule = /** @class */ (function () {
    function FlexibleShowcaseModule() {
    }
    return FlexibleShowcaseModule;
}());
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
            },] },
];
FlexibleShowcaseModule.ctorParameters = function () { return []; };

export { FlexibleShowcaseComponent, FlexibleShowcaseModule };
//# sourceMappingURL=flexible-showcase.js.map
