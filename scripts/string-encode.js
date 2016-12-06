String.prototype.EncodeURI=function(a){String.prototype._replace=function(a,b){var c=this.valueOf(),d="",e=c.indexOf(a);if(e>=0){for(var f=e+a.length-1,g=0;g<e;g++)d+=c.charAt(g);for(var h=0;h<b.length;h++)d+=b.charAt(h);var i=c.substring(f+1,c.length);d+=c.length>f+1+a.length?i._replace(a,b):i}else d+=c;return c="",c=d},a=a||[];var b=this;if(!b)return"";b=b.toString(),b=b.trim(),b=b.replace(/\"/g,""),b=b.replace(/\ /g,"-"),b=b.replace(/\"/g,""),b=b.replace(/\&amp\;/g,"and"),b=b.replace(/\&/,"and");for(var c=0;c<48;c++){var d=String.fromCharCode(c);(null==a||!a.indexOf(String.fromCharCode(c))>=0&&"-"!=String.fromCharCode(c))&&(b=b._replace(d,"")._replace(d,""))}for(var c=58;c<65;c++){var d=String.fromCharCode(c);(null==a||!a.indexOf(String.fromCharCode(c))>=0&&"-"!=String.fromCharCode(c))&&(b=b._replace(d,"")._replace(d,""))}for(var c=123;c<200;c++){var d=String.fromCharCode(c);(null==a||!a.indexOf(String.fromCharCode(c))>=0&&"-"!=String.fromCharCode(c))&&(b=b._replace(d,"")._replace(d,""))}return b.toLowerCase().replace(/-$/,"").replace(/^-/,"").replace(/-+/g,"-")};

function encodeText() {
    var ret = this.value.EncodeURI();
    console.log(ret);
    return ret;
}