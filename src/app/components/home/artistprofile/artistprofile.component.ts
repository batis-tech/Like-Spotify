import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { DataService } from "../../../services/data.service";
@Component({
  selector: 'app-artistprofile',
  templateUrl: './artistprofile.component.html',
  styleUrls: ['./artistprofile.component.scss']
})
export class ArtistprofileComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private dataService :DataService) { }

  artistsId: any[] = [];
  artists: any;
  album: any;

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params:Params)=>{
      this.artistsId =params.get('id');
      console.log(params.get('id'));
    })

    this.dataService.getArtistDetail(this.artistsId).subscribe(data =>{
      this.artists = data ;
      console.log(data);
    })
    this.dataService.getArtistAlbum(this.artistsId).subscribe(data =>{
      this.album = data.items;
      console.log(data);

    })

  }

}
