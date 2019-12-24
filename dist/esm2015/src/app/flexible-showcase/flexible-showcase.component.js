import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
let FlexibleShowcaseComponent = class FlexibleShowcaseComponent {
    constructor() {
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
    ngAfterContentInit() {
        this.selectedIndex = 0;
        this.thumbnails[0].selected = true;
        this.selectedItem = this.thumbnails[0];
        this.paginate = (this.thumbnails.length * 60) > this.width;
    }
    ngOnChanges(changes) {
        if (changes.position && this.slider) {
            // should have initial position or remember last user action.
            this.translatedPosition = 0;
            this.shiftedIndex = 0;
            this.slider.nativeElement.style.transform = "translate(0px,0px)";
        }
    }
    hoverOver(event) {
        if (this.zoomOnHover && this.largeImage) {
            const img = event.target.children[0];
            if (img) {
                const rect = img.getBoundingClientRect();
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
    }
    hoverOut(event) {
        if (this.largeImage) {
            const img = event.target.children[0];
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
    }
    hoverViewPort(event) {
        if (this.zoomOnHover && this.largeImage) {
            const img = event.target.children[0];
            const rect = img.getBoundingClientRect();
            const dx = (this.width - rect.width) * (this.magnificationFactor / 2);
            const dy = (this.height - rect.height) * (this.magnificationFactor / 2);
            const y = event.layerY * (this.magnificationFactor - 1);
            const x = event.layerX * (this.magnificationFactor - 1);
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
    }
    shiftDisplay(slider, position, toEnd) {
        if (this.paginate) {
            const rect = slider.getBoundingClientRect();
            const child = slider.children[this.shiftedIndex];
            const rect2 = child.getBoundingClientRect();
            const len = (slider.children.length - 1);
            const tp = this.translatedPosition;
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
    }
    updateControls(event) {
        if (this.hasControls) {
            event.target.setAttribute('controls', 'true');
        }
        if (this.hoverPlay) {
            event.target.play();
        }
    }
    resetControls(event) {
        if (this.hoverPlay && this.isPlaying(event.target)) {
            event.target.pause();
        }
    }
    isPlaying(video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    }
    videoKeyup(event) {
        const code = event.which;
        if (code === 13) {
            if (this.isPlaying(event.target)) {
                event.target.pause();
            }
            else {
                event.target.play();
            }
        }
    }
    keyup(event) {
        const code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    videoEvent(event) {
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
    }
    hoverTab(i, slider, position, onhover) {
        if (this.peekOnHover) {
            this.hoverItem = this.thumbnails[i];
        }
        if (!onhover && i !== this.shiftedIndex) {
            const toEnd = this.shiftedIndex < i;
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
    }
    selectTab(i) {
        this.thumbnails.map((tab) => {
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
export { FlexibleShowcaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtc2hvd2Nhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXNob3djYXNlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1zaG93Y2FzZS9mbGV4aWJsZS1zaG93Y2FzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDSCxTQUFTLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFHTixZQUFZLEVBQ1osU0FBUyxFQUVULE1BQU0sZUFBZSxDQUFDO0FBUXZCLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBOEJsQztRQTdCSyx1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDL0IsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFHbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVVSLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHZixnQkFBVyxHQUFHLEtBQUssQ0FBQTtRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQTtRQUNuQix3QkFBbUIsR0FBRyxLQUFLLENBQUE7UUFDOUIsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLFlBQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUdqQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFM0IsQ0FBQztJQUVuQixrQkFBa0I7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxD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QjtBQUNmO0lBQVIsS0FBSyxFQUFFOzhEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs4REFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7c0VBQTRCO0FBQzlCO0lBQVIsS0FBSyxFQUFFO3NFQUF5QjtBQUNyQjtJQUFSLEtBQUssRUFBRTs2REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7MERBQThCO0FBR3pDO0lBREMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO2tFQUNtQjtBQTVCakMseUJBQXlCO0lBTHJDLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLHN2UEFBaUQ7O0tBRWpELENBQUM7R0FDVyx5QkFBeUIsQ0FnUHJDO1NBaFBZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdEVsZW1lbnRSZWYsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdFZpZXdDaGlsZCxcclxuXHRPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ3Nob3djYXNlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtc2hvd2Nhc2UuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLXNob3djYXNlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlU2hvd2Nhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMgIHtcclxuXHRwcml2YXRlIHRyYW5zbGF0ZWRQb3NpdGlvbiA9IDA7XHJcblx0c2hpZnRlZEluZGV4ID0gMDtcclxuXHRzZWxlY3RlZEluZGV4ID0gMDtcclxuXHRzZWxlY3RlZEl0ZW06IGFueTtcclxuXHRob3Zlckl0ZW06IGFueTtcclxuXHRwYWdpbmF0ZSA9IGZhbHNlO1xyXG5cclxuXHRAVmlld0NoaWxkKFwibGFyZ2VJbWFnZVwiLCB7c3RhdGljOiBmYWxzZX0pXHJcblx0cHJpdmF0ZSBsYXJnZUltYWdlOiBFbGVtZW50UmVmO1xyXG5cclxuXHRAVmlld0NoaWxkKFwic2xpZGVyXCIsIHtzdGF0aWM6IGZhbHNlfSlcclxuXHRwcml2YXRlIHNsaWRlcjogRWxlbWVudFJlZjtcclxuXHJcbiAgICBASW5wdXQoKSBwb3NpdGlvbjogc3RyaW5nOyAvLyB0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHRcclxuXHRASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG5cdEBJbnB1dCgpIGhhc0NvbnRyb2xzID0gdHJ1ZTtcclxuXHRASW5wdXQoKSBob3ZlclBsYXkgPSBmYWxzZTsgIFxyXG5cdEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xyXG5cdEBJbnB1dCgpIHByb2R1Y3RJZDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgem9vbU9uSG92ZXIgPSBmYWxzZVxyXG4gICAgQElucHV0KCkgcGVla09uSG92ZXIgPSBmYWxzZVxyXG4gICAgQElucHV0KCkgZW5hYmxlRXZlbnRUcmFja2luZyA9IGZhbHNlXHJcblx0QElucHV0KCkgbWFnbmlmaWNhdGlvbkZhY3RvciA9IDI7XHJcbiAgICBASW5wdXQoKSB0aHVtYm5haWxzOiBhbnlbXTtcclxuICAgIEBJbnB1dCgpIG1lc3NhZ2UgPSBcImNsaWNrIHRvIHNlbGVjdCBcIjtcclxuXHJcblx0QE91dHB1dCgnb25FdmVudFRyYWNraW5nJylcclxuXHRwcml2YXRlIG9uRXZlbnRUcmFja2luZyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcblx0XHR0aGlzLnRodW1ibmFpbHNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnRodW1ibmFpbHNbMF07XHJcblx0XHR0aGlzLnBhZ2luYXRlID0gKHRoaXMudGh1bWJuYWlscy5sZW5ndGggKiA2MCkgPiB0aGlzLndpZHRoO1xyXG5cdH1cclxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuXHRcdGlmIChjaGFuZ2VzLnBvc2l0aW9uICYmIHRoaXMuc2xpZGVyKSB7XHJcblx0XHRcdC8vIHNob3VsZCBoYXZlIGluaXRpYWwgcG9zaXRpb24gb3IgcmVtZW1iZXIgbGFzdCB1c2VyIGFjdGlvbi5cclxuXHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gPSAwO1xyXG5cdFx0XHR0aGlzLnNoaWZ0ZWRJbmRleCA9IDA7XHJcblx0XHRcdHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMHB4LDBweClcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJPdmVyKGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLnpvb21PbkhvdmVyICYmIHRoaXMubGFyZ2VJbWFnZSkge1xyXG5cdFx0XHRjb25zdCBpbWcgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMF07XHJcblx0XHRcdGlmIChpbWcpIHtcclxuXHRcdFx0ICBjb25zdCByZWN0ID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHQgIHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gKHRoaXMubWFnbmlmaWNhdGlvbkZhY3RvciAqIHJlY3Qud2lkdGgpICsgJ3B4JztcclxuXHRcdFx0ICB0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yICogcmVjdC5oZWlnaHQpICsgJ3B4JztcclxuXHRcdFx0ICBpbWcuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRcdHByb2R1Y3RJZDogdGhpcy5wcm9kdWN0SWQsXHJcblx0XHRcdFx0XHR0aHVtYm5haWxJZDogdGhpcy5zZWxlY3RlZEl0ZW0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFx0XHRhY3Rpb246IFwiem9vbWVkXCIsXHJcblx0XHRcdFx0XHR0aXRsZTogIHRoaXMuc2VsZWN0ZWRJdGVtLnRpdGxlLFxyXG5cdFx0XHRcdFx0dGltZTogbmV3IERhdGUoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHRcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJPdXQoZXZlbnQ6IGFueSkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSkge1xyXG5cdFx0XHRjb25zdCBpbWcgPSBldmVudC50YXJnZXQuY2hpbGRyZW5bMF07XHJcblx0XHRcdGltZy5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gXCItMTAwMDBweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gXCItMTAwMDBweFwiO1xyXG5cdFx0XHRpZiAodGhpcy5lbmFibGVFdmVudFRyYWNraW5nKSB7XHJcblx0XHRcdFx0dGhpcy5vbkV2ZW50VHJhY2tpbmcuZW1pdCh7XHJcblx0XHRcdFx0XHRwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdElkLFxyXG5cdFx0XHRcdFx0dGh1bWJuYWlsSWQ6IHRoaXMuc2VsZWN0ZWRJdGVtLnRodW1ibmFpbElkLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBldmVudC50eXBlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICB0aGlzLnNlbGVjdGVkSXRlbS50aXRsZSxcclxuXHRcdFx0XHRcdHRpbWU6IG5ldyBEYXRlKClcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVx0XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyVmlld1BvcnQoZXZlbnQ6IGFueSkge1xyXG5cdFx0aWYgKHRoaXMuem9vbU9uSG92ZXIgJiYgdGhpcy5sYXJnZUltYWdlKSB7XHJcblx0XHRcdGNvbnN0IGltZyA9IGV2ZW50LnRhcmdldC5jaGlsZHJlblswXTtcclxuXHRcdFx0Y29uc3QgcmVjdCA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0Y29uc3QgZHggPSAodGhpcy53aWR0aCAtIHJlY3Qud2lkdGgpKih0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IvMik7XHJcblx0XHRcdGNvbnN0IGR5ID0gKHRoaXMuaGVpZ2h0IC0gcmVjdC5oZWlnaHQpKih0aGlzLm1hZ25pZmljYXRpb25GYWN0b3IvMik7XHJcblx0XHRcdGNvbnN0IHkgPSBldmVudC5sYXllclkgKiAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yIC0gMSk7XHJcblx0XHRcdGNvbnN0IHggPSBldmVudC5sYXllclggKiAodGhpcy5tYWduaWZpY2F0aW9uRmFjdG9yIC0gMSk7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9ICgteSArIGR5KSArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICgteCArIGR4KSArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0XHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRcdHByb2R1Y3RJZDogdGhpcy5wcm9kdWN0SWQsXHJcblx0XHRcdFx0XHR0aHVtYm5haWxJZDogdGhpcy5zZWxlY3RlZEl0ZW0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFx0XHRhY3Rpb246IGV2ZW50LnR5cGUsXHJcblx0XHRcdFx0XHR0aXRsZTogIHRoaXMuc2VsZWN0ZWRJdGVtLnRpdGxlLFxyXG5cdFx0XHRcdFx0dGltZTogbmV3IERhdGUoKSxcclxuXHRcdFx0XHRcdGl0ZW06IHtcclxuXHRcdFx0XHRcdFx0WTogeCxcclxuXHRcdFx0XHRcdFx0WDogeVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHRcclxuXHRcdH1cclxuXHR9XHJcblx0c2hpZnREaXNwbGF5KHNsaWRlcjogSFRNTEVsZW1lbnQsIHBvc2l0aW9uOiBzdHJpbmcsIHRvRW5kOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5wYWdpbmF0ZSkge1xyXG5cdFx0XHRjb25zdCByZWN0ID0gc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRjb25zdCBjaGlsZDogYW55ID0gc2xpZGVyLmNoaWxkcmVuW3RoaXMuc2hpZnRlZEluZGV4XTtcclxuXHRcdFx0Y29uc3QgcmVjdDIgPSBjaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0Y29uc3QgbGVuID0gKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLTEpO1xyXG5cdFx0XHRjb25zdCB0cCA9IHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uO1xyXG5cclxuXHRcdFx0aWYgKHBvc2l0aW9uID09PSBcInRvcFwiIHx8IHBvc2l0aW9uID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRcdFx0dGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKz0gKHRvRW5kID8gLXJlY3QyLndpZHRoIDogcmVjdDIud2lkdGgpO1xyXG5cdFx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uID0gXHJcblx0XHRcdFx0XHR0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiA+IDAgPyAwIDogXHJcblx0XHRcdFx0XHRcdCgodGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKyByZWN0LndpZHRoKSA8IDAgPyB0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiArIHJlY3QyLndpZHRoIDogdGhpcy50cmFuc2xhdGVkUG9zaXRpb24pO1xyXG5cdFx0XHRcdHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKFwiICsgdGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKyBcInB4KVwiO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uICs9ICh0b0VuZCA/IC1yZWN0Mi5oZWlnaHQgOiByZWN0Mi5oZWlnaHQpO1xyXG5cdFx0XHRcdHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uID0gXHJcblx0XHRcdFx0XHR0aGlzLnRyYW5zbGF0ZWRQb3NpdGlvbiA+IDAgPyAwIDogXHJcblx0XHRcdFx0XHRcdCgodGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKyByZWN0Mi5oZWlnaHQpIDwgMCA/IHRoaXMudHJhbnNsYXRlZFBvc2l0aW9uICsgcmVjdDIuaGVpZ2h0IDogdGhpcy50cmFuc2xhdGVkUG9zaXRpb24pO1xyXG5cdFx0XHRcdHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKFwiICsgdGhpcy50cmFuc2xhdGVkUG9zaXRpb24gKyBcInB4KVwiO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0cCAhPT0gdGhpcy50cmFuc2xhdGVkUG9zaXRpb24pIHtcclxuXHRcdFx0XHRpZiAodG9FbmQpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2hpZnRlZEluZGV4Kys7XHJcblx0XHRcdFx0XHR0aGlzLnNoaWZ0ZWRJbmRleCA9IHRoaXMuc2hpZnRlZEluZGV4IDwgbGVuID8gdGhpcy5zaGlmdGVkSW5kZXggOiBsZW47XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuc2hpZnRlZEluZGV4LS07XHJcblx0XHRcdFx0XHR0aGlzLnNoaWZ0ZWRJbmRleCA9IHRoaXMuc2hpZnRlZEluZGV4IDwgMCA/IDAgOiB0aGlzLnNoaWZ0ZWRJbmRleDtcclxuXHRcdFx0XHR9XHRcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5lbmFibGVFdmVudFRyYWNraW5nKSB7XHJcblx0XHRcdFx0dGhpcy5vbkV2ZW50VHJhY2tpbmcuZW1pdCh7XHJcblx0XHRcdFx0XHRwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdElkLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBcInRob21ibmFpbCBzaGlmdFwiLFxyXG5cdFx0XHRcdFx0dGltZTogbmV3IERhdGUoKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHVwZGF0ZUNvbnRyb2xzKGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmhhc0NvbnRyb2xzKSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywndHJ1ZScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaG92ZXJQbGF5KSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5wbGF5KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJlc2V0Q29udHJvbHMoZXZlbnQ6IGFueSkge1xyXG5cdFx0aWYgKHRoaXMuaG92ZXJQbGF5ICYmIHRoaXMuaXNQbGF5aW5nKGV2ZW50LnRhcmdldCkpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LnBhdXNlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgaXNQbGF5aW5nKHZpZGVvOiBhbnkpIHtcclxuXHRcdHJldHVybiAhISh2aWRlby5jdXJyZW50VGltZSA+IDAgJiYgIXZpZGVvLnBhdXNlZCAmJiAhdmlkZW8uZW5kZWQgJiYgdmlkZW8ucmVhZHlTdGF0ZSA+IDIpO1xyXG5cdH1cclxuXHR2aWRlb0tleXVwKGV2ZW50OiBhbnkpIHtcclxuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRpZiAodGhpcy5pc1BsYXlpbmcoZXZlbnQudGFyZ2V0KSkge1xyXG5cdFx0XHRcdGV2ZW50LnRhcmdldC5wYXVzZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGV2ZW50LnRhcmdldC5wbGF5KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0a2V5dXAoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR2aWRlb0V2ZW50KGV2ZW50OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0dGhpcy5vbkV2ZW50VHJhY2tpbmcuZW1pdCh7XHJcblx0XHRcdFx0cHJvZHVjdElkOiB0aGlzLnByb2R1Y3RJZCxcclxuXHRcdFx0XHR0aHVtYm5haWxJZDogdGhpcy5zZWxlY3RlZEl0ZW0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFx0YWN0aW9uOiBldmVudC50eXBlLFxyXG5cdFx0XHRcdHRpdGxlOiAgdGhpcy5zZWxlY3RlZEl0ZW0udGl0bGUsXHJcblx0XHRcdFx0dGltZTogbmV3IERhdGUoKSxcclxuXHRcdFx0XHRpdGVtOiB7XHJcblx0XHRcdFx0XHRhdXRvcGxheTogZXZlbnQudGFyZ2V0LmF1dG9wbGF5LFxyXG5cdFx0XHRcdFx0Y29udHJvbHM6IGV2ZW50LnRhcmdldC5jb250cm9scyxcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiBldmVudC50YXJnZXQuZHVyYXRpb24sXHJcblx0XHRcdFx0XHRlbmRlZDogZXZlbnQudGFyZ2V0LmVuZGVkLFxyXG5cdFx0XHRcdFx0ZXJyb3I6IGV2ZW50LnRhcmdldC5lcnJvcixcclxuXHRcdFx0XHRcdHBhdXNlZDogZXZlbnQudGFyZ2V0LnBhdXNlZCxcclxuXHRcdFx0XHRcdG11dGVkOiBldmVudC50YXJnZXQubXV0ZWQsXHJcblx0XHRcdFx0XHRjdXJyZW50VGltZTogZXZlbnQudGFyZ2V0LmN1cnJlbnRUaW1lLFxyXG5cdFx0XHRcdFx0dm9sdW1lOiBldmVudC50YXJnZXQudm9sdW1lXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJUYWIoaTogbnVtYmVyLCBzbGlkZXI6IEhUTUxFbGVtZW50LCBwb3NpdGlvbjogc3RyaW5nLCBvbmhvdmVyOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5wZWVrT25Ib3Zlcikge1xyXG5cdFx0XHR0aGlzLmhvdmVySXRlbSA9IHRoaXMudGh1bWJuYWlsc1tpXTtcclxuXHRcdH1cclxuXHRcdGlmKCFvbmhvdmVyICYmIGkgIT09IHRoaXMuc2hpZnRlZEluZGV4KSB7XHJcblx0XHRcdGNvbnN0IHRvRW5kID0gdGhpcy5zaGlmdGVkSW5kZXggPCBpO1xyXG5cdFx0XHR0aGlzLnNoaWZ0ZWRJbmRleCA9IGk7XHJcblx0XHRcdHRoaXMuc2hpZnREaXNwbGF5KHNsaWRlciwgcG9zaXRpb24sIHRvRW5kKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmVuYWJsZUV2ZW50VHJhY2tpbmcpIHtcclxuXHRcdFx0dGhpcy5vbkV2ZW50VHJhY2tpbmcuZW1pdCh7XHJcblx0XHRcdFx0cHJvZHVjdElkOiB0aGlzLnRodW1ibmFpbHNbaV0ucHJvZHVjdElkLFxyXG5cdFx0XHRcdHRodW1ibmFpbElkOiB0aGlzLnRodW1ibmFpbHNbaV0udGh1bWJuYWlsSWQsXHJcblx0XHRcdFx0YWN0aW9uOiAob25ob3ZlciA/IFwiaG92ZXJcIiA6IFwiZm9jdXNcIiksXHJcblx0XHRcdFx0dGl0bGU6IHRoaXMudGh1bWJuYWlsc1tpXS50aXRsZSxcclxuXHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLnRodW1ibmFpbHMubWFwKCh0YWIpPT57XHJcblx0XHRcdHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xyXG5cdFx0dGhpcy50aHVtYm5haWxzW2ldLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy50aHVtYm5haWxzW2ldO1xyXG5cdFx0aWYgKHRoaXMuZW5hYmxlRXZlbnRUcmFja2luZykge1xyXG5cdFx0XHR0aGlzLm9uRXZlbnRUcmFja2luZy5lbWl0KHtcclxuXHRcdFx0XHRwcm9kdWN0SWQ6IHRoaXMudGh1bWJuYWlsc1tpXS5wcm9kdWN0SWQsXHJcblx0XHRcdFx0dGh1bWJuYWlsSWQ6IHRoaXMudGh1bWJuYWlsc1tpXS50aHVtYm5haWxJZCxcclxuXHRcdFx0XHRhY3Rpb246IFwic2VsZWN0XCIsXHJcblx0XHRcdFx0dGl0bGU6IHRoaXMudGh1bWJuYWlsc1tpXS50aXRsZSxcclxuXHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=