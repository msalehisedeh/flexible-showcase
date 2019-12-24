import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
var FlexibleShowcaseComponent = /** @class */ (function () {
    function FlexibleShowcaseComponent() {
        this.translatedPosition = 0;
        this.shiftedIndex = 0;
        this.selectedIndex = 0;
        this.paginate = false;
        this.hasControls = true;
        this.hoverPlay = false;
        this.zoomOnHover = false;
        this.peekOnHover = false;
        this.enableEventTracking = false;
        this.magnificationFactor = 2;
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
            // should have initial position or remember last user action.
            this.translatedPosition = 0;
            this.shiftedIndex = 0;
            this.slider.nativeElement.style.transform = "translate(0px,0px)";
        }
    };
    FlexibleShowcaseComponent.prototype.hoverOver = function (event) {
        if (this.zoomOnHover && this.largeImage) {
            var img = event.target.children[0];
            if (img) {
                var rect = img.getBoundingClientRect();
                this.largeImage.nativeElement.style.width = (this.magnificationFactor * rect.width) + 'px';
                this.largeImage.nativeElement.style.height = (this.magnificationFactor * rect.height) + 'px';
                img.style.visibility = 'hidden';
            }
            if (this.enableEventTracking) {
                this.onEventTracking.emit({
                    productId: this.productId,
                    thumbnailId: this.selectedItem.thumbnailId,
                    action: "zoomed",
                    title: this.selectedItem.title,
                    time: new Date()
                });
            }
        }
    };
    FlexibleShowcaseComponent.prototype.hoverOut = function (event) {
        if (this.largeImage) {
            var img = event.target.children[0];
            img.style.visibility = 'visible';
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
            if (this.enableEventTracking) {
                this.onEventTracking.emit({
                    productId: this.productId,
                    thumbnailId: this.selectedItem.thumbnailId,
                    action: event.type,
                    title: this.selectedItem.title,
                    time: new Date()
                });
            }
        }
    };
    FlexibleShowcaseComponent.prototype.hoverViewPort = function (event) {
        if (this.zoomOnHover && this.largeImage) {
            var img = event.target.children[0];
            var rect = img.getBoundingClientRect();
            var dx = (this.width - rect.width) * (this.magnificationFactor / 2);
            var dy = (this.height - rect.height) * (this.magnificationFactor / 2);
            var y = event.layerY * (this.magnificationFactor - 1);
            var x = event.layerX * (this.magnificationFactor - 1);
            this.largeImage.nativeElement.style.top = (-y + dy) + "px";
            this.largeImage.nativeElement.style.left = (-x + dx) + "px";
            this.largeImage.nativeElement.style.opacity = 1;
            if (this.enableEventTracking) {
                this.onEventTracking.emit({
                    productId: this.productId,
                    thumbnailId: this.selectedItem.thumbnailId,
                    action: event.type,
                    title: this.selectedItem.title,
                    time: new Date(),
                    item: {
                        Y: x,
                        X: y
                    }
                });
            }
        }
    };
    FlexibleShowcaseComponent.prototype.shiftDisplay = function (slider, position, toEnd) {
        if (this.paginate) {
            var rect = slider.getBoundingClientRect();
            var child = slider.children[this.shiftedIndex];
            var rect2 = child.getBoundingClientRect();
            var len = (slider.children.length - 1);
            var tp = this.translatedPosition;
            if (position === "top" || position === "bottom") {
                this.translatedPosition += (toEnd ? -rect2.width : rect2.width);
                this.translatedPosition =
                    this.translatedPosition > 0 ? 0 :
                        ((this.translatedPosition + rect.width) < 0 ? this.translatedPosition + rect2.width : this.translatedPosition);
                this.slider.nativeElement.style.transform = "translateX(" + this.translatedPosition + "px)";
            }
            else {
                this.translatedPosition += (toEnd ? -rect2.height : rect2.height);
                this.translatedPosition =
                    this.translatedPosition > 0 ? 0 :
                        ((this.translatedPosition + rect2.height) < 0 ? this.translatedPosition + rect2.height : this.translatedPosition);
                this.slider.nativeElement.style.transform = "translateY(" + this.translatedPosition + "px)";
            }
            if (tp !== this.translatedPosition) {
                if (toEnd) {
                    this.shiftedIndex++;
                    this.shiftedIndex = this.shiftedIndex < len ? this.shiftedIndex : len;
                }
                else {
                    this.shiftedIndex--;
                    this.shiftedIndex = this.shiftedIndex < 0 ? 0 : this.shiftedIndex;
                }
            }
            if (this.enableEventTracking) {
                this.onEventTracking.emit({
                    productId: this.productId,
                    action: "thombnail shift",
                    time: new Date()
                });
            }
        }
    };
    FlexibleShowcaseComponent.prototype.updateControls = function (event) {
        if (this.hasControls) {
            event.target.setAttribute('controls', 'true');
        }
        if (this.hoverPlay) {
            event.target.play();
        }
    };
    FlexibleShowcaseComponent.prototype.resetControls = function (event) {
        if (this.hoverPlay && this.isPlaying(event.target)) {
            event.target.pause();
        }
    };
    FlexibleShowcaseComponent.prototype.isPlaying = function (video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    };
    FlexibleShowcaseComponent.prototype.videoKeyup = function (event) {
        var code = event.which;
        if (code === 13) {
            if (this.isPlaying(event.target)) {
                event.target.pause();
            }
            else {
                event.target.play();
            }
        }
    };
    FlexibleShowcaseComponent.prototype.keyup = function (event) {
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    FlexibleShowcaseComponent.prototype.videoEvent = function (event) {
        if (this.enableEventTracking) {
            this.onEventTracking.emit({
                productId: this.productId,
                thumbnailId: this.selectedItem.thumbnailId,
                action: event.type,
                title: this.selectedItem.title,
                time: new Date(),
                item: {
                    autoplay: event.target.autoplay,
                    controls: event.target.controls,
                    duration: event.target.duration,
                    ended: event.target.ended,
                    error: event.target.error,
                    paused: event.target.paused,
                    muted: event.target.muted,
                    currentTime: event.target.currentTime,
                    volume: event.target.volume
                }
            });
        }
    };
    FlexibleShowcaseComponent.prototype.hoverTab = function (i, slider, position, onhover) {
        if (this.peekOnHover) {
            this.hoverItem = this.thumbnails[i];
        }
        if (!onhover && i !== this.shiftedIndex) {
            var toEnd = this.shiftedIndex < i;
            this.shiftedIndex = i;
            this.shiftDisplay(slider, position, toEnd);
        }
        if (this.enableEventTracking) {
            this.onEventTracking.emit({
                productId: this.thumbnails[i].productId,
                thumbnailId: this.thumbnails[i].thumbnailId,
                action: (onhover ? "hover" : "focus"),
                title: this.thumbnails[i].title,
                time: new Date()
            });
        }
    };
    FlexibleShowcaseComponent.prototype.selectTab = function (i) {
        this.thumbnails.map(function (tab) {
            tab.selected = false;
        });
        this.selectedIndex = i;
        this.thumbnails[i].selected = true;
        this.selectedItem = this.thumbnails[i];
        if (this.enableEventTracking) {
            this.onEventTracking.emit({
                productId: this.thumbnails[i].productId,
                thumbnailId: this.thumbnails[i].thumbnailId,
                action: "select",
                title: this.thumbnails[i].title,
                time: new Date()
            });
        }
    };
    tslib_1.__decorate([
        ViewChild("largeImage", { static: false })
    ], FlexibleShowcaseComponent.prototype, "largeImage", void 0);
    tslib_1.__decorate([
        ViewChild("slider", { static: false })
    ], FlexibleShowcaseComponent.prototype, "slider", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "position", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "hasControls", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "hoverPlay", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "height", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "productId", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "zoomOnHover", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "peekOnHover", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "enableEventTracking", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "magnificationFactor", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "thumbnails", void 0);
    tslib_1.__decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "message", void 0);
    tslib_1.__decorate([
        Output('onEventTracking')
    ], FlexibleShowcaseComponent.prototype, "onEventTracking", void 0);
    FlexibleShowcaseComponent = tslib_1.__decorate([
        Component({
            selector: 'showcase',
            template: "\r\n<div class=\"showcase {{position}}\">\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'top' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'left' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'top' || position === 'left'\">\r\n        <div class=\"slide-control\" \r\n            tabindex=\"0\"\r\n            [class.left]=\"position == 'top'\"\r\n            [class.up]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, false)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport paginate\">\r\n            <ul  #slider>\r\n                <li *ngFor=\"let item of thumbnails; let i = index\">\r\n                    <a  role=\"listitem\" \r\n                        tabindex=\"0\"\r\n                        (keyup)=\"keyup($event)\" \r\n                        (click)=\"selectTab(i)\"\r\n                        (focus)=\"hoverTab(i, slider, position, false)\"\r\n                        (mouseenter)=\"hoverTab(i, slider, position, true)\"\r\n                        (mouseleave)=\"hoverItem = undefined\"\r\n                        [title]=\"item.title\" \r\n                        [class.selected]=\"item.selected\">\r\n                        <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n                        <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n                        <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n                        <video height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\r\n                            <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                            <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                            <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n                        </video>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"slide-control\" \r\n            tabindex=\"0\"\r\n            [class.right]=\"position == 'top'\"\r\n            [class.down]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, true)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n    <div tabindex=\"0\"\r\n        class=\"showcase-viewport\" \r\n        [style.width]=\"width + 'px'\" \r\n        [style.height]=\"height + 'px'\"\r\n        (keyup)=\"videoKeyup($event)\"\r\n        (mouseout)=\"hoverOut($event)\"\r\n        (mouseover)=\"hoverOver($event)\"\r\n        (mousemove)=\"hoverViewPort($event)\">\r\n        <img  class=\"content\" \r\n                [src]=\"hoverItem ? hoverItem.src.medium : selectedItem.src.medium\" \r\n                *ngIf=\"(hoverItem ? hoverItem.type === 'image' : selectedItem.type === 'image')\" />\r\n        <img  class=\"hover\" #largeImage\r\n                [src]=\"selectedItem.src.large\" \r\n                *ngIf=\"zoomOnHover && selectedItem.type === 'image'\" />\r\n        <video \r\n            class=\"content\" #video\r\n            [style.width]=\"width + 'px'\" \r\n            [style.height]=\"height + 'px'\"\r\n            [attr.poster]=\"(hoverItem && hoverItem.poster) ? hoverItem.poster : ((selectedItem && selectedItem.poster) ? selectedItem.poster : null)\"\r\n            (focus)=\"updateControls($event)\"\r\n            (mouseenter)=\"updateControls($event)\"\r\n            (mouseleave)=\"resetControls($event)\"\r\n            (play)=\"videoEvent($event)\"\r\n            (pause)=\"videoEvent($event)\"\r\n            (ended)=\"videoEvent($event)\"\r\n            (seeked)=\"videoEvent($event)\"\r\n            (error)=\"videoEvent($event)\"\r\n            (fullscreenchange)=\"videoEvent($event)\"\r\n            *ngIf=\"(hoverItem ? hoverItem.type === 'video' : selectedItem.type === 'video')\" controls>\r\n            <source [src]=\"hoverItem ? hoverItem.src.mp4 : selectedItem.src.mp4\" type=\"video/mp4\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.webm : selectedItem.src.webm\" type=\"video/webm\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.egg : selectedItem.src.egg\" type=\"video/ogg\">\r\n        </video>\r\n    </div>\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'bottom' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'right' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <div class=\"slide-control\" tabindex=\"0\"\r\n            [class.left]=\"position == 'bottom'\"\r\n            [class.up]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, false)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport paginate\">\r\n            <ul #slider>\r\n                <li *ngFor=\"let item of thumbnails; let i = index\">\r\n                    <a  role=\"listitem\" \r\n                        tabindex=\"0\"\r\n                        (keyup)=\"keyup($event)\" \r\n                        (click)=\"selectTab(i)\"\r\n                        (focus)=\"hoverTab(i, slider, position, false)\"\r\n                        (mouseenter)=\"hoverTab(i, slider, position, true)\"\r\n                        [title]=\"item.title\" \r\n                        [class.selected]=\"item.selected\">\r\n                        <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n                        <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n                        <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n                        <video *ngIf=\"item.type === 'video'\" \r\n                            [attr.poster]=\"item.poster ? item.poster : null\"\r\n                            height=\"100%\" \r\n                            class=\"content\" \r\n                            disabled=\"disabled\"\r\n                            tabindex=\"-1\">\r\n                            <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                            <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                            <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n                        </video>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"slide-control\" tabindex=\"0\"\r\n            [class.right]=\"position == 'bottom'\"\r\n            [class.down]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, true)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
            styles: [".showcase{display:flex;width:100%}.showcase .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.showcase .showcase-viewport{box-sizing:border-box;border:1px solid #bcd;min-height:150px;overflow:hidden;position:relative}.showcase .showcase-viewport ::ng-deep img,.showcase .showcase-viewport video{width:100%}.showcase .showcase-viewport img.content{pointer-events:none}.showcase .showcase-viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}.showcase .showcase-control{border:1px solid #bcd;box-sizing:border-box;display:flex}.showcase .showcase-control.bottom,.showcase .showcase-control.top{flex-direction:row;overflow:hidden}.showcase .showcase-control.bottom .slide-control,.showcase .showcase-control.top .slide-control{width:20px;height:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.bottom .slide-control.left,.showcase .showcase-control.top .slide-control.left{border-right:1px solid #bcd}.showcase .showcase-control.bottom .slide-control.right,.showcase .showcase-control.top .slide-control.right{border-left:1px solid #bcd}.showcase .showcase-control.bottom .slide-control .fa,.showcase .showcase-control.top .slide-control .fa{font-weight:700;margin:99% 30%;font-size:1.6rem;display:table;line-height:1rem}.showcase .showcase-control.bottom .sliding-viewport.paginate,.showcase .showcase-control.top .sliding-viewport.paginate{flex:1;width:100%;overflow:hidden}.showcase .showcase-control.bottom .sliding-viewport.paginate ul,.showcase .showcase-control.top .sliding-viewport.paginate ul{list-style-type:none;padding:0;margin:0;display:flex;flex-direction:row;transition:transform .3s linear}.showcase .showcase-control.left,.showcase .showcase-control.right{flex-direction:column;overflow:hidden}.showcase .showcase-control.left .slide-control,.showcase .showcase-control.right .slide-control{height:20px;width:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.left .slide-control.up,.showcase .showcase-control.right .slide-control.up{border-bottom:1px solid #bcd}.showcase .showcase-control.left .slide-control.down,.showcase .showcase-control.right .slide-control.down{border-top:1px solid #bcd}.showcase .showcase-control.left .slide-control .fa,.showcase .showcase-control.right .slide-control .fa{font-weight:700;margin:0 29%;font-size:1.6rem;display:table;line-height:1rem}.showcase .showcase-control.left .sliding-viewport.paginate,.showcase .showcase-control.right .sliding-viewport.paginate{flex:1;height:100%;overflow:hidden}.showcase .showcase-control.left .sliding-viewport.paginate ul,.showcase .showcase-control.right .sliding-viewport.paginate ul{list-style-type:none;padding:0;margin:0;display:flex;flex-direction:column;transition:transform .3s linear}.showcase .showcase-control .sliding-viewport{display:flex}.showcase .showcase-control .sliding-viewport a{box-sizing:border-box;white-space:nowrap;border:0;cursor:pointer}.showcase .showcase-control .sliding-viewport a ::ng-deep img,.showcase .showcase-control .sliding-viewport a video{width:60px}.showcase.top{flex-direction:column}.showcase.top .showcase-control{flex-wrap:nowrap}.showcase.top .showcase-control .sliding-viewport{flex-direction:row}.showcase.bottom{flex-direction:column}.showcase.bottom .showcase-control{flex-wrap:nowrap}.showcase.bottom .showcase-control .sliding-viewport,.showcase.left{flex-direction:row}.showcase.left .showcase-control{flex-wrap:nowrap;flex:1}.showcase.left .showcase-control .sliding-viewport{flex-direction:column}.showcase.right{flex-direction:row}.showcase.right .showcase-control{flex-wrap:nowrap;flex:1}.showcase.right .showcase-control .sliding-viewport{flex-direction:column}@media screen and (max-width:600px){.showcase{display:table}.showcase-control{display:block}.showcase-control a{width:100%;display:table}.showcase-viewport{margin:5px 0}}"]
        })
    ], FlexibleShowcaseComponent);
    return FlexibleShowcaseComponent;
}());
export { FlexibleShowcaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtc2hvd2Nhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXNob3djYXNlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1zaG93Y2FzZS9mbGV4aWJsZS1zaG93Y2FzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDSCxTQUFTLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFHTixZQUFZLEVBQ1osU0FBUyxFQUVULE1BQU0sZUFBZSxDQUFDO0FBUXZCO0lBOEJJO1FBN0JLLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUMvQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUdsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBVVIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUdmLGdCQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ25CLGdCQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ25CLHdCQUFtQixHQUFHLEtBQUssQ0FBQTtRQUM5Qix3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFFckIsWUFBTyxHQUFHLGtCQUFrQixDQUFDO1FBR2pDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUzQixDQUFDO0lBRW5CLHNEQUFrQixHQUFsQjtRQUNDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENB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RTs2REFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTtnRUFBbUI7SUFDZjtRQUFSLEtBQUssRUFBRTtrRUFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7a0VBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFOzBFQUE0QjtJQUM5QjtRQUFSLEtBQUssRUFBRTswRUFBeUI7SUFDckI7UUFBUixLQUFLLEVBQUU7aUVBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzhEQUE4QjtJQUd6QztRQURDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztzRUFDbUI7SUE1QmpDLHlCQUF5QjtRQUxyQyxTQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsVUFBVTtZQUNwQixzdlBBQWlEOztTQUVqRCxDQUFDO09BQ1cseUJBQXlCLENBZ1ByQztJQUFELGdDQUFDO0NBQUEsQUFoUEQsSUFnUEM7U0FoUFkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEFmdGVyQ29udGVudEluaXQsXHJcblx0RWxlbWVudFJlZixcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0Vmlld0NoaWxkLFxyXG5cdE9uQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnc2hvd2Nhc2UnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS1zaG93Y2FzZS5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUtc2hvd2Nhc2UuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVTaG93Y2FzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcyAge1xyXG5cdHByaXZhdGUgdHJhbnNsYXRlZFBvc2l0aW9uID0gMDtcclxuXHRzaGlmdGVkSW5kZXggPSAwO1xyXG5cdHNlbGVjdGVkSW5kZXggPSAwO1xyXG5cdHNlbGVjdGVkSXRlbTogYW55O1xyXG5cdGhvdmVySXRlbTogYW55O1xyXG5cdHBhZ2luYXRlID0gZmFsc2U7XHJcblxyXG5cdEBWaWV3Q2hpbGQoXCJsYXJnZUltYWdlXCIsIHtzdGF0aWM6IGZhbHNlfSlcclxuXHRwcml2YXRlIGxhcmdlSW1hZ2U6IEVsZW1lbnRSZWY7XHJcblxyXG5cdEBWaWV3Q2hpbGQoXCJzbGlkZXJcIiwge3N0YXRpYzogZmFsc2V9KVxyXG5cdHByaXZhdGUgc2xpZGVyOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBJbnB1dCgpIHBvc2l0aW9uOiBzdHJpbmc7IC8vIHRvcCwgbGVmdCwgYm90dG9tLCByaWdodFxyXG5cdEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XHJcblx0QElucHV0KCkgaGFzQ29udHJvbHMgPSB0cnVlO1xyXG5cdEBJbnB1dCgpIGhvdmVyUGxheSA9IGZhbHNlOyAgXHJcblx0QElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XHJcblx0QElucHV0KCkgcHJvZHVjdElkOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSB6b29tT25Ib3ZlciA9IGZhbHNlXHJcbiAgICBASW5wdXQoKSBwZWVrT25Ib3ZlciA9IGZhbHNlXHJcbiAgICBASW5wdXQoKSBlbmFibGVFdmVudFRyYWNraW5nID0gZmFsc2VcclxuXHRASW5wdXQoKSBtYWduaWZpY2F0aW9uRmFjdG9yID0gMjtcclxuICAgIEBJbnB1dCgpIHRodW1ibmFpbHM6IGFueVtdO1xyXG4gICAgQElucHV0KCkgbWVzc2FnZSA9IFwiY2xpY2sgdG8gc2VsZWN0IFwiO1xyXG5cclxuXHRAT3V0cHV0KCdvbkV2ZW50VHJhY2tpbmcnKVxyXG5cdHByaXZhdGUgb25FdmVudFRyYWNraW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuXHRcdHRoaXMudGh1bWJuYWlsc1swXS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHR0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMudGh1bWJuYWlsc1swXTtcclxuXHRcdHRoaXMucGFnaW5hdGUgPSAodGhpcy50aHVtYm5haWxzLmxlbmd0aCAqIDYwKSA+IHRoaXMud2lkdGg7XHJcblx0fVxyXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG5cdFx0aWYgKGNoYW5nZXMucG9zaXRpb24gJiYgdGhpcy5zbGlkZXIpIHtcclxuXHRcdFx0Ly8gc2hvdWxkIGhhdmUgaW5pdGlhbCBwb3NpdGlvbiBvciByZW1lbWJlciBsYXN0IHVzZXIgYWN0aW9uLlxyXG5cdFx0XHR0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiA9IDA7XHJcblx0XHRcdHRoaXMuc2hpZnRlZEluZGV4ID0gMDtcclxuXHRcdFx0dGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZSgwcHgsMHB4KVwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3Zlck92ZXIoZXZlbnQ6IGFueSkge1xyXG5cdFx0aWYgKHRoaXMuem9vbU9uSG92ZXIgJiYgdGhpcy5sYXJnZUltYWdlKSB7XHJcblx0XHRcdGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuXHRcdFx0aWYgKGltZykge1xyXG5cdFx0XHQgIGNvbnN0IHJlY3QgPSBpbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdCAgdGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yICogcmVjdC53aWR0aCkgKyAncHgnO1xyXG5cdFx0XHQgIHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9ICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgKiByZWN0LmhlaWdodCkgKyAncHgnO1xyXG5cdFx0XHQgIGltZy5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuZW5hYmxlRXZlbnRUcmFja2luZykge1xyXG5cdFx0XHRcdHRoaXMub25FdmVudFRyYWNraW5nLmVtaXQoe1xyXG5cdFx0XHRcdFx0cHJvZHVjdElkOiB0aGlzLnByb2R1Y3RJZCxcclxuXHRcdFx0XHRcdHRodW1ibmFpbElkOiB0aGlzLnNlbGVjdGVkSXRlbS50aHVtYm5haWxJZCxcclxuXHRcdFx0XHRcdGFjdGlvbjogXCJ6b29tZWRcIixcclxuXHRcdFx0XHRcdHRpdGxlOiAgdGhpcy5zZWxlY3RlZEl0ZW0udGl0bGUsXHJcblx0XHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRob3Zlck91dChldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlKSB7XHJcblx0XHRcdGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuXHRcdFx0aW1nLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBcIi0xMDAwMHB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBcIi0xMDAwMHB4XCI7XHJcblx0XHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRcdHByb2R1Y3RJZDogdGhpcy5wcm9kdWN0SWQsXHJcblx0XHRcdFx0XHR0aHVtYm5haWxJZDogdGhpcy5zZWxlY3RlZEl0ZW0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFx0XHRhY3Rpb246IGV2ZW50LnR5cGUsXHJcblx0XHRcdFx0XHR0aXRsZTogIHRoaXMuc2VsZWN0ZWRJdGVtLnRpdGxlLFxyXG5cdFx0XHRcdFx0dGltZTogbmV3IERhdGUoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHRcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJWaWV3UG9ydChldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy56b29tT25Ib3ZlciAmJiB0aGlzLmxhcmdlSW1hZ2UpIHtcclxuXHRcdFx0Y29uc3QgaW1nID0gZXZlbnQudGFyZ2V0LmNoaWxkcmVuWzBdO1xyXG5cdFx0XHRjb25zdCByZWN0ID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRjb25zdCBkeCA9ICh0aGlzLndpZHRoIC0gcmVjdC53aWR0aCkqKHRoaXMubWFnbmlmaWNhdGlvbkZhY3Rvci8yKTtcclxuXHRcdFx0Y29uc3QgZHkgPSAodGhpcy5oZWlnaHQgLSByZWN0LmhlaWdodCkqKHRoaXMubWFnbmlmaWNhdGlvbkZhY3Rvci8yKTtcclxuXHRcdFx0Y29uc3QgeSA9IGV2ZW50LmxheWVyWSAqICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgLSAxKTtcclxuXHRcdFx0Y29uc3QgeCA9IGV2ZW50LmxheWVyWCAqICh0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IgLSAxKTtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gKC15ICsgZHkpICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKC14ICsgZHgpICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuXHRcdFx0aWYgKHRoaXMuZW5hYmxlRXZlbnRUcmFja2luZykge1xyXG5cdFx0XHRcdHRoaXMub25FdmVudFRyYWNraW5nLmVtaXQoe1xyXG5cdFx0XHRcdFx0cHJvZHVjdElkOiB0aGlzLnByb2R1Y3RJZCxcclxuXHRcdFx0XHRcdHRodW1ibmFpbElkOiB0aGlzLnNlbGVjdGVkSXRlbS50aHVtYm5haWxJZCxcclxuXHRcdFx0XHRcdGFjdGlvbjogZXZlbnQudHlwZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAgdGhpcy5zZWxlY3RlZEl0ZW0udGl0bGUsXHJcblx0XHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpLFxyXG5cdFx0XHRcdFx0aXRlbToge1xyXG5cdFx0XHRcdFx0XHRZOiB4LFxyXG5cdFx0XHRcdFx0XHRYOiB5XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRzaGlmdERpc3BsYXkoc2xpZGVyOiBIVE1MRWxlbWVudCwgcG9zaXRpb246IHN0cmluZywgdG9FbmQ6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLnBhZ2luYXRlKSB7XHJcblx0XHRcdGNvbnN0IHJlY3QgPSBzbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdGNvbnN0IGNoaWxkOiBhbnkgPSBzbGlkZXIuY2hpbGRyZW5bdGhpcy5zaGlmdGVkSW5kZXhdO1xyXG5cdFx0XHRjb25zdCByZWN0MiA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRjb25zdCBsZW4gPSAoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAtMSk7XHJcblx0XHRcdGNvbnN0IHRwID0gdGhpcy50cmFuc2xhdGVkUG9zaXRpb247XHJcblxyXG5cdFx0XHRpZiAocG9zaXRpb24gPT09IFwidG9wXCIgfHwgcG9zaXRpb24gPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdFx0XHR0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArPSAodG9FbmQgPyAtcmVjdDIud2lkdGggOiByZWN0Mi53aWR0aCk7XHJcblx0XHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gPSBcclxuXHRcdFx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uID4gMCA/IDAgOiBcclxuXHRcdFx0XHRcdFx0KCh0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArIHJlY3Qud2lkdGgpIDwgMCA/IHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uICsgcmVjdDIud2lkdGggOiB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbik7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoXCIgKyB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArIFwicHgpXCI7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKz0gKHRvRW5kID8gLXJlY3QyLmhlaWdodCA6IHJlY3QyLmhlaWdodCk7XHJcblx0XHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gPSBcclxuXHRcdFx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uID4gMCA/IDAgOiBcclxuXHRcdFx0XHRcdFx0KCh0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArIHJlY3QyLmhlaWdodCkgPCAwID8gdGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKyByZWN0Mi5oZWlnaHQgOiB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbik7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoXCIgKyB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArIFwicHgpXCI7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRwICE9PSB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbikge1xyXG5cdFx0XHRcdGlmICh0b0VuZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zaGlmdGVkSW5kZXgrKztcclxuXHRcdFx0XHRcdHRoaXMuc2hpZnRlZEluZGV4ID0gdGhpcy5zaGlmdGVkSW5kZXggPCBsZW4gPyB0aGlzLnNoaWZ0ZWRJbmRleCA6IGxlbjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5zaGlmdGVkSW5kZXgtLTtcclxuXHRcdFx0XHRcdHRoaXMuc2hpZnRlZEluZGV4ID0gdGhpcy5zaGlmdGVkSW5kZXggPCAwID8gMCA6IHRoaXMuc2hpZnRlZEluZGV4O1xyXG5cdFx0XHRcdH1cdFxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRcdHByb2R1Y3RJZDogdGhpcy5wcm9kdWN0SWQsXHJcblx0XHRcdFx0XHRhY3Rpb246IFwidGhvbWJuYWlsIHNoaWZ0XCIsXHJcblx0XHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0dXBkYXRlQ29udHJvbHMoZXZlbnQ6IGFueSkge1xyXG5cdFx0aWYgKHRoaXMuaGFzQ29udHJvbHMpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCd0cnVlJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5ob3ZlclBsYXkpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LnBsYXkoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmVzZXRDb250cm9scyhldmVudDogYW55KSB7XHJcblx0XHRpZiAodGhpcy5ob3ZlclBsYXkgJiYgdGhpcy5pc1BsYXlpbmcoZXZlbnQudGFyZ2V0KSkge1xyXG5cdFx0XHRldmVudC50YXJnZXQucGF1c2UoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSBpc1BsYXlpbmcodmlkZW86IGFueSkge1xyXG5cdFx0cmV0dXJuICEhKHZpZGVvLmN1cnJlbnRUaW1lID4gMCAmJiAhdmlkZW8ucGF1c2VkICYmICF2aWRlby5lbmRlZCAmJiB2aWRlby5yZWFkeVN0YXRlID4gMik7XHJcblx0fVxyXG5cdHZpZGVvS2V5dXAoZXZlbnQ6IGFueSkge1xyXG5cdFx0Y29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzUGxheWluZyhldmVudC50YXJnZXQpKSB7XHJcblx0XHRcdFx0ZXZlbnQudGFyZ2V0LnBhdXNlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZXZlbnQudGFyZ2V0LnBsYXkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXl1cChldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHZpZGVvRXZlbnQoZXZlbnQ6IGFueSkge1xyXG5cdFx0aWYgKHRoaXMuZW5hYmxlRXZlbnRUcmFja2luZykge1xyXG5cdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdElkLFxyXG5cdFx0XHRcdHRodW1ibmFpbElkOiB0aGlzLnNlbGVjdGVkSXRlbS50aHVtYm5haWxJZCxcclxuXHRcdFx0XHRhY3Rpb246IGV2ZW50LnR5cGUsXHJcblx0XHRcdFx0dGl0bGU6ICB0aGlzLnNlbGVjdGVkSXRlbS50aXRsZSxcclxuXHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpLFxyXG5cdFx0XHRcdGl0ZW06IHtcclxuXHRcdFx0XHRcdGF1dG9wbGF5OiBldmVudC50YXJnZXQuYXV0b3BsYXksXHJcblx0XHRcdFx0XHRjb250cm9sczogZXZlbnQudGFyZ2V0LmNvbnRyb2xzLFxyXG5cdFx0XHRcdFx0ZHVyYXRpb246IGV2ZW50LnRhcmdldC5kdXJhdGlvbixcclxuXHRcdFx0XHRcdGVuZGVkOiBldmVudC50YXJnZXQuZW5kZWQsXHJcblx0XHRcdFx0XHRlcnJvcjogZXZlbnQudGFyZ2V0LmVycm9yLFxyXG5cdFx0XHRcdFx0cGF1c2VkOiBldmVudC50YXJnZXQucGF1c2VkLFxyXG5cdFx0XHRcdFx0bXV0ZWQ6IGV2ZW50LnRhcmdldC5tdXRlZCxcclxuXHRcdFx0XHRcdGN1cnJlbnRUaW1lOiBldmVudC50YXJnZXQuY3VycmVudFRpbWUsXHJcblx0XHRcdFx0XHR2b2x1bWU6IGV2ZW50LnRhcmdldC52b2x1bWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclRhYihpOiBudW1iZXIsIHNsaWRlcjogSFRNTEVsZW1lbnQsIHBvc2l0aW9uOiBzdHJpbmcsIG9uaG92ZXI6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLnBlZWtPbkhvdmVyKSB7XHJcblx0XHRcdHRoaXMuaG92ZXJJdGVtID0gdGhpcy50aHVtYm5haWxzW2ldO1xyXG5cdFx0fVxyXG5cdFx0aWYoIW9uaG92ZXIgJiYgaSAhPT0gdGhpcy5zaGlmdGVkSW5kZXgpIHtcclxuXHRcdFx0Y29uc3QgdG9FbmQgPSB0aGlzLnNoaWZ0ZWRJbmRleCA8IGk7XHJcblx0XHRcdHRoaXMuc2hpZnRlZEluZGV4ID0gaTtcclxuXHRcdFx0dGhpcy5zaGlmdERpc3BsYXkoc2xpZGVyLCBwb3NpdGlvbiwgdG9FbmQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZW5hYmxlRXZlbnRUcmFja2luZykge1xyXG5cdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRwcm9kdWN0SWQ6IHRoaXMudGh1bWJuYWlsc1tpXS5wcm9kdWN0SWQsXHJcblx0XHRcdFx0dGh1bWJuYWlsSWQ6IHRoaXMudGh1bWJuYWlsc1tpXS50aHVtYm5haWxJZCxcclxuXHRcdFx0XHRhY3Rpb246IChvbmhvdmVyID8gXCJob3ZlclwiIDogXCJmb2N1c1wiKSxcclxuXHRcdFx0XHR0aXRsZTogdGhpcy50aHVtYm5haWxzW2ldLnRpdGxlLFxyXG5cdFx0XHRcdHRpbWU6IG5ldyBEYXRlKClcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpOiBudW1iZXIpIHtcclxuXHRcdHRoaXMudGh1bWJuYWlscy5tYXAoKHRhYik9PntcclxuXHRcdFx0dGFiLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGk7XHJcblx0XHR0aGlzLnRodW1ibmFpbHNbaV0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnRodW1ibmFpbHNbaV07XHJcblx0XHRpZiAodGhpcy5lbmFibGVFdmVudFRyYWNraW5nKSB7XHJcblx0XHRcdHRoaXMub25FdmVudFRyYWNraW5nLmVtaXQoe1xyXG5cdFx0XHRcdHByb2R1Y3RJZDogdGhpcy50aHVtYm5haWxzW2ldLnByb2R1Y3RJZCxcclxuXHRcdFx0XHR0aHVtYm5haWxJZDogdGhpcy50aHVtYm5haWxzW2ldLnRodW1ibmFpbElkLFxyXG5cdFx0XHRcdGFjdGlvbjogXCJzZWxlY3RcIixcclxuXHRcdFx0XHR0aXRsZTogdGhpcy50aHVtYm5haWxzW2ldLnRpdGxlLFxyXG5cdFx0XHRcdHRpbWU6IG5ldyBEYXRlKClcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==