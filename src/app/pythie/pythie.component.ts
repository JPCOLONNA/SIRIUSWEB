import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesPythieService } from './providers/resources-pythie.service';
import { MixinService } from '../core/providers/mixin.service';
import { ResourcesService } from '../core/providers/resources.service';
import { MenuEvent } from '../core/broadcast/menu-event';
import { ApplicationInfoEvent } from '../core/broadcast/application-info-event';

@Component({
  selector: 'app-pythie',
  templateUrl: './pythie.component.html',
  styleUrls: ['./pythie.component.scss']
})
export class PythieComponent implements OnInit {

  //Ressources
  rsc: any; 

  constructor(
    private resourcesPythieService: ResourcesPythieService, 
    private resourcesService: ResourcesService, 
    private mixinService: MixinService, 
    private formBuilder: FormBuilder,
    private menuEvent: MenuEvent,
    private applicationInfoEvent: ApplicationInfoEvent) { 
  }

  ngOnInit() {
    this.rsc = this.resourcesPythieService.get();
    
    //MAJ du menu
    this.menuEvent.fire(JSON.stringify(this.rsc.menu));
    
    //MAJ du nom de l'application
    this.applicationInfoEvent.fire(JSON.stringify(this.rsc.infoApplication));
  }

  /*createForms(): void {

    this.form = this.formBuilder.group({
      'name' : ['', Validators.required],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
    });
   
  }*/
}
