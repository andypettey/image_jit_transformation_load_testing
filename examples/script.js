import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [{ target: 40, duration: '30s' }],
  thresholds: {
    'http_req_duration': ['p(95)<200', 'p(99)<300'],
  },
};

export default function () {
  http.get('http://imgproxy:8080/insecure/rs:fit:1920:1080/quality:70/plain/local:///1.jpg@jpg');
  http.get('http://imgproxy:8080/insecure/rs:fit:1920:1080/quality:70/plain/local:///2.jpg@jpg');
  http.get('http://imgproxy:8080/insecure/rs:fit:1920:1080/quality:70/plain/local:///3.jpg@jpg');
  http.get('http://imgproxy:8080/insecure/rs:fit:1920:1080/quality:70/plain/local:///4.jpg@jpg');
  // http.get('http://imgproxy:8080/insecure/quality:70/plain/local:///1.jpg@jpg');
  // http.get('http://imgproxy:8080/insecure/quality:70/plain/local:///2.jpg@jpg');
  // http.get('http://imgproxy:8080/insecure/quality:70/plain/local:///3.jpg@jpg');
  // http.get('http://imgproxy:8080/insecure/quality:70/plain/local:///4.jpg@jpg');
  }
