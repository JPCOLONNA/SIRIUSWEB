import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";

interface IBreadcrumb {
  label: string;
  params?: Params;
  url?: string;
  screenName?: string;
}

/**
 * Fil d'ariane dans le header
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  /** Interface représentant un élément du fil d'ariane*/
  public breadcrumbs: IBreadcrumb[];

  /** Nom de l'écran renvoyé à app (socle des applications) */
  @Output() screenName = new EventEmitter<any>();

  //Pour les modales
  /** Route de l'écran appelant la modale */
  @Input() routeTmp?:ActivatedRoute;
  /** Titre de la modale */
  @Input() titleModal?:string;

  /**
   * Crée une instance du composant BreadcrumbComponent
   * @param activatedRoute 
   * @param router 
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      if(this.routeTmp!=null)
      {
        this.activatedRoute = this.routeTmp;
      }
      
      this.breadcrumbs = [];
    }

  /**
   * Initialise le composant et ses variables
   */
  ngOnInit() {
    //nom de la propriété dans xxx-routing.module.ts
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    
    //Récupère la route (url présente dans le navigateur)
    let root: ActivatedRoute = this.activatedRoute.root;
    this.breadcrumbs = this.getBreadcrumbs(root);

    //Pour une modal ajout du titre de la modal dans le fil d'ariane
    if(this.titleModal != "" && this.titleModal!= undefined)
    {
      let breadcrumbModal: IBreadcrumb = {
        label: this.titleModal
      };
      this.breadcrumbs.push(breadcrumbModal);
    }

    //Filtre l'url présente dans le navigateur pour récupérer les informations de l'écran
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      //set breadcrumbs
      let root: ActivatedRoute = this.activatedRoute.root;
      //Décompose l'url dans un tableau
      this.breadcrumbs = this.getBreadcrumbs(root);
      
      //Nom de l'écran du dernier élément du fil d'arriane (= écran affiché)
      //Vérifie que l'élémént possède la propriété "screenName"
      if(this.breadcrumbs.length>0 && this.breadcrumbs[this.breadcrumbs.length-1].hasOwnProperty("screenName"))
      {
        //Renvoi à app (socle des applications) le nom de l'écran affiché
        this.screenName.emit(this.breadcrumbs[this.breadcrumbs.length-1]["screenName"]);
      }
      else
      {
        this.screenName.emit("");
      }

      //Pour une modal ajout du titre de la modal dans le fil d'ariane
      if(this.titleModal != "" && this.titleModal!= undefined)
      {
        let breadcrumbModal: IBreadcrumb = {
          label: this.titleModal
        };
        this.breadcrumbs.push(breadcrumbModal);
      }
    });

  }

  /**
   * Décompose l'url pour constituer le fil d'ariane<br />
   * Méthode récursive
   * @param {ActivateRoute} route
   * @param {string} url
   * @param {IBreadcrumb[]} breadcrumbs
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //Récupère les routes enfant
    let children: ActivatedRoute[] = route.children;

    //Retourne le contenu si pas d'enfant trouvé
    if (children.length === 0) {
      return breadcrumbs;
    }
    
    //Parcourt les routes enfants
    for (let child of children) {
      //vérifie la route primaire
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //Vérifie que la propriété "breadcrumb" est spécifiée pour la route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        // Récursive
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //Récupère le segment de l'url
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
      if(routeURL != '')
      {
        //Construit l'url de l'élément en cours d'analyse
        url += `/${routeURL}`;

        //Ajoute au fil d'ariane
        let breadcrumb: IBreadcrumb = {
          label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
          params: child.snapshot.params,
          url: url,
          screenName: child.snapshot.data["screenName"]
        };

        breadcrumbs.push(breadcrumb);
      }
      // Récursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
