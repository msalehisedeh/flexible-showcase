import { __decorate } from 'tslib';
import { EventEmitter, ViewChild, Input, Output, Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    __decorate([
        ViewChild("largeImage", { static: false })
    ], FlexibleShowcaseComponent.prototype, "largeImage", void 0);
    __decorate([
        ViewChild("slider", { static: false })
    ], FlexibleShowcaseComponent.prototype, "slider", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "position", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "hasControls", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "hoverPlay", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "productId", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "zoomOnHover", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "peekOnHover", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "enableEventTracking", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "magnificationFactor", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "thumbnails", void 0);
    __decorate([
        Input()
    ], FlexibleShowcaseComponent.prototype, "message", void 0);
    __decorate([
        Output('onEventTracking')
    ], FlexibleShowcaseComponent.prototype, "onEventTracking", void 0);
    FlexibleShowcaseComponent = __decorate([
        Component({
            selector: 'showcase',
            template: "\r\n<div class=\"showcase {{position}}\">\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'top' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'left' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'top' || position === 'left'\">\r\n        <div class=\"slide-control\" \r\n            tabindex=\"0\"\r\n            [class.left]=\"position == 'top'\"\r\n            [class.up]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, false)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport paginate\">\r\n            <ul  #slider>\r\n                <li *ngFor=\"let item of thumbnails; let i = index\">\r\n                    <a  role=\"listitem\" \r\n                        tabindex=\"0\"\r\n                        (keyup)=\"keyup($event)\" \r\n                        (click)=\"selectTab(i)\"\r\n                        (focus)=\"hoverTab(i, slider, position, false)\"\r\n                        (mouseenter)=\"hoverTab(i, slider, position, true)\"\r\n                        (mouseleave)=\"hoverItem = undefined\"\r\n                        [title]=\"item.title\" \r\n                        [class.selected]=\"item.selected\">\r\n                        <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n                        <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n                        <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n                        <video height=\"100%\" class=\"content\" *ngIf=\"item.type === 'video'\" disabled=\"disabled\" tabindex=\"-1\">\r\n                            <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                            <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                            <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n                        </video>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"slide-control\" \r\n            tabindex=\"0\"\r\n            [class.right]=\"position == 'top'\"\r\n            [class.down]=\"position == 'left'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, true)\">\r\n            <span *ngIf=\"position === 'top'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'left'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n    <div tabindex=\"0\"\r\n        class=\"showcase-viewport\" \r\n        [style.width]=\"width + 'px'\" \r\n        [style.height]=\"height + 'px'\"\r\n        (keyup)=\"videoKeyup($event)\"\r\n        (mouseout)=\"hoverOut($event)\"\r\n        (mouseover)=\"hoverOver($event)\"\r\n        (mousemove)=\"hoverViewPort($event)\">\r\n        <img  class=\"content\" \r\n                [src]=\"hoverItem ? hoverItem.src.medium : selectedItem.src.medium\" \r\n                *ngIf=\"(hoverItem ? hoverItem.type === 'image' : selectedItem.type === 'image')\" />\r\n        <img  class=\"hover\" #largeImage\r\n                [src]=\"selectedItem.src.large\" \r\n                *ngIf=\"zoomOnHover && selectedItem.type === 'image'\" />\r\n        <video \r\n            class=\"content\" #video\r\n            [style.width]=\"width + 'px'\" \r\n            [style.height]=\"height + 'px'\"\r\n            [attr.poster]=\"(hoverItem && hoverItem.poster) ? hoverItem.poster : ((selectedItem && selectedItem.poster) ? selectedItem.poster : null)\"\r\n            (focus)=\"updateControls($event)\"\r\n            (mouseenter)=\"updateControls($event)\"\r\n            (mouseleave)=\"resetControls($event)\"\r\n            (play)=\"videoEvent($event)\"\r\n            (pause)=\"videoEvent($event)\"\r\n            (ended)=\"videoEvent($event)\"\r\n            (seeked)=\"videoEvent($event)\"\r\n            (error)=\"videoEvent($event)\"\r\n            (fullscreenchange)=\"videoEvent($event)\"\r\n            *ngIf=\"(hoverItem ? hoverItem.type === 'video' : selectedItem.type === 'video')\" controls>\r\n            <source [src]=\"hoverItem ? hoverItem.src.mp4 : selectedItem.src.mp4\" type=\"video/mp4\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.webm : selectedItem.src.webm\" type=\"video/webm\">\r\n            <source [src]=\"hoverItem ? hoverItem.src.egg : selectedItem.src.egg\" type=\"video/ogg\">\r\n        </video>\r\n    </div>\r\n    <div class=\"showcase-control {{position}}\" \r\n        role=\"list\" \r\n        [style.width]=\"position === 'bottom' ? width + 'px' : null\" \r\n        [style.height]=\"position === 'right' ? height + 'px' : null\"\r\n        *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <div class=\"slide-control\" tabindex=\"0\"\r\n            [class.left]=\"position == 'bottom'\"\r\n            [class.up]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, false)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-up\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <div class=\"sliding-viewport paginate\">\r\n            <ul #slider>\r\n                <li *ngFor=\"let item of thumbnails; let i = index\">\r\n                    <a  role=\"listitem\" \r\n                        tabindex=\"0\"\r\n                        (keyup)=\"keyup($event)\" \r\n                        (click)=\"selectTab(i)\"\r\n                        (focus)=\"hoverTab(i, slider, position, false)\"\r\n                        (mouseenter)=\"hoverTab(i, slider, position, true)\"\r\n                        [title]=\"item.title\" \r\n                        [class.selected]=\"item.selected\">\r\n                        <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n                        <span class=\"title off-screen\" [textContent]=\"item.title\"></span>\r\n                        <img  class=\"content\" [src]=\"item.src.small\" *ngIf=\"item.type === 'image'\" />\r\n                        <video *ngIf=\"item.type === 'video'\" \r\n                            [attr.poster]=\"item.poster ? item.poster : null\"\r\n                            height=\"100%\" \r\n                            class=\"content\" \r\n                            disabled=\"disabled\"\r\n                            tabindex=\"-1\">\r\n                            <source [src]=\"item.src.mp4\" type=\"video/mp4\">\r\n                            <source [src]=\"item.src.webm\" type=\"video/webm\">\r\n                            <source [src]=\"item.src.egg\" type=\"video/ogg\">\r\n                        </video>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"slide-control\" tabindex=\"0\"\r\n            [class.right]=\"position == 'bottom'\"\r\n            [class.down]=\"position == 'right'\"\r\n            *ngIf=\"paginate\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"shiftDisplay(slider, position, true)\">\r\n            <span *ngIf=\"position === 'bottom'\" class=\"fa fa-angle-right\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"position === 'right'\" class=\"fa fa-angle-down\" aria-hidden=\"true\"></span>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
            styles: [".showcase{display:flex;width:100%}.showcase .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.showcase .showcase-viewport{box-sizing:border-box;border:1px solid #bcd;min-height:150px;overflow:hidden;position:relative}.showcase .showcase-viewport ::ng-deep img,.showcase .showcase-viewport video{width:100%}.showcase .showcase-viewport img.content{pointer-events:none}.showcase .showcase-viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}.showcase .showcase-control{border:1px solid #bcd;box-sizing:border-box;display:flex}.showcase .showcase-control.bottom,.showcase .showcase-control.top{flex-direction:row;overflow:hidden}.showcase .showcase-control.bottom .slide-control,.showcase .showcase-control.top .slide-control{width:20px;height:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.bottom .slide-control.left,.showcase .showcase-control.top .slide-control.left{border-right:1px solid #bcd}.showcase .showcase-control.bottom .slide-control.right,.showcase .showcase-control.top .slide-control.right{border-left:1px solid #bcd}.showcase .showcase-control.bottom .slide-control .fa,.showcase .showcase-control.top .slide-control .fa{font-weight:700;margin:99% 30%;font-size:1.6rem;display:table;line-height:1rem}.showcase .showcase-control.bottom .sliding-viewport.paginate,.showcase .showcase-control.top .sliding-viewport.paginate{flex:1;width:100%;overflow:hidden}.showcase .showcase-control.bottom .sliding-viewport.paginate ul,.showcase .showcase-control.top .sliding-viewport.paginate ul{list-style-type:none;padding:0;margin:0;display:flex;flex-direction:row;transition:transform .3s linear}.showcase .showcase-control.left,.showcase .showcase-control.right{flex-direction:column;overflow:hidden}.showcase .showcase-control.left .slide-control,.showcase .showcase-control.right .slide-control{height:20px;width:inherit;background-color:#fff;z-index:2}.showcase .showcase-control.left .slide-control.up,.showcase .showcase-control.right .slide-control.up{border-bottom:1px solid #bcd}.showcase .showcase-control.left .slide-control.down,.showcase .showcase-control.right .slide-control.down{border-top:1px solid #bcd}.showcase .showcase-control.left .slide-control .fa,.showcase .showcase-control.right .slide-control .fa{font-weight:700;margin:0 29%;font-size:1.6rem;display:table;line-height:1rem}.showcase .showcase-control.left .sliding-viewport.paginate,.showcase .showcase-control.right .sliding-viewport.paginate{flex:1;height:100%;overflow:hidden}.showcase .showcase-control.left .sliding-viewport.paginate ul,.showcase .showcase-control.right .sliding-viewport.paginate ul{list-style-type:none;padding:0;margin:0;display:flex;flex-direction:column;transition:transform .3s linear}.showcase .showcase-control .sliding-viewport{display:flex}.showcase .showcase-control .sliding-viewport a{box-sizing:border-box;white-space:nowrap;border:0;cursor:pointer}.showcase .showcase-control .sliding-viewport a ::ng-deep img,.showcase .showcase-control .sliding-viewport a video{width:60px}.showcase.top{flex-direction:column}.showcase.top .showcase-control{flex-wrap:nowrap}.showcase.top .showcase-control .sliding-viewport{flex-direction:row}.showcase.bottom{flex-direction:column}.showcase.bottom .showcase-control{flex-wrap:nowrap}.showcase.bottom .showcase-control .sliding-viewport,.showcase.left{flex-direction:row}.showcase.left .showcase-control{flex-wrap:nowrap;flex:1}.showcase.left .showcase-control .sliding-viewport{flex-direction:column}.showcase.right{flex-direction:row}.showcase.right .showcase-control{flex-wrap:nowrap;flex:1}.showcase.right .showcase-control .sliding-viewport{flex-direction:column}@media screen and (max-width:600px){.showcase{display:table}.showcase-control{display:block}.showcase-control a{width:100%;display:table}.showcase-viewport{margin:5px 0}}"]
        })
    ], FlexibleShowcaseComponent);
    return FlexibleShowcaseComponent;
}());

var FlexibleShowcaseModule = /** @class */ (function () {
    function FlexibleShowcaseModule() {
    }
    FlexibleShowcaseModule = __decorate([
        NgModule({
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
        })
    ], FlexibleShowcaseModule);
    return FlexibleShowcaseModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { FlexibleShowcaseComponent, FlexibleShowcaseModule };
//# sourceMappingURL=sedeh-flexible-showcase.js.map
