const storage = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return sessionStorage.getItem(key)?sessionStorage.getItem(key).replace('"','').replace('"',''):"";
  },
  getObj(key) {
    return sessionStorage.getItem(key)?JSON.parse(sessionStorage.getItem(key)):null;
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  removeAll(){
    sessionStorage.clear();
  }
}
export default storage;
