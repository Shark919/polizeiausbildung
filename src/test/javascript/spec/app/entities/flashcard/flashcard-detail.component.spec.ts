/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PolizeiausbildungTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FlashcardDetailComponent } from '../../../../../../main/webapp/app/entities/flashcard/flashcard-detail.component';
import { FlashcardService } from '../../../../../../main/webapp/app/entities/flashcard/flashcard.service';
import { Flashcard } from '../../../../../../main/webapp/app/entities/flashcard/flashcard.model';

describe('Component Tests', () => {

    describe('Flashcard Management Detail Component', () => {
        let comp: FlashcardDetailComponent;
        let fixture: ComponentFixture<FlashcardDetailComponent>;
        let service: FlashcardService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PolizeiausbildungTestModule],
                declarations: [FlashcardDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FlashcardService,
                    JhiEventManager
                ]
            }).overrideTemplate(FlashcardDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlashcardDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlashcardService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Flashcard(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.flashcard).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
