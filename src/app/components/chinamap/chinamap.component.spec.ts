import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChinamapComponent } from './chinamap.component';

describe('ChinamapComponent', () => {
  let component: ChinamapComponent;
  let fixture: ComponentFixture<ChinamapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinamapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChinamapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
