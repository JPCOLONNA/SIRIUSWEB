import { APP_INITIALIZER, NgModule, Optional, SkipSelf, LOCALE_ID } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HammerConfig } from './hammer-config';

import { Broadcaster } from './broadcast/broadcaster';
import { MenuEvent } from './broadcast/menu-event';
import { ApplicationInfoEvent } from './broadcast/application-info-event';
//import { FooterInputEvent } from './broadcast/footer-input-event';
//import { FooterOutputEvent } from './broadcast/footer-output-event';

import { AuthGuardService } from './providers/auth-guard.service';
import { AuthService } from './providers/auth.service';
import { BaseService } from './providers/base.service';
import { ExceptionService } from './providers/exception.service';
import { FooterService } from './providers/footer.service';
import { MixinService } from './providers/mixin.service';
import { ReferencesService } from './providers/references.service';
import { ResourcesService } from './providers/resources.service';
import { SettingsService } from './providers/settings.service';
import { AutorisationService } from './providers/autorisation.service';
import { ConstructionMenuService } from './providers/construction-menu.service';

import { ResourcesFactory } from './factories/resources.factory';
import { SettingsFactory } from './factories/settings.factory';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { AuthInterceptor } from './auth-interceptor';
import { ResourcesPythieService } from '../pythie/providers/resources-pythie.service';
import { ResourcesPythieFactory } from '../pythie/factories/resources-pythie.factory';
import { ResourcesAssuresService } from '../assures/providers/resources-assures.service';
import { ResourcesAssuresFactory } from '../assures/factories/resources-assures.factory';
import { ResourcesBaseTamponService } from '../base-tampon/providers/resources-base-tampon.service';
import { ResourcesBaseTamponFactory } from '../base-tampon/factories/resources-base-tampon.factory';
import { ListService } from './providers/list.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    {
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
    Broadcaster,
    MenuEvent,
    ApplicationInfoEvent,
    BaseService,
    AuthInterceptor,
    AuthGuardService,
    AuthService,
    ExceptionService,
    FooterService,
    MixinService,
    ReferencesService,
    ResourcesPythieService, {
      provide: APP_INITIALIZER,
      useFactory: ResourcesPythieFactory,
      deps: [ResourcesPythieService],
      multi: true
    },
    ResourcesAssuresService, {
      provide: APP_INITIALIZER,
      useFactory: ResourcesAssuresFactory,
      deps: [ResourcesAssuresService],
      multi: true
    },
    ResourcesBaseTamponService, {
      provide: APP_INITIALIZER,
      useFactory: ResourcesBaseTamponFactory,
      deps: [ResourcesBaseTamponService],
      multi: true
    },
    ResourcesService, {
      provide: APP_INITIALIZER,
      useFactory: ResourcesFactory,
      deps: [ResourcesService],
      multi: true
    },
    SettingsService, {
      provide: APP_INITIALIZER,
      useFactory: SettingsFactory,
      deps: [SettingsService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    AutorisationService,
    ConstructionMenuService,
    ListService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
