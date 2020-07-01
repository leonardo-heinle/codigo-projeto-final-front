import { http } from './api'

export default {

  findAll: () => {
    return http.get('stocks');
  },

  findById: (stock) => {
    return http.get(`stocks/${stock.id}`, { data: stock });
  },

  save: (stock) => {
    return http.post('stocks', stock);
  },

  delete: (stock) => {
    return http.delete(`stocks/${stock.id}`, { data: stock });
  },

  update: (stock) => {
    return http.put(`stocks`, stock);
  }
}
