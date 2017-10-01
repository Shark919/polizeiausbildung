/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PolizeiausbildungTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CodeoflawDetailComponent } from '../../../../../../main/webapp/app/entities/codeoflaw/codeoflaw-detail.component';
import { CodeoflawService } from '../../../../../../main/webapp/app/entities/codeoflaw/codeoflaw.service';
import { Codeoflaw } from '../../../../../../main/webapp/app/entities/codeoflaw/codeoflaw.model';

describe('Component Tests', () => {

    describe('Codeoflaw Management Detail Component', () => {
        let comp: CodeoflawDetailComponent;
        let fixture: ComponentFixture<CodeoflawDetailComponent>;
        let service: CodeoflawService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PolizeiausbildungTestModule],
                declarations: [CodeoflawDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CodeoflawService,
                    JhiEventManager
                ]
            }).overrideTemplate(CodeoflawDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CodeoflawDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CodeoflawService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Codeoflaw(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.codeoflaw).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
