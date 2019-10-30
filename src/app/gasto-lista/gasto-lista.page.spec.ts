import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoListaPage } from './gasto-lista.page';

describe('GastoListaPage', () => {
  let component: GastoListaPage;
  let fixture: ComponentFixture<GastoListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
