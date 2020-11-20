import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {

    // We are on the server
    // requests should be made to ingress.nginx
    // If you don't specify a domain,
    // node HTTP layer is going to assume that you are trying to make a request to localhost,
    // and it will add a domain automatically (e.g. 127.0.0.1/your_api)
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.kube-system.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // We are on the client (browser)
    // Requests can be made with a base of url ''
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;
