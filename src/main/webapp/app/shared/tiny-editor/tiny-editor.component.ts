import {
    Component,
    AfterViewInit,
    EventEmitter,
    OnDestroy,
    Input,
    Output
} from '@angular/core';

require('tinymce')

declare var tinymce: any;
import 'tinymce/themes/modern'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/wordcount'
import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'
//skin_url: 'assets/skins/lightgray',
//skin: false,
@Component({
  selector: 'jhi-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styles: []
})


export class TinyEditorComponent implements AfterViewInit, OnDestroy {

    @Input() elementId: String;
    @Input() content: String;
    @Output() onEditorContentChange = new EventEmitter();

    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: [
                'paste',
                'link',
                'autoresize',
                'imagetools',
                'table',
                'wordcount',
                'lists',
                'advlist'
            ],
            skin_url: 'skins/lightgray',
            init_instance_callback: "insert_contents",
            setup: editor => {
                this.editor = editor;
                editor.on('keyup change', () => {
                    const content = editor.getContent();
                    this.onEditorContentChange.emit(content);
                });
                editor.on('init', () => {
                    tinymce.activeEditor.setContent(this.content);
                });
            }
        });
        function insert_contents(inst){
            inst.setContent('<strong>Some contents</strong>');
        }
    }


    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
