// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*******************************************************************************
 *
 * js.转换中文日期和数字 Author: o@cailei.net
 * Creation date: 05/06/2014
 *
 * last modified: 05/06/14 20.38
 ******************************************************************************/
var cn = ['零','一','二','三','四','五','六','七','八','九'];
var cd = ['','十','百','千','萬','十','百','千','億','十','百','千','兆','十','百','千'];

// Convert chinese numbers
function cnNum( num ){
	var n = num.toString().replace(/^0*/g,'');
	var na = n.split('').reverse();
	var o = '';
	for(i=n.length-1; i>-1; i--){
		if(cn[na[i]] != '零') o += cn[na[i]]+cd[i];
		else{
			if(i%4>0){
				if(o.substr(-1) != '零') o += '零';
			}else{
				if(o.substr(-1) == '零'){
					o = o.substring(0,o.length-1);
					o += cd[i];
				}else o += cd[i];
			}
		}
	}
	return o;
}

// Convert Chinese Date
// need Date format: YYYY/M/D
function cnDate( date ){
	var ymd = date.split('/');
	var y = ymd[0], m = ymd[1], d = ymd[2];
	y = cn[y.substr(0,1)]+cn[y.substr(1,1)]+cn[y.substr(2,1)]+cn[y.substr(3,1)]+'年';
	m = cnNum( m )+'月';
	d = cnNum( d )+'日';
	return y+m+d;
}

// Check if writing-mode is supported
function isWritingModeSupported()
{
	var wms = ["writingMode","webkitWritingMode","oWritingMode","mozWritingMode","msWritingMode","epubWritingMode"];
	for(i=0; i<wms.length; i++){
		return (wms[i] in document.head.style) ? true : false;
	}
}

// Check if is browser: MSIE, Chrome, Safari, Opera, Firefox
function isBrowser( n ){
	return (navigator.userAgent.indexOf( n ) !== -1) ? true : false;
}