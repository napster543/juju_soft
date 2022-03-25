import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudComprasComponent } from './crud-compras.component';

describe('CrudComprasComponent', () => {
  let component: CrudComprasComponent;
  let fixture: ComponentFixture<CrudComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
