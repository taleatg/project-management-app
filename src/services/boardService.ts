import { BoardData } from './interfaces';
import axios from 'axios';
import { baseUrl } from './columnService';

export async function getBoardsList(token: string): Promise<BoardData[]> {
  return axios({
    method: 'get',
    url: `${baseUrl}/boards`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function postBoard(token: string) {
  return axios({
    method: 'post',
    url: `${baseUrl}/boards`,
    data: { title: 'title' },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
