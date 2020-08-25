import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CekOnkirPage } from './cek-onkir.page';

describe('CekOnkirPage', () => {
  let component: CekOnkirPage;
  let fixture: ComponentFixture<CekOnkirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CekOnkirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CekOnkirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
