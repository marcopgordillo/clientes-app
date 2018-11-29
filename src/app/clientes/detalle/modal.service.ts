import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = false;

  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  set notificarUpload(value: EventEmitter<any>) {
    this._notificarUpload = value;
  }
}
