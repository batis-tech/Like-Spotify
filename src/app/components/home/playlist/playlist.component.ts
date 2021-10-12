import { Component, OnInit,Input } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist: any[]= [];
  constructor(private dataService :DataService, private httpClient :HttpClient) { }

  ngOnInit(): void {
    this.dataService.getPlaylist().subscribe(data =>{
      console.log(data.playlists.items);
      this.playlist = data.playlists.items;


    })
  }

}
