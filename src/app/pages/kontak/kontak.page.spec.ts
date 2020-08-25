import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KontakPage } from './kontak.page';

describe('KontakPage', () => {
  let component: KontakPage;
  let fixture: ComponentFixture<KontakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontakPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KontakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
