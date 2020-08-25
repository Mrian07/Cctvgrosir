import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 option : any = [
                  {
                    "pos":1,
                    "opt":"a",
                    "img":"pic1.jpeg",
                    "txt":"some text, maybe a long text"
                  },
                  {
                    "pos":2,
                    "opt":"c",
                    "img":"pic2.jpeg",
                    "txt":"some text"
                  },
                  {
                    "pos":3,
                    "opt":"f",
                    "img":"pic3.jpeg",
                    "txt":"another text"
                  },
                  {
                    "pos":4,
                    "opt":"i",
                    "img":"pic4.jpeg",
                    "txt":"another text, maybe a long text"
                  },
                  {
                    "pos":5,
                    "opt":"n",
                    "img":"pic5.jpeg",
                    "txt":"some text, maybe a long text"
                  },
                  {
                    "pos":6,
                    "opt":"m",
                    "img":"pic6.jpeg",
                    "txt":"some text, maybe a long text"
                  }
  ];
  constructor(
    public router: Router,

  ) { }

  ngOnInit() {
  }
  goto_detail(id){
    this.router.navigateByUrl('/sub1/' + id );
  }
}
