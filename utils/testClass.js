class aa {
  constructor(abc){
    this.abc=abc
  }
  bb(bb){
    this.bb = bb
    console.log(this.abc)
    console.log(this.bb)
  };
  cc(cc) {
    this.cc = cc
    console.log(this.abc)
    console.log(this.cc)
  };
};
export {aa}
export let bcd=1
export function incCounter() {
  bcd++;
}