import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  constructor(private dataService:DataService, private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.dataService.getArtists().subscribe((data:any) =>{
      console.log(data);
    })
  }

}
