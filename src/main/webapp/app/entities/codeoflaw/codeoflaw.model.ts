import { BaseEntity } from './../../shared';

export class Codeoflaw implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public shortTitle?: string,
    ) {
    }
}
