import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    closed_model: {
      executor: 'constant-vus',
      vus: 20,
      duration: '5m',
    },
  },
  // stages: [{ target: 120, duration: '30s' }],
  // thresholds: {
  //   'http_req_duration': ['p(95)<200', 'p(99)<300'],
  // },
};

let nodeCount = 3;

export function setup(){

}

export default function () {
  testCompressedImages()
}

function testRandomImages(){
  let random = getRandomInt(29) + 1
  let choice = getRandomInt(2)
  let option = 'compressed'
  if(choice === 1){
    option='resized'
  } else if(choice === 2){
    option='resized-compressed'
  }
  for(let i = 1; i <= nodeCount; i++){
    http.get(`http://imgproxy_${i}:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${random}-${option}.jpg@jpg`);
  }
}

function testOriginalImages(){
  let random = getRandomInt(29) + 1
  for(let i = 1; i <= nodeCount; i++){
    http.get(`http://imgproxy_${i}:8080/insecure/rs:fit:1920:1080/plain/local:///${random}.jpg@jpg`);
  }
}

function testCompressedImages(){
  let random = getRandomInt(29) + 1
  for(let i = 1; i <= nodeCount; i++){
    http.get(`http://imgproxy_${i}:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${random}-compressed.jpg@jpg`);
  }
}


function testResizedImages(){
  let random = getRandomInt(29) + 1
  for(let i = 1; i <= nodeCount; i++){
    http.get(`http://imgproxy_${i}:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${random}-resized.jpg@jpg`);
  }
}

function testResizedCompressedImages(){
  let random = getRandomInt(29) + 1
  for(let i = 1; i <= nodeCount; i++){
    http.get(`http://imgproxy_${i}:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${random}-resized-compressed.jpg@jpg`);
    http.get(`http://imgproxy_${i}:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${random}-${option}.jpg@jpg`);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}