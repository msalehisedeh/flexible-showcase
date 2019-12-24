(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/flexible-showcase', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['flexible-showcase'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
            this.onEventTracking = new core.EventEmitter();
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
            core.ViewChild("largeImage", { static: false })
        ], FlexibleShowcaseComponent.prototype, "largeImage", void 0);
        __decorate([
            core.ViewChild("slider", { static: false })
        ], FlexibleShowcaseComponent.prototype, "slider", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "position", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "width", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "hasControls", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "hoverPlay", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "height", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "productId", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "zoomOnHover", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "peekOnHover", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "enableEventTracking", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "magnificationFactor", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "thumbnails", void 0);
        __decorate([
            core.Input()
        ], FlexibleShowcaseComponent.prototype, "message", void 0);
        __decorate([
            core.Output('onEventTracking')
        ], FlexibleShowcaseComponent.prototype, "onEventTracking", void 0);
        FlexibleShowcaseComponent = __decorate([
            core.Component({
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
            core.NgModule({
                imports: [
                    common.CommonModule
                ],
                declarations: [
                    FlexibleShowcaseComponent
                ],
                exports: [
                    FlexibleShowcaseComponent
                ],
                entryComponents: [],
                providers: [],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            })
        ], FlexibleShowcaseModule);
        return FlexibleShowcaseModule;
    }());

    exports.FlexibleShowcaseComponent = FlexibleShowcaseComponent;
    exports.FlexibleShowcaseModule = FlexibleShowcaseModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-flexible-showcase.umd.js.map
