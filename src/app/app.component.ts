import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { shakeX } from 'ng-animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations : [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: 0.5}}))])
  ]
})
export class AppComponent {
  slimeIsPresent = false;
  shakeX = 0.5
  ng_death = false;
  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.ng_death = true;
    setTimeout(() => {this.ng_death = false}, 1500);
    // TODO 2e animation angular en même temps
    
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }
}
