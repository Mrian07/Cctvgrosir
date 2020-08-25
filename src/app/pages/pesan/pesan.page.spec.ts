import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PesanPage } from './pesan.page';

describe('PesanPage', () => {
  let component: PesanPage;
  let fixture: ComponentFixture<PesanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PesanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
