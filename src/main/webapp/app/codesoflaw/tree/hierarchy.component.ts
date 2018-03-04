import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hierarchy',
    templateUrl: './hierarchy.component.html'
})
export class HierarchyComponent {
    @Input() data: any;
}
