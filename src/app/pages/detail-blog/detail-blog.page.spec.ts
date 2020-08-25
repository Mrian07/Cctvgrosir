import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailBlogPage } from './detail-blog.page';

describe('DetailBlogPage', () => {
  let component: DetailBlogPage;
  let fixture: ComponentFixture<DetailBlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
