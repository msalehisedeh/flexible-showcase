
# Welcome to Product Showcase!

Have you ever wanted to have a flexible product showcase for your Product evaluation Page? Have you thought of what it takes to get the showcase? With product showcase, you can configure position of product display.

**NOTE:** Starting with version 1.1.0 this library is compatible with Angular 6+.

**NOTE:** Starting with version 1.2.1 you need to import this library through @sedeh/flexible-showcase.

Please send your requests or comments through the link provided below:

[Live Demo](https://flexible-showcase.stackblitz.io)  | 
[NPM](https://www.npmjs.com/package/@sedeh/flexible-showcase) | 
[Comments/Requests](https://github.com/msalehisedeh/flexible-showcase/issues)


```javascript
MODULE:
  FlexibleShowcaseModule

EXPORTS:
  FlexibleShowcaseComponent
```

## Features
* Responsive
* ADA Compliant
* Configurable position

### How it can be done?

You will need to set the display in your HTML content:
```javascript
In this example:
1) width and height will control the size of showcase.
2) myPosition can optionally be equal to one of (top, left, right, bottom) options.
3) message is needed to set text in order to make ADA compliant message on each tab.
4) myHoverOption, myTrackOption, and myPickOption are boolean variables.
5) myItems will contain display information
6) hasControls indicates if video should display controls
7) hoverPlay indicates if video should play on hover

<showcase 
      width="400" 
      height="400"
      message="click to select "
      [hasControls]="true"
      [hoverPlay]="false"
      [position]="myPosition" 
      [enableEventTracking]="myTrackOption"
      [peekOnHover]="myPickOption"
      [zoomOnHover]="myHoverOption"
      [magnificationFactor]="2"
      [thumbnails]="myItems"
      [productId]="myProductId"
      (onEventTracking)="onEventTracking($event)"></showcase>


WHERE myItems is equal to a list of thumbnails:

if a thumbnail is of video type, it will look like: 
{
  thumbnailId: string, 
  title: string, 
  type: string, // video
  poster?: string, // video poster image URL
  src: {
    egg: string, // URL
    mp4: string, // URL,
    webm: string, // URL,
  }
}

And for an image type:

{
  thumbnailId: string, 
  title: string, 
  type: string, // image
  src: {
    small: string,
    medium: string, 
    large: string
  }
}

```

You will also need to implement an event handling function if you enable event tracking

```javascript
  onEventTracking(event) {
    // decide on what to do with the event
  }
```

If you want to override any parts of default look, you can use ::ng-deep and do the following:
```javascript
CSS Example:

::ng-deep .showcase-title {
    text-transform: capitalize;
}
```

## Revision History

| Version | Description                                                                                              |
|---------|----------------------------------------------------------------------------------------------------------|
| 3.0.0   | Upgraded to Angular 15.                                                                                  |
| 2.0.0   | Upgraded to Angular 8.                                                                                   |
| 1.2.5   | Resolved problem of displaying video on mobile.                                                          |
| 1.2.4   | Added keyboard handling for paginated products row. Added smooth animation of paginated area.            |
| 1.2.3   | Added keyboard handling for video.                                                                       |
| 1.2.2   | Added magnificationFactor to allow for suitable magnification of image on hover depending on application which is using this component. |
| 1.2.1   | Updated dependencies.                                                                                    |
| 1.2.0   | It was brought to my attention that some users have trouble using my components in their angular 6 environment. Since I had only updated few dependencies when moved to Angular 6, I am thinking dependencies are causing issues. So, for this release, I am updating all dependencies to what Angular 6 applications are expecting to have. Please let me know if this is fixing or not fixing any issues you are facing. |
| 1.1.0   | Updated libraries to become compatible with Angular 6+.                                                  |
| 1.0.0   | Initial release.                                                                                         |


![alt text](https://raw.githubusercontent.com/msalehisedeh/flexible-showcase/master/sample.png  "What you would see when a flexible showcase is used")
