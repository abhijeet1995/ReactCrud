let mobile = {
    brand : 'Apple',
    color : 'Silver',
    price : 35000
};

let setMobile = (object) => {
    mobile = object;
};
let newObject = Object.assign(mobile , {color : 'Black'});
setMobile(newObject);
console.log(mobile);