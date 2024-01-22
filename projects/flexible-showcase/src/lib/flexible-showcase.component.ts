
import {
    Component,
	Input,
	Output,
	AfterContentInit,
	ElementRef,
	EventEmitter,
	ViewChild,
	OnChanges
} from '@angular/core';


@Component({
	selector: 'showcase',
	templateUrl: './flexible-showcase.component.html',
	styleUrls: ['./flexible-showcase.component.scss']
})
export class FlexibleShowcaseComponent implements AfterContentInit, OnChanges  {
	private translatedPosition = 0;
	shiftedIndex = 0;
	selectedIndex = 0;
	selectedItem: any;
	hoverItem: any;
	paginate = false;

	@ViewChild("largeImage", {static: false})
	private largeImage!: ElementRef;

	@ViewChild("slider", {static: false})
	private slider!: ElementRef;

    @Input() position!: string; // top, left, bottom, right
	@Input() width!: number;
	@Input() hasControls = true;
	@Input() hoverPlay = false;  
	@Input() height!: number;
	@Input() productId!: string;
    @Input() zoomOnHover = false
    @Input() peekOnHover = false
    @Input() enableEventTracking = false
	@Input() magnificationFactor = 2;
    @Input() thumbnails!: any[];
    @Input() message = "click to select ";

	@Output('onEventTracking')
	private onEventTracking = new EventEmitter();

    constructor() {}

	ngAfterContentInit() {
		if (this.thumbnails) {
			this.selectedIndex = 0;
			this.thumbnails[0].selected = true;
			this.selectedItem = this.thumbnails[0];
		}
		this.paginate = (this.thumbnails.length * 60) > this.width;
	}
	ngOnChanges(changes: any) {
		if (changes.position && this.slider) {
			// should have initial position or remember last user action.
			this.translatedPosition = 0;
			this.shiftedIndex = 0;
			this.slider.nativeElement.style.transform = "translate(0px,0px)";
		}
	}
	hoverOver(event: any) {
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
					title:  this.selectedItem.title,
					time: new Date()
				});
			}	
		}
	}
	hoverOut(event: any) {
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
					title:  this.selectedItem.title,
					time: new Date()
				});
			}	
		}
	}
	hoverViewPort(event: any) {
		if (this.zoomOnHover && this.largeImage) {
			const img = event.target.children[0];
			const rect = img.getBoundingClientRect();
			const dx = (this.width - rect.width)*(this.magnificationFactor/2);
			const dy = (this.height - rect.height)*(this.magnificationFactor/2);
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
					title:  this.selectedItem.title,
					time: new Date(),
					item: {
						Y: x,
						X: y
					}
				});
			}	
		}
	}
	shiftDisplay(slider: HTMLElement, position: string, toEnd: boolean) {
		if (this.paginate) {
			const rect = slider.getBoundingClientRect();
			const child: any = slider.children[this.shiftedIndex];
			const rect2 = child.getBoundingClientRect();
			const len = (slider.children.length -1);
			const tp = this.translatedPosition;

			if (position === "top" || position === "bottom") {
				this.translatedPosition += (toEnd ? -rect2.width : rect2.width);
				this.translatedPosition = 
					this.translatedPosition > 0 ? 0 : 
						((this.translatedPosition + rect.width) < 0 ? this.translatedPosition + rect2.width : this.translatedPosition);
				this.slider.nativeElement.style.transform = "translateX(" + this.translatedPosition + "px)";
			} else {
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
				} else {
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
	updateControls(event: any) {
		if (this.hasControls) {
			event.target.setAttribute('controls','true');
		}
		if (this.hoverPlay) {
			event.target.play();
		}
	}
	resetControls(event: any) {
		if (this.hoverPlay && this.isPlaying(event.target)) {
			event.target.pause();
		}
	}
	private isPlaying(video: any) {
		return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
	}
	videoKeyup(event: any) {
		const code = event.which;
		if (code === 13) {
			if (this.isPlaying(event.target)) {
				event.target.pause();
			} else {
				event.target.play();
			}
		}
	}
	keyup(event: any) {
        const code = event.which;
		
		if (code === 13) {
			event.target.click();
		}
	}
	videoEvent(event: any) {
		if (this.enableEventTracking) {
			this.onEventTracking.emit({
				productId: this.productId,
				thumbnailId: this.selectedItem.thumbnailId,
				action: event.type,
				title:  this.selectedItem.title,
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
	hoverTab(i: number, slider: HTMLElement, position: string, onhover: boolean) {
		if (this.peekOnHover) {
			this.hoverItem = this.thumbnails[i];
		}
		if(!onhover && i !== this.shiftedIndex) {
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
	selectTab(i: number) {
		this.thumbnails.map((tab)=> tab.selected = false );
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
}
