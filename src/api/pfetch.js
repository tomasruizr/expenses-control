import 'whatwg-fetch';
import env from '../../config/env.js';
export default function pfetch( input, options ) {
  options = Object.assign ({}, env.defaultHttpOptions, options );
  return fetch( input, options );
}

