import { Component, OnInit} from '@angular/core';
import { DataService } from "../../../../services/data.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: 'app-p-list',
  templateUrl: './p-list.component.html',
  styleUrls: ['./p-list.component.scss']
})
export class PListComponent implements OnInit {
  playlist: any[]=[];
  constructor(private dataService: DataService, private httpClient :HttpClient, private router :Router) { }

  ngOnInit(): void {
    this.dataService.getPlaylist().subscribe((data:any) =>{
      console.log(data.playlists.items);
      this.playlist = data.playlists.items;
    })

  }
  openDetails(id: string){
    this.router.navigate(['featured-playlists', id]);
  }

}
