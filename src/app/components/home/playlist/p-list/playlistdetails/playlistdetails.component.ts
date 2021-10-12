import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../../../services/data.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-playlistdetails',
  templateUrl: './playlistdetails.component.html',
  styleUrls: ['./playlistdetails.component.scss']
})
export class PlaylistdetailsComponent implements OnInit {
  detailsId: any = [];
  details: any;
  private routeSub: any = Subscription;
  private detailsSub: any = Subscription;
  constructor(private dataService:DataService, private httpClient :HttpClient,private activatedRoute: ActivatedRoute,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.detailsId = params['id'];
      this.getPlaylistDetails(this.detailsId);
      console.log( this.getPlaylistDetails(this.detailsId));

    });
  }

  getPlaylistDetails(id: string): void {
this.detailsSub = this.dataService
  .getPlaylistDetails(id)
  .subscribe((data:any ) => {
    this.details = data ;

  });
}

}
