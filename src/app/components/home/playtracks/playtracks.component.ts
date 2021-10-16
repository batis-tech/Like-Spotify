import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { DataService } from "../../../services/data.service";
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-playtracks',
  templateUrl: './playtracks.component.html',
  styleUrls: ['./playtracks.component.scss']
})
export class PlaytracksComponent implements OnInit {
msaapDisplayTitle = true;
msaapDisplayPlayList = true;
msaapPageSizeOptions = [2,4,6];
msaapDisplayVolumeControls = true;
msaapDisplayRepeatControls = true;
msaapDisplayArtist = false;
msaapDisplayDuration = false;
msaapDisablePositionSlider = true;

  msaapPlaylist: any[] = [];
  trackDteails:any;
  tracks:any;
  constructor(private activatedRoute :ActivatedRoute,private dataService: DataService) { }
   trackID:any[]=[];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(( params:Params)=>{
      this.trackID = params.get('id');
      console.log(params.get('id'));
    })
    this.dataService.playtrack(this.trackID).subscribe(data => {
      console.log(data);
      this.trackDteails = data;

      this.msaapPlaylist=[
             {
            title: data.name,
            link: data.preview_url,
            artist: data.album.artists[0].name,
            duration: data.duration_ms,
        }]

        this.dataService.getArtistAlbumTracks(this.trackDteails.album.id).subscribe(data => {
          this.tracks = data.items;
          console.log(data.items);
        });
    });

  }



}
