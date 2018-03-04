import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'node',
    templateUrl: './node.component.html'
})
export class NodeComponent implements OnInit {
    @Input() item: any;
    IsExpanded: boolean = false;

    constructor(
    ) {
    }


    ngOnInit() {
        console.log(this.item);
    }
    toggle() {
        this.IsExpanded = !this.IsExpanded;
        console.log(this.IsExpanded + " " + this.item.label);
    }
}
