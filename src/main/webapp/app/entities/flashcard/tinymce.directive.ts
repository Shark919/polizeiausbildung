import { Directive,
    EventEmitter,
    Input,
    Output, ElementRef,OnInit,
    AfterViewInit,  OnDestroy } from '@angular/core';


declare var tinymce:any

@Directive({
    selector: '[htmlEditor]'
})
export class SimpleTinyMceDirective implements OnInit,OnDestroy{

    private htmlContent:any;
    private editor;
    @Output() private htmlEditorKeyUp : EventEmitter<any> = new EventEmitter();

    constructor(private el:ElementRef){

    }


    ngOnInit(){
        tinymce.init({
            selector: '#' + this.el.nativeElement.id,
            plugins: ['link', 'paste', 'table'],
            skin_url: 'assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.htmlEditorKeyUp.emit(content);
                });
            },
        });
    }


    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
