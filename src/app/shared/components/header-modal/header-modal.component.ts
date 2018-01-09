import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent implements OnInit {

  //Pour les modales
  @Input() routeTmp?:ActivatedRoute;  //Route de l'écran appelant
  @Input() nameModal?:string;         //Nom de l'écran/modal
  @Input() titleModal?:string;        //Titre de la modal

  constructor() { }

  ngOnInit() {
  }

}
