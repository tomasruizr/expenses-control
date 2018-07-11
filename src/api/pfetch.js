import 'whatwg-fetch';

export default function pfetch() {
  return fetch( ...arguments );
}

