import { Component, OnInit } from '@angular/core';
import { EmmiterService } from 'src/app/services/emmiter.service';

@Component({
  selector: 'app-fotter',
  templateUrl: './fotter.component.html',
  styleUrls: ['./fotter.component.scss']
})
export class FotterComponent implements OnInit {
  show: boolean = true;
  constructor(private emmiter: EmmiterService) { }

  ngOnInit() {
    this.emmiter.state.subscribe(state => {
      this.show = state;
    })
  }

}
