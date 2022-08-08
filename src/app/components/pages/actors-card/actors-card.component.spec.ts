import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsCardComponent } from './actors-card.component';

describe('ActorsCardComponent', () => {
  let component: ActorsCardComponent;
  let fixture: ComponentFixture<ActorsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
