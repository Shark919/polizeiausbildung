import { StructureModel, ContentModel } from './xmlModel';

export class xmlParser {

    public static readonly METADATEN = 'metadaten';
    public static readonly GLIEDERUNGSEINHEIT = 'gliederungseinheit';
    public static readonly GLIEDERUNGSBEZEICHNUNG = 'gliederungsbez';
    public static readonly GLIEDERUNGSKENNZAHL = 'gliederungskennzahl';
    public static readonly GLIEDERUNGSTITEL = 'gliederungstitel';
    public static readonly CODEOFLAWSHORT = 'jurabk';
    public static readonly PARAGRAPHTITLE = 'titel';
    public static readonly PARAGRAPHNUMBER = 'enbez';
    public static readonly CONTENTTEXT = 'Content';
    public static readonly FOOTNOTES = 'Footnotes';

    public static checkIfStructureComponent(currentXMLNode) {
        let isStructureComponent = false;
        if (currentXMLNode.childNodes[0].nodeName === this.METADATEN) {
            if (currentXMLNode.childNodes[0].childNodes[1].nodeName === this.GLIEDERUNGSEINHEIT) {
                if (currentXMLNode.childNodes[0].childNodes[1].childNodes[1].nodeName === this.GLIEDERUNGSBEZEICHNUNG) {
                    if (currentXMLNode.childNodes[0].childNodes[1].nodeName != 'Inhaltsübersicht') {
                        isStructureComponent = true;
                    }
                }
            }
        }
        return isStructureComponent;
    }
    public static checkIfContentComponent(currentXMLNode) {
        let isContentComponent = false;
        try {
            if (currentXMLNode.childNodes[0].nodeName === this.METADATEN) {
                if (currentXMLNode.childNodes[0].childNodes[0].nodeName === this.CODEOFLAWSHORT) {
                    if (currentXMLNode.childNodes[1].childNodes[0].childNodes[0].nodeName === this.CONTENTTEXT) {
                        if (currentXMLNode.childNodes[0].childNodes[1].nodeName != 'Inhaltsübersicht') {
                            isContentComponent = true;
                        }
                    }
                }
            }
        } catch (e) { }
        return isContentComponent;
    }
    public static getStructureComponentData(currentXMLNode) {

        let structureData: StructureModel;
        structureData = new StructureModel();
        if (currentXMLNode.childNodes[0].nodeName === this.METADATEN) {
            if (currentXMLNode.childNodes[0].childNodes[1].nodeName === this.GLIEDERUNGSEINHEIT) {
                if (currentXMLNode.childNodes[0].childNodes[1].childNodes[0].nodeName === this.GLIEDERUNGSKENNZAHL) {
                    structureData.depth = currentXMLNode.childNodes[0].childNodes[1].childNodes[0].innerHTML;
                }
                if (currentXMLNode.childNodes[0].childNodes[1].childNodes[1].nodeName === this.GLIEDERUNGSBEZEICHNUNG) {
                    structureData.description = currentXMLNode.childNodes[0].childNodes[1].childNodes[1].innerHTML;
                }
                if (currentXMLNode.childNodes[0].childNodes[1].childNodes[2].nodeName === this.GLIEDERUNGSTITEL) {
                    structureData.title = currentXMLNode.childNodes[0].childNodes[1].childNodes[2].innerHTML;
                }
            }
        }

        return structureData;
    }

    public static getContentComponentData(currentXMLNode) {
        let contentData: ContentModel;
        contentData = new ContentModel();
        if (currentXMLNode.childNodes[0].childNodes[0].nodeName === this.CODEOFLAWSHORT) {
            contentData.shortTitle = currentXMLNode.childNodes[0].childNodes[0].innerHTML;
        }
        if (currentXMLNode.childNodes[0].childNodes[1].nodeName === this.PARAGRAPHNUMBER) {
            contentData.paragraph = currentXMLNode.childNodes[0].childNodes[1].innerHTML;
        }
        try {
            if (currentXMLNode.childNodes[0].childNodes[2].nodeName === this.PARAGRAPHTITLE) {
                contentData.title = currentXMLNode.childNodes[0].childNodes[2].innerHTML;
            }
        } catch (e) { }
        try {
            if (currentXMLNode.childNodes[1].childNodes[0].childNodes[0].nodeName === this.CONTENTTEXT) {
                contentData.text = currentXMLNode.childNodes[1].childNodes[0].childNodes[0].innerHTML;
            }
        } catch (e) { }
        try {
            if (currentXMLNode.childNodes[1].childNodes[1].nodeName === this.FOOTNOTES) {
                contentData.footnotes = currentXMLNode.childNodes[1].childNodes[1].innerHTML;
            }
        } catch (e) { }
        return contentData;
    }
}
