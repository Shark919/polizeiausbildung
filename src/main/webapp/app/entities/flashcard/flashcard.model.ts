import { BaseEntity } from './../../shared';

export class Flashcard implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public category?: string,
        public description?: string,
    ) {
    }
}
