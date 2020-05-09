import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  author: string;
  created: Date;
  year: number;

  constructor() {}

  ngOnInit(): void {
    this.author = 'http://www.pandorasoft.co - Pansora Sof'
    this.created = new Date();//.getFullYear();
    this.year = this.created.getFullYear();
  }

}
