import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-header-home',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  public searchQuery: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }


}
