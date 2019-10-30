import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoListaPage } from './orcamento-lista.page';

describe('OrcamentoListaPage', () => {
  let component: OrcamentoListaPage;
  let fixture: ComponentFixture<OrcamentoListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
