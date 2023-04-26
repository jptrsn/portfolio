import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { GeneralDescriptionComponent } from './general-description/general-description.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SkillComponent } from './skill/skill.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeComponent,
    GeneralDescriptionComponent,
    SkillComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class HomeModule { }
