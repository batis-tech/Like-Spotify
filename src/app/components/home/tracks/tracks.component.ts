import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { DataService } from "../../../services/data.service";
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  albumId:any[]=[];
  tracks: any;
  artists:any;
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params)=>{
      this.albumId = params.get('id');
      console.log(params.get('id'));

    });
    this.dataService.getArtistAlbumDetails(this.albumId).subscribe(data => {
      this.artists = data;
      console.log(data);
    });
    this.dataService.getArtistAlbumTracks(this.albumId).subscribe(data => {
      this.tracks = data.items;
      console.log(data.items);
    });

  }


}
