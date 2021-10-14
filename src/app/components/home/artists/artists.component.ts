import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  public searchQuery: string[] = [];
  artists: any[] = [];
  constructor(private dataService:DataService, private httpClient:HttpClient) { }

  ngOnInit(): void {

  }


    public searchArtists(){
     this.dataService.getAllArtists(this.searchQuery).subscribe(data => {
      this.artists =  data.artists.items;
      console.log(this.artists);
     });
    }

}
