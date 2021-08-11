import http from '@/utils/httpconfig'
const request={
  get(url){
    return function(params){
      return http.get(url,{params});
    }
  },
  post(url){
    return function(params){
      return http.post(url,params);
    }
  },
  put(url){
    return function(params){
      return http.put(url,params);
    }
  },
  delete(url){
    return function(params){
      return http.delete(url,{params});
    }
  }

}
export default request;
