import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { DataService } from "../../../services/data.service";
@Component({
  selector: 'app-playtracks',
  templateUrl: './playtracks.component.html',
  styleUrls: ['./playtracks.component.scss']
})
export class PlaytracksComponent implements OnInit {

  constructor(private activatedRoute :ActivatedRoute,private dataService: DataService) { }
   trackID:any[]=[];
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(( params:Params)=>{
      this.trackID = params.get('id');
      console.log(params.get('id'));
    })
    this.dataService.playtrack(this.trackID).subscribe(data => {
      console.log(data);

    })

  }

}
