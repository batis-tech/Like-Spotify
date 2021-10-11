import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../../../services/data.service";
@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {
  releases: any[] = [];

  constructor(private httpClient: HttpClient, private dataService :DataService) { }

  ngOnInit(): void {
    this.dataService.getNewRelease().subscribe((data:any) =>{
      console.log(data.albums.items);
      this.releases = data.albums.items;
    })
  }
}
