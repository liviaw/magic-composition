import * as mobx from 'mobx';

export class PlayerPresenter {
    constructor() {
      mobx.makeObservable(this);
    }

    seeds: number[] = [];
    templates: number[][] = [];

}