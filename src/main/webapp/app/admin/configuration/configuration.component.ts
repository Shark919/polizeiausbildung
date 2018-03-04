import { Component, OnInit } from '@angular/core';
var $ = require('jQuery');
import { JhiConfigurationService } from './configuration.service';
import { ContentModel, StructureModel } from "./xmlModel";
import { xmlParser } from "./xmlParser";

let entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

@Component({
    selector: 'jhi-configuration',
    templateUrl: './configuration.component.html'
})
export class JhiConfigurationComponent implements OnInit {
    allConfiguration: any = null;
    configuration: any = null;
    configKeys: any[];
    filter: string;
    orderProp: string;
    reverse: boolean;
    codesOfLaw: string[];

    constructor(
        private configurationService: JhiConfigurationService
    ) {
        this.configKeys = [];
        this.filter = '';
        this.orderProp = 'prefix';
        this.reverse = false;
        this.codesOfLaw = ['BGB', 'STGB'];
    }

    keys(dict): Array<string> {
        return (dict === undefined) ? [] : Object.keys(dict);
    }

    ngOnInit() {
        this.configurationService.get().subscribe((configuration) => {
            this.configuration = configuration;

            for (const config of configuration) {
                if (config.properties !== undefined) {
                    this.configKeys.push(Object.keys(config.properties));
                }
            }
        });

        this.configurationService.getEnv().subscribe((configuration) => {
            this.allConfiguration = configuration;
        });
    }

    refreshData() {
        for (let i = 0; i < this.codesOfLaw.length; i++) {
            this.parseXML(this.codesOfLaw[i]);
        }
    }

    parseXML(codeOfLawTitle) {
        let that = this;
        $.get('http://localhost:9000/xmldata/' + codeOfLawTitle + '.xml', function (data) {
            that.parseData(data);
        });
    }
    //todo: make contentsWithStructure to class with array function
    parseData(data) {
        let structureData: StructureModel;
        let contentData: ContentModel;
        let currentStructure = [];
        let numberOfNodes = data.getElementsByTagName('norm').length;
        let structureCounter = 0;
        let contentsIndex = 0;
        let contentsWithStructure = [];
        let defaultStructure = new StructureModel();
        defaultStructure.title = 'default';
        defaultStructure.description = 'default';
        let dup_array = [defaultStructure];
        let currentStructureDepth = '';
        for (let i = 0; i < numberOfNodes; i++) {
            let currentXMLNode = data.getElementsByTagName('norm')[i];
            let isStructureComponent = xmlParser.checkIfStructureComponent(currentXMLNode);
            let isContentComponent = xmlParser.checkIfContentComponent(currentXMLNode);
            if (isStructureComponent) {
                structureData = xmlParser.getStructureComponentData(currentXMLNode);
                if (currentStructureDepth.length > 0) {
                    let currentDepthNumber = structureData.depth.length / 3;
                    let beforeDepthNumber = currentStructureDepth.length / 3;
                    currentStructure = currentStructure.slice(0, currentDepthNumber - 1);
                    structureCounter = currentStructure.length;
                } else {
                    //currentStructure = [];
                    //structureCounter = 0;
                }
                currentStructure[structureCounter] = structureData;
                structureCounter++;
            } else {
                if (isContentComponent) {
                    contentData = xmlParser.getContentComponentData(currentXMLNode);
                    if (currentStructure.length > 0) {
                        dup_array = JSON.parse(JSON.stringify(currentStructure));
                    }
                    contentsWithStructure[contentsIndex] = [dup_array, contentData];
                    currentStructureDepth = dup_array[dup_array.length - 1].depth;
                    //currentStructure = [];
                    //structureCounter = 0;
                    contentsIndex++;
                }
            }
        }
        //id;title;legaltext;codeoflaw_id
        //1050;§1;Die Würde des Menschen;11

        function escapeHtml(string) {
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        }
        let text = "";
        for (let i = 0; i < contentsWithStructure.length; i++) {
            if (contentsWithStructure[i][0][0].description == 'default') {
                continue;
            }
            //console.log("Printing Text:");
            //console.log("Paragraph: "+contentsWithStructure[i][1].paragraph);
            //console.log("Description: "+contentsWithStructure[i][0][0].description);
            //console.log("Text: "+contentsWithStructure[i][1].text.replace(/;/g , ":")+";"+"11"+"\n\n");
            let structureString = "[";
            for (let j = 0; j < contentsWithStructure[i][0].length; j++) {
                structureString += contentsWithStructure[i][0][j].description;
                structureString += ",";
                structureString += contentsWithStructure[i][0][j].title;
                if (j < contentsWithStructure[i][0].length - 1) {
                    structureString += ",";
                }
            }
            structureString += "]";
            structureString = structureString.replace(/;/g, ":");
            text += (this.leftPad(i, 8) + ";" + contentsWithStructure[i][1].paragraph + ";" + structureString + " " + contentsWithStructure[i][1].text.replace(/;/g, ":") + ";" + "11").toString();
        }
        window.open().document.write(escapeHtml(text));
    }
    leftPad(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

}
