import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengirimanPage } from './pengiriman.page';

describe('PengirimanPage', () => {
  let component: PengirimanPage;
  let fixture: ComponentFixture<PengirimanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengirimanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengirimanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
