import * as NodeGeocoder from 'node-geocoder';
import {GoogleOptions} from "node-geocoder"
import {GOOGLE_GEOCODEAPIKEY} from "../config/config"

const options:GoogleOptions = {
    provider: 'google',
    apiKey: GOOGLE_GEOCODEAPIKEY,

  };

  const geocoder = NodeGeocoder(options);

  export const getCity = async (lat:number,long:number) => {
    // const nlat = parseInt(lat)
    // const nlong = parseInt(long)
    const res = await geocoder.reverse({ lat: lat, lon: long });
    return res[0].city;
  }
  // provider: 'google';
  // clientId?: string;
  // apiKey?: string;
  // language?: string;
  // region?: string;
  // excludePartialMatches?: boolean;
  // channel?: string;