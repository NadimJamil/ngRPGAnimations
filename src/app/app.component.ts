import { Component, ɵsetAlternateWeakRefImpl } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { bounce, fadeIn, fadeOut, flip, headShake, jello, pulse, shakeX, wobble, zoomIn } from 'ng-animate';
import { last, lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('death', [transition(':increment', useAnimation(shakeX, {
      params: {timing: 0.5}
    }))]),
    trigger('preAttack', [transition(':increment', useAnimation(jello, {
      params: {timing:0.5}
    }))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {
      params: {timing:0.2, scale: 4.5}
    }))]),
    trigger('bounce', [transition(':increment', useAnimation(bounce, {
      params: {timing:1}
    }))]),
    trigger('shake', [transition(':increment', useAnimation(shakeX, {
      params: {timing:0.75}
    }))]),
    trigger('flip', [transition(':increment', useAnimation(flip, {
      params: {timing:0.75}
    }))])
  ]
})
export class AppComponent {
  mavariable = 0
  slimeIsPresent = false;
  ng_death = 0
  ng_preAttack = 0
  ng_attack = 0
  ng_bounce = 0
  ng_shake = 0
  ng_flip = 0

  rotate_center = false
  rotate_hor_top = false
  css_hit = false
  isITSactive = false
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

  async BSF(){
    this.ng_bounce++

    await lastValueFrom(timer(1000))

    this.ng_shake++
    await lastValueFrom(timer(750))

    this.ng_flip++
    await lastValueFrom(timer(750))
  }

  ITS(){
    if(this.isITSactive){
      this.double()
    }
  }

  double(){
    if(this.isITSactive){
      this.rotate_center = true
      setTimeout(() => {
        this.rotate_center = false;
        this.top()
      }, 1000);
    }
  }

  top(){
    if(this.isITSactive){
      this.rotate_hor_top = true
      setTimeout(() => {
        this.rotate_hor_top = false
        this.double()
      }, 1000);
    }
  }

  startIts(){
    this.isITSactive = true
    this.ITS()
  }

  stopITS(){
    this.isITSactive = false
  }
}
