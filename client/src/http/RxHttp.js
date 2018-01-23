import Rx from 'rxjs';
import axios from 'axios';

export default class RxHttp {

  constructor(baseUrl){
    this.baseUrl = baseUrl || '';
  }

  get(path, config){
    const url = this.makeUrl(path);
    return Rx.Observable.fromPromise(axios.get(url, config));
  }

  delete(path, config){
    const url = this.makeUrl(path);
    return Rx.Observable.fromPromise(axios.delete(url, config));
  }

  post(path, data, config){
    const url = this.makeUrl(path);
    return Rx.Observable.fromPromise(axios.post(url, data, config));
  }

  put(path, data, config){
    const url = this.makeUrl(path);
    return Rx.Observable.fromPromise(axios.put(url, data, config));
  }

  makeUrl(path){
    return `${this.baseUrl}${path}`;
  }
}