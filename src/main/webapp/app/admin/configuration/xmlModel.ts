export class StructureModel {
    title: string = '';
    description: string = '';
    depth: string = '';

    StructureModel() {
        this.title = '';
        this.description = '';
    }
}
export class ContentModel {
    shortTitle: string = '';
    paragraph: string = '';
    title: string = '';
    text: string = '';
    footnotes: string = '';

    ContentModel() {
        this.shortTitle = '';
        this.paragraph = '';
        this.title = '';
        this.text = '';
        this.footnotes = '';
    }
}

export class DatabaseEntry {
    id: number = 0;
    title: string = '';
    legaltext: string = '';
    codeoflaw_id: string = '';

    DatabaseEntry() {
        this.id = 0;
        this.title = '';
        this.legaltext = '';
        this.codeoflaw_id = '';
    }
}
