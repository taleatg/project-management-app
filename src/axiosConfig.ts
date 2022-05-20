import axios from 'axios';

axios.defaults.baseURL = 'https://fast-wildwood-10188.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';
