import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaytracksComponent } from './playtracks.component';

describe('PlaytracksComponent', () => {
  let component: PlaytracksComponent;
  let fixture: ComponentFixture<PlaytracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaytracksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaytracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
