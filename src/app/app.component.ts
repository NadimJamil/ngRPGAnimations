import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { fadeIn, fadeOut, headShake, jello, pulse, shakeX, wobble, zoomIn } from 'ng-animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('death', [transition(':increment', useAnimation(shakeX, {
      params: {timing: 1}
    }))]),
    trigger('preAttack', [transition(':increment', useAnimation(jello, {
      params: {timing:0.5}
    }))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {
      params: {timing:0.2, scale: 4.5}
    }))])
  ]
})
export class AppComponent {
  mavariable = 0
  slimeIsPresent = false;
  ng_death = 0
  ng_preAttack = 0
  ng_attack = 0
  css_hit = false
  constructor() {
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
  attackSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.add("pulse");
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime()
  }

  death(){
    this.slimeIsPresent = false
    // TODO Animation angular avec forwards
    this.hideSlime()
    // TODO 2e animation angular en même temps
    this.ng_death++;

  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
    // this.attackSlime()
    this.ng_preAttack++
    setTimeout(() => {this.ng_attack++}, 1000)
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true
    setTimeout(() => {
      this.css_hit = false
    }, 200);
  }
}
