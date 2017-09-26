import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Flashcard } from './flashcard.model';
import { FlashcardService } from './flashcard.service';

@Component({
    selector: 'jhi-flashcard-detail',
    templateUrl: './flashcard-detail.component.html'
})
export class FlashcardDetailComponent implements OnInit, OnDestroy {
    description: any;
    flashcard: Flashcard;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private flashcardService: FlashcardService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        }, (error)=>{}, ()=>{
        });

        this.registerChangeInFlashcards();
    }

    load(id) {
        this.flashcardService.find(id).subscribe((flashcard) => {
            this.flashcard = flashcard;
            let description = '<div>'+flashcard.description+'</div>';
            let htmlObjectDescription = document.getElementById('htmlencodeddescription');
            htmlObjectDescription.innerHTML = description;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFlashcards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'flashcardListModification',
            (response) => this.load(this.flashcard.id)
        );
    }
}
