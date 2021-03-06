import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Address } from './address';

declare var google: any;

@Injectable()
export class MapService {

  constructor() { }

  getLatLan(data) {
    data = {
      address: `${data.street}, ${data.town}, ${data.county}`
    }
    console.log('Getting Address - ', data);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode(data, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    })
  }

  //  getLatLan(address: string) {
  //   console.log('Getting Address - ', address);
  //   let geocoder = new google.maps.Geocoder();
  //   return Observable.create(observer => {
  //     geocoder.geocode({ 'address': address }, function (results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         observer.next(results[0].geometry.location);
  //         observer.complete();
  //       } else {
  //         console.log('Error - ', results, ' & Status - ', status);
  //         observer.next({});
  //         observer.complete();
  //       }
  //     });
  //   })
  // }

}
