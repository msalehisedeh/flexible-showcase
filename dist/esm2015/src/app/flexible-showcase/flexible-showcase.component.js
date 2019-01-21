/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
export class FlexibleShowcaseComponent {
    constructor() {
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
    ngAfterContentInit() {
        this.selectedIndex = 0;
        this.thumbnails[0].selected = true;
        this.selectedItem = this.thumbnails[0];
        this.paginate = (this.thumbnails.length * 60) > this.width;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.position && this.slider) {
            this.translatedPosition = 0;
            this.slider.nativeElement.style.transform = "translate(0px,0px)";
        }
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    hoverOver(event, item) {
        if (this.zoomOnHover && event.target.nodeName === 'IMG') {
            this.fireTrackingEvent(item.title, item.thumbnailId, "zoomed");
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverOut(event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverViewPort(event) {
        if (this.zoomOnHover && event.target.nodeName === 'IMG') {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    }
    /**
     * @param {?} position
     * @param {?} toEnd
     * @return {?}
     */
    shiftDisplay(position, toEnd) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
        /** @type {?} */
        const code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    videoPlayed(item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "play-video", trackingTime);
    }
    /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    videoPaused(item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "pause-video", trackingTime);
    }
    /**
     * @param {?} item
     * @param {?} trackingTime
     * @return {?}
     */
    videoEnded(item, trackingTime) {
        this.fireTrackingEvent(item.title, item.thumbnailId, "end-video", trackingTime);
    }
    /**
     * @param {?} i
     * @param {?} onhover
     * @return {?}
     */
    hoverTab(i, onhover) {
        if (this.peekOnHover) {
            this.hoverItem = this.thumbnails[i];
        }
        this.fireTrackingEvent(this.thumbnails[i].title, this.thumbnails[i].thumbnailId, onhover ? "hover" : "focus");
    }
    /**
     * @param {?} i
     * @return {?}
     */
    selectTab(i) {
        this.thumbnails.map((tab) => {
            tab.selected = false;
        });
        this.selectedIndex = i;
        this.thumbnails[i].selected = true;
        this.selectedItem = this.thumbnails[i];
        this.fireTrackingEvent(this.thumbnails[i].title, this.thumbnails[i].thumbnailId, "select");
    }
    /**
     * @param {?} name
     * @param {?} id
     * @param {?} event
     * @param {?=} track
     * @return {?}
     */
    fireTrackingEvent(name, id, event, track) {
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
    }
}
FlexibleShowcaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'showcase',
                template: "\r\n<div class=\"showcase {{position}}\">\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'top' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'left' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'top' || position === 'left'\">\r\n        <div class=\"slide-control\" \r\n            [class.left]=\"position == 'top'\"\r\n            [class.up]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, false)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport\" [class.paginate]=\"paginate\" #slider>\r\n        <a *ngFor=\"let item of thumbnails; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (focus)=\"hoverTab(i, false)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            (mouseleave)=\"hoverItem = undefined\"\r\n            [title]=\"item.title\" \r\n            [class.selected]=\"item.selected\">\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n            <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n            <video height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\r\n                <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n            </video>\r\n        </a>\r\n        </div>\r\n        <div class=\"slide-control\" \r\n            [class.right]=\"position == 'top'\"\r\n            [class.down]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, true)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n    <div \r\n        class=\"showcase-viewport\" \r\n        [style.width]=\"width + 'px'\" \r\n        [style.height]=\"height + 'px'\"\r\n        (mouseout)=\"hoverOut($event)\"\r\n        (mouseover)=\"hoverOver($event, selectedItem)\"\r\n        (mousemove)=\"hoverViewPort($event)\">\r\n        <img  class=\"content\" \r\n                [src]=\"hoverItem ? hoverItem.src.medium : selectedItem.src.medium\" \r\n                *ngIf=\"(hoverItem ? hoverItem.type === 'image' : selectedItem.type === 'image')\" />\r\n        <img  class=\"hover\" #largeImage\r\n                [style.width]=\"(width*2) + 'px'\"\r\n                [style.height]=\"(height*2) + 'px'\"\r\n                [src]=\"selectedItem.src.large\" \r\n                *ngIf=\"zoomOnHover && selectedItem.type === 'image'\" />\r\n        <video  \r\n            class=\"content\" #video\r\n            [style.width]=\"width + 'px'\" \r\n            [style.height]=\"height + 'px'\"\r\n            (play)=\"videoPlayed(selectedItem, video.currentTime)\"\r\n            (pause)=\"videoPaused(selectedItem, video.currentTime)\"\r\n            (ended)=\"videoEnded(selectedItem, video.currentTime)\"\r\n            *ngIf=\"(hoverItem ? hoverItem.type === 'video' : selectedItem.type === 'video')\" controls>\r\n            <source [src]=\"hoverItem ? hoverItem.src.mp4 : selectedItem.src.mp4\" type=\"video/mp4\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.webm : selectedItem.src.webm\" type=\"video/webm\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.egg : selectedItem.src.egg\" type=\"video/ogg\">\r\n        </video>\r\n    </div>\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'bottom' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'right' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <div class=\"slide-control\" \r\n            [class.left]=\"position == 'bottom'\"\r\n            [class.up]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, false)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport\" [class.paginate]=\"paginate\" #slider>\r\n        <a *ngFor=\"let item of thumbnails; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (focus)=\"hoverTab(i, false)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"item.title\" \r\n            [class.selected]=\"item.selected\">\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n            <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n            <video  height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\r\n                <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n            </video>\r\n        </a>\r\n        </div>\r\n        <div class=\"slide-control\" \r\n            [class.right]=\"position == 'bottom'\"\r\n            [class.down]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (click)=\"shiftDisplay(position, true)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
                styles: [".showcase{display:flex;width:100%}.showcase .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.showcase .showcase-viewport{box-sizing:border-box;border:1px solid #bcd;min-height:150px;overflow:hidden;position:relative}.showcase .showcase-viewport ::ng-deep img,.showcase .showcase-viewport video{width:100%}.showcase .showcase-viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}.showcase .showcase-control{border:1px solid #bcd;box-sizing:border-box;display:flex}.showcase .showcase-control.bottom,.showcase .showcase-control.top{flex-direction:row;overflow:hidden}.showcase .showcase-control.bottom .slide-control,.showcase .showcase-control.top .slide-control{width:20px;height:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.bottom .slide-control.left,.showcase .showcase-control.top .slide-control.left{border-right:1px solid #bcd}.showcase .showcase-control.bottom .slide-control.right,.showcase .showcase-control.top .slide-control.right{border-left:1px solid #bcd}.showcase .showcase-control.bottom .slide-control .fa,.showcase .showcase-control.top .slide-control .fa{font-weight:700;margin:99% 30%;font-size:1.6rem}.showcase .showcase-control.bottom .sliding-viewport.paginate,.showcase .showcase-control.top .sliding-viewport.paginate{width:calc(100% - 40px)}.showcase .showcase-control.left,.showcase .showcase-control.right{flex-direction:column;overflow:hidden}.showcase .showcase-control.left .slide-control,.showcase .showcase-control.right .slide-control{height:20px;width:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.left .slide-control.up,.showcase .showcase-control.right .slide-control.up{border-bottom:1px solid #bcd}.showcase .showcase-control.left .slide-control.down,.showcase .showcase-control.right .slide-control.down{border-top:1px solid #bcd}.showcase .showcase-control.left .slide-control .fa,.showcase .showcase-control.right .slide-control .fa{font-weight:700;margin:0 29%;font-size:1.6rem}.showcase .showcase-control.left .sliding-viewport.paginate,.showcase .showcase-control.right .sliding-viewport.paginate{height:calc(100% - 40px)}.showcase .showcase-control .sliding-viewport{display:flex}.showcase .showcase-control .sliding-viewport a{box-sizing:border-box;white-space:nowrap;border:0;cursor:pointer}.showcase .showcase-control .sliding-viewport a ::ng-deep img,.showcase .showcase-control .sliding-viewport a video{width:60px}.showcase.top{flex-direction:column}.showcase.top .showcase-control{flex-wrap:nowrap}.showcase.top .showcase-control .sliding-viewport{flex-direction:row}.showcase.bottom{flex-direction:column}.showcase.bottom .showcase-control{flex-wrap:nowrap}.showcase.bottom .showcase-control .sliding-viewport,.showcase.left{flex-direction:row}.showcase.left .showcase-control{flex-wrap:nowrap;flex:1}.showcase.left .showcase-control .sliding-viewport{flex-direction:column}.showcase.right{flex-direction:row}.showcase.right .showcase-control{flex-wrap:nowrap;flex:1}.showcase.right .showcase-control .sliding-viewport{flex-direction:column}@media screen and (max-width:600px){.showcase{display:table}.showcase-control{display:block}.showcase-control a{width:100%;display:table}.showcase-viewport{margin:5px 0}}"]
            }] }
];
/** @nocollapse */
FlexibleShowcaseComponent.ctorParameters = () => [];
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
if (false) {
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.translatedPosition;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.selectedIndex;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.selectedItem;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.hoverItem;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.paginate;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.largeImage;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.slider;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.position;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.width;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.height;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.productId;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.zoomOnHover;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.peekOnHover;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.enableEventTracking;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.thumbnails;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.message;
    /** @type {?} */
    FlexibleShowcaseComponent.prototype.onEventTracking;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtc2hvd2Nhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXNob3djYXNlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1zaG93Y2FzZS9mbGV4aWJsZS1zaG93Y2FzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDSCxTQUFTLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFFVCxNQUFNLGVBQWUsQ0FBQztBQVF2QixNQUFNO0lBMkNGO2tDQTFDMEIsQ0FBQzs2QkFDZCxDQUFDO3dCQUdOLEtBQUs7MkJBcUJRLEtBQUs7MkJBR0wsS0FBSzttQ0FHRyxLQUFLO3VCQU1qQixrQkFBa0I7K0JBR1osSUFBSSxZQUFZLEVBQUU7S0FFekI7Ozs7SUFFbkIsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDM0Q7Ozs7O0lBQ0QsV0FBVyxDQUFDLE9BQU87UUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUM7U0FDakU7S0FD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QUMsU0FBUztvQkFDekIsV0FBVyxFQUFFLEVBQUU7b0JBQ2YsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO2lCQUNoQixDQUFDLENBQUM7YUFDSDtTQUNEOzs7O1lBOUtGLFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsbTNNQUFpRDs7YUFFakQ7Ozs7O3lCQVFDLFNBQVMsU0FBQyxZQUFZO3FCQUd0QixTQUFTLFNBQUMsUUFBUTt1QkFHZixLQUFLLFNBQUMsVUFBVTtvQkFHbkIsS0FBSyxTQUFDLE9BQU87cUJBR2IsS0FBSyxTQUFDLFFBQVE7d0JBR2QsS0FBSyxTQUFDLFdBQVc7MEJBR2QsS0FBSyxTQUFDLGFBQWE7MEJBR25CLEtBQUssU0FBQyxhQUFhO2tDQUduQixLQUFLLFNBQUMscUJBQXFCO3lCQUczQixLQUFLLFNBQUMsWUFBWTtzQkFHbEIsS0FBSyxTQUFDLFNBQVM7OEJBR2xCLE1BQU0sU0FBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0QWZ0ZXJDb250ZW50SW5pdCxcclxuXHRFbGVtZW50UmVmLFxyXG5cdEV2ZW50RW1pdHRlcixcclxuXHRWaWV3Q2hpbGQsXHJcblx0T25DaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdzaG93Y2FzZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLXNob3djYXNlLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS1zaG93Y2FzZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVNob3djYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzICB7XHJcblx0cHJpdmF0ZSB0cmFuc2xhdGVkUG9zaXRpb24gPSAwO1xyXG5cdHNlbGVjdGVkSW5kZXggPSAwO1xyXG5cdHNlbGVjdGVkSXRlbTogYW55O1xyXG5cdGhvdmVySXRlbTogYW55O1xyXG5cdHBhZ2luYXRlID0gZmFsc2U7XHJcblxyXG5cdEBWaWV3Q2hpbGQoXCJsYXJnZUltYWdlXCIpXHJcblx0cHJpdmF0ZSBsYXJnZUltYWdlOiBFbGVtZW50UmVmO1xyXG5cclxuXHRAVmlld0NoaWxkKFwic2xpZGVyXCIpXHJcblx0cHJpdmF0ZSBzbGlkZXI6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQElucHV0KFwicG9zaXRpb25cIilcclxuICAgIHB1YmxpYyBwb3NpdGlvbjogc3RyaW5nOyAvLyB0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHRcclxuXHJcblx0QElucHV0KFwid2lkdGhcIilcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG5cclxuXHRASW5wdXQoXCJoZWlnaHRcIilcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcblx0QElucHV0KFwicHJvZHVjdElkXCIpXHJcbiAgICBwdWJsaWMgcHJvZHVjdElkOiBzdHJpbmc7XHJcblx0XHJcbiAgICBASW5wdXQoXCJ6b29tT25Ib3ZlclwiKVxyXG4gICAgcHVibGljIHpvb21PbkhvdmVyID0gZmFsc2VcclxuXHJcbiAgICBASW5wdXQoXCJwZWVrT25Ib3ZlclwiKVxyXG4gICAgcHVibGljIHBlZWtPbkhvdmVyID0gZmFsc2VcclxuXHJcbiAgICBASW5wdXQoXCJlbmFibGVFdmVudFRyYWNraW5nXCIpXHJcbiAgICBwdWJsaWMgZW5hYmxlRXZlbnRUcmFja2luZyA9IGZhbHNlXHJcblxyXG4gICAgQElucHV0KFwidGh1bWJuYWlsc1wiKVxyXG4gICAgcHVibGljIHRodW1ibmFpbHM6IGFueVtdO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJjbGljayB0byBzZWxlY3QgXCI7XHJcblxyXG5cdEBPdXRwdXQoJ29uRXZlbnRUcmFja2luZycpXHJcblx0cHJpdmF0ZSBvbkV2ZW50VHJhY2tpbmcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcblx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xyXG5cdFx0dGhpcy50aHVtYm5haWxzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy50aHVtYm5haWxzWzBdO1xyXG5cdFx0dGhpcy5wYWdpbmF0ZSA9ICh0aGlzLnRodW1ibmFpbHMubGVuZ3RoICogNjApID4gdGhpcy53aWR0aDtcclxuXHR9XHJcblx0bmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG5cdFx0aWYgKGNoYW5nZXMucG9zaXRpb24gJiYgdGhpcy5zbGlkZXIpIHtcclxuXHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gPSAwO1xyXG5cdFx0XHR0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDBweCwwcHgpXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyT3ZlcihldmVudCwgaXRlbSkge1xyXG5cdFx0aWYgKHRoaXMuem9vbU9uSG92ZXIgJiYgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnSU1HJykge1xyXG5cdFx0XHR0aGlzLmZpcmVUcmFja2luZ0V2ZW50KGl0ZW0udGl0bGUsIGl0ZW0udGh1bWJuYWlsSWQsIFwiem9vbWVkXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3Zlck91dChldmVudCkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSkge1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gXCItMTAwMDBweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gXCItMTAwMDBweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclZpZXdQb3J0KGV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy56b29tT25Ib3ZlciAmJiBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdJTUcnKSB7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAtZXZlbnQubGF5ZXJZICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gLWV2ZW50LmxheWVyWCArIFwicHhcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0c2hpZnREaXNwbGF5KHBvc2l0aW9uLCB0b0VuZCkge1x0XHRcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gXCJ0b3BcIiB8fCBwb3NpdGlvbiA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0XHR0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArPSAodG9FbmQgPyAtNjAgOiA2MCk7XHJcblx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uID0gdGhpcy50cmFuc2xhdGVkUG9zaXRpb24gPiAwID8gMCA6IHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uO1xyXG5cdFx0XHR0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWChcIiArIHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uICsgXCJweClcIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uICs9ICh0b0VuZCA/IC02MCA6IDYwKTtcclxuXHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gPSB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiA+IDAgPyAwIDogdGhpcy50cmFuc2xhdGVkUG9zaXRpb247XHJcblx0XHRcdHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKFwiICsgdGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKyBcInB4KVwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0dGhpcy5vbkV2ZW50VHJhY2tpbmcuZW1pdCh7XHJcblx0XHRcdFx0cHJvZHVjdElkOiB0aGlzLnByb2R1Y3RJZCxcclxuXHRcdFx0XHRhY3Rpb246IFwidGhvbWJuYWlsIHNoaWZ0XCIsXHJcblx0XHRcdFx0dGltZTogbmV3IERhdGUoKVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0a2V5dXAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRldmVudC50YXJnZXQuY2xpY2soKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dmlkZW9QbGF5ZWQoaXRlbSwgdHJhY2tpbmdUaW1lKSB7XHJcblx0XHR0aGlzLmZpcmVUcmFja2luZ0V2ZW50KFxyXG5cdFx0XHRpdGVtLnRpdGxlLFxyXG5cdFx0XHRpdGVtLnRodW1ibmFpbElkLFxyXG5cdFx0XHRcInBsYXktdmlkZW9cIixcclxuXHRcdFx0dHJhY2tpbmdUaW1lXHJcblx0XHQpO1xyXG5cdH1cclxuXHR2aWRlb1BhdXNlZChpdGVtLCB0cmFja2luZ1RpbWUpIHtcclxuXHRcdHRoaXMuZmlyZVRyYWNraW5nRXZlbnQoXHJcblx0XHRcdGl0ZW0udGl0bGUsXHJcblx0XHRcdGl0ZW0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFwicGF1c2UtdmlkZW9cIixcclxuXHRcdFx0dHJhY2tpbmdUaW1lXHJcblx0XHQpO1xyXG5cdH1cclxuXHR2aWRlb0VuZGVkKGl0ZW0sIHRyYWNraW5nVGltZSkge1xyXG5cdFx0dGhpcy5maXJlVHJhY2tpbmdFdmVudChcclxuXHRcdFx0aXRlbS50aXRsZSxcclxuXHRcdFx0aXRlbS50aHVtYm5haWxJZCxcclxuXHRcdFx0XCJlbmQtdmlkZW9cIixcclxuXHRcdFx0dHJhY2tpbmdUaW1lXHJcblx0XHQpO1xyXG5cdH1cclxuXHRob3ZlclRhYihpLCBvbmhvdmVyKSB7XHJcblx0XHRpZiAodGhpcy5wZWVrT25Ib3Zlcikge1xyXG5cdFx0XHR0aGlzLmhvdmVySXRlbSA9IHRoaXMudGh1bWJuYWlsc1tpXTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlyZVRyYWNraW5nRXZlbnQoXHJcblx0XHRcdHRoaXMudGh1bWJuYWlsc1tpXS50aXRsZSxcclxuXHRcdFx0dGhpcy50aHVtYm5haWxzW2ldLnRodW1ibmFpbElkLFxyXG5cdFx0XHRvbmhvdmVyID8gXCJob3ZlclwiIDogXCJmb2N1c1wiXHJcblx0XHQpO1xyXG5cdH1cclxuXHRzZWxlY3RUYWIoaSkge1xyXG5cdFx0dGhpcy50aHVtYm5haWxzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHR0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcclxuXHRcdHRoaXMudGh1bWJuYWlsc1tpXS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHR0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMudGh1bWJuYWlsc1tpXTtcclxuXHRcdHRoaXMuZmlyZVRyYWNraW5nRXZlbnQoXHJcblx0XHRcdHRoaXMudGh1bWJuYWlsc1tpXS50aXRsZSxcclxuXHRcdFx0dGhpcy50aHVtYm5haWxzW2ldLnRodW1ibmFpbElkLFxyXG5cdFx0XHRcInNlbGVjdFwiXHJcblx0XHQpO1xyXG5cdH1cclxuXHRwcml2YXRlIGZpcmVUcmFja2luZ0V2ZW50KG5hbWUsIGlkLCBldmVudCwgdHJhY2s/KSB7XHJcblx0XHRpZiAodGhpcy5lbmFibGVFdmVudFRyYWNraW5nKSB7XHJcblx0XHRcdGlmICh0cmFjaykge1xyXG5cdFx0XHRcdHRoaXMub25FdmVudFRyYWNraW5nLmVtaXQoe1xyXG5cdFx0XHRcdFx0cHJvZHVjdElkOiB0aGlzLnByb2R1Y3RJZCxcclxuXHRcdFx0XHRcdHRodW1ibmFpbElkOiBpZCxcclxuXHRcdFx0XHRcdGFjdGlvbjogZXZlbnQsXHJcblx0XHRcdFx0XHR0aXRsZTogbmFtZSxcclxuXHRcdFx0XHRcdGN1cnJlbnRUaW1lOiB0cmFjayxcclxuXHRcdFx0XHRcdHRpbWU6IG5ldyBEYXRlKClcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRcdHByb2R1Y3RJZDogdGhpcy5wcm9kdWN0SWQsXHJcblx0XHRcdFx0XHR0aHVtYm5haWxJZDogaWQsXHJcblx0XHRcdFx0XHRhY3Rpb246IGV2ZW50LFxyXG5cdFx0XHRcdFx0dGl0bGU6IG5hbWUsXHJcblx0XHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19