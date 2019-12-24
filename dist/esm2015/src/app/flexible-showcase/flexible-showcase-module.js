import * as tslib_1 from "tslib";
/*
* Provides rendering of flexible tabs in a lazy load fashion.
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexibleShowcaseComponent } from './flexible-showcase.component';
let FlexibleShowcaseModule = class FlexibleShowcaseModule {
};
FlexibleShowcaseModule = tslib_1.__decorate([
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
export { FlexibleShowcaseModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtc2hvd2Nhc2UtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXNob3djYXNlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1zaG93Y2FzZS9mbGV4aWJsZS1zaG93Y2FzZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztFQUVFO0FBQ0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFtQjFFLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0NBQUcsQ0FBQTtBQUF6QixzQkFBc0I7SUFqQmxDLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLHlCQUF5QjtTQUM1QjtRQUNELE9BQU8sRUFBRTtZQUNMLHlCQUF5QjtTQUM1QjtRQUNELGVBQWUsRUFBRSxFQUNoQjtRQUNELFNBQVMsRUFBRSxFQUNWO1FBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDcEMsQ0FBQztHQUVXLHNCQUFzQixDQUFHO1NBQXpCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGZsZXhpYmxlIHRhYnMgaW4gYSBsYXp5IGxvYWQgZmFzaGlvbi5cclxuKi9cclxuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZsZXhpYmxlU2hvd2Nhc2VDb21wb25lbnQgfSBmcm9tICcuL2ZsZXhpYmxlLXNob3djYXNlLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZsZXhpYmxlU2hvd2Nhc2VDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmxleGlibGVTaG93Y2FzZUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlU2hvd2Nhc2VNb2R1bGUge31cclxuIl19