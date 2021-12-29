//将文件路径的文件名encode
const urlEncode = function(path){
 let _pathArr =  path.split('/');
 let _filename = _pathArr.pop();
 _pathArr.push(encodeURIComponent(_filename));
 return _pathArr.join('/');
}

export default urlEncode;