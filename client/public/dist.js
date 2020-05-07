(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $author$project$Emojigame$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $author$project$Emojigame$UrlRequested = function (a) {
	return {$: 'UrlRequested', a: a};
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Emojigame$Disconnected = function (a) {
	return {$: 'Disconnected', a: a};
};
var $author$project$Emojigame$Reconnect = function (a) {
	return {$: 'Reconnect', a: a};
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$Credentials$Credentials = F3(
	function (playerName, roomId, secret) {
		return {playerName: playerName, roomId: roomId, secret: secret};
	});
var $author$project$Game$PlayerName = function (a) {
	return {$: 'PlayerName', a: a};
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Game$playerNameDecoder = A2($elm$json$Json$Decode$map, $author$project$Game$PlayerName, $elm$json$Json$Decode$string);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $author$project$RoomId$RoomId = function (a) {
	return {$: 'RoomId', a: a};
};
var $author$project$RoomId$roomIdDecoder = A2($elm$json$Json$Decode$map, $author$project$RoomId$RoomId, $elm$json$Json$Decode$string);
var $author$project$Credentials$Secret = function (a) {
	return {$: 'Secret', a: a};
};
var $author$project$Credentials$secretDecoder = A2($elm$json$Json$Decode$map, $author$project$Credentials$Secret, $elm$json$Json$Decode$string);
var $author$project$Credentials$decoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'secret',
	$author$project$Credentials$secretDecoder,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'roomId',
		$author$project$RoomId$roomIdDecoder,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'playerName',
			$author$project$Game$playerNameDecoder,
			$elm$json$Json$Decode$succeed($author$project$Credentials$Credentials))));
var $author$project$Emojigame$getCredentialsFromFlags = F2(
	function (flags, url) {
		var _v0 = A2($elm$json$Json$Decode$decodeValue, $author$project$Credentials$decoder, flags);
		if (_v0.$ === 'Ok') {
			var credentials = _v0.a;
			var _v1 = credentials.roomId;
			var roomId = _v1.a;
			return _Utils_eq(
				A2($elm$core$String$dropLeft, 1, url.path),
				roomId) ? $elm$core$Maybe$Just(credentials) : $elm$core$Maybe$Nothing;
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Emojigame$sendMessage = _Platform_outgoingPort('sendMessage', $elm$json$Json$Encode$string);
var $author$project$Emojigame$reconnect = function (credentials) {
	var _v0 = credentials.secret;
	var secret = _v0.a;
	var _v1 = credentials.roomId;
	var roomId = _v1.a;
	var _v2 = credentials.playerName;
	var playerName = _v2.a;
	return $author$project$Emojigame$sendMessage('reconnect ' + (roomId + (' ' + (playerName + (' ' + secret)))));
};
var $author$project$Emojigame$Create = {$: 'Create'};
var $author$project$Emojigame$Join = function (a) {
	return {$: 'Join', a: a};
};
var $author$project$Emojigame$updateUrl = function (url) {
	return $author$project$Emojigame$Disconnected(
		function () {
			var _v0 = url.path;
			if (_v0 === '/') {
				return $author$project$Emojigame$Create;
			} else {
				var p = _v0;
				return $author$project$Emojigame$Join(
					$author$project$RoomId$RoomId(
						A2($elm$core$String$dropLeft, 1, p)));
			}
		}());
};
var $author$project$Emojigame$init = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			{
				currentUrl: url,
				navKey: key,
				page: function () {
					var _v0 = A2($author$project$Emojigame$getCredentialsFromFlags, flags, url);
					if (_v0.$ === 'Nothing') {
						return $author$project$Emojigame$updateUrl(url);
					} else {
						var credentials = _v0.a;
						return $author$project$Emojigame$Disconnected(
							$author$project$Emojigame$Reconnect(credentials));
					}
				}()
			},
			function () {
				var _v1 = A2($author$project$Emojigame$getCredentialsFromFlags, flags, url);
				if (_v1.$ === 'Nothing') {
					return $elm$core$Platform$Cmd$none;
				} else {
					var credentials = _v1.a;
					return $author$project$Emojigame$reconnect(credentials);
				}
			}());
	});
var $author$project$Emojigame$ConnectedWs = {$: 'ConnectedWs'};
var $author$project$Emojigame$DisconnectedWs = {$: 'DisconnectedWs'};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$WsApi$Error = function (a) {
	return {$: 'Error', a: a};
};
var $author$project$WsApi$GameState = function (a) {
	return {$: 'GameState', a: a};
};
var $author$project$WsApi$Joined = F2(
	function (a, b) {
		return {$: 'Joined', a: a, b: b};
	});
var $author$project$WsApi$Secret = function (a) {
	return {$: 'Secret', a: a};
};
var $author$project$Game$Game = F3(
	function (players, id, turns) {
		return {id: id, players: players, turns: turns};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 'Nonempty', a: a, b: b};
	});
var $mgold$elm_nonempty_list$List$Nonempty$fromList = function (ys) {
	if (ys.b) {
		var x = ys.a;
		var xs = ys.b;
		return $elm$core$Maybe$Just(
			A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Game$nonemptyListDecoder = function (value) {
	var fn = function (l) {
		var _v0 = $mgold$elm_nonempty_list$List$Nonempty$fromList(l);
		if (_v0.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('list not expected to be empty.');
		} else {
			var neList = _v0.a;
			return $elm$json$Json$Decode$succeed(neList);
		}
	};
	return A2(
		$elm$json$Json$Decode$andThen,
		fn,
		$elm$json$Json$Decode$list(value));
};
var $author$project$Game$Player = F3(
	function (name, points, active) {
		return {active: active, name: name, points: points};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Game$playerDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'active',
	$elm$json$Json$Decode$bool,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'points',
		$elm$json$Json$Decode$int,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'name',
			$author$project$Game$playerNameDecoder,
			$elm$json$Json$Decode$succeed($author$project$Game$Player))));
var $author$project$Game$Turn = F5(
	function (phrase, submissions, guesser, submissionsComplete, bestSubmissionPlayerName) {
		return {bestSubmissionPlayerName: bestSubmissionPlayerName, guesser: guesser, phrase: phrase, submissions: submissions, submissionsComplete: submissionsComplete};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $pzp1997$assoc_list$AssocList$D = function (a) {
	return {$: 'D', a: a};
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $pzp1997$assoc_list$AssocList$remove = F2(
	function (targetKey, _v0) {
		var alist = _v0.a;
		return $pzp1997$assoc_list$AssocList$D(
			A2(
				$elm$core$List$filter,
				function (_v1) {
					var key = _v1.a;
					return !_Utils_eq(key, targetKey);
				},
				alist));
	});
var $pzp1997$assoc_list$AssocList$insert = F3(
	function (key, value, dict) {
		var _v0 = A2($pzp1997$assoc_list$AssocList$remove, key, dict);
		var alteredAlist = _v0.a;
		return $pzp1997$assoc_list$AssocList$D(
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(key, value),
				alteredAlist));
	});
var $pzp1997$assoc_list$AssocList$fromList = function (alist) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, result) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($pzp1997$assoc_list$AssocList$insert, key, value, result);
			}),
		$pzp1997$assoc_list$AssocList$D(_List_Nil),
		alist);
};
var $author$project$Game$mapDict = A2(
	$elm$core$Basics$composeR,
	$elm$core$Dict$toList,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$List$map(
			function (_v0) {
				var k = _v0.a;
				var v = _v0.b;
				return _Utils_Tuple2(
					$author$project$Game$PlayerName(k),
					v);
			}),
		$pzp1997$assoc_list$AssocList$fromList));
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $author$project$Game$turnDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'bestSubmissionPlayerName',
	$elm$json$Json$Decode$maybe($author$project$Game$playerNameDecoder),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'submissionsComplete',
		$elm$json$Json$Decode$bool,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'guesser',
			$author$project$Game$playerNameDecoder,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'submissions',
				A2(
					$elm$json$Json$Decode$map,
					$author$project$Game$mapDict,
					$elm$json$Json$Decode$dict($elm$json$Json$Decode$string)),
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'phrase',
					$elm$json$Json$Decode$string,
					$elm$json$Json$Decode$succeed($author$project$Game$Turn))))));
var $author$project$Game$gameDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'turns',
	$author$project$Game$nonemptyListDecoder($author$project$Game$turnDecoder),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'id',
		$author$project$RoomId$roomIdDecoder,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'players',
			$elm$json$Json$Decode$list($author$project$Game$playerDecoder),
			$elm$json$Json$Decode$succeed($author$project$Game$Game))));
var $author$project$WsApi$createdDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'game', $author$project$Game$gameDecoder),
	A2(
		$elm$json$Json$Decode$map,
		$author$project$Credentials$Secret,
		A2($elm$json$Json$Decode$field, 'secret', $elm$json$Json$Decode$string)));
var $author$project$WsApi$decoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$map,
			$author$project$WsApi$GameState,
			A2($elm$json$Json$Decode$field, 'game', $author$project$Game$gameDecoder)),
			A2(
			$elm$json$Json$Decode$map,
			$author$project$WsApi$Error,
			A2($elm$json$Json$Decode$field, 'error', $elm$json$Json$Decode$string)),
			A2(
			$elm$json$Json$Decode$map,
			A2($elm$core$Basics$composeL, $author$project$WsApi$Secret, $author$project$Credentials$Secret),
			A2($elm$json$Json$Decode$field, 'secret', $elm$json$Json$Decode$string)),
			A2(
			$elm$json$Json$Decode$map,
			function (_v0) {
				var g = _v0.a;
				var s = _v0.b;
				return A2($author$project$WsApi$Joined, g, s);
			},
			A2($elm$json$Json$Decode$field, 'joined', $author$project$WsApi$createdDecoder))
		]));
var $author$project$Emojigame$ReceiveWs = function (a) {
	return {$: 'ReceiveWs', a: a};
};
var $author$project$Emojigame$WsError = function (a) {
	return {$: 'WsError', a: a};
};
var $author$project$Emojigame$helper = function (result) {
	if (result.$ === 'Ok') {
		var wsMsg = result.a;
		return $author$project$Emojigame$ReceiveWs(wsMsg);
	} else {
		var error = result.a;
		return $author$project$Emojigame$WsError(
			$elm$json$Json$Decode$errorToString(error));
	}
};
var $author$project$Emojigame$messageReceiver = _Platform_incomingPort('messageReceiver', $elm$json$Json$Decode$string);
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $author$project$Emojigame$wsConnectReceiver = _Platform_incomingPort(
	'wsConnectReceiver',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $author$project$Emojigame$wsDisconnectReceiver = _Platform_incomingPort(
	'wsDisconnectReceiver',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $author$project$Emojigame$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Emojigame$messageReceiver(
				A2(
					$elm$core$Basics$composeL,
					$author$project$Emojigame$helper,
					$elm$json$Json$Decode$decodeString($author$project$WsApi$decoder))),
				$author$project$Emojigame$wsDisconnectReceiver(
				$elm$core$Basics$always($author$project$Emojigame$DisconnectedWs)),
				$author$project$Emojigame$wsConnectReceiver(
				$elm$core$Basics$always($author$project$Emojigame$ConnectedWs))
			]));
};
var $author$project$Emojigame$Creating = F2(
	function (a, b) {
		return {$: 'Creating', a: a, b: b};
	});
var $author$project$Emojigame$CreatingScreen = F2(
	function (a, b) {
		return {$: 'CreatingScreen', a: a, b: b};
	});
var $author$project$Emojigame$Error = function (a) {
	return {$: 'Error', a: a};
};
var $author$project$Emojigame$Joining = F2(
	function (a, b) {
		return {$: 'Joining', a: a, b: b};
	});
var $author$project$Emojigame$JoiningScreen = F2(
	function (a, b) {
		return {$: 'JoiningScreen', a: a, b: b};
	});
var $author$project$Emojigame$Playing = function (a) {
	return {$: 'Playing', a: a};
};
var $author$project$PlayingScreen$UpdateGame = function (a) {
	return {$: 'UpdateGame', a: a};
};
var $author$project$Emojigame$createRoom = F2(
	function (settings, _v0) {
		var playerName = _v0.a;
		return $author$project$Emojigame$sendMessage('create ' + playerName);
	});
var $author$project$Emojigame$defaultSettings = {phraseSet: ''};
var $author$project$PlayingScreen$Wait = {$: 'Wait'};
var $author$project$PlayingScreen$Guess = {$: 'Guess'};
var $author$project$PlayingScreen$Invite = {$: 'Invite'};
var $author$project$PlayingScreen$Submissions = {$: 'Submissions'};
var $author$project$PlayingScreen$Write = function (a) {
	return {$: 'Write', a: a};
};
var $mgold$elm_nonempty_list$List$Nonempty$head = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return x;
};
var $author$project$PlayingScreen$currentTurn = function (game) {
	return $mgold$elm_nonempty_list$List$Nonempty$head(game.turns);
};
var $pzp1997$assoc_list$AssocList$keys = function (_v0) {
	var alist = _v0.a;
	return A2($elm$core$List$map, $elm$core$Tuple$first, alist);
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$PlayingScreen$hasSubmittedForCurrentTurn = F2(
	function (game, credentials) {
		return A2(
			$elm$core$List$member,
			credentials.playerName,
			$pzp1997$assoc_list$AssocList$keys(
				$author$project$PlayingScreen$currentTurn(game).submissions));
	});
var $author$project$PlayingScreen$iAmTheGuesser = F2(
	function (game, credentials) {
		return _Utils_eq(
			$author$project$PlayingScreen$currentTurn(game).guesser,
			credentials.playerName);
	});
var $author$project$PlayingScreen$currentScreen = F3(
	function (oldPhase, game, credentials) {
		if ($elm$core$List$length(game.players) < 2) {
			return $author$project$PlayingScreen$Invite;
		} else {
			if (A2($author$project$PlayingScreen$iAmTheGuesser, game, credentials)) {
				return $author$project$PlayingScreen$currentTurn(game).submissionsComplete ? $author$project$PlayingScreen$Guess : $author$project$PlayingScreen$Wait;
			} else {
				if ($author$project$PlayingScreen$currentTurn(game).submissionsComplete) {
					return $author$project$PlayingScreen$Submissions;
				} else {
					if (A2($author$project$PlayingScreen$hasSubmittedForCurrentTurn, game, credentials)) {
						return $author$project$PlayingScreen$Wait;
					} else {
						if (oldPhase.$ === 'Write') {
							return oldPhase;
						} else {
							return $author$project$PlayingScreen$Write('');
						}
					}
				}
			}
		}
	});
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $author$project$Styles$categoryIcon = $elm$svg$Svg$Attributes$style('margin: 5px 7px 5px 6px; cursor: pointer;');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$xmlSpace = A2(_VirtualDom_attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var $author$project$Icons$helperFun = F2(
	function (d_attributes, style) {
		return A2(
			$elm$svg$Svg$svg,
			A2(
				$elm$core$List$cons,
				$author$project$Styles$categoryIcon,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$xmlSpace('http://www.w3.org/2000/svg'),
						$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
						$elm$svg$Svg$Attributes$width('24'),
						$elm$svg$Svg$Attributes$height('24')
					])),
			A2(
				$elm$core$List$map,
				function (path_attribute) {
					return A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[path_attribute, style]),
						_List_Nil);
				},
				d_attributes));
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $author$project$Icons$people_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10'),
		$elm$svg$Svg$Attributes$d('M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0')
	]);
var $author$project$Icons$people = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['grinning', 'grin', 'joy', 'rolling_on_the_floor_laughing', 'smiley', 'smile', 'sweat_smile', 'laughing', 'wink', 'blush', 'yum', 'sunglasses', 'heart_eyes', 'kissing_heart', 'kissing', 'kissing_smiling_eyes', 'kissing_closed_eyes', 'relaxed', 'slightly_smiling_face', 'hugging_face', 'star-struck', 'thinking_face', 'face_with_raised_eyebrow', 'neutral_face', 'expressionless', 'no_mouth', 'face_with_rolling_eyes', 'smirk', 'persevere', 'disappointed_relieved', 'open_mouth', 'zipper_mouth_face', 'hushed', 'sleepy', 'tired_face', 'sleeping', 'relieved', 'stuck_out_tongue', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed_eyes', 'drooling_face', 'unamused', 'sweat', 'pensive', 'confused', 'upside_down_face', 'money_mouth_face', 'astonished', 'white_frowning_face', 'slightly_frowning_face', 'confounded', 'disappointed', 'worried', 'triumph', 'cry', 'sob', 'frowning', 'anguished', 'fearful', 'weary', 'exploding_head', 'grimacing', 'cold_sweat', 'scream', 'flushed', 'zany_face', 'dizzy_face', 'rage', 'angry', 'face_with_symbols_on_mouth', 'mask', 'face_with_thermometer', 'face_with_head_bandage', 'nauseated_face', 'face_vomiting', 'sneezing_face', 'innocent', 'face_with_cowboy_hat', 'clown_face', 'lying_face', 'shushing_face', 'face_with_hand_over_mouth', 'face_with_monocle', 'nerd_face', 'smiling_imp', 'imp', 'japanese_ogre', 'japanese_goblin', 'skull', 'skull_and_crossbones', 'ghost', 'alien', 'space_invader', 'robot_face', 'hankey', 'smiley_cat', 'smile_cat', 'joy_cat', 'heart_eyes_cat', 'smirk_cat', 'kissing_cat', 'scream_cat', 'crying_cat_face', 'pouting_cat', 'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'baby', 'child', 'boy', 'girl', 'adult', 'man', 'woman', 'older_adult', 'older_man', 'older_woman', 'male-doctor', 'female-doctor', 'male-student', 'female-student', 'male-teacher', 'female-teacher', 'male-judge', 'female-judge', 'male-farmer', 'female-farmer', 'male-cook', 'female-cook', 'male-mechanic', 'female-mechanic', 'male-factory-worker', 'female-factory-worker', 'male-office-worker', 'female-office-worker', 'male-scientist', 'female-scientist', 'male-technologist', 'female-technologist', 'male-singer', 'female-singer', 'male-artist', 'female-artist', 'male-pilot', 'female-pilot', 'male-astronaut', 'female-astronaut', 'male-firefighter', 'female-firefighter', 'cop', 'male-police-officer', 'female-police-officer', 'sleuth_or_spy', 'male-detective', 'female-detective', 'guardsman', 'male-guard', 'female-guard', 'construction_worker', 'male-construction-worker', 'female-construction-worker', 'prince', 'princess', 'man_with_turban', 'man-wearing-turban', 'woman-wearing-turban', 'man_with_gua_pi_mao', 'person_with_headscarf', 'bearded_person', 'person_with_blond_hair', 'blond-haired-man', 'blond-haired-woman', 'man_in_tuxedo', 'bride_with_veil', 'pregnant_woman', 'breast-feeding', 'angel', 'santa', 'mrs_claus', 'mage', 'female_mage', 'male_mage', 'fairy', 'female_fairy', 'male_fairy', 'vampire', 'female_vampire', 'male_vampire', 'merperson', 'mermaid', 'merman', 'elf', 'female_elf', 'male_elf', 'genie', 'female_genie', 'male_genie', 'zombie', 'female_zombie', 'male_zombie', 'person_frowning', 'man-frowning', 'woman-frowning', 'person_with_pouting_face', 'man-pouting', 'woman-pouting', 'no_good', 'man-gesturing-no', 'woman-gesturing-no', 'ok_woman', 'man-gesturing-ok', 'woman-gesturing-ok', 'information_desk_person', 'man-tipping-hand', 'woman-tipping-hand', 'raising_hand', 'man-raising-hand', 'woman-raising-hand', 'bow', 'man-bowing', 'woman-bowing', 'face_palm', 'man-facepalming', 'woman-facepalming', 'shrug', 'man-shrugging', 'woman-shrugging', 'massage', 'man-getting-massage', 'woman-getting-massage', 'haircut', 'man-getting-haircut', 'woman-getting-haircut', 'walking', 'man-walking', 'woman-walking', 'runner', 'man-running', 'woman-running', 'dancer', 'man_dancing', 'dancers', 'man-with-bunny-ears-partying', 'woman-with-bunny-ears-partying', 'person_in_steamy_room', 'woman_in_steamy_room', 'man_in_steamy_room', 'person_climbing', 'woman_climbing', 'man_climbing', 'person_in_lotus_position', 'woman_in_lotus_position', 'man_in_lotus_position', 'bath', 'sleeping_accommodation', 'man_in_business_suit_levitating', 'speaking_head_in_silhouette', 'bust_in_silhouette', 'busts_in_silhouette', 'fencer', 'horse_racing', 'skier', 'snowboarder', 'golfer', 'man-golfing', 'woman-golfing', 'surfer', 'man-surfing', 'woman-surfing', 'rowboat', 'man-rowing-boat', 'woman-rowing-boat', 'swimmer', 'man-swimming', 'woman-swimming', 'person_with_ball', 'man-bouncing-ball', 'woman-bouncing-ball', 'weight_lifter', 'man-lifting-weights', 'woman-lifting-weights', 'bicyclist', 'man-biking', 'woman-biking', 'mountain_bicyclist', 'man-mountain-biking', 'woman-mountain-biking', 'racing_car', 'racing_motorcycle', 'person_doing_cartwheel', 'man-cartwheeling', 'woman-cartwheeling', 'wrestlers', 'man-wrestling', 'woman-wrestling', 'water_polo', 'man-playing-water-polo', 'woman-playing-water-polo', 'handball', 'man-playing-handball', 'woman-playing-handball', 'juggling', 'man-juggling', 'woman-juggling', 'couple', 'two_men_holding_hands', 'two_women_holding_hands', 'couplekiss', 'woman-kiss-man', 'man-kiss-man', 'woman-kiss-woman', 'couple_with_heart', 'woman-heart-man', 'man-heart-man', 'woman-heart-woman', 'family', 'man-woman-boy', 'man-woman-girl', 'man-woman-girl-boy', 'man-woman-boy-boy', 'man-woman-girl-girl', 'man-man-boy', 'man-man-girl', 'man-man-girl-boy', 'man-man-boy-boy', 'man-man-girl-girl', 'woman-woman-boy', 'woman-woman-girl', 'woman-woman-girl-boy', 'woman-woman-boy-boy', 'woman-woman-girl-girl', 'man-boy', 'man-boy-boy', 'man-girl', 'man-girl-boy', 'man-girl-girl', 'woman-boy', 'woman-boy-boy', 'woman-girl', 'woman-girl-boy', 'woman-girl-girl', 'selfie', 'muscle', 'point_left', 'point_right', 'point_up', 'point_up_2', 'middle_finger', 'point_down', 'v', 'crossed_fingers', 'spock-hand', 'the_horns', 'call_me_hand', 'raised_hand_with_fingers_splayed', 'hand', 'ok_hand', '+1', '-1', 'fist', 'facepunch', 'left-facing_fist', 'right-facing_fist', 'raised_back_of_hand', 'wave', 'i_love_you_hand_sign', 'writing_hand', 'clap', 'open_hands', 'raised_hands', 'palms_up_together', 'pray', 'handshake', 'nail_care', 'ear', 'nose', 'footprints', 'eyes', 'eye', 'eye-in-speech-bubble', 'brain', 'tongue', 'lips', 'kiss', 'cupid', 'heart', 'heartbeat', 'broken_heart', 'two_hearts', 'sparkling_heart', 'heartpulse', 'blue_heart', 'green_heart', 'yellow_heart', 'orange_heart', 'purple_heart', 'black_heart', 'gift_heart', 'revolving_hearts', 'heart_decoration', 'heavy_heart_exclamation_mark_ornament', 'love_letter', 'zzz', 'anger', 'bomb', 'boom', 'sweat_drops', 'dash', 'dizzy', 'speech_balloon', 'left_speech_bubble', 'right_anger_bubble', 'thought_balloon', 'hole', 'eyeglasses', 'dark_sunglasses', 'necktie', 'shirt', 'jeans', 'scarf', 'gloves', 'coat', 'socks', 'dress', 'kimono', 'bikini', 'womans_clothes', 'purse', 'handbag', 'pouch', 'shopping_bags', 'school_satchel', 'mans_shoe', 'athletic_shoe', 'high_heel', 'sandal', 'boot', 'crown', 'womans_hat', 'tophat', 'mortar_board', 'billed_cap', 'helmet_with_white_cross', 'prayer_beads', 'lipstick', 'ring', 'gem']),
		id: 'people',
		name: 'Smileys & People'
	},
	$author$project$Icons$helperFun($author$project$Icons$people_path));
var $author$project$EmojiPicker$EmojiPicker$init = function (config) {
	return {activeCategory: $author$project$Icons$people.a, closeOnSelect: config.closeOnSelect, hidden: true, offsetX: config.offsetX, offsetY: config.offsetY, skinColor: 'none'};
};
var $author$project$PlayingScreen$initEmojiPicker = $author$project$EmojiPicker$EmojiPicker$init(
	{closeOnSelect: false, offsetX: 0, offsetY: 0});
var $author$project$PlayingScreen$init = F3(
	function (credentials, game, link) {
		return {
			credentials: credentials,
			emojiPicker: $author$project$PlayingScreen$initEmojiPicker,
			game: game,
			link: link,
			phase: A3($author$project$PlayingScreen$currentScreen, $author$project$PlayingScreen$Wait, game, credentials)
		};
	});
var $author$project$Emojigame$join = F2(
	function (_v0, _v1) {
		var roomId = _v0.a;
		var playerName = _v1.a;
		return $author$project$Emojigame$sendMessage('join ' + (roomId + (' ' + playerName)));
	});
var $elm$core$Debug$log = _Debug_log;
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Emojigame$makeLink = function (url) {
	return $elm$url$Url$toString(url);
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $author$project$Emojigame$PlayingMsg = function (a) {
	return {$: 'PlayingMsg', a: a};
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Emojigame$mapPlayingUpdate = function (_v0) {
	var m = _v0.a;
	var c = _v0.b;
	var wsm = _v0.c;
	var wsCmd = function () {
		if (wsm.$ === 'Just') {
			var cmdStr = wsm.a.a;
			return $author$project$Emojigame$sendMessage(cmdStr);
		} else {
			return $elm$core$Platform$Cmd$none;
		}
	}();
	return _Utils_Tuple2(
		$author$project$Emojigame$Playing(m),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($elm$core$Platform$Cmd$map, $author$project$Emojigame$PlayingMsg, c),
					wsCmd
				])));
};
var $elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var $author$project$Emojigame$credentialsSaver = _Platform_outgoingPort('credentialsSaver', $elm$json$Json$Encode$string);
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Credentials$encoder = function (credentials) {
	var _v0 = credentials.secret;
	var secret = _v0.a;
	var _v1 = credentials.roomId;
	var roomId = _v1.a;
	var _v2 = credentials.playerName;
	var playerName = _v2.a;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'roomId',
				$elm$json$Json$Encode$string(roomId)),
				_Utils_Tuple2(
				'playerName',
				$elm$json$Json$Encode$string(playerName)),
				_Utils_Tuple2(
				'secret',
				$elm$json$Json$Encode$string(secret))
			]));
};
var $author$project$Emojigame$saveCredentials = function (credentials) {
	return $author$project$Emojigame$credentialsSaver(
		A2(
			$elm$json$Json$Encode$encode,
			1,
			$author$project$Credentials$encoder(credentials)));
};
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$PlayingScreen$ConfirmKick = function (a) {
	return {$: 'ConfirmKick', a: a};
};
var $author$project$PlayingScreen$EmojiMsg = function (a) {
	return {$: 'EmojiMsg', a: a};
};
var $author$project$PlayingScreen$WsCmd = function (a) {
	return {$: 'WsCmd', a: a};
};
var $author$project$PlayingScreen$sendMessage = A2($elm$core$Basics$composeL, $elm$core$Maybe$Just, $author$project$PlayingScreen$WsCmd);
var $elm$core$Basics$not = _Basics_not;
var $author$project$EmojiPicker$EmojiPicker$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'Toggle':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{hidden: !model.hidden}),
					$elm$core$Platform$Cmd$none);
			case 'ChooseSkinColor':
				var s = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{skinColor: s}),
					$elm$core$Platform$Cmd$none);
			case 'SelectCategory':
				var cat = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{activeCategory: cat}),
					$elm$core$Platform$Cmd$none);
			default:
				var s = msg.a;
				var newModel = model.closeOnSelect ? _Utils_update(
					model,
					{hidden: !model.hidden}) : model;
				return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$PlayingScreen$updateGame = F2(
	function (model, game) {
		return _Utils_update(
			model,
			{
				game: game,
				phase: A2(
					$elm$core$Debug$log,
					'phase: ',
					A3($author$project$PlayingScreen$currentScreen, model.phase, game, model.credentials))
			});
	});
var $author$project$PlayingScreen$update = F2(
	function (model, msg) {
		var _v0 = _Utils_Tuple2(msg, model.phase);
		_v0$8:
		while (true) {
			switch (_v0.a.$) {
				case 'UpdateGame':
					var game = _v0.a.a;
					return _Utils_Tuple3(
						A2($author$project$PlayingScreen$updateGame, model, game),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Nothing);
				case 'UpdateSubmission':
					if (_v0.b.$ === 'Write') {
						var submission = _v0.a.a;
						return _Utils_Tuple3(
							_Utils_update(
								model,
								{
									phase: $author$project$PlayingScreen$Write(submission)
								}),
							$elm$core$Platform$Cmd$none,
							$elm$core$Maybe$Nothing);
					} else {
						break _v0$8;
					}
				case 'Submit':
					if (_v0.b.$ === 'Write') {
						var _v1 = _v0.a;
						var submission = _v0.b.a;
						return _Utils_Tuple3(
							_Utils_update(
								model,
								{phase: $author$project$PlayingScreen$Wait}),
							$elm$core$Platform$Cmd$none,
							$author$project$PlayingScreen$sendMessage('submit ' + submission));
					} else {
						break _v0$8;
					}
				case 'FinishTurn':
					if (_v0.b.$ === 'Guess') {
						var finishingVote = _v0.a.a;
						var _v2 = _v0.b;
						var args = function () {
							if (finishingVote.$ === 'Nope') {
								return '';
							} else {
								var playerName = finishingVote.a;
								return ' ' + playerName;
							}
						}();
						return _Utils_Tuple3(
							model,
							$elm$core$Platform$Cmd$none,
							$author$project$PlayingScreen$sendMessage('finish' + args));
					} else {
						break _v0$8;
					}
				case 'EmojiMsg':
					var subMsg = _v0.a.a;
					var phase = _v0.b;
					switch (subMsg.$) {
						case 'Select':
							var s = subMsg.a;
							if (phase.$ === 'Write') {
								var submission = phase.a;
								return _Utils_Tuple3(
									_Utils_update(
										model,
										{
											phase: $author$project$PlayingScreen$Write(
												_Utils_ap(submission, s))
										}),
									$elm$core$Platform$Cmd$none,
									$elm$core$Maybe$Nothing);
							} else {
								return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
							}
						case 'Toggle':
							return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
						default:
							var _v6 = A2($author$project$EmojiPicker$EmojiPicker$update, subMsg, model.emojiPicker);
							var m = _v6.a;
							var c = _v6.b;
							return _Utils_Tuple3(
								_Utils_update(
									model,
									{emojiPicker: m}),
								A2($elm$core$Platform$Cmd$map, $author$project$PlayingScreen$EmojiMsg, c),
								$elm$core$Maybe$Nothing);
					}
				case 'KickPlayer':
					var player = _v0.a.a;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{
								phase: $author$project$PlayingScreen$ConfirmKick(player)
							}),
						$elm$core$Platform$Cmd$none,
						$elm$core$Maybe$Nothing);
				case 'KickPlayerConfirm':
					if (_v0.b.$ === 'ConfirmKick') {
						var confirm = _v0.a.a;
						var player = _v0.b.a;
						var _v7 = player.name;
						var playerName = _v7.a;
						return _Utils_Tuple3(
							_Utils_update(
								model,
								{
									phase: A3($author$project$PlayingScreen$currentScreen, model.phase, model.game, model.credentials)
								}),
							$elm$core$Platform$Cmd$none,
							confirm ? $author$project$PlayingScreen$sendMessage('kick ' + playerName) : $elm$core$Maybe$Nothing);
					} else {
						break _v0$8;
					}
				default:
					var _v8 = _v0.a;
					return _Utils_Tuple3(
						model,
						$elm$core$Platform$Cmd$none,
						$author$project$PlayingScreen$sendMessage('skip'));
			}
		}
		return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
	});
var $author$project$Emojigame$update = F2(
	function (msg, model) {
		var updatePage = function (page) {
			return _Utils_update(
				model,
				{page: page});
		};
		var _v0 = _Utils_Tuple2(msg, model.page);
		_v0$15:
		while (true) {
			switch (_v0.a.$) {
				case 'UrlChanged':
					var url = _v0.a.a;
					var page = _v0.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{currentUrl: url}),
						$elm$core$Platform$Cmd$none);
				case 'WritePlayerName':
					switch (_v0.b.$) {
						case 'CreatingScreen':
							var name = _v0.a.a;
							var _v4 = _v0.b;
							var settings = _v4.a;
							var playerName = _v4.b;
							return _Utils_Tuple2(
								updatePage(
									A2(
										$author$project$Emojigame$CreatingScreen,
										settings,
										$author$project$Game$PlayerName(name))),
								$elm$core$Platform$Cmd$none);
						case 'JoiningScreen':
							var name = _v0.a.a;
							var _v10 = _v0.b;
							var roomId = _v10.a;
							var playerName = _v10.b;
							return _Utils_Tuple2(
								updatePage(
									A2(
										$author$project$Emojigame$JoiningScreen,
										roomId,
										$author$project$Game$PlayerName(name))),
								$elm$core$Platform$Cmd$none);
						default:
							break _v0$15;
					}
				case 'JoinRoom':
					switch (_v0.b.$) {
						case 'CreatingScreen':
							var _v5 = _v0.a;
							var _v6 = _v0.b;
							var settings = _v6.a;
							var playerName = _v6.b;
							return _Utils_Tuple2(
								updatePage(
									A2($author$project$Emojigame$Creating, settings, playerName)),
								A2($author$project$Emojigame$createRoom, settings, playerName));
						case 'JoiningScreen':
							var _v11 = _v0.a;
							var _v12 = _v0.b;
							var roomId = _v12.a;
							var playerName = _v12.b;
							return _Utils_Tuple2(
								updatePage(
									A2($author$project$Emojigame$Joining, roomId, playerName)),
								A2($author$project$Emojigame$join, roomId, playerName));
						default:
							break _v0$15;
					}
				case 'DisconnectedWs':
					if (_v0.b.$ === 'Playing') {
						var _v16 = _v0.a;
						var playingModel = _v0.b.a;
						return _Utils_Tuple2(
							updatePage(
								$author$project$Emojigame$Disconnected(
									$author$project$Emojigame$Reconnect(playingModel.credentials))),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v0$15;
					}
				case 'ConnectedWs':
					if (_v0.b.$ === 'Disconnected') {
						switch (_v0.b.a.$) {
							case 'Create':
								var _v1 = _v0.a;
								var _v2 = _v0.b.a;
								return _Utils_Tuple2(
									updatePage(
										A2(
											$author$project$Emojigame$CreatingScreen,
											$author$project$Emojigame$defaultSettings,
											$author$project$Game$PlayerName(''))),
									$elm$core$Platform$Cmd$none);
							case 'Join':
								var _v3 = _v0.a;
								var roomId = _v0.b.a.a;
								return _Utils_Tuple2(
									updatePage(
										A2(
											$author$project$Emojigame$JoiningScreen,
											roomId,
											$author$project$Game$PlayerName(''))),
									$elm$core$Platform$Cmd$none);
							default:
								var _v17 = _v0.a;
								var credentials = _v0.b.a.a;
								return _Utils_Tuple2(
									updatePage(
										$author$project$Emojigame$Disconnected(
											$author$project$Emojigame$Reconnect(credentials))),
									$author$project$Emojigame$reconnect(credentials));
						}
					} else {
						break _v0$15;
					}
				case 'ReceiveWs':
					switch (_v0.b.$) {
						case 'Creating':
							if (_v0.a.a.$ === 'Joined') {
								var _v7 = _v0.a.a;
								var game = _v7.a;
								var secret = _v7.b;
								var _v8 = _v0.b;
								var settings = _v8.a;
								var playerName = _v8.b;
								var credentials = {playerName: playerName, roomId: game.id, secret: secret};
								var _v9 = game.id;
								var roomId = _v9.a;
								return _Utils_Tuple2(
									updatePage(
										$author$project$Emojigame$Playing(
											A3(
												$author$project$PlayingScreen$init,
												credentials,
												game,
												_Utils_ap(
													$author$project$Emojigame$makeLink(model.currentUrl),
													roomId)))),
									$elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												A2($elm$browser$Browser$Navigation$replaceUrl, model.navKey, roomId),
												$author$project$Emojigame$saveCredentials(credentials)
											])));
							} else {
								break _v0$15;
							}
						case 'Joining':
							if (_v0.a.a.$ === 'Joined') {
								var _v13 = _v0.a.a;
								var game = _v13.a;
								var secret = _v13.b;
								var _v14 = _v0.b;
								var playerName = _v14.b;
								var credentials = {playerName: playerName, roomId: game.id, secret: secret};
								return _Utils_Tuple2(
									updatePage(
										$author$project$Emojigame$Playing(
											A3(
												$author$project$PlayingScreen$init,
												credentials,
												game,
												$author$project$Emojigame$makeLink(model.currentUrl)))),
									$author$project$Emojigame$saveCredentials(credentials));
							} else {
								var _v15 = _v0.b;
								return _Utils_Tuple2(
									updatePage(model.page),
									$elm$core$Platform$Cmd$none);
							}
						case 'Disconnected':
							if ((_v0.a.a.$ === 'GameState') && (_v0.b.a.$ === 'Reconnect')) {
								var game = _v0.a.a.a;
								var credentials = _v0.b.a.a;
								return _Utils_Tuple2(
									updatePage(
										$author$project$Emojigame$Playing(
											A3(
												$author$project$PlayingScreen$init,
												credentials,
												game,
												$author$project$Emojigame$makeLink(model.currentUrl)))),
									$elm$core$Platform$Cmd$none);
							} else {
								break _v0$15;
							}
						case 'Playing':
							if (_v0.a.a.$ === 'GameState') {
								var game = _v0.a.a.a;
								var playingModel = _v0.b.a;
								return A2(
									$elm$core$Tuple$mapFirst,
									updatePage,
									$author$project$Emojigame$mapPlayingUpdate(
										A2(
											$author$project$PlayingScreen$update,
											playingModel,
											$author$project$PlayingScreen$UpdateGame(game))));
							} else {
								break _v0$15;
							}
						default:
							break _v0$15;
					}
				case 'PlayingMsg':
					if (_v0.b.$ === 'Playing') {
						var playingMsg = _v0.a.a;
						var playingModel = _v0.b.a;
						return A2(
							$elm$core$Tuple$mapFirst,
							updatePage,
							$author$project$Emojigame$mapPlayingUpdate(
								A2($author$project$PlayingScreen$update, playingModel, playingMsg)));
					} else {
						break _v0$15;
					}
				default:
					break _v0$15;
			}
		}
		var anyOther = _v0;
		return _Utils_Tuple2(
			updatePage(
				$author$project$Emojigame$Error(
					'Invalid Msg: ' + $elm$core$Debug$toString(
						A2($elm$core$Debug$log, 'msg: ', anyOther)))),
			$elm$core$Platform$Cmd$none);
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Emojigame$JoinRoom = {$: 'JoinRoom'};
var $author$project$Emojigame$WritePlayerName = function (a) {
	return {$: 'WritePlayerName', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Emojigame$viewCreating = F2(
	function (settings, _v0) {
		var playerName = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('lobby')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('playerName'),
							$elm$html$Html$Events$onInput($author$project$Emojigame$WritePlayerName),
							$elm$html$Html$Attributes$value(playerName),
							$elm$html$Html$Attributes$placeholder('Player Name')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($author$project$Emojigame$JoinRoom)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Start Game')
						]))
				]));
	});
var $author$project$Emojigame$viewDisconnected = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('Connecting to server...')
		]));
var $author$project$Emojigame$viewJoining = F2(
	function (roomId, _v0) {
		var playerName = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('lobby')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('playerName'),
							$elm$html$Html$Events$onInput($author$project$Emojigame$WritePlayerName),
							$elm$html$Html$Attributes$value(playerName),
							$elm$html$Html$Attributes$placeholder('Player Name')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($author$project$Emojigame$JoinRoom)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Join')
						]))
				]));
	});
var $author$project$Emojigame$viewLoading = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('Loading...')
		]));
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Styles$category = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'width', '100%')
	]);
var $author$project$Styles$categoryTitle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
		A2($elm$html$Html$Attributes$style, 'font-family', 'sans-serif'),
		A2($elm$html$Html$Attributes$style, 'margin', '7px 0px 0px 0px'),
		A2($elm$html$Html$Attributes$style, 'padding', '2px 6px 3px 7px'),
		A2($elm$html$Html$Attributes$style, 'color', '#555555'),
		A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(255, 255, 255)')
	]);
var $author$project$EmojiPicker$EmojiPicker$Select = function (a) {
	return {$: 'Select', a: a};
};
var $author$project$Styles$emoji = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'font-size', '27px'),
		A2($elm$html$Html$Attributes$style, 'font-family', 'apple color emoji'),
		A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
		A2($elm$html$Html$Attributes$style, 'padding', '6px 5px 3px 5px'),
		A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
		A2($elm$html$Html$Attributes$style, 'line-height', '1'),
		A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
		A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
	]);
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$EmojiPicker$EmojiPicker$selectSkinVariation = F2(
	function (color, emoji) {
		var isDictEmpty = $elm$core$Dict$isEmpty(emoji.skinVariations);
		var _v0 = _Utils_Tuple2(color, isDictEmpty);
		if (_v0.a === 'none') {
			return emoji._native;
		} else {
			if (!_v0.b) {
				var skin = _v0.a;
				return A2(
					$elm$core$Maybe$withDefault,
					emoji._native,
					A2($elm$core$Dict$get, skin, emoji.skinVariations));
			} else {
				return emoji._native;
			}
		}
	});
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$EmojiPicker$EmojiPicker$displayEmoji = F2(
	function (color, emoji) {
		var _native = A2($author$project$EmojiPicker$EmojiPicker$selectSkinVariation, color, emoji);
		return A2(
			$elm$html$Html$span,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Events$onClick(
					$author$project$EmojiPicker$EmojiPicker$Select(_native)),
				$author$project$Styles$emoji),
			_List_fromArray(
				[
					$elm$html$Html$text(_native)
				]));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$EmojiPicker$EmojiPicker$getEmojisFromList = F3(
	function (version, names, emojiDict) {
		return A2(
			$elm$core$List$filter,
			function (emoji) {
				return _Utils_cmp(emoji.version, version) < 0;
			},
			A2(
				$elm$core$List$filterMap,
				function (name) {
					return A2($elm$core$Dict$get, name, emojiDict);
				},
				names));
	});
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$EmojiPicker$EmojiPicker$displayCategory = F4(
	function (version, emojiDict, color, cat) {
		var catEmojis = A3($author$project$EmojiPicker$EmojiPicker$getEmojisFromList, version, cat.emojis, emojiDict);
		var renderedEmojis = A2(
			$elm$core$List$map,
			$author$project$EmojiPicker$EmojiPicker$displayEmoji(color),
			catEmojis);
		return A2(
			$elm$html$Html$div,
			$author$project$Styles$category,
			A2(
				$elm$core$List$cons,
				A2(
					$elm$html$Html$p,
					$author$project$Styles$categoryTitle,
					_List_fromArray(
						[
							$elm$html$Html$text(cat.name)
						])),
				renderedEmojis));
	});
var $author$project$EmojiPicker$EmojiPicker$SelectCategory = function (a) {
	return {$: 'SelectCategory', a: a};
};
var $author$project$Styles$pathActive = A2($elm$html$Html$Attributes$style, 'fill', 'rgba(0, 75, 200, 0.8)');
var $author$project$Styles$pathInactive = A2($elm$html$Html$Attributes$style, 'fill', 'rgba(0, 0, 0, 0.5)');
var $author$project$EmojiPicker$EmojiPicker$displayCategoryIcon = F2(
	function (activeCat, _v0) {
		var cat = _v0.a;
		var icon = _v0.b;
		var updatedIcon = _Utils_eq(activeCat.name, cat.name) ? icon($author$project$Styles$pathActive) : icon($author$project$Styles$pathInactive);
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(
					$author$project$EmojiPicker$EmojiPicker$SelectCategory(cat))
				]),
			_List_fromArray(
				[updatedIcon]));
	});
var $author$project$Emojis$emojiDict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'100',
			{
				keywords: _List_fromArray(
					['Hundred Points Symbol', 'score', 'perfect', 'numbers', 'century', 'exam', 'quiz', 'test', 'pass', 'hundred']),
				name: 'Hundred Points Symbol',
				_native: '💯',
				nativeNonQual: '💯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'1234',
			{
				keywords: _List_fromArray(
					['Input Symbol for Numbers', 'numbers', 'blue-square']),
				name: 'Input Symbol for Numbers',
				_native: '🔢',
				nativeNonQual: '🔢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'monkey_face',
			{
				keywords: _List_fromArray(
					['Monkey Face', 'animal', 'nature', 'circus']),
				name: 'Monkey Face',
				_native: '🐵',
				nativeNonQual: '🐵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'grinning',
			{
				keywords: _List_fromArray(
					['Grinning Face', 'face', 'smile', 'happy', 'joy', ':D', 'grin']),
				name: 'Grinning Face',
				_native: '😀',
				nativeNonQual: '😀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'earth_africa',
			{
				keywords: _List_fromArray(
					['Earth Globe Europe-Africa', 'globe', 'world', 'international']),
				name: 'Earth Globe Europe-Africa',
				_native: '🌍',
				nativeNonQual: '🌍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'checkered_flag',
			{
				keywords: _List_fromArray(
					['Chequered Flag', 'contest', 'finishline', 'race', 'gokart']),
				name: 'Chequered Flag',
				_native: '🏁',
				nativeNonQual: '🏁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mute',
			{
				keywords: _List_fromArray(
					['Speaker with Cancellation Stroke', 'sound', 'volume', 'silence', 'quiet']),
				name: 'Speaker with Cancellation Stroke',
				_native: '🔇',
				nativeNonQual: '🔇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'jack_o_lantern',
			{
				keywords: _List_fromArray(
					['Jack-O-Lantern', 'halloween', 'light', 'pumpkin', 'creepy', 'fall']),
				name: 'Jack-O-Lantern',
				_native: '🎃',
				nativeNonQual: '🎃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'atm',
			{
				keywords: _List_fromArray(
					['Automated Teller Machine', 'money', 'sales', 'cash', 'blue-square', 'payment', 'bank']),
				name: 'Automated Teller Machine',
				_native: '🏧',
				nativeNonQual: '🏧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'grapes',
			{
				keywords: _List_fromArray(
					['Grapes', 'fruit', 'food', 'wine']),
				name: 'Grapes',
				_native: '🍇',
				nativeNonQual: '🍇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'earth_americas',
			{
				keywords: _List_fromArray(
					['Earth Globe Americas', 'globe', 'world', 'USA', 'international']),
				name: 'Earth Globe Americas',
				_native: '🌎',
				nativeNonQual: '🌎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'grin',
			{
				keywords: _List_fromArray(
					['Grinning Face with Smiling Eyes', 'face', 'happy', 'smile', 'joy', 'kawaii']),
				name: 'Grinning Face with Smiling Eyes',
				_native: '😁',
				nativeNonQual: '😁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'melon',
			{
				keywords: _List_fromArray(
					['Melon', 'fruit', 'nature', 'food']),
				name: 'Melon',
				_native: '🍈',
				nativeNonQual: '🍈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'triangular_flag_on_post',
			{
				keywords: _List_fromArray(
					['Triangular Flag on Post', 'mark', 'milestone', 'place']),
				name: 'Triangular Flag on Post',
				_native: '🚩',
				nativeNonQual: '🚩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'monkey',
			{
				keywords: _List_fromArray(
					['Monkey', 'animal', 'nature', 'banana', 'circus']),
				name: 'Monkey',
				_native: '🐒',
				nativeNonQual: '🐒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'christmas_tree',
			{
				keywords: _List_fromArray(
					['Christmas Tree', 'festival', 'vacation', 'december', 'xmas', 'celebration']),
				name: 'Christmas Tree',
				_native: '🎄',
				nativeNonQual: '🎄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'put_litter_in_its_place',
			{
				keywords: _List_fromArray(
					['Put Litter in Its Place Symbol', 'blue-square', 'sign', 'human', 'info']),
				name: 'Put Litter in Its Place Symbol',
				_native: '🚮',
				nativeNonQual: '🚮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'speaker',
			{
				keywords: _List_fromArray(
					['Speaker', 'sound', 'volume', 'silence', 'broadcast']),
				name: 'Speaker',
				_native: '🔈',
				nativeNonQual: '🔈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'earth_asia',
			{
				keywords: _List_fromArray(
					['Earth Globe Asia-Australia', 'globe', 'world', 'east', 'international']),
				name: 'Earth Globe Asia-Australia',
				_native: '🌏',
				nativeNonQual: '🌏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'crossed_flags',
			{
				keywords: _List_fromArray(
					['Crossed Flags', 'japanese', 'nation', 'country', 'border']),
				name: 'Crossed Flags',
				_native: '🎌',
				nativeNonQual: '🎌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'joy',
			{
				keywords: _List_fromArray(
					['Face with Tears of Joy', 'face', 'cry', 'tears', 'weep', 'happy', 'happytears', 'haha']),
				name: 'Face with Tears of Joy',
				_native: '😂',
				nativeNonQual: '😂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sound',
			{
				keywords: _List_fromArray(
					['Speaker with One Sound Wave', 'volume', 'speaker', 'broadcast']),
				name: 'Speaker with One Sound Wave',
				_native: '🔉',
				nativeNonQual: '🔉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'watermelon',
			{
				keywords: _List_fromArray(
					['Watermelon', 'fruit', 'food', 'picnic', 'summer']),
				name: 'Watermelon',
				_native: '🍉',
				nativeNonQual: '🍉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'gorilla',
			{
				keywords: _List_fromArray(
					['Gorilla', 'animal', 'nature', 'circus']),
				name: 'Gorilla',
				_native: '\uD83E\uDD8D',
				nativeNonQual: '\uD83E\uDD8D',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'fireworks',
			{
				keywords: _List_fromArray(
					['Fireworks', 'photo', 'festival', 'carnival', 'congratulations']),
				name: 'Fireworks',
				_native: '🎆',
				nativeNonQual: '🎆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'potable_water',
			{
				keywords: _List_fromArray(
					['Potable Water Symbol', 'blue-square', 'liquid', 'restroom', 'cleaning', 'faucet']),
				name: 'Potable Water Symbol',
				_native: '🚰',
				nativeNonQual: '🚰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wheelchair',
			{
				keywords: _List_fromArray(
					['Wheelchair Symbol', 'blue-square', 'disabled', 'a11y', 'accessibility']),
				name: 'Wheelchair Symbol',
				_native: '♿',
				nativeNonQual: '♿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'rolling_on_the_floor_laughing',
			{
				keywords: _List_fromArray(
					['Rolling on the Floor Laughing']),
				name: 'Rolling on the Floor Laughing',
				_native: '\uD83E\uDD23',
				nativeNonQual: '\uD83E\uDD23',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'loud_sound',
			{
				keywords: _List_fromArray(
					['Speaker with Three Sound Waves', 'volume', 'noise', 'noisy', 'speaker', 'broadcast']),
				name: 'Speaker with Three Sound Waves',
				_native: '🔊',
				nativeNonQual: '🔊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'waving_black_flag',
			{
				keywords: _List_fromArray(
					['Waving Black Flag']),
				name: 'Waving Black Flag',
				_native: '🏴',
				nativeNonQual: '🏴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'tangerine',
			{
				keywords: _List_fromArray(
					['Tangerine', 'food', 'fruit', 'nature', 'orange']),
				name: 'Tangerine',
				_native: '🍊',
				nativeNonQual: '🍊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dog',
			{
				keywords: _List_fromArray(
					['Dog Face', 'animal', 'friend', 'nature', 'woof', 'puppy', 'pet', 'faithful']),
				name: 'Dog Face',
				_native: '🐶',
				nativeNonQual: '🐶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sparkler',
			{
				keywords: _List_fromArray(
					['Firework Sparkler', 'stars', 'night', 'shine']),
				name: 'Firework Sparkler',
				_native: '🎇',
				nativeNonQual: '🎇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'globe_with_meridians',
			{
				keywords: _List_fromArray(
					['Globe with Meridians', 'earth', 'international', 'world', 'internet', 'interweb', 'i18n']),
				name: 'Globe with Meridians',
				_native: '🌐',
				nativeNonQual: '🌐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'smiley',
			{
				keywords: _List_fromArray(
					['Smiling Face with Open Mouth', 'face', 'happy', 'joy', 'haha', ':D', ':)', 'smile', 'funny']),
				name: 'Smiling Face with Open Mouth',
				_native: '😃',
				nativeNonQual: '😃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'loudspeaker',
			{
				keywords: _List_fromArray(
					['Public Address Loudspeaker', 'volume', 'sound']),
				name: 'Public Address Loudspeaker',
				_native: '📢',
				nativeNonQual: '📢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sparkles',
			{
				keywords: _List_fromArray(
					['Sparkles', 'stars', 'shine', 'shiny', 'cool', 'awesome', 'good', 'magic']),
				name: 'Sparkles',
				_native: '✨',
				nativeNonQual: '✨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dog2',
			{
				keywords: _List_fromArray(
					['Dog', 'animal', 'nature', 'friend', 'doge', 'pet', 'faithful']),
				name: 'Dog',
				_native: '🐕',
				nativeNonQual: '🐕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'waving_white_flag',
			{
				keywords: _List_fromArray(
					['Waving White Flag']),
				name: 'Waving White Flag',
				_native: '🏳️',
				nativeNonQual: '🏳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'world_map',
			{
				keywords: _List_fromArray(
					['World Map', 'location', 'direction']),
				name: 'World Map',
				_native: '🗺️',
				nativeNonQual: '🗺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'lemon',
			{
				keywords: _List_fromArray(
					['Lemon', 'fruit', 'nature']),
				name: 'Lemon',
				_native: '🍋',
				nativeNonQual: '🍋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mens',
			{
				keywords: _List_fromArray(
					['Mens Symbol', 'toilet', 'restroom', 'wc', 'blue-square', 'gender', 'male']),
				name: 'Mens Symbol',
				_native: '🚹',
				nativeNonQual: '🚹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'womens',
			{
				keywords: _List_fromArray(
					['Womens Symbol', 'purple-square', 'woman', 'female', 'toilet', 'loo', 'restroom', 'gender']),
				name: 'Womens Symbol',
				_native: '🚺',
				nativeNonQual: '🚺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rainbow-flag',
			{
				keywords: _List_fromArray(
					['Rainbow Flag']),
				name: 'Rainbow Flag',
				_native: '🏳️\u200D🌈',
				nativeNonQual: '🏳\u200D🌈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'smile',
			{
				keywords: _List_fromArray(
					['Smiling Face with Open Mouth and Smiling Eyes', 'face', 'happy', 'joy', 'funny', 'haha', 'laugh', 'like', ':D', ':)']),
				name: 'Smiling Face with Open Mouth and Smiling Eyes',
				_native: '😄',
				nativeNonQual: '😄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'banana',
			{
				keywords: _List_fromArray(
					['Banana', 'fruit', 'food', 'monkey']),
				name: 'Banana',
				_native: '🍌',
				nativeNonQual: '🍌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mega',
			{
				keywords: _List_fromArray(
					['Cheering Megaphone', 'sound', 'speaker', 'volume']),
				name: 'Cheering Megaphone',
				_native: '📣',
				nativeNonQual: '📣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'japan',
			{
				keywords: _List_fromArray(
					['Silhouette of Japan', 'nation', 'country', 'japanese', 'asia']),
				name: 'Silhouette of Japan',
				_native: '🗾',
				nativeNonQual: '🗾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'poodle',
			{
				keywords: _List_fromArray(
					['Poodle', 'dog', 'animal', '101', 'nature', 'pet']),
				name: 'Poodle',
				_native: '🐩',
				nativeNonQual: '🐩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'balloon',
			{
				keywords: _List_fromArray(
					['Balloon', 'party', 'celebration', 'birthday', 'circus']),
				name: 'Balloon',
				_native: '🎈',
				nativeNonQual: '🎈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ac',
			{
				keywords: _List_fromArray(
					['Ascension Island Flag']),
				name: 'Ascension Island Flag',
				_native: '🇦🇨',
				nativeNonQual: '🇦🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sweat_smile',
			{
				keywords: _List_fromArray(
					['Smiling Face with Open Mouth and Cold Sweat', 'face', 'hot', 'happy', 'laugh', 'sweat', 'smile', 'relief']),
				name: 'Smiling Face with Open Mouth and Cold Sweat',
				_native: '😅',
				nativeNonQual: '😅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pineapple',
			{
				keywords: _List_fromArray(
					['Pineapple', 'fruit', 'nature', 'food']),
				name: 'Pineapple',
				_native: '🍍',
				nativeNonQual: '🍍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'restroom',
			{
				keywords: _List_fromArray(
					['Restroom', 'blue-square', 'toilet', 'refresh', 'wc', 'gender']),
				name: 'Restroom',
				_native: '🚻',
				nativeNonQual: '🚻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'postal_horn',
			{
				keywords: _List_fromArray(
					['Postal Horn', 'instrument', 'music']),
				name: 'Postal Horn',
				_native: '📯',
				nativeNonQual: '📯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wolf',
			{
				keywords: _List_fromArray(
					['Wolf Face', 'animal', 'nature', 'wild']),
				name: 'Wolf Face',
				_native: '🐺',
				nativeNonQual: '🐺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tada',
			{
				keywords: _List_fromArray(
					['Party Popper', 'party', 'congratulations', 'birthday', 'magic', 'circus', 'celebration']),
				name: 'Party Popper',
				_native: '🎉',
				nativeNonQual: '🎉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'snow_capped_mountain',
			{
				keywords: _List_fromArray(
					['Snow Capped Mountain']),
				name: 'Snow Capped Mountain',
				_native: '🏔️',
				nativeNonQual: '🏔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'laughing',
			{
				keywords: _List_fromArray(
					['Smiling Face with Open Mouth and Tightly-Closed Eyes', 'happy', 'joy', 'lol', 'satisfied', 'haha', 'face', 'glad', 'XD', 'laugh']),
				name: 'Smiling Face with Open Mouth and Tightly-Closed Eyes',
				_native: '😆',
				nativeNonQual: '😆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'apple',
			{
				keywords: _List_fromArray(
					['Red Apple', 'fruit', 'mac', 'school']),
				name: 'Red Apple',
				_native: '🍎',
				nativeNonQual: '🍎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ad',
			{
				keywords: _List_fromArray(
					['Andorra Flag']),
				name: 'Andorra Flag',
				_native: '🇦🇩',
				nativeNonQual: '🇦🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fox_face',
			{
				keywords: _List_fromArray(
					['Fox Face', 'animal', 'nature', 'face']),
				name: 'Fox Face',
				_native: '\uD83E\uDD8A',
				nativeNonQual: '\uD83E\uDD8A',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'confetti_ball',
			{
				keywords: _List_fromArray(
					['Confetti Ball', 'festival', 'party', 'birthday', 'circus']),
				name: 'Confetti Ball',
				_native: '🎊',
				nativeNonQual: '🎊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bell',
			{
				keywords: _List_fromArray(
					['Bell', 'sound', 'notification', 'christmas', 'xmas', 'chime']),
				name: 'Bell',
				_native: '🔔',
				nativeNonQual: '🔔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mountain',
			{
				keywords: _List_fromArray(
					['Mountain', 'photo', 'nature', 'environment']),
				name: 'Mountain',
				_native: '⛰️',
				nativeNonQual: '⛰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'baby_symbol',
			{
				keywords: _List_fromArray(
					['Baby Symbol', 'orange-square', 'child']),
				name: 'Baby Symbol',
				_native: '🚼',
				nativeNonQual: '🚼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wc',
			{
				keywords: _List_fromArray(
					['Water Closet', 'toilet', 'restroom', 'blue-square']),
				name: 'Water Closet',
				_native: '🚾',
				nativeNonQual: '🚾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wink',
			{
				keywords: _List_fromArray(
					['Winking Face', 'face', 'happy', 'mischievous', 'secret', ';)', 'smile', 'eye']),
				name: 'Winking Face',
				_native: '😉',
				nativeNonQual: '😉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'no_bell',
			{
				keywords: _List_fromArray(
					['Bell with Cancellation Stroke', 'sound', 'volume', 'mute', 'quiet', 'silent']),
				name: 'Bell with Cancellation Stroke',
				_native: '🔕',
				nativeNonQual: '🔕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'green_apple',
			{
				keywords: _List_fromArray(
					['Green Apple', 'fruit', 'nature']),
				name: 'Green Apple',
				_native: '🍏',
				nativeNonQual: '🍏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tanabata_tree',
			{
				keywords: _List_fromArray(
					['Tanabata Tree', 'plant', 'nature', 'branch', 'summer']),
				name: 'Tanabata Tree',
				_native: '🎋',
				nativeNonQual: '🎋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ae',
			{
				keywords: _List_fromArray(
					['United Arab Emirates Flag']),
				name: 'United Arab Emirates Flag',
				_native: '🇦🇪',
				nativeNonQual: '🇦🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'volcano',
			{
				keywords: _List_fromArray(
					['Volcano', 'photo', 'nature', 'disaster']),
				name: 'Volcano',
				_native: '🌋',
				nativeNonQual: '🌋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cat',
			{
				keywords: _List_fromArray(
					['Cat Face', 'animal', 'meow', 'nature', 'pet', 'kitten']),
				name: 'Cat Face',
				_native: '🐱',
				nativeNonQual: '🐱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-af',
			{
				keywords: _List_fromArray(
					['Afghanistan Flag']),
				name: 'Afghanistan Flag',
				_native: '🇦🇫',
				nativeNonQual: '🇦🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'musical_score',
			{
				keywords: _List_fromArray(
					['Musical Score', 'treble', 'clef', 'compose']),
				name: 'Musical Score',
				_native: '🎼',
				nativeNonQual: '🎼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'blush',
			{
				keywords: _List_fromArray(
					['Smiling Face with Smiling Eyes', 'face', 'smile', 'happy', 'flushed', 'crush', 'embarrassed', 'shy', 'joy']),
				name: 'Smiling Face with Smiling Eyes',
				_native: '😊',
				nativeNonQual: '😊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pear',
			{
				keywords: _List_fromArray(
					['Pear', 'fruit', 'nature', 'food']),
				name: 'Pear',
				_native: '🍐',
				nativeNonQual: '🍐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bamboo',
			{
				keywords: _List_fromArray(
					['Pine Decoration', 'plant', 'nature', 'vegetable', 'panda', 'pine_decoration']),
				name: 'Pine Decoration',
				_native: '🎍',
				nativeNonQual: '🎍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'passport_control',
			{
				keywords: _List_fromArray(
					['Passport Control', 'custom', 'blue-square']),
				name: 'Passport Control',
				_native: '🛂',
				nativeNonQual: '🛂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mount_fuji',
			{
				keywords: _List_fromArray(
					['Mount Fuji', 'photo', 'mountain', 'nature', 'japanese']),
				name: 'Mount Fuji',
				_native: '🗻',
				nativeNonQual: '🗻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cat2',
			{
				keywords: _List_fromArray(
					['Cat', 'animal', 'meow', 'pet', 'cats']),
				name: 'Cat',
				_native: '🐈',
				nativeNonQual: '🐈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'musical_note',
			{
				keywords: _List_fromArray(
					['Musical Note', 'score', 'tone', 'sound']),
				name: 'Musical Note',
				_native: '🎵',
				nativeNonQual: '🎵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dolls',
			{
				keywords: _List_fromArray(
					['Japanese Dolls', 'japanese', 'toy', 'kimono']),
				name: 'Japanese Dolls',
				_native: '🎎',
				nativeNonQual: '🎎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lion_face',
			{
				keywords: _List_fromArray(
					['Lion Face']),
				name: 'Lion Face',
				_native: '\uD83E\uDD81',
				nativeNonQual: '\uD83E\uDD81',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'camping',
			{
				keywords: _List_fromArray(
					['Camping', 'photo', 'outdoors', 'tent']),
				name: 'Camping',
				_native: '🏕️',
				nativeNonQual: '🏕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-ag',
			{
				keywords: _List_fromArray(
					['Antigua & Barbuda Flag']),
				name: 'Antigua & Barbuda Flag',
				_native: '🇦🇬',
				nativeNonQual: '🇦🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'customs',
			{
				keywords: _List_fromArray(
					['Customs', 'passport', 'border', 'blue-square']),
				name: 'Customs',
				_native: '🛃',
				nativeNonQual: '🛃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'yum',
			{
				keywords: _List_fromArray(
					['Face Savouring Delicious Food', 'happy', 'joy', 'tongue', 'smile', 'face', 'silly', 'yummy', 'nom', 'delicious', 'savouring']),
				name: 'Face Savouring Delicious Food',
				_native: '😋',
				nativeNonQual: '😋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'peach',
			{
				keywords: _List_fromArray(
					['Peach', 'fruit', 'nature', 'food']),
				name: 'Peach',
				_native: '🍑',
				nativeNonQual: '🍑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tiger',
			{
				keywords: _List_fromArray(
					['Tiger Face', 'animal', 'cat', 'danger', 'wild', 'nature', 'roar']),
				name: 'Tiger Face',
				_native: '🐯',
				nativeNonQual: '🐯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'notes',
			{
				keywords: _List_fromArray(
					['Multiple Musical Notes', 'music', 'score']),
				name: 'Multiple Musical Notes',
				_native: '🎶',
				nativeNonQual: '🎶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flags',
			{
				keywords: _List_fromArray(
					['Carp Streamer', 'fish', 'japanese', 'koinobori', 'carp', 'banner']),
				name: 'Carp Streamer',
				_native: '🎏',
				nativeNonQual: '🎏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'beach_with_umbrella',
			{
				keywords: _List_fromArray(
					['Beach with Umbrella']),
				name: 'Beach with Umbrella',
				_native: '🏖️',
				nativeNonQual: '🏖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'cherries',
			{
				keywords: _List_fromArray(
					['Cherries', 'food', 'fruit']),
				name: 'Cherries',
				_native: '🍒',
				nativeNonQual: '🍒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ai',
			{
				keywords: _List_fromArray(
					['Anguilla Flag']),
				name: 'Anguilla Flag',
				_native: '🇦🇮',
				nativeNonQual: '🇦🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'baggage_claim',
			{
				keywords: _List_fromArray(
					['Baggage Claim', 'blue-square', 'airport', 'transport']),
				name: 'Baggage Claim',
				_native: '🛄',
				nativeNonQual: '🛄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sunglasses',
			{
				keywords: _List_fromArray(
					['Smiling Face with Sunglasses', 'face', 'cool', 'smile', 'summer', 'beach', 'sunglass']),
				name: 'Smiling Face with Sunglasses',
				_native: '😎',
				nativeNonQual: '😎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'left_luggage',
			{
				keywords: _List_fromArray(
					['Left Luggage', 'blue-square', 'travel']),
				name: 'Left Luggage',
				_native: '🛅',
				nativeNonQual: '🛅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wind_chime',
			{
				keywords: _List_fromArray(
					['Wind Chime', 'nature', 'ding', 'spring', 'bell']),
				name: 'Wind Chime',
				_native: '🎐',
				nativeNonQual: '🎐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'strawberry',
			{
				keywords: _List_fromArray(
					['Strawberry', 'fruit', 'food', 'nature']),
				name: 'Strawberry',
				_native: '🍓',
				nativeNonQual: '🍓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'desert',
			{
				keywords: _List_fromArray(
					['Desert', 'photo', 'warm', 'saharah']),
				name: 'Desert',
				_native: '🏜️',
				nativeNonQual: '🏜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'studio_microphone',
			{
				keywords: _List_fromArray(
					['Studio Microphone', 'sing', 'recording', 'artist', 'talkshow']),
				name: 'Studio Microphone',
				_native: '🎙️',
				nativeNonQual: '🎙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-al',
			{
				keywords: _List_fromArray(
					['Albania Flag']),
				name: 'Albania Flag',
				_native: '🇦🇱',
				nativeNonQual: '🇦🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tiger2',
			{
				keywords: _List_fromArray(
					['Tiger', 'animal', 'nature', 'roar']),
				name: 'Tiger',
				_native: '🐅',
				nativeNonQual: '🐅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heart_eyes',
			{
				keywords: _List_fromArray(
					['Smiling Face with Heart-Shaped Eyes', 'face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'crush', 'heart']),
				name: 'Smiling Face with Heart-Shaped Eyes',
				_native: '😍',
				nativeNonQual: '😍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'desert_island',
			{
				keywords: _List_fromArray(
					['Desert Island', 'photo', 'tropical', 'mojito']),
				name: 'Desert Island',
				_native: '🏝️',
				nativeNonQual: '🏝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'kiwifruit',
			{
				keywords: _List_fromArray(
					['Kiwifruit']),
				name: 'Kiwifruit',
				_native: '\uD83E\uDD5D',
				nativeNonQual: '\uD83E\uDD5D',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'rice_scene',
			{
				keywords: _List_fromArray(
					['Moon Viewing Ceremony', 'photo', 'japan', 'asia', 'tsukimi']),
				name: 'Moon Viewing Ceremony',
				_native: '🎑',
				nativeNonQual: '🎑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'kissing_heart',
			{
				keywords: _List_fromArray(
					['Face Throwing a Kiss', 'face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'kiss']),
				name: 'Face Throwing a Kiss',
				_native: '😘',
				nativeNonQual: '😘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'warning',
			{
				keywords: _List_fromArray(
					['Warning Sign', 'exclamation', 'wip', 'alert', 'error', 'problem', 'issue']),
				name: 'Warning Sign',
				_native: '⚠️',
				nativeNonQual: '⚠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'flag-am',
			{
				keywords: _List_fromArray(
					['Armenia Flag']),
				name: 'Armenia Flag',
				_native: '🇦🇲',
				nativeNonQual: '🇦🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'leopard',
			{
				keywords: _List_fromArray(
					['Leopard', 'animal', 'nature']),
				name: 'Leopard',
				_native: '🐆',
				nativeNonQual: '🐆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'level_slider',
			{
				keywords: _List_fromArray(
					['Level Slider', 'scale']),
				name: 'Level Slider',
				_native: '🎚️',
				nativeNonQual: '🎚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'horse',
			{
				keywords: _List_fromArray(
					['Horse Face', 'animal', 'brown', 'nature']),
				name: 'Horse Face',
				_native: '🐴',
				nativeNonQual: '🐴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'children_crossing',
			{
				keywords: _List_fromArray(
					['Children Crossing', 'school', 'warning', 'danger', 'sign', 'driving', 'yellow-diamond']),
				name: 'Children Crossing',
				_native: '🚸',
				nativeNonQual: '🚸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ribbon',
			{
				keywords: _List_fromArray(
					['Ribbon', 'decoration', 'pink', 'girl', 'bowtie']),
				name: 'Ribbon',
				_native: '🎀',
				nativeNonQual: '🎀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'national_park',
			{
				keywords: _List_fromArray(
					['National Park', 'photo', 'environment', 'nature']),
				name: 'National Park',
				_native: '🏞️',
				nativeNonQual: '🏞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'control_knobs',
			{
				keywords: _List_fromArray(
					['Control Knobs', 'dial']),
				name: 'Control Knobs',
				_native: '🎛️',
				nativeNonQual: '🎛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'kissing',
			{
				keywords: _List_fromArray(
					['Kissing Face', 'love', 'like', 'face', '3', 'valentines', 'infatuation', 'kiss']),
				name: 'Kissing Face',
				_native: '😗',
				nativeNonQual: '😗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tomato',
			{
				keywords: _List_fromArray(
					['Tomato', 'fruit', 'vegetable', 'nature', 'food']),
				name: 'Tomato',
				_native: '🍅',
				nativeNonQual: '🍅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ao',
			{
				keywords: _List_fromArray(
					['Angola Flag']),
				name: 'Angola Flag',
				_native: '🇦🇴',
				nativeNonQual: '🇦🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stadium',
			{
				keywords: _List_fromArray(
					['Stadium', 'photo', 'place', 'sports', 'concert', 'venue']),
				name: 'Stadium',
				_native: '🏟️',
				nativeNonQual: '🏟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-aq',
			{
				keywords: _List_fromArray(
					['Antarctica Flag']),
				name: 'Antarctica Flag',
				_native: '🇦🇶',
				nativeNonQual: '🇦🇶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'gift',
			{
				keywords: _List_fromArray(
					['Wrapped Present', 'present', 'birthday', 'christmas', 'xmas']),
				name: 'Wrapped Present',
				_native: '🎁',
				nativeNonQual: '🎁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'no_entry',
			{
				keywords: _List_fromArray(
					['No Entry', 'limit', 'security', 'privacy', 'bad', 'denied', 'stop', 'circle']),
				name: 'No Entry',
				_native: '⛔',
				nativeNonQual: '⛔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'kissing_smiling_eyes',
			{
				keywords: _List_fromArray(
					['Kissing Face with Smiling Eyes', 'face', 'affection', 'valentines', 'infatuation', 'kiss']),
				name: 'Kissing Face with Smiling Eyes',
				_native: '😙',
				nativeNonQual: '😙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'coconut',
			{
				keywords: _List_fromArray(
					['Coconut']),
				name: 'Coconut',
				_native: '\uD83E\uDD65',
				nativeNonQual: '\uD83E\uDD65',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'racehorse',
			{
				keywords: _List_fromArray(
					['Horse', 'animal', 'gamble', 'luck']),
				name: 'Horse',
				_native: '🐎',
				nativeNonQual: '🐎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'microphone',
			{
				keywords: _List_fromArray(
					['Microphone', 'sound', 'music', 'PA', 'sing', 'talkshow']),
				name: 'Microphone',
				_native: '🎤',
				nativeNonQual: '🎤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'classical_building',
			{
				keywords: _List_fromArray(
					['Classical Building', 'art', 'culture', 'history']),
				name: 'Classical Building',
				_native: '🏛️',
				nativeNonQual: '🏛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'no_entry_sign',
			{
				keywords: _List_fromArray(
					['No Entry Sign', 'forbid', 'stop', 'limit', 'denied', 'disallow', 'circle']),
				name: 'No Entry Sign',
				_native: '🚫',
				nativeNonQual: '🚫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'reminder_ribbon',
			{
				keywords: _List_fromArray(
					['Reminder Ribbon', 'sports', 'cause', 'support', 'awareness']),
				name: 'Reminder Ribbon',
				_native: '🎗️',
				nativeNonQual: '🎗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'kissing_closed_eyes',
			{
				keywords: _List_fromArray(
					['Kissing Face with Closed Eyes', 'face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'kiss']),
				name: 'Kissing Face with Closed Eyes',
				_native: '😚',
				nativeNonQual: '😚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'unicorn_face',
			{
				keywords: _List_fromArray(
					['Unicorn Face']),
				name: 'Unicorn Face',
				_native: '\uD83E\uDD84',
				nativeNonQual: '\uD83E\uDD84',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'flag-ar',
			{
				keywords: _List_fromArray(
					['Argentina Flag']),
				name: 'Argentina Flag',
				_native: '🇦🇷',
				nativeNonQual: '🇦🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'headphones',
			{
				keywords: _List_fromArray(
					['Headphone', 'music', 'score', 'gadgets']),
				name: 'Headphone',
				_native: '🎧',
				nativeNonQual: '🎧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'avocado',
			{
				keywords: _List_fromArray(
					['Avocado', 'fruit', 'food']),
				name: 'Avocado',
				_native: '\uD83E\uDD51',
				nativeNonQual: '\uD83E\uDD51',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'relaxed',
			{
				keywords: _List_fromArray(
					['White Smiling Face', 'face', 'blush', 'massage', 'happiness']),
				name: 'White Smiling Face',
				_native: '☺️',
				nativeNonQual: '☺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'zebra_face',
			{
				keywords: _List_fromArray(
					['Zebra Face']),
				name: 'Zebra Face',
				_native: '\uD83E\uDD93',
				nativeNonQual: '\uD83E\uDD93',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'eggplant',
			{
				keywords: _List_fromArray(
					['Aubergine', 'vegetable', 'nature', 'food', 'aubergine']),
				name: 'Aubergine',
				_native: '🍆',
				nativeNonQual: '🍆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'radio',
			{
				keywords: _List_fromArray(
					['Radio', 'communication', 'music', 'podcast', 'program']),
				name: 'Radio',
				_native: '📻',
				nativeNonQual: '📻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'building_construction',
			{
				keywords: _List_fromArray(
					['Building Construction', 'wip', 'working', 'progress']),
				name: 'Building Construction',
				_native: '🏗️',
				nativeNonQual: '🏗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-as',
			{
				keywords: _List_fromArray(
					['American Samoa Flag']),
				name: 'American Samoa Flag',
				_native: '🇦🇸',
				nativeNonQual: '🇦🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'admission_tickets',
			{
				keywords: _List_fromArray(
					['Admission Tickets']),
				name: 'Admission Tickets',
				_native: '🎟️',
				nativeNonQual: '🎟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'no_bicycles',
			{
				keywords: _List_fromArray(
					['No Bicycles', 'cyclist', 'prohibited', 'circle']),
				name: 'No Bicycles',
				_native: '🚳',
				nativeNonQual: '🚳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'no_smoking',
			{
				keywords: _List_fromArray(
					['No Smoking Symbol', 'cigarette', 'blue-square', 'smell', 'smoke']),
				name: 'No Smoking Symbol',
				_native: '🚭',
				nativeNonQual: '🚭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'slightly_smiling_face',
			{
				keywords: _List_fromArray(
					['Slightly Smiling Face', 'face', 'smile']),
				name: 'Slightly Smiling Face',
				_native: '🙂',
				nativeNonQual: '🙂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-at',
			{
				keywords: _List_fromArray(
					['Austria Flag']),
				name: 'Austria Flag',
				_native: '🇦🇹',
				nativeNonQual: '🇦🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ticket',
			{
				keywords: _List_fromArray(
					['Ticket', 'event', 'concert', 'pass']),
				name: 'Ticket',
				_native: '🎫',
				nativeNonQual: '🎫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'saxophone',
			{
				keywords: _List_fromArray(
					['Saxophone', 'music', 'instrument', 'jazz', 'blues']),
				name: 'Saxophone',
				_native: '🎷',
				nativeNonQual: '🎷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'deer',
			{
				keywords: _List_fromArray(
					['Deer', 'animal', 'nature', 'horns', 'venison']),
				name: 'Deer',
				_native: '\uD83E\uDD8C',
				nativeNonQual: '\uD83E\uDD8C',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'house_buildings',
			{
				keywords: _List_fromArray(
					['House Buildings']),
				name: 'House Buildings',
				_native: '🏘️',
				nativeNonQual: '🏘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'potato',
			{
				keywords: _List_fromArray(
					['Potato', 'food', 'tuber', 'vegatable', 'starch']),
				name: 'Potato',
				_native: '\uD83E\uDD54',
				nativeNonQual: '\uD83E\uDD54',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'guitar',
			{
				keywords: _List_fromArray(
					['Guitar', 'music', 'instrument']),
				name: 'Guitar',
				_native: '🎸',
				nativeNonQual: '🎸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'carrot',
			{
				keywords: _List_fromArray(
					['Carrot', 'vegetable', 'food', 'orange']),
				name: 'Carrot',
				_native: '\uD83E\uDD55',
				nativeNonQual: '\uD83E\uDD55',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'cityscape',
			{
				keywords: _List_fromArray(
					['Cityscape', 'photo', 'night life', 'urban']),
				name: 'Cityscape',
				_native: '🏙️',
				nativeNonQual: '🏙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-au',
			{
				keywords: _List_fromArray(
					['Australia Flag']),
				name: 'Australia Flag',
				_native: '🇦🇺',
				nativeNonQual: '🇦🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'do_not_litter',
			{
				keywords: _List_fromArray(
					['Do Not Litter Symbol', 'trash', 'bin', 'garbage', 'circle']),
				name: 'Do Not Litter Symbol',
				_native: '🚯',
				nativeNonQual: '🚯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hugging_face',
			{
				keywords: _List_fromArray(
					['Hugging Face']),
				name: 'Hugging Face',
				_native: '\uD83E\uDD17',
				nativeNonQual: '\uD83E\uDD17',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'cow',
			{
				keywords: _List_fromArray(
					['Cow Face', 'beef', 'ox', 'animal', 'nature', 'moo', 'milk']),
				name: 'Cow Face',
				_native: '🐮',
				nativeNonQual: '🐮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'medal',
			{
				keywords: _List_fromArray(
					['Medal']),
				name: 'Medal',
				_native: '🎖️',
				nativeNonQual: '🎖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'musical_keyboard',
			{
				keywords: _List_fromArray(
					['Musical Keyboard', 'piano', 'instrument', 'compose']),
				name: 'Musical Keyboard',
				_native: '🎹',
				nativeNonQual: '🎹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'corn',
			{
				keywords: _List_fromArray(
					['Ear of Maize', 'food', 'vegetable', 'plant']),
				name: 'Ear of Maize',
				_native: '🌽',
				nativeNonQual: '🌽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'derelict_house_building',
			{
				keywords: _List_fromArray(
					['Derelict House Building']),
				name: 'Derelict House Building',
				_native: '🏚️',
				nativeNonQual: '🏚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'non-potable_water',
			{
				keywords: _List_fromArray(
					['Non-Potable Water Symbol', 'drink', 'faucet', 'tap', 'circle']),
				name: 'Non-Potable Water Symbol',
				_native: '🚱',
				nativeNonQual: '🚱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'trophy',
			{
				keywords: _List_fromArray(
					['Trophy', 'win', 'award', 'contest', 'place', 'ftw', 'ceremony']),
				name: 'Trophy',
				_native: '🏆',
				nativeNonQual: '🏆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-aw',
			{
				keywords: _List_fromArray(
					['Aruba Flag']),
				name: 'Aruba Flag',
				_native: '🇦🇼',
				nativeNonQual: '🇦🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'star-struck',
			{
				keywords: _List_fromArray(
					['Grinning Face with Star Eyes']),
				name: 'Grinning Face with Star Eyes',
				_native: '\uD83E\uDD29',
				nativeNonQual: '\uD83E\uDD29',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'ox',
			{
				keywords: _List_fromArray(
					['Ox', 'animal', 'cow', 'beef']),
				name: 'Ox',
				_native: '🐂',
				nativeNonQual: '🐂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'trumpet',
			{
				keywords: _List_fromArray(
					['Trumpet', 'music', 'brass']),
				name: 'Trumpet',
				_native: '🎺',
				nativeNonQual: '🎺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hot_pepper',
			{
				keywords: _List_fromArray(
					['Hot Pepper', 'food', 'spicy', 'chilli', 'chili']),
				name: 'Hot Pepper',
				_native: '🌶️',
				nativeNonQual: '🌶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'sports_medal',
			{
				keywords: _List_fromArray(
					['Sports Medal']),
				name: 'Sports Medal',
				_native: '🏅',
				nativeNonQual: '🏅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-ax',
			{
				keywords: _List_fromArray(
					['Åland Islands Flag']),
				name: 'Åland Islands Flag',
				_native: '🇦🇽',
				nativeNonQual: '🇦🇽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'water_buffalo',
			{
				keywords: _List_fromArray(
					['Water Buffalo', 'animal', 'nature', 'ox', 'cow']),
				name: 'Water Buffalo',
				_native: '🐃',
				nativeNonQual: '🐃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'no_pedestrians',
			{
				keywords: _List_fromArray(
					['No Pedestrians', 'rules', 'crossing', 'walking', 'circle']),
				name: 'No Pedestrians',
				_native: '🚷',
				nativeNonQual: '🚷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'thinking_face',
			{
				keywords: _List_fromArray(
					['Thinking Face']),
				name: 'Thinking Face',
				_native: '\uD83E\uDD14',
				nativeNonQual: '\uD83E\uDD14',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'house',
			{
				keywords: _List_fromArray(
					['House Building', 'building', 'home']),
				name: 'House Building',
				_native: '🏠',
				nativeNonQual: '🏠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'no_mobile_phones',
			{
				keywords: _List_fromArray(
					['No Mobile Phones', 'iphone', 'mute', 'circle']),
				name: 'No Mobile Phones',
				_native: '📵',
				nativeNonQual: '📵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-az',
			{
				keywords: _List_fromArray(
					['Azerbaijan Flag']),
				name: 'Azerbaijan Flag',
				_native: '🇦🇿',
				nativeNonQual: '🇦🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'first_place_medal',
			{
				keywords: _List_fromArray(
					['First Place Medal']),
				name: 'First Place Medal',
				_native: '\uD83E\uDD47',
				nativeNonQual: '\uD83E\uDD47',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'house_with_garden',
			{
				keywords: _List_fromArray(
					['House with Garden', 'home', 'plant', 'nature']),
				name: 'House with Garden',
				_native: '🏡',
				nativeNonQual: '🏡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'violin',
			{
				keywords: _List_fromArray(
					['Violin', 'music', 'instrument', 'orchestra', 'symphony']),
				name: 'Violin',
				_native: '🎻',
				nativeNonQual: '🎻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_raised_eyebrow',
			{
				keywords: _List_fromArray(
					['Face with One Eyebrow Raised']),
				name: 'Face with One Eyebrow Raised',
				_native: '\uD83E\uDD28',
				nativeNonQual: '\uD83E\uDD28',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'cucumber',
			{
				keywords: _List_fromArray(
					['Cucumber', 'fruit', 'food', 'pickle']),
				name: 'Cucumber',
				_native: '\uD83E\uDD52',
				nativeNonQual: '\uD83E\uDD52',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'cow2',
			{
				keywords: _List_fromArray(
					['Cow', 'beef', 'ox', 'animal', 'nature', 'moo', 'milk']),
				name: 'Cow',
				_native: '🐄',
				nativeNonQual: '🐄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ba',
			{
				keywords: _List_fromArray(
					['Bosnia & Herzegovina Flag']),
				name: 'Bosnia & Herzegovina Flag',
				_native: '🇧🇦',
				nativeNonQual: '🇧🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pig',
			{
				keywords: _List_fromArray(
					['Pig Face', 'animal', 'oink', 'nature']),
				name: 'Pig Face',
				_native: '🐷',
				nativeNonQual: '🐷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'drum_with_drumsticks',
			{
				keywords: _List_fromArray(
					['Drum with Drumsticks']),
				name: 'Drum with Drumsticks',
				_native: '\uD83E\uDD41',
				nativeNonQual: '\uD83E\uDD41',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'underage',
			{
				keywords: _List_fromArray(
					['No One Under Eighteen Symbol', '18', 'drink', 'pub', 'night', 'minor', 'circle']),
				name: 'No One Under Eighteen Symbol',
				_native: '🔞',
				nativeNonQual: '🔞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'broccoli',
			{
				keywords: _List_fromArray(
					['Broccoli']),
				name: 'Broccoli',
				_native: '\uD83E\uDD66',
				nativeNonQual: '\uD83E\uDD66',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'office',
			{
				keywords: _List_fromArray(
					['Office Building', 'building', 'bureau', 'work']),
				name: 'Office Building',
				_native: '🏢',
				nativeNonQual: '🏢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'second_place_medal',
			{
				keywords: _List_fromArray(
					['Second Place Medal']),
				name: 'Second Place Medal',
				_native: '\uD83E\uDD48',
				nativeNonQual: '\uD83E\uDD48',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'neutral_face',
			{
				keywords: _List_fromArray(
					['Neutral Face', 'indifference', 'meh', ':|', 'neutral']),
				name: 'Neutral Face',
				_native: '😐',
				nativeNonQual: '😐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'third_place_medal',
			{
				keywords: _List_fromArray(
					['Third Place Medal']),
				name: 'Third Place Medal',
				_native: '\uD83E\uDD49',
				nativeNonQual: '\uD83E\uDD49',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'mushroom',
			{
				keywords: _List_fromArray(
					['Mushroom', 'plant', 'vegetable']),
				name: 'Mushroom',
				_native: '🍄',
				nativeNonQual: '🍄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bb',
			{
				keywords: _List_fromArray(
					['Barbados Flag']),
				name: 'Barbados Flag',
				_native: '🇧🇧',
				nativeNonQual: '🇧🇧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'radioactive_sign',
			{
				keywords: _List_fromArray(
					['Radioactive Sign']),
				name: 'Radioactive Sign',
				_native: '☢️',
				nativeNonQual: '☢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'pig2',
			{
				keywords: _List_fromArray(
					['Pig', 'animal', 'nature']),
				name: 'Pig',
				_native: '🐖',
				nativeNonQual: '🐖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'expressionless',
			{
				keywords: _List_fromArray(
					['Expressionless Face', 'face', 'indifferent', '-_-', 'meh', 'deadpan']),
				name: 'Expressionless Face',
				_native: '😑',
				nativeNonQual: '😑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'iphone',
			{
				keywords: _List_fromArray(
					['Mobile Phone', 'technology', 'apple', 'gadgets', 'dial']),
				name: 'Mobile Phone',
				_native: '📱',
				nativeNonQual: '📱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'post_office',
			{
				keywords: _List_fromArray(
					['Japanese Post Office', 'building', 'envelope', 'communication']),
				name: 'Japanese Post Office',
				_native: '🏣',
				nativeNonQual: '🏣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'european_post_office',
			{
				keywords: _List_fromArray(
					['European Post Office', 'building', 'email']),
				name: 'European Post Office',
				_native: '🏤',
				nativeNonQual: '🏤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'soccer',
			{
				keywords: _List_fromArray(
					['Soccer Ball', 'sports', 'football']),
				name: 'Soccer Ball',
				_native: '⚽',
				nativeNonQual: '⚽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'boar',
			{
				keywords: _List_fromArray(
					['Boar', 'animal', 'nature']),
				name: 'Boar',
				_native: '🐗',
				nativeNonQual: '🐗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'peanuts',
			{
				keywords: _List_fromArray(
					['Peanuts', 'food', 'nut']),
				name: 'Peanuts',
				_native: '\uD83E\uDD5C',
				nativeNonQual: '\uD83E\uDD5C',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'calling',
			{
				keywords: _List_fromArray(
					['Mobile Phone with Rightwards Arrow at Left', 'iphone', 'incoming']),
				name: 'Mobile Phone with Rightwards Arrow at Left',
				_native: '📲',
				nativeNonQual: '📲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'biohazard_sign',
			{
				keywords: _List_fromArray(
					['Biohazard Sign']),
				name: 'Biohazard Sign',
				_native: '☣️',
				nativeNonQual: '☣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-bd',
			{
				keywords: _List_fromArray(
					['Bangladesh Flag']),
				name: 'Bangladesh Flag',
				_native: '🇧🇩',
				nativeNonQual: '🇧🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'no_mouth',
			{
				keywords: _List_fromArray(
					['Face Without Mouth', 'face', 'hellokitty']),
				name: 'Face Without Mouth',
				_native: '😶',
				nativeNonQual: '😶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_rolling_eyes',
			{
				keywords: _List_fromArray(
					['Face with Rolling Eyes']),
				name: 'Face with Rolling Eyes',
				_native: '\uD83D\uDE44',
				nativeNonQual: '\uD83D\uDE44',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'phone',
			{
				keywords: _List_fromArray(
					['Black Telephone', 'technology', 'communication', 'dial', 'telephone']),
				name: 'Black Telephone',
				_native: '☎️',
				nativeNonQual: '☎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'pig_nose',
			{
				keywords: _List_fromArray(
					['Pig Nose', 'animal', 'oink']),
				name: 'Pig Nose',
				_native: '🐽',
				nativeNonQual: '🐽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'chestnut',
			{
				keywords: _List_fromArray(
					['Chestnut', 'food', 'squirrel']),
				name: 'Chestnut',
				_native: '🌰',
				nativeNonQual: '🌰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_up',
			{
				keywords: _List_fromArray(
					['Upwards Black Arrow', 'blue-square', 'continue', 'top', 'direction']),
				name: 'Upwards Black Arrow',
				_native: '⬆️',
				nativeNonQual: '⬆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'hospital',
			{
				keywords: _List_fromArray(
					['Hospital', 'building', 'health', 'surgery', 'doctor']),
				name: 'Hospital',
				_native: '🏥',
				nativeNonQual: '🏥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-be',
			{
				keywords: _List_fromArray(
					['Belgium Flag']),
				name: 'Belgium Flag',
				_native: '🇧🇪',
				nativeNonQual: '🇧🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'baseball',
			{
				keywords: _List_fromArray(
					['Baseball', 'sports', 'balls']),
				name: 'Baseball',
				_native: '⚾',
				nativeNonQual: '⚾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'smirk',
			{
				keywords: _List_fromArray(
					['Smirking Face', 'face', 'smile', 'mean', 'prank', 'smug', 'sarcasm']),
				name: 'Smirking Face',
				_native: '😏',
				nativeNonQual: '😏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_upper_right',
			{
				keywords: _List_fromArray(
					['North East Arrow', 'blue-square', 'point', 'direction', 'diagonal', 'northeast']),
				name: 'North East Arrow',
				_native: '↗️',
				nativeNonQual: '↗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-bf',
			{
				keywords: _List_fromArray(
					['Burkina Faso Flag']),
				name: 'Burkina Faso Flag',
				_native: '🇧🇫',
				nativeNonQual: '🇧🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'basketball',
			{
				keywords: _List_fromArray(
					['Basketball and Hoop', 'sports', 'balls', 'NBA']),
				name: 'Basketball and Hoop',
				_native: '🏀',
				nativeNonQual: '🏀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ram',
			{
				keywords: _List_fromArray(
					['Ram', 'animal', 'sheep', 'nature']),
				name: 'Ram',
				_native: '🐏',
				nativeNonQual: '🐏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bank',
			{
				keywords: _List_fromArray(
					['Bank', 'building', 'money', 'sales', 'cash', 'business', 'enterprise']),
				name: 'Bank',
				_native: '🏦',
				nativeNonQual: '🏦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bread',
			{
				keywords: _List_fromArray(
					['Bread', 'food', 'wheat', 'breakfast', 'toast']),
				name: 'Bread',
				_native: '🍞',
				nativeNonQual: '🍞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'telephone_receiver',
			{
				keywords: _List_fromArray(
					['Telephone Receiver', 'technology', 'communication', 'dial']),
				name: 'Telephone Receiver',
				_native: '📞',
				nativeNonQual: '📞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'croissant',
			{
				keywords: _List_fromArray(
					['Croissant', 'food', 'bread', 'french']),
				name: 'Croissant',
				_native: '\uD83E\uDD50',
				nativeNonQual: '\uD83E\uDD50',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'pager',
			{
				keywords: _List_fromArray(
					['Pager', 'bbcall', 'oldschool', '90s']),
				name: 'Pager',
				_native: '📟',
				nativeNonQual: '📟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sheep',
			{
				keywords: _List_fromArray(
					['Sheep', 'animal', 'nature', 'wool', 'shipit']),
				name: 'Sheep',
				_native: '🐑',
				nativeNonQual: '🐑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_right',
			{
				keywords: _List_fromArray(
					['Black Rightwards Arrow', 'blue-square', 'next']),
				name: 'Black Rightwards Arrow',
				_native: '➡️',
				nativeNonQual: '➡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'persevere',
			{
				keywords: _List_fromArray(
					['Persevering Face', 'face', 'sick', 'no', 'upset', 'oops']),
				name: 'Persevering Face',
				_native: '😣',
				nativeNonQual: '😣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bg',
			{
				keywords: _List_fromArray(
					['Bulgaria Flag']),
				name: 'Bulgaria Flag',
				_native: '🇧🇬',
				nativeNonQual: '🇧🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'volleyball',
			{
				keywords: _List_fromArray(
					['Volleyball', 'sports', 'balls']),
				name: 'Volleyball',
				_native: '\uD83C\uDFD0',
				nativeNonQual: '\uD83C\uDFD0',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'hotel',
			{
				keywords: _List_fromArray(
					['Hotel', 'building', 'accomodation', 'checkin']),
				name: 'Hotel',
				_native: '🏨',
				nativeNonQual: '🏨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_lower_right',
			{
				keywords: _List_fromArray(
					['South East Arrow', 'blue-square', 'direction', 'diagonal', 'southeast']),
				name: 'South East Arrow',
				_native: '↘️',
				nativeNonQual: '↘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'goat',
			{
				keywords: _List_fromArray(
					['Goat', 'animal', 'nature']),
				name: 'Goat',
				_native: '🐐',
				nativeNonQual: '🐐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bh',
			{
				keywords: _List_fromArray(
					['Bahrain Flag']),
				name: 'Bahrain Flag',
				_native: '🇧🇭',
				nativeNonQual: '🇧🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'love_hotel',
			{
				keywords: _List_fromArray(
					['Love Hotel', 'like', 'affection', 'dating']),
				name: 'Love Hotel',
				_native: '🏩',
				nativeNonQual: '🏩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'disappointed_relieved',
			{
				keywords: _List_fromArray(
					['Disappointed but Relieved Face', 'face', 'phew', 'sweat', 'nervous']),
				name: 'Disappointed but Relieved Face',
				_native: '😥',
				nativeNonQual: '😥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'baguette_bread',
			{
				keywords: _List_fromArray(
					['Baguette Bread', 'food', 'bread', 'french']),
				name: 'Baguette Bread',
				_native: '\uD83E\uDD56',
				nativeNonQual: '\uD83E\uDD56',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'football',
			{
				keywords: _List_fromArray(
					['American Football', 'sports', 'balls', 'NFL']),
				name: 'American Football',
				_native: '🏈',
				nativeNonQual: '🏈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fax',
			{
				keywords: _List_fromArray(
					['Fax Machine', 'communication', 'technology']),
				name: 'Fax Machine',
				_native: '📠',
				nativeNonQual: '📠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'convenience_store',
			{
				keywords: _List_fromArray(
					['Convenience Store', 'building', 'shopping', 'groceries']),
				name: 'Convenience Store',
				_native: '🏪',
				nativeNonQual: '🏪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dromedary_camel',
			{
				keywords: _List_fromArray(
					['Dromedary Camel', 'animal', 'hot', 'desert', 'hump']),
				name: 'Dromedary Camel',
				_native: '🐪',
				nativeNonQual: '🐪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_down',
			{
				keywords: _List_fromArray(
					['Downwards Black Arrow', 'blue-square', 'direction', 'bottom']),
				name: 'Downwards Black Arrow',
				_native: '⬇️',
				nativeNonQual: '⬇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'battery',
			{
				keywords: _List_fromArray(
					['Battery', 'power', 'energy', 'sustain']),
				name: 'Battery',
				_native: '🔋',
				nativeNonQual: '🔋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rugby_football',
			{
				keywords: _List_fromArray(
					['Rugby Football', 'sports', 'team']),
				name: 'Rugby Football',
				_native: '🏉',
				nativeNonQual: '🏉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pretzel',
			{
				keywords: _List_fromArray(
					['Pretzel']),
				name: 'Pretzel',
				_native: '\uD83E\uDD68',
				nativeNonQual: '\uD83E\uDD68',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'open_mouth',
			{
				keywords: _List_fromArray(
					['Face with Open Mouth', 'face', 'surprise', 'impressed', 'wow', 'whoa', ':O']),
				name: 'Face with Open Mouth',
				_native: '😮',
				nativeNonQual: '😮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bi',
			{
				keywords: _List_fromArray(
					['Burundi Flag']),
				name: 'Burundi Flag',
				_native: '🇧🇮',
				nativeNonQual: '🇧🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bj',
			{
				keywords: _List_fromArray(
					['Benin Flag']),
				name: 'Benin Flag',
				_native: '🇧🇯',
				nativeNonQual: '🇧🇯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pancakes',
			{
				keywords: _List_fromArray(
					['Pancakes', 'food', 'breakfast', 'flapjacks', 'hotcakes']),
				name: 'Pancakes',
				_native: '\uD83E\uDD5E',
				nativeNonQual: '\uD83E\uDD5E',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'school',
			{
				keywords: _List_fromArray(
					['School', 'building', 'student', 'education', 'learn', 'teach']),
				name: 'School',
				_native: '🏫',
				nativeNonQual: '🏫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tennis',
			{
				keywords: _List_fromArray(
					['Tennis Racquet and Ball', 'sports', 'balls', 'green']),
				name: 'Tennis Racquet and Ball',
				_native: '🎾',
				nativeNonQual: '🎾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'zipper_mouth_face',
			{
				keywords: _List_fromArray(
					['Zipper-Mouth Face', 'face', 'sealed', 'zipper', 'secret']),
				name: 'Zipper-Mouth Face',
				_native: '\uD83E\uDD10',
				nativeNonQual: '\uD83E\uDD10',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'camel',
			{
				keywords: _List_fromArray(
					['Bactrian Camel', 'animal', 'nature', 'hot', 'desert', 'hump']),
				name: 'Bactrian Camel',
				_native: '🐫',
				nativeNonQual: '🐫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_lower_left',
			{
				keywords: _List_fromArray(
					['South West Arrow', 'blue-square', 'direction', 'diagonal', 'southwest']),
				name: 'South West Arrow',
				_native: '↙️',
				nativeNonQual: '↙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'electric_plug',
			{
				keywords: _List_fromArray(
					['Electric Plug', 'charger', 'power']),
				name: 'Electric Plug',
				_native: '🔌',
				nativeNonQual: '🔌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cheese_wedge',
			{
				keywords: _List_fromArray(
					['Cheese Wedge']),
				name: 'Cheese Wedge',
				_native: '\uD83E\uDDC0',
				nativeNonQual: '\uD83E\uDDC0',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'hushed',
			{
				keywords: _List_fromArray(
					['Hushed Face', 'face', 'woo', 'shh']),
				name: 'Hushed Face',
				_native: '😯',
				nativeNonQual: '😯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'computer',
			{
				keywords: _List_fromArray(
					['Personal Computer', 'technology', 'laptop', 'screen', 'display', 'monitor']),
				name: 'Personal Computer',
				_native: '💻',
				nativeNonQual: '💻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'giraffe_face',
			{
				keywords: _List_fromArray(
					['Giraffe Face']),
				name: 'Giraffe Face',
				_native: '\uD83E\uDD92',
				nativeNonQual: '\uD83E\uDD92',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'8ball',
			{
				keywords: _List_fromArray(
					['Billiards', 'pool', 'hobby', 'game', 'luck', 'magic']),
				name: 'Billiards',
				_native: '🎱',
				nativeNonQual: '🎱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bl',
			{
				keywords: _List_fromArray(
					['St. Barthélemy Flag']),
				name: 'St. Barthélemy Flag',
				_native: '🇧🇱',
				nativeNonQual: '🇧🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_left',
			{
				keywords: _List_fromArray(
					['Leftwards Black Arrow', 'blue-square', 'previous', 'back']),
				name: 'Leftwards Black Arrow',
				_native: '⬅️',
				nativeNonQual: '⬅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'department_store',
			{
				keywords: _List_fromArray(
					['Department Store', 'building', 'shopping', 'mall']),
				name: 'Department Store',
				_native: '🏬',
				nativeNonQual: '🏬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'meat_on_bone',
			{
				keywords: _List_fromArray(
					['Meat on Bone', 'good', 'food', 'drumstick']),
				name: 'Meat on Bone',
				_native: '🍖',
				nativeNonQual: '🍖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_upper_left',
			{
				keywords: _List_fromArray(
					['North West Arrow', 'blue-square', 'point', 'direction', 'diagonal', 'northwest']),
				name: 'North West Arrow',
				_native: '↖️',
				nativeNonQual: '↖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-bm',
			{
				keywords: _List_fromArray(
					['Bermuda Flag']),
				name: 'Bermuda Flag',
				_native: '🇧🇲',
				nativeNonQual: '🇧🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sleepy',
			{
				keywords: _List_fromArray(
					['Sleepy Face', 'face', 'tired', 'rest', 'nap']),
				name: 'Sleepy Face',
				_native: '😪',
				nativeNonQual: '😪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bowling',
			{
				keywords: _List_fromArray(
					['Bowling', 'sports', 'fun', 'play']),
				name: 'Bowling',
				_native: '🎳',
				nativeNonQual: '🎳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'factory',
			{
				keywords: _List_fromArray(
					['Factory', 'building', 'industry', 'pollution', 'smoke']),
				name: 'Factory',
				_native: '🏭',
				nativeNonQual: '🏭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'desktop_computer',
			{
				keywords: _List_fromArray(
					['Desktop Computer', 'technology', 'computing', 'screen']),
				name: 'Desktop Computer',
				_native: '🖥️',
				nativeNonQual: '🖥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'elephant',
			{
				keywords: _List_fromArray(
					['Elephant', 'animal', 'nature', 'nose', 'th', 'circus']),
				name: 'Elephant',
				_native: '🐘',
				nativeNonQual: '🐘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rhinoceros',
			{
				keywords: _List_fromArray(
					['Rhinoceros', 'animal', 'nature', 'horn']),
				name: 'Rhinoceros',
				_native: '\uD83E\uDD8F',
				nativeNonQual: '\uD83E\uDD8F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'arrow_up_down',
			{
				keywords: _List_fromArray(
					['Up Down Arrow', 'blue-square', 'direction', 'way', 'vertical']),
				name: 'Up Down Arrow',
				_native: '↕️',
				nativeNonQual: '↕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'cricket_bat_and_ball',
			{
				keywords: _List_fromArray(
					['Cricket Bat and Ball']),
				name: 'Cricket Bat and Ball',
				_native: '\uD83C\uDFCF',
				nativeNonQual: '\uD83C\uDFCF',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'printer',
			{
				keywords: _List_fromArray(
					['Printer', 'paper', 'ink']),
				name: 'Printer',
				_native: '🖨️',
				nativeNonQual: '🖨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'poultry_leg',
			{
				keywords: _List_fromArray(
					['Poultry Leg', 'food', 'meat', 'drumstick', 'bird', 'chicken', 'turkey']),
				name: 'Poultry Leg',
				_native: '🍗',
				nativeNonQual: '🍗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tired_face',
			{
				keywords: _List_fromArray(
					['Tired Face', 'sick', 'whine', 'upset', 'frustrated']),
				name: 'Tired Face',
				_native: '😫',
				nativeNonQual: '😫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'japanese_castle',
			{
				keywords: _List_fromArray(
					['Japanese Castle', 'photo', 'building']),
				name: 'Japanese Castle',
				_native: '🏯',
				nativeNonQual: '🏯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bn',
			{
				keywords: _List_fromArray(
					['Brunei Flag']),
				name: 'Brunei Flag',
				_native: '🇧🇳',
				nativeNonQual: '🇧🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'field_hockey_stick_and_ball',
			{
				keywords: _List_fromArray(
					['Field Hockey Stick and Ball']),
				name: 'Field Hockey Stick and Ball',
				_native: '\uD83C\uDFD1',
				nativeNonQual: '\uD83C\uDFD1',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'sleeping',
			{
				keywords: _List_fromArray(
					['Sleeping Face', 'face', 'tired', 'sleepy', 'night', 'zzz']),
				name: 'Sleeping Face',
				_native: '😴',
				nativeNonQual: '😴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'left_right_arrow',
			{
				keywords: _List_fromArray(
					['Left Right Arrow', 'shape', 'direction', 'horizontal', 'sideways']),
				name: 'Left Right Arrow',
				_native: '↔️',
				nativeNonQual: '↔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'keyboard',
			{
				keywords: _List_fromArray(
					['Keyboard', 'technology', 'computer', 'type', 'input', 'text']),
				name: 'Keyboard',
				_native: '⌨️',
				nativeNonQual: '⌨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'european_castle',
			{
				keywords: _List_fromArray(
					['European Castle', 'building', 'royalty', 'history']),
				name: 'European Castle',
				_native: '🏰',
				nativeNonQual: '🏰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mouse',
			{
				keywords: _List_fromArray(
					['Mouse Face', 'animal', 'nature', 'cheese_wedge', 'rodent']),
				name: 'Mouse Face',
				_native: '🐭',
				nativeNonQual: '🐭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bo',
			{
				keywords: _List_fromArray(
					['Bolivia Flag']),
				name: 'Bolivia Flag',
				_native: '🇧🇴',
				nativeNonQual: '🇧🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cut_of_meat',
			{
				keywords: _List_fromArray(
					['Cut of Meat']),
				name: 'Cut of Meat',
				_native: '\uD83E\uDD69',
				nativeNonQual: '\uD83E\uDD69',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'ice_hockey_stick_and_puck',
			{
				keywords: _List_fromArray(
					['Ice Hockey Stick and Puck']),
				name: 'Ice Hockey Stick and Puck',
				_native: '\uD83C\uDFD2',
				nativeNonQual: '\uD83C\uDFD2',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'mouse2',
			{
				keywords: _List_fromArray(
					['Mouse', 'animal', 'nature', 'rodent']),
				name: 'Mouse',
				_native: '🐁',
				nativeNonQual: '🐁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'three_button_mouse',
			{
				keywords: _List_fromArray(
					['Three Button Mouse']),
				name: 'Three Button Mouse',
				_native: '🖱️',
				nativeNonQual: '🖱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'leftwards_arrow_with_hook',
			{
				keywords: _List_fromArray(
					['Leftwards Arrow with Hook', 'back', 'return', 'blue-square', 'undo', 'enter']),
				name: 'Leftwards Arrow with Hook',
				_native: '↩️',
				nativeNonQual: '↩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'bacon',
			{
				keywords: _List_fromArray(
					['Bacon', 'food', 'breakfast', 'pork', 'pig', 'meat']),
				name: 'Bacon',
				_native: '\uD83E\uDD53',
				nativeNonQual: '\uD83E\uDD53',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'relieved',
			{
				keywords: _List_fromArray(
					['Relieved Face', 'face', 'relaxed', 'phew', 'massage', 'happiness']),
				name: 'Relieved Face',
				_native: '😌',
				nativeNonQual: '😌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bq',
			{
				keywords: _List_fromArray(
					['Caribbean Netherlands Flag']),
				name: 'Caribbean Netherlands Flag',
				_native: '🇧🇶',
				nativeNonQual: '🇧🇶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wedding',
			{
				keywords: _List_fromArray(
					['Wedding', 'love', 'like', 'affection', 'couple', 'marriage', 'bride', 'groom']),
				name: 'Wedding',
				_native: '💒',
				nativeNonQual: '💒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tokyo_tower',
			{
				keywords: _List_fromArray(
					['Tokyo Tower', 'photo', 'japanese']),
				name: 'Tokyo Tower',
				_native: '🗼',
				nativeNonQual: '🗼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_right_hook',
			{
				keywords: _List_fromArray(
					['Rightwards Arrow with Hook', 'blue-square', 'return', 'rotate', 'direction']),
				name: 'Rightwards Arrow with Hook',
				_native: '↪️',
				nativeNonQual: '↪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'hamburger',
			{
				keywords: _List_fromArray(
					['Hamburger', 'meat', 'fast food', 'beef', 'cheeseburger', 'mcdonalds', 'burger king']),
				name: 'Hamburger',
				_native: '🍔',
				nativeNonQual: '🍔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stuck_out_tongue',
			{
				keywords: _List_fromArray(
					['Face with Stuck-out Tongue', 'face', 'prank', 'childish', 'playful', 'mischievous', 'smile', 'tongue']),
				name: 'Face with Stuck-out Tongue',
				_native: '😛',
				nativeNonQual: '😛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'trackball',
			{
				keywords: _List_fromArray(
					['Trackball', 'technology', 'trackpad']),
				name: 'Trackball',
				_native: '🖲️',
				nativeNonQual: '🖲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-br',
			{
				keywords: _List_fromArray(
					['Brazil Flag']),
				name: 'Brazil Flag',
				_native: '🇧🇷',
				nativeNonQual: '🇧🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rat',
			{
				keywords: _List_fromArray(
					['Rat', 'animal', 'mouse', 'rodent']),
				name: 'Rat',
				_native: '🐀',
				nativeNonQual: '🐀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'table_tennis_paddle_and_ball',
			{
				keywords: _List_fromArray(
					['Table Tennis Paddle and Ball']),
				name: 'Table Tennis Paddle and Ball',
				_native: '\uD83C\uDFD3',
				nativeNonQual: '\uD83C\uDFD3',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'minidisc',
			{
				keywords: _List_fromArray(
					['Minidisc', 'technology', 'record', 'data', 'disk', '90s']),
				name: 'Minidisc',
				_native: '💽',
				nativeNonQual: '💽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stuck_out_tongue_winking_eye',
			{
				keywords: _List_fromArray(
					['Face with Stuck-out Tongue and Winking Eye', 'face', 'prank', 'childish', 'playful', 'mischievous', 'smile', 'wink', 'tongue']),
				name: 'Face with Stuck-out Tongue and Winking Eye',
				_native: '😜',
				nativeNonQual: '😜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fries',
			{
				keywords: _List_fromArray(
					['French Fries', 'chips', 'snack', 'fast food']),
				name: 'French Fries',
				_native: '🍟',
				nativeNonQual: '🍟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'badminton_racquet_and_shuttlecock',
			{
				keywords: _List_fromArray(
					['Badminton Racquet and Shuttlecock']),
				name: 'Badminton Racquet and Shuttlecock',
				_native: '\uD83C\uDFF8',
				nativeNonQual: '\uD83C\uDFF8',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'statue_of_liberty',
			{
				keywords: _List_fromArray(
					['Statue of Liberty', 'american', 'newyork']),
				name: 'Statue of Liberty',
				_native: '🗽',
				nativeNonQual: '🗽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-bs',
			{
				keywords: _List_fromArray(
					['Bahamas Flag']),
				name: 'Bahamas Flag',
				_native: '🇧🇸',
				nativeNonQual: '🇧🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_heading_up',
			{
				keywords: _List_fromArray(
					['Arrow Pointing Rightwards Then Curving Upwards', 'blue-square', 'direction', 'top']),
				name: 'Arrow Pointing Rightwards Then Curving Upwards',
				_native: '⤴️',
				nativeNonQual: '⤴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'hamster',
			{
				keywords: _List_fromArray(
					['Hamster Face', 'animal', 'nature']),
				name: 'Hamster Face',
				_native: '🐹',
				nativeNonQual: '🐹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stuck_out_tongue_closed_eyes',
			{
				keywords: _List_fromArray(
					['Face with Stuck-out Tongue and Tightly-Closed Eyes', 'face', 'prank', 'playful', 'mischievous', 'smile', 'tongue']),
				name: 'Face with Stuck-out Tongue and Tightly-Closed Eyes',
				_native: '😝',
				nativeNonQual: '😝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pizza',
			{
				keywords: _List_fromArray(
					['Slice of Pizza', 'food', 'party']),
				name: 'Slice of Pizza',
				_native: '🍕',
				nativeNonQual: '🍕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'boxing_glove',
			{
				keywords: _List_fromArray(
					['Boxing Glove', 'sports', 'fighting']),
				name: 'Boxing Glove',
				_native: '\uD83E\uDD4A',
				nativeNonQual: '\uD83E\uDD4A',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'floppy_disk',
			{
				keywords: _List_fromArray(
					['Floppy Disk', 'oldschool', 'technology', 'save', '90s', '80s']),
				name: 'Floppy Disk',
				_native: '💾',
				nativeNonQual: '💾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_heading_down',
			{
				keywords: _List_fromArray(
					['Arrow Pointing Rightwards Then Curving Downwards', 'blue-square', 'direction', 'bottom']),
				name: 'Arrow Pointing Rightwards Then Curving Downwards',
				_native: '⤵️',
				nativeNonQual: '⤵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-bt',
			{
				keywords: _List_fromArray(
					['Bhutan Flag']),
				name: 'Bhutan Flag',
				_native: '🇧🇹',
				nativeNonQual: '🇧🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rabbit',
			{
				keywords: _List_fromArray(
					['Rabbit Face', 'animal', 'nature', 'pet', 'spring', 'magic', 'bunny']),
				name: 'Rabbit Face',
				_native: '🐰',
				nativeNonQual: '🐰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'church',
			{
				keywords: _List_fromArray(
					['Church', 'building', 'religion', 'christ']),
				name: 'Church',
				_native: '⛪',
				nativeNonQual: '⛪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'drooling_face',
			{
				keywords: _List_fromArray(
					['Drooling Face', 'face']),
				name: 'Drooling Face',
				_native: '\uD83E\uDD24',
				nativeNonQual: '\uD83E\uDD24',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-bv',
			{
				keywords: _List_fromArray(
					['Bouvet Island Flag']),
				name: 'Bouvet Island Flag',
				_native: '🇧🇻',
				nativeNonQual: '🇧🇻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mosque',
			{
				keywords: _List_fromArray(
					['Mosque', 'islam', 'worship', 'minaret']),
				name: 'Mosque',
				_native: '\uD83D\uDD4C',
				nativeNonQual: '\uD83D\uDD4C',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'rabbit2',
			{
				keywords: _List_fromArray(
					['Rabbit', 'animal', 'nature', 'pet', 'magic', 'spring']),
				name: 'Rabbit',
				_native: '🐇',
				nativeNonQual: '🐇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hotdog',
			{
				keywords: _List_fromArray(
					['Hot Dog', 'food', 'frankfurter']),
				name: 'Hot Dog',
				_native: '\uD83C\uDF2D',
				nativeNonQual: '\uD83C\uDF2D',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'martial_arts_uniform',
			{
				keywords: _List_fromArray(
					['Martial Arts Uniform', 'judo', 'karate', 'taekwondo']),
				name: 'Martial Arts Uniform',
				_native: '\uD83E\uDD4B',
				nativeNonQual: '\uD83E\uDD4B',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'arrows_clockwise',
			{
				keywords: _List_fromArray(
					['Clockwise Downwards and Upwards Open Circle Arrows', 'sync', 'cycle', 'round', 'repeat']),
				name: 'Clockwise Downwards and Upwards Open Circle Arrows',
				_native: '🔃',
				nativeNonQual: '🔃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cd',
			{
				keywords: _List_fromArray(
					['Optical Disc', 'technology', 'dvd', 'disk', 'disc', '90s']),
				name: 'Optical Disc',
				_native: '💿',
				nativeNonQual: '💿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrows_counterclockwise',
			{
				keywords: _List_fromArray(
					['Anticlockwise Downwards and Upwards Open Circle Arrows', 'blue-square', 'sync', 'cycle']),
				name: 'Anticlockwise Downwards and Upwards Open Circle Arrows',
				_native: '🔄',
				nativeNonQual: '🔄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sandwich',
			{
				keywords: _List_fromArray(
					['Sandwich']),
				name: 'Sandwich',
				_native: '\uD83E\uDD6A',
				nativeNonQual: '\uD83E\uDD6A',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'chipmunk',
			{
				keywords: _List_fromArray(
					['Chipmunk', 'animal', 'nature', 'rodent', 'squirrel']),
				name: 'Chipmunk',
				_native: '🐿️',
				nativeNonQual: '🐿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'synagogue',
			{
				keywords: _List_fromArray(
					['Synagogue', 'judaism', 'worship', 'temple', 'jewish']),
				name: 'Synagogue',
				_native: '\uD83D\uDD4D',
				nativeNonQual: '\uD83D\uDD4D',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'unamused',
			{
				keywords: _List_fromArray(
					['Unamused Face', 'indifference', 'bored', 'straight face', 'serious', 'sarcasm']),
				name: 'Unamused Face',
				_native: '😒',
				nativeNonQual: '😒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'goal_net',
			{
				keywords: _List_fromArray(
					['Goal Net', 'sports']),
				name: 'Goal Net',
				_native: '\uD83E\uDD45',
				nativeNonQual: '\uD83E\uDD45',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-bw',
			{
				keywords: _List_fromArray(
					['Botswana Flag']),
				name: 'Botswana Flag',
				_native: '🇧🇼',
				nativeNonQual: '🇧🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dvd',
			{
				keywords: _List_fromArray(
					['Dvd', 'cd', 'disk', 'disc']),
				name: 'Dvd',
				_native: '📀',
				nativeNonQual: '📀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hedgehog',
			{
				keywords: _List_fromArray(
					['Hedgehog']),
				name: 'Hedgehog',
				_native: '\uD83E\uDD94',
				nativeNonQual: '\uD83E\uDD94',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'dart',
			{
				keywords: _List_fromArray(
					['Direct Hit', 'game', 'play', 'bar']),
				name: 'Direct Hit',
				_native: '🎯',
				nativeNonQual: '🎯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'taco',
			{
				keywords: _List_fromArray(
					['Taco', 'food', 'mexican']),
				name: 'Taco',
				_native: '\uD83C\uDF2E',
				nativeNonQual: '\uD83C\uDF2E',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'back',
			{
				keywords: _List_fromArray(
					['Back with Leftwards Arrow Above', 'arrow', 'words', 'return']),
				name: 'Back with Leftwards Arrow Above',
				_native: '🔙',
				nativeNonQual: '🔙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-by',
			{
				keywords: _List_fromArray(
					['Belarus Flag']),
				name: 'Belarus Flag',
				_native: '🇧🇾',
				nativeNonQual: '🇧🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shinto_shrine',
			{
				keywords: _List_fromArray(
					['Shinto Shrine', 'temple', 'japan', 'kyoto']),
				name: 'Shinto Shrine',
				_native: '⛩️',
				nativeNonQual: '⛩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'movie_camera',
			{
				keywords: _List_fromArray(
					['Movie Camera', 'film', 'record']),
				name: 'Movie Camera',
				_native: '🎥',
				nativeNonQual: '🎥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sweat',
			{
				keywords: _List_fromArray(
					['Face with Cold Sweat', 'face', 'hot', 'sad', 'tired', 'exercise']),
				name: 'Face with Cold Sweat',
				_native: '😓',
				nativeNonQual: '😓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'burrito',
			{
				keywords: _List_fromArray(
					['Burrito', 'food', 'mexican']),
				name: 'Burrito',
				_native: '\uD83C\uDF2F',
				nativeNonQual: '\uD83C\uDF2F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'flag-bz',
			{
				keywords: _List_fromArray(
					['Belize Flag']),
				name: 'Belize Flag',
				_native: '🇧🇿',
				nativeNonQual: '🇧🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pensive',
			{
				keywords: _List_fromArray(
					['Pensive Face', 'face', 'sad', 'depressed', 'upset']),
				name: 'Pensive Face',
				_native: '😔',
				nativeNonQual: '😔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'kaaba',
			{
				keywords: _List_fromArray(
					['Kaaba', 'mecca', 'mosque', 'islam']),
				name: 'Kaaba',
				_native: '\uD83D\uDD4B',
				nativeNonQual: '\uD83D\uDD4B',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'film_frames',
			{
				keywords: _List_fromArray(
					['Film Frames']),
				name: 'Film Frames',
				_native: '🎞️',
				nativeNonQual: '🎞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'bat',
			{
				keywords: _List_fromArray(
					['Bat', 'animal', 'nature', 'blind', 'vampire']),
				name: 'Bat',
				_native: '\uD83E\uDD87',
				nativeNonQual: '\uD83E\uDD87',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'golf',
			{
				keywords: _List_fromArray(
					['Flag in Hole', 'sports', 'business', 'flag', 'hole', 'summer']),
				name: 'Flag in Hole',
				_native: '⛳',
				nativeNonQual: '⛳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'end',
			{
				keywords: _List_fromArray(
					['End with Leftwards Arrow Above', 'words', 'arrow']),
				name: 'End with Leftwards Arrow Above',
				_native: '🔚',
				nativeNonQual: '🔚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'film_projector',
			{
				keywords: _List_fromArray(
					['Film Projector', 'video', 'tape', 'record', 'movie']),
				name: 'Film Projector',
				_native: '📽️',
				nativeNonQual: '📽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'bear',
			{
				keywords: _List_fromArray(
					['Bear Face', 'animal', 'nature', 'wild']),
				name: 'Bear Face',
				_native: '🐻',
				nativeNonQual: '🐻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ice_skate',
			{
				keywords: _List_fromArray(
					['Ice Skate', 'sports']),
				name: 'Ice Skate',
				_native: '⛸️',
				nativeNonQual: '⛸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fountain',
			{
				keywords: _List_fromArray(
					['Fountain', 'photo', 'summer', 'water', 'fresh']),
				name: 'Fountain',
				_native: '⛲',
				nativeNonQual: '⛲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'confused',
			{
				keywords: _List_fromArray(
					['Confused Face', 'face', 'indifference', 'huh', 'weird', 'hmmm', ':/']),
				name: 'Confused Face',
				_native: '😕',
				nativeNonQual: '😕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ca',
			{
				keywords: _List_fromArray(
					['Canada Flag']),
				name: 'Canada Flag',
				_native: '🇨🇦',
				nativeNonQual: '🇨🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'on',
			{
				keywords: _List_fromArray(
					['On with Exclamation Mark with Left Right Arrow Above', 'arrow', 'words']),
				name: 'On with Exclamation Mark with Left Right Arrow Above',
				_native: '🔛',
				nativeNonQual: '🔛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stuffed_flatbread',
			{
				keywords: _List_fromArray(
					['Stuffed Flatbread', 'food', 'flatbread', 'stuffed', 'gyro']),
				name: 'Stuffed Flatbread',
				_native: '\uD83E\uDD59',
				nativeNonQual: '\uD83E\uDD59',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'soon',
			{
				keywords: _List_fromArray(
					['Soon with Rightwards Arrow Above', 'arrow', 'words']),
				name: 'Soon with Rightwards Arrow Above',
				_native: '🔜',
				nativeNonQual: '🔜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'upside_down_face',
			{
				keywords: _List_fromArray(
					['Upside-Down Face', 'face', 'flipped', 'silly', 'smile']),
				name: 'Upside-Down Face',
				_native: '\uD83D\uDE43',
				nativeNonQual: '\uD83D\uDE43',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'fishing_pole_and_fish',
			{
				keywords: _List_fromArray(
					['Fishing Pole and Fish', 'food', 'hobby', 'summer']),
				name: 'Fishing Pole and Fish',
				_native: '🎣',
				nativeNonQual: '🎣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tent',
			{
				keywords: _List_fromArray(
					['Tent', 'photo', 'camping', 'outdoors']),
				name: 'Tent',
				_native: '⛺',
				nativeNonQual: '⛺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clapper',
			{
				keywords: _List_fromArray(
					['Clapper Board', 'movie', 'film', 'record']),
				name: 'Clapper Board',
				_native: '🎬',
				nativeNonQual: '🎬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'egg',
			{
				keywords: _List_fromArray(
					['Egg', 'food', 'chicken', 'breakfast']),
				name: 'Egg',
				_native: '\uD83E\uDD5A',
				nativeNonQual: '\uD83E\uDD5A',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-cc',
			{
				keywords: _List_fromArray(
					['Cocos (keeling) Islands Flag']),
				name: 'Cocos (keeling) Islands Flag',
				_native: '🇨🇨',
				nativeNonQual: '🇨🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'koala',
			{
				keywords: _List_fromArray(
					['Koala', 'animal', 'nature']),
				name: 'Koala',
				_native: '🐨',
				nativeNonQual: '🐨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'foggy',
			{
				keywords: _List_fromArray(
					['Foggy', 'photo', 'mountain']),
				name: 'Foggy',
				_native: '🌁',
				nativeNonQual: '🌁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tv',
			{
				keywords: _List_fromArray(
					['Television', 'technology', 'program', 'oldschool', 'show', 'television']),
				name: 'Television',
				_native: '📺',
				nativeNonQual: '📺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'panda_face',
			{
				keywords: _List_fromArray(
					['Panda Face', 'animal', 'nature', 'panda']),
				name: 'Panda Face',
				_native: '🐼',
				nativeNonQual: '🐼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fried_egg',
			{
				keywords: _List_fromArray(
					['Cooking', 'food', 'breakfast', 'kitchen', 'egg']),
				name: 'Cooking',
				_native: '🍳',
				nativeNonQual: '🍳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'top',
			{
				keywords: _List_fromArray(
					['Top with Upwards Arrow Above', 'words', 'blue-square']),
				name: 'Top with Upwards Arrow Above',
				_native: '🔝',
				nativeNonQual: '🔝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cd',
			{
				keywords: _List_fromArray(
					['Congo - Kinshasa Flag']),
				name: 'Congo - Kinshasa Flag',
				_native: '🇨🇩',
				nativeNonQual: '🇨🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'money_mouth_face',
			{
				keywords: _List_fromArray(
					['Money-Mouth Face', 'face', 'rich', 'dollar', 'money']),
				name: 'Money-Mouth Face',
				_native: '\uD83E\uDD11',
				nativeNonQual: '\uD83E\uDD11',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'running_shirt_with_sash',
			{
				keywords: _List_fromArray(
					['Running Shirt with Sash', 'play', 'pageant']),
				name: 'Running Shirt with Sash',
				_native: '🎽',
				nativeNonQual: '🎽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'astonished',
			{
				keywords: _List_fromArray(
					['Astonished Face', 'face', 'xox', 'surprised', 'poisoned']),
				name: 'Astonished Face',
				_native: '😲',
				nativeNonQual: '😲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'feet',
			{
				keywords: _List_fromArray(
					['Paw Prints']),
				name: 'Paw Prints',
				_native: '🐾',
				nativeNonQual: '🐾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'camera',
			{
				keywords: _List_fromArray(
					['Camera', 'gadgets', 'photography']),
				name: 'Camera',
				_native: '📷',
				nativeNonQual: '📷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cf',
			{
				keywords: _List_fromArray(
					['Central African Republic Flag']),
				name: 'Central African Republic Flag',
				_native: '🇨🇫',
				nativeNonQual: '🇨🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'place_of_worship',
			{
				keywords: _List_fromArray(
					['Place of Worship', 'religion', 'church', 'temple', 'prayer']),
				name: 'Place of Worship',
				_native: '\uD83D\uDED0',
				nativeNonQual: '\uD83D\uDED0',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'night_with_stars',
			{
				keywords: _List_fromArray(
					['Night with Stars', 'evening', 'city', 'downtown']),
				name: 'Night with Stars',
				_native: '🌃',
				nativeNonQual: '🌃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ski',
			{
				keywords: _List_fromArray(
					['Ski and Ski Boot', 'sports', 'winter', 'cold', 'snow']),
				name: 'Ski and Ski Boot',
				_native: '🎿',
				nativeNonQual: '🎿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shallow_pan_of_food',
			{
				keywords: _List_fromArray(
					['Shallow Pan of Food', 'food', 'cooking', 'casserole', 'paella']),
				name: 'Shallow Pan of Food',
				_native: '\uD83E\uDD58',
				nativeNonQual: '\uD83E\uDD58',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'camera_with_flash',
			{
				keywords: _List_fromArray(
					['Camera with Flash']),
				name: 'Camera with Flash',
				_native: '📸',
				nativeNonQual: '📸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'sunrise_over_mountains',
			{
				keywords: _List_fromArray(
					['Sunrise over Mountains', 'view', 'vacation', 'photo']),
				name: 'Sunrise over Mountains',
				_native: '🌄',
				nativeNonQual: '🌄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'turkey',
			{
				keywords: _List_fromArray(
					['Turkey', 'animal', 'bird']),
				name: 'Turkey',
				_native: '\uD83E\uDD83',
				nativeNonQual: '\uD83E\uDD83',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'white_frowning_face',
			{
				keywords: _List_fromArray(
					['White Frowning Face']),
				name: 'White Frowning Face',
				_native: '☹️',
				nativeNonQual: '☹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-cg',
			{
				keywords: _List_fromArray(
					['Congo - Brazzaville Flag']),
				name: 'Congo - Brazzaville Flag',
				_native: '🇨🇬',
				nativeNonQual: '🇨🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stew',
			{
				keywords: _List_fromArray(
					['Pot of Food', 'food', 'meat', 'soup']),
				name: 'Pot of Food',
				_native: '🍲',
				nativeNonQual: '🍲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sled',
			{
				keywords: _List_fromArray(
					['Sled']),
				name: 'Sled',
				_native: '\uD83D\uDEF7',
				nativeNonQual: '\uD83D\uDEF7',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'atom_symbol',
			{
				keywords: _List_fromArray(
					['Atom Symbol', 'science', 'physics', 'chemistry']),
				name: 'Atom Symbol',
				_native: '⚛️',
				nativeNonQual: '⚛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'curling_stone',
			{
				keywords: _List_fromArray(
					['Curling Stone']),
				name: 'Curling Stone',
				_native: '\uD83E\uDD4C',
				nativeNonQual: '\uD83E\uDD4C',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'slightly_frowning_face',
			{
				keywords: _List_fromArray(
					['Slightly Frowning Face', 'face', 'frowning', 'disappointed', 'sad', 'upset']),
				name: 'Slightly Frowning Face',
				_native: '🙁',
				nativeNonQual: '🙁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'sunrise',
			{
				keywords: _List_fromArray(
					['Sunrise', 'morning', 'view', 'vacation', 'photo']),
				name: 'Sunrise',
				_native: '🌅',
				nativeNonQual: '🌅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'om_symbol',
			{
				keywords: _List_fromArray(
					['Om Symbol']),
				name: 'Om Symbol',
				_native: '🕉️',
				nativeNonQual: '🕉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'chicken',
			{
				keywords: _List_fromArray(
					['Chicken', 'animal', 'cluck', 'nature', 'bird']),
				name: 'Chicken',
				_native: '🐔',
				nativeNonQual: '🐔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bowl_with_spoon',
			{
				keywords: _List_fromArray(
					['Bowl with Spoon']),
				name: 'Bowl with Spoon',
				_native: '\uD83E\uDD63',
				nativeNonQual: '\uD83E\uDD63',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-ch',
			{
				keywords: _List_fromArray(
					['Switzerland Flag']),
				name: 'Switzerland Flag',
				_native: '🇨🇭',
				nativeNonQual: '🇨🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'video_camera',
			{
				keywords: _List_fromArray(
					['Video Camera', 'film', 'record']),
				name: 'Video Camera',
				_native: '📹',
				nativeNonQual: '📹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'video_game',
			{
				keywords: _List_fromArray(
					['Video Game', 'play', 'console', 'PS4', 'controller']),
				name: 'Video Game',
				_native: '🎮',
				nativeNonQual: '🎮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rooster',
			{
				keywords: _List_fromArray(
					['Rooster', 'animal', 'nature', 'chicken']),
				name: 'Rooster',
				_native: '🐓',
				nativeNonQual: '🐓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'vhs',
			{
				keywords: _List_fromArray(
					['Videocassette', 'record', 'video', 'oldschool', '90s', '80s']),
				name: 'Videocassette',
				_native: '📼',
				nativeNonQual: '📼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'city_sunset',
			{
				keywords: _List_fromArray(
					['Cityscape at Dusk', 'photo', 'evening', 'sky', 'buildings']),
				name: 'Cityscape at Dusk',
				_native: '🌆',
				nativeNonQual: '🌆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'confounded',
			{
				keywords: _List_fromArray(
					['Confounded Face', 'face', 'confused', 'sick', 'unwell', 'oops', ':S']),
				name: 'Confounded Face',
				_native: '😖',
				nativeNonQual: '😖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'green_salad',
			{
				keywords: _List_fromArray(
					['Green Salad', 'food', 'healthy', 'lettuce']),
				name: 'Green Salad',
				_native: '\uD83E\uDD57',
				nativeNonQual: '\uD83E\uDD57',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'star_of_david',
			{
				keywords: _List_fromArray(
					['Star of David', 'judaism']),
				name: 'Star of David',
				_native: '✡️',
				nativeNonQual: '✡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-ci',
			{
				keywords: _List_fromArray(
					['Côte D’ivoire Flag']),
				name: 'Côte D’ivoire Flag',
				_native: '🇨🇮',
				nativeNonQual: '🇨🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'popcorn',
			{
				keywords: _List_fromArray(
					['Popcorn', 'food', 'movie theater', 'films', 'snack']),
				name: 'Popcorn',
				_native: '\uD83C\uDF7F',
				nativeNonQual: '\uD83C\uDF7F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'city_sunrise',
			{
				keywords: _List_fromArray(
					['Sunset over Buildings', 'photo', 'good morning', 'dawn']),
				name: 'Sunset over Buildings',
				_native: '🌇',
				nativeNonQual: '🌇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'disappointed',
			{
				keywords: _List_fromArray(
					['Disappointed Face', 'face', 'sad', 'upset', 'depressed', ':(']),
				name: 'Disappointed Face',
				_native: '😞',
				nativeNonQual: '😞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mag',
			{
				keywords: _List_fromArray(
					['Left-Pointing Magnifying Glass', 'search', 'zoom', 'find', 'detective']),
				name: 'Left-Pointing Magnifying Glass',
				_native: '🔍',
				nativeNonQual: '🔍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hatching_chick',
			{
				keywords: _List_fromArray(
					['Hatching Chick', 'animal', 'chicken', 'egg', 'born', 'baby', 'bird']),
				name: 'Hatching Chick',
				_native: '🐣',
				nativeNonQual: '🐣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'joystick',
			{
				keywords: _List_fromArray(
					['Joystick', 'game', 'play']),
				name: 'Joystick',
				_native: '🕹️',
				nativeNonQual: '🕹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'wheel_of_dharma',
			{
				keywords: _List_fromArray(
					['Wheel of Dharma', 'hinduism', 'buddhism', 'sikhism', 'jainism']),
				name: 'Wheel of Dharma',
				_native: '☸️',
				nativeNonQual: '☸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-ck',
			{
				keywords: _List_fromArray(
					['Cook Islands Flag']),
				name: 'Cook Islands Flag',
				_native: '🇨🇰',
				nativeNonQual: '🇨🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'canned_food',
			{
				keywords: _List_fromArray(
					['Canned Food']),
				name: 'Canned Food',
				_native: '\uD83E\uDD6B',
				nativeNonQual: '\uD83E\uDD6B',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'worried',
			{
				keywords: _List_fromArray(
					['Worried Face', 'face', 'concern', 'nervous', ':(']),
				name: 'Worried Face',
				_native: '😟',
				nativeNonQual: '😟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'baby_chick',
			{
				keywords: _List_fromArray(
					['Baby Chick', 'animal', 'chicken', 'bird']),
				name: 'Baby Chick',
				_native: '🐤',
				nativeNonQual: '🐤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cl',
			{
				keywords: _List_fromArray(
					['Chile Flag']),
				name: 'Chile Flag',
				_native: '🇨🇱',
				nativeNonQual: '🇨🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'game_die',
			{
				keywords: _List_fromArray(
					['Game Die', 'dice', 'random', 'tabletop', 'play', 'luck']),
				name: 'Game Die',
				_native: '🎲',
				nativeNonQual: '🎲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mag_right',
			{
				keywords: _List_fromArray(
					['Right-Pointing Magnifying Glass', 'search', 'zoom', 'find', 'detective']),
				name: 'Right-Pointing Magnifying Glass',
				_native: '🔎',
				nativeNonQual: '🔎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'yin_yang',
			{
				keywords: _List_fromArray(
					['Yin Yang', 'balance']),
				name: 'Yin Yang',
				_native: '☯️',
				nativeNonQual: '☯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'bridge_at_night',
			{
				keywords: _List_fromArray(
					['Bridge at Night', 'photo', 'sanfrancisco']),
				name: 'Bridge at Night',
				_native: '🌉',
				nativeNonQual: '🌉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'spades',
			{
				keywords: _List_fromArray(
					['Black Spade Suit', 'poker', 'cards', 'suits', 'magic']),
				name: 'Black Spade Suit',
				_native: '♠️',
				nativeNonQual: '♠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'hatched_chick',
			{
				keywords: _List_fromArray(
					['Front-Facing Baby Chick', 'animal', 'chicken', 'baby', 'bird']),
				name: 'Front-Facing Baby Chick',
				_native: '🐥',
				nativeNonQual: '🐥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cm',
			{
				keywords: _List_fromArray(
					['Cameroon Flag']),
				name: 'Cameroon Flag',
				_native: '🇨🇲',
				nativeNonQual: '🇨🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'latin_cross',
			{
				keywords: _List_fromArray(
					['Latin Cross', 'christianity']),
				name: 'Latin Cross',
				_native: '✝️',
				nativeNonQual: '✝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'triumph',
			{
				keywords: _List_fromArray(
					['Face with Look of Triumph', 'face', 'gas', 'phew', 'proud', 'pride']),
				name: 'Face with Look of Triumph',
				_native: '😤',
				nativeNonQual: '😤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hotsprings',
			{
				keywords: _List_fromArray(
					['Hot Springs', 'bath', 'warm', 'relax']),
				name: 'Hot Springs',
				_native: '♨️',
				nativeNonQual: '♨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'bento',
			{
				keywords: _List_fromArray(
					['Bento Box', 'food', 'japanese', 'box']),
				name: 'Bento Box',
				_native: '🍱',
				nativeNonQual: '🍱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'microscope',
			{
				keywords: _List_fromArray(
					['Microscope', 'laboratory', 'experiment', 'zoomin', 'science', 'study']),
				name: 'Microscope',
				_native: '🔬',
				nativeNonQual: '🔬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cry',
			{
				keywords: _List_fromArray(
					['Crying Face', 'face', 'tears', 'sad', 'depressed', 'upset', ':\'(']),
				name: 'Crying Face',
				_native: '😢',
				nativeNonQual: '😢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bird',
			{
				keywords: _List_fromArray(
					['Bird', 'animal', 'nature', 'fly', 'tweet', 'spring']),
				name: 'Bird',
				_native: '🐦',
				nativeNonQual: '🐦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cn',
			{
				keywords: _List_fromArray(
					['China Flag', 'china', 'chinese', 'prc', 'flag', 'country', 'nation', 'banner']),
				name: 'China Flag',
				_native: '🇨🇳',
				nativeNonQual: '🇨🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'telescope',
			{
				keywords: _List_fromArray(
					['Telescope', 'stars', 'space', 'zoom', 'science', 'astronomy']),
				name: 'Telescope',
				_native: '🔭',
				nativeNonQual: '🔭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rice_cracker',
			{
				keywords: _List_fromArray(
					['Rice Cracker', 'food', 'japanese']),
				name: 'Rice Cracker',
				_native: '🍘',
				nativeNonQual: '🍘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hearts',
			{
				keywords: _List_fromArray(
					['Black Heart Suit', 'poker', 'cards', 'magic', 'suits']),
				name: 'Black Heart Suit',
				_native: '♥️',
				nativeNonQual: '♥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'orthodox_cross',
			{
				keywords: _List_fromArray(
					['Orthodox Cross', 'suppedaneum', 'religion']),
				name: 'Orthodox Cross',
				_native: '☦️',
				nativeNonQual: '☦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'milky_way',
			{
				keywords: _List_fromArray(
					['Milky Way', 'photo', 'space', 'stars']),
				name: 'Milky Way',
				_native: '🌌',
				nativeNonQual: '🌌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rice_ball',
			{
				keywords: _List_fromArray(
					['Rice Ball', 'food', 'japanese']),
				name: 'Rice Ball',
				_native: '🍙',
				nativeNonQual: '🍙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'satellite_antenna',
			{
				keywords: _List_fromArray(
					['Satellite Antenna']),
				name: 'Satellite Antenna',
				_native: '📡',
				nativeNonQual: '📡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-co',
			{
				keywords: _List_fromArray(
					['Colombia Flag']),
				name: 'Colombia Flag',
				_native: '🇨🇴',
				nativeNonQual: '🇨🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'carousel_horse',
			{
				keywords: _List_fromArray(
					['Carousel Horse', 'photo', 'carnival']),
				name: 'Carousel Horse',
				_native: '🎠',
				nativeNonQual: '🎠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sob',
			{
				keywords: _List_fromArray(
					['Loudly Crying Face', 'face', 'cry', 'tears', 'sad', 'upset', 'depressed']),
				name: 'Loudly Crying Face',
				_native: '😭',
				nativeNonQual: '😭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'diamonds',
			{
				keywords: _List_fromArray(
					['Black Diamond Suit', 'poker', 'cards', 'magic', 'suits']),
				name: 'Black Diamond Suit',
				_native: '♦️',
				nativeNonQual: '♦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'star_and_crescent',
			{
				keywords: _List_fromArray(
					['Star and Crescent', 'islam']),
				name: 'Star and Crescent',
				_native: '☪️',
				nativeNonQual: '☪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'penguin',
			{
				keywords: _List_fromArray(
					['Penguin', 'animal', 'nature']),
				name: 'Penguin',
				_native: '🐧',
				nativeNonQual: '🐧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dove_of_peace',
			{
				keywords: _List_fromArray(
					['Dove of Peace']),
				name: 'Dove of Peace',
				_native: '🕊️',
				nativeNonQual: '🕊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-cp',
			{
				keywords: _List_fromArray(
					['Clipperton Island Flag']),
				name: 'Clipperton Island Flag',
				_native: '🇨🇵',
				nativeNonQual: '🇨🇵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ferris_wheel',
			{
				keywords: _List_fromArray(
					['Ferris Wheel', 'photo', 'carnival', 'londoneye']),
				name: 'Ferris Wheel',
				_native: '🎡',
				nativeNonQual: '🎡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clubs',
			{
				keywords: _List_fromArray(
					['Black Club Suit', 'poker', 'cards', 'magic', 'suits']),
				name: 'Black Club Suit',
				_native: '♣️',
				nativeNonQual: '♣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'peace_symbol',
			{
				keywords: _List_fromArray(
					['Peace Symbol', 'hippie']),
				name: 'Peace Symbol',
				_native: '☮️',
				nativeNonQual: '☮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'candle',
			{
				keywords: _List_fromArray(
					['Candle', 'fire', 'wax']),
				name: 'Candle',
				_native: '🕯️',
				nativeNonQual: '🕯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'frowning',
			{
				keywords: _List_fromArray(
					['Frowning Face with Open Mouth', 'face', 'aw', 'what']),
				name: 'Frowning Face with Open Mouth',
				_native: '😦',
				nativeNonQual: '😦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rice',
			{
				keywords: _List_fromArray(
					['Cooked Rice', 'food', 'china', 'asian']),
				name: 'Cooked Rice',
				_native: '🍚',
				nativeNonQual: '🍚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cr',
			{
				keywords: _List_fromArray(
					['Costa Rica Flag']),
				name: 'Costa Rica Flag',
				_native: '🇨🇷',
				nativeNonQual: '🇨🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'roller_coaster',
			{
				keywords: _List_fromArray(
					['Roller Coaster', 'carnival', 'playground', 'photo', 'fun']),
				name: 'Roller Coaster',
				_native: '🎢',
				nativeNonQual: '🎢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'menorah_with_nine_branches',
			{
				keywords: _List_fromArray(
					['Menorah with Nine Branches']),
				name: 'Menorah with Nine Branches',
				_native: '\uD83D\uDD4E',
				nativeNonQual: '\uD83D\uDD4E',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'black_joker',
			{
				keywords: _List_fromArray(
					['Playing Card Black Joker', 'poker', 'cards', 'game', 'play', 'magic']),
				name: 'Playing Card Black Joker',
				_native: '🃏',
				nativeNonQual: '🃏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'eagle',
			{
				keywords: _List_fromArray(
					['Eagle', 'animal', 'nature', 'bird']),
				name: 'Eagle',
				_native: '\uD83E\uDD85',
				nativeNonQual: '\uD83E\uDD85',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'curry',
			{
				keywords: _List_fromArray(
					['Curry and Rice', 'food', 'spicy', 'hot', 'indian']),
				name: 'Curry and Rice',
				_native: '🍛',
				nativeNonQual: '🍛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bulb',
			{
				keywords: _List_fromArray(
					['Electric Light Bulb', 'light', 'electricity', 'idea']),
				name: 'Electric Light Bulb',
				_native: '💡',
				nativeNonQual: '💡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'anguished',
			{
				keywords: _List_fromArray(
					['Anguished Face', 'face', 'stunned', 'nervous']),
				name: 'Anguished Face',
				_native: '😧',
				nativeNonQual: '😧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cu',
			{
				keywords: _List_fromArray(
					['Cuba Flag']),
				name: 'Cuba Flag',
				_native: '🇨🇺',
				nativeNonQual: '🇨🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'barber',
			{
				keywords: _List_fromArray(
					['Barber Pole', 'hair', 'salon', 'style']),
				name: 'Barber Pole',
				_native: '💈',
				nativeNonQual: '💈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'duck',
			{
				keywords: _List_fromArray(
					['Duck', 'animal', 'nature', 'bird', 'mallard']),
				name: 'Duck',
				_native: '\uD83E\uDD86',
				nativeNonQual: '\uD83E\uDD86',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'six_pointed_star',
			{
				keywords: _List_fromArray(
					['Six Pointed Star with Middle Dot', 'purple-square', 'religion', 'jewish', 'hexagram']),
				name: 'Six Pointed Star with Middle Dot',
				_native: '🔯',
				nativeNonQual: '🔯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ramen',
			{
				keywords: _List_fromArray(
					['Steaming Bowl', 'food', 'japanese', 'noodle', 'chopsticks']),
				name: 'Steaming Bowl',
				_native: '🍜',
				nativeNonQual: '🍜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flashlight',
			{
				keywords: _List_fromArray(
					['Electric Torch', 'dark', 'camping', 'sight', 'night']),
				name: 'Electric Torch',
				_native: '🔦',
				nativeNonQual: '🔦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mahjong',
			{
				keywords: _List_fromArray(
					['Mahjong Tile Red Dragon', 'game', 'play', 'chinese', 'kanji']),
				name: 'Mahjong Tile Red Dragon',
				_native: '🀄',
				nativeNonQual: '🀄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fearful',
			{
				keywords: _List_fromArray(
					['Fearful Face', 'face', 'scared', 'terrified', 'nervous', 'oops', 'huh']),
				name: 'Fearful Face',
				_native: '😨',
				nativeNonQual: '😨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'aries',
			{
				keywords: _List_fromArray(
					['Aries', 'sign', 'purple-square', 'zodiac', 'astrology']),
				name: 'Aries',
				_native: '♈',
				nativeNonQual: '♈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'spaghetti',
			{
				keywords: _List_fromArray(
					['Spaghetti', 'food', 'italian', 'noodle']),
				name: 'Spaghetti',
				_native: '🍝',
				nativeNonQual: '🍝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'circus_tent',
			{
				keywords: _List_fromArray(
					['Circus Tent', 'festival', 'carnival', 'party']),
				name: 'Circus Tent',
				_native: '🎪',
				nativeNonQual: '🎪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'izakaya_lantern',
			{
				keywords: _List_fromArray(
					['Izakaya Lantern', 'light', 'paper', 'halloween', 'spooky']),
				name: 'Izakaya Lantern',
				_native: '🏮',
				nativeNonQual: '🏮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cv',
			{
				keywords: _List_fromArray(
					['Cape Verde Flag']),
				name: 'Cape Verde Flag',
				_native: '🇨🇻',
				nativeNonQual: '🇨🇻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'weary',
			{
				keywords: _List_fromArray(
					['Weary Face', 'face', 'tired', 'sleepy', 'sad', 'frustrated', 'upset']),
				name: 'Weary Face',
				_native: '😩',
				nativeNonQual: '😩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flower_playing_cards',
			{
				keywords: _List_fromArray(
					['Flower Playing Cards', 'game', 'sunset', 'red']),
				name: 'Flower Playing Cards',
				_native: '🎴',
				nativeNonQual: '🎴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'owl',
			{
				keywords: _List_fromArray(
					['Owl', 'animal', 'nature', 'bird', 'hoot']),
				name: 'Owl',
				_native: '\uD83E\uDD89',
				nativeNonQual: '\uD83E\uDD89',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'performing_arts',
			{
				keywords: _List_fromArray(
					['Performing Arts', 'acting', 'theater', 'drama']),
				name: 'Performing Arts',
				_native: '🎭',
				nativeNonQual: '🎭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'frog',
			{
				keywords: _List_fromArray(
					['Frog Face', 'animal', 'nature', 'croak', 'toad']),
				name: 'Frog Face',
				_native: '🐸',
				nativeNonQual: '🐸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cw',
			{
				keywords: _List_fromArray(
					['Curaçao Flag']),
				name: 'Curaçao Flag',
				_native: '🇨🇼',
				nativeNonQual: '🇨🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'notebook_with_decorative_cover',
			{
				keywords: _List_fromArray(
					['Notebook with Decorative Cover', 'classroom', 'notes', 'record', 'paper', 'study']),
				name: 'Notebook with Decorative Cover',
				_native: '📔',
				nativeNonQual: '📔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'exploding_head',
			{
				keywords: _List_fromArray(
					['Shocked Face with Exploding Head']),
				name: 'Shocked Face with Exploding Head',
				_native: '\uD83E\uDD2F',
				nativeNonQual: '\uD83E\uDD2F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'taurus',
			{
				keywords: _List_fromArray(
					['Taurus', 'purple-square', 'sign', 'zodiac', 'astrology']),
				name: 'Taurus',
				_native: '♉',
				nativeNonQual: '♉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'sweet_potato',
			{
				keywords: _List_fromArray(
					['Roasted Sweet Potato', 'food', 'nature']),
				name: 'Roasted Sweet Potato',
				_native: '🍠',
				nativeNonQual: '🍠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'closed_book',
			{
				keywords: _List_fromArray(
					['Closed Book', 'read', 'library', 'knowledge', 'textbook', 'learn']),
				name: 'Closed Book',
				_native: '📕',
				nativeNonQual: '📕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'gemini',
			{
				keywords: _List_fromArray(
					['Gemini', 'sign', 'zodiac', 'purple-square', 'astrology']),
				name: 'Gemini',
				_native: '♊',
				nativeNonQual: '♊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'frame_with_picture',
			{
				keywords: _List_fromArray(
					['Frame with Picture']),
				name: 'Frame with Picture',
				_native: '🖼️',
				nativeNonQual: '🖼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-cx',
			{
				keywords: _List_fromArray(
					['Christmas Island Flag']),
				name: 'Christmas Island Flag',
				_native: '🇨🇽',
				nativeNonQual: '🇨🇽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'grimacing',
			{
				keywords: _List_fromArray(
					['Grimacing Face', 'face', 'grimace', 'teeth']),
				name: 'Grimacing Face',
				_native: '😬',
				nativeNonQual: '😬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'crocodile',
			{
				keywords: _List_fromArray(
					['Crocodile', 'animal', 'nature', 'reptile', 'lizard', 'alligator']),
				name: 'Crocodile',
				_native: '🐊',
				nativeNonQual: '🐊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'oden',
			{
				keywords: _List_fromArray(
					['Oden', 'food', 'japanese']),
				name: 'Oden',
				_native: '🍢',
				nativeNonQual: '🍢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-cy',
			{
				keywords: _List_fromArray(
					['Cyprus Flag']),
				name: 'Cyprus Flag',
				_native: '🇨🇾',
				nativeNonQual: '🇨🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'book',
			{
				keywords: _List_fromArray(
					['Open Book']),
				name: 'Open Book',
				_native: '📖',
				nativeNonQual: '📖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'turtle',
			{
				keywords: _List_fromArray(
					['Turtle', 'animal', 'slow', 'nature', 'tortoise']),
				name: 'Turtle',
				_native: '🐢',
				nativeNonQual: '🐢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'art',
			{
				keywords: _List_fromArray(
					['Artist Palette', 'design', 'paint', 'draw', 'colors']),
				name: 'Artist Palette',
				_native: '🎨',
				nativeNonQual: '🎨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sushi',
			{
				keywords: _List_fromArray(
					['Sushi', 'food', 'fish', 'japanese', 'rice']),
				name: 'Sushi',
				_native: '🍣',
				nativeNonQual: '🍣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cold_sweat',
			{
				keywords: _List_fromArray(
					['Face with Open Mouth and Cold Sweat', 'face', 'nervous', 'sweat']),
				name: 'Face with Open Mouth and Cold Sweat',
				_native: '😰',
				nativeNonQual: '😰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cancer',
			{
				keywords: _List_fromArray(
					['Cancer', 'sign', 'zodiac', 'purple-square', 'astrology']),
				name: 'Cancer',
				_native: '♋',
				nativeNonQual: '♋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'fried_shrimp',
			{
				keywords: _List_fromArray(
					['Fried Shrimp', 'food', 'animal', 'appetizer', 'summer']),
				name: 'Fried Shrimp',
				_native: '🍤',
				nativeNonQual: '🍤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'slot_machine',
			{
				keywords: _List_fromArray(
					['Slot Machine', 'bet', 'gamble', 'vegas', 'fruit machine', 'luck', 'casino']),
				name: 'Slot Machine',
				_native: '🎰',
				nativeNonQual: '🎰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'scream',
			{
				keywords: _List_fromArray(
					['Face Screaming in Fear', 'face', 'munch', 'scared', 'omg']),
				name: 'Face Screaming in Fear',
				_native: '😱',
				nativeNonQual: '😱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'green_book',
			{
				keywords: _List_fromArray(
					['Green Book', 'read', 'library', 'knowledge', 'study']),
				name: 'Green Book',
				_native: '📗',
				nativeNonQual: '📗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'leo',
			{
				keywords: _List_fromArray(
					['Leo', 'sign', 'purple-square', 'zodiac', 'astrology']),
				name: 'Leo',
				_native: '♌',
				nativeNonQual: '♌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-cz',
			{
				keywords: _List_fromArray(
					['Czechia Flag']),
				name: 'Czechia Flag',
				_native: '🇨🇿',
				nativeNonQual: '🇨🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lizard',
			{
				keywords: _List_fromArray(
					['Lizard', 'animal', 'nature', 'reptile']),
				name: 'Lizard',
				_native: '\uD83E\uDD8E',
				nativeNonQual: '\uD83E\uDD8E',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'virgo',
			{
				keywords: _List_fromArray(
					['Virgo', 'sign', 'zodiac', 'purple-square', 'astrology']),
				name: 'Virgo',
				_native: '♍',
				nativeNonQual: '♍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'steam_locomotive',
			{
				keywords: _List_fromArray(
					['Steam Locomotive', 'transportation', 'vehicle', 'train']),
				name: 'Steam Locomotive',
				_native: '🚂',
				nativeNonQual: '🚂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'de',
			{
				keywords: _List_fromArray(
					['Germany Flag', 'german', 'nation', 'flag', 'country', 'banner']),
				name: 'Germany Flag',
				_native: '🇩🇪',
				nativeNonQual: '🇩🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flushed',
			{
				keywords: _List_fromArray(
					['Flushed Face', 'face', 'blush', 'shy', 'flattered']),
				name: 'Flushed Face',
				_native: '😳',
				nativeNonQual: '😳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'blue_book',
			{
				keywords: _List_fromArray(
					['Blue Book', 'read', 'library', 'knowledge', 'learn', 'study']),
				name: 'Blue Book',
				_native: '📘',
				nativeNonQual: '📘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'snake',
			{
				keywords: _List_fromArray(
					['Snake', 'animal', 'evil', 'nature', 'hiss', 'python']),
				name: 'Snake',
				_native: '🐍',
				nativeNonQual: '🐍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fish_cake',
			{
				keywords: _List_fromArray(
					['Fish Cake with Swirl Design', 'food', 'japan', 'sea', 'beach', 'narutomaki', 'pink', 'swirl', 'kamaboko', 'surimi', 'ramen']),
				name: 'Fish Cake with Swirl Design',
				_native: '🍥',
				nativeNonQual: '🍥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'railway_car',
			{
				keywords: _List_fromArray(
					['Railway Car', 'transportation', 'vehicle']),
				name: 'Railway Car',
				_native: '🚃',
				nativeNonQual: '🚃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dango',
			{
				keywords: _List_fromArray(
					['Dango', 'food', 'dessert', 'sweet', 'japanese', 'barbecue', 'meat']),
				name: 'Dango',
				_native: '🍡',
				nativeNonQual: '🍡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'orange_book',
			{
				keywords: _List_fromArray(
					['Orange Book', 'read', 'library', 'knowledge', 'textbook', 'study']),
				name: 'Orange Book',
				_native: '📙',
				nativeNonQual: '📙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'libra',
			{
				keywords: _List_fromArray(
					['Libra', 'sign', 'purple-square', 'zodiac', 'astrology']),
				name: 'Libra',
				_native: '♎',
				nativeNonQual: '♎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'dragon_face',
			{
				keywords: _List_fromArray(
					['Dragon Face', 'animal', 'myth', 'nature', 'chinese', 'green']),
				name: 'Dragon Face',
				_native: '🐲',
				nativeNonQual: '🐲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-dg',
			{
				keywords: _List_fromArray(
					['Diego Garcia Flag']),
				name: 'Diego Garcia Flag',
				_native: '🇩🇬',
				nativeNonQual: '🇩🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'zany_face',
			{
				keywords: _List_fromArray(
					['Grinning Face with One Large and One Small Eye']),
				name: 'Grinning Face with One Large and One Small Eye',
				_native: '\uD83E\uDD2A',
				nativeNonQual: '\uD83E\uDD2A',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'books',
			{
				keywords: _List_fromArray(
					['Books', 'literature', 'library', 'study']),
				name: 'Books',
				_native: '📚',
				nativeNonQual: '📚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dragon',
			{
				keywords: _List_fromArray(
					['Dragon', 'animal', 'myth', 'nature', 'chinese', 'green']),
				name: 'Dragon',
				_native: '🐉',
				nativeNonQual: '🐉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-dj',
			{
				keywords: _List_fromArray(
					['Djibouti Flag']),
				name: 'Djibouti Flag',
				_native: '🇩🇯',
				nativeNonQual: '🇩🇯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dumpling',
			{
				keywords: _List_fromArray(
					['Dumpling']),
				name: 'Dumpling',
				_native: '\uD83E\uDD5F',
				nativeNonQual: '\uD83E\uDD5F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'dizzy_face',
			{
				keywords: _List_fromArray(
					['Dizzy Face', 'spent', 'unconscious', 'xox', 'dizzy']),
				name: 'Dizzy Face',
				_native: '😵',
				nativeNonQual: '😵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'scorpius',
			{
				keywords: _List_fromArray(
					['Scorpius', 'sign', 'zodiac', 'purple-square', 'astrology', 'scorpio']),
				name: 'Scorpius',
				_native: '♏',
				nativeNonQual: '♏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'bullettrain_side',
			{
				keywords: _List_fromArray(
					['High-Speed Train', 'transportation', 'vehicle']),
				name: 'High-Speed Train',
				_native: '🚄',
				nativeNonQual: '🚄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bullettrain_front',
			{
				keywords: _List_fromArray(
					['High-Speed Train with Bullet Nose', 'transportation', 'vehicle', 'speed', 'fast', 'public', 'travel']),
				name: 'High-Speed Train with Bullet Nose',
				_native: '🚅',
				nativeNonQual: '🚅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'notebook',
			{
				keywords: _List_fromArray(
					['Notebook', 'stationery', 'record', 'notes', 'paper', 'study']),
				name: 'Notebook',
				_native: '📓',
				nativeNonQual: '📓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fortune_cookie',
			{
				keywords: _List_fromArray(
					['Fortune Cookie']),
				name: 'Fortune Cookie',
				_native: '\uD83E\uDD60',
				nativeNonQual: '\uD83E\uDD60',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'sagittarius',
			{
				keywords: _List_fromArray(
					['Sagittarius', 'sign', 'zodiac', 'purple-square', 'astrology']),
				name: 'Sagittarius',
				_native: '♐',
				nativeNonQual: '♐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'sauropod',
			{
				keywords: _List_fromArray(
					['Sauropod']),
				name: 'Sauropod',
				_native: '\uD83E\uDD95',
				nativeNonQual: '\uD83E\uDD95',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-dk',
			{
				keywords: _List_fromArray(
					['Denmark Flag']),
				name: 'Denmark Flag',
				_native: '🇩🇰',
				nativeNonQual: '🇩🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rage',
			{
				keywords: _List_fromArray(
					['Pouting Face', 'angry', 'mad', 'hate', 'despise']),
				name: 'Pouting Face',
				_native: '😡',
				nativeNonQual: '😡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ledger',
			{
				keywords: _List_fromArray(
					['Ledger', 'notes', 'paper']),
				name: 'Ledger',
				_native: '📒',
				nativeNonQual: '📒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'angry',
			{
				keywords: _List_fromArray(
					['Angry Face', 'mad', 'face', 'annoyed', 'frustrated']),
				name: 'Angry Face',
				_native: '😠',
				nativeNonQual: '😠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			't-rex',
			{
				keywords: _List_fromArray(
					['T-Rex']),
				name: 'T-Rex',
				_native: '\uD83E\uDD96',
				nativeNonQual: '\uD83E\uDD96',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'capricorn',
			{
				keywords: _List_fromArray(
					['Capricorn', 'sign', 'zodiac', 'purple-square', 'astrology']),
				name: 'Capricorn',
				_native: '♑',
				nativeNonQual: '♑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'takeout_box',
			{
				keywords: _List_fromArray(
					['Takeout Box']),
				name: 'Takeout Box',
				_native: '\uD83E\uDD61',
				nativeNonQual: '\uD83E\uDD61',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-dm',
			{
				keywords: _List_fromArray(
					['Dominica Flag']),
				name: 'Dominica Flag',
				_native: '🇩🇲',
				nativeNonQual: '🇩🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'train2',
			{
				keywords: _List_fromArray(
					['Train', 'transportation', 'vehicle']),
				name: 'Train',
				_native: '🚆',
				nativeNonQual: '🚆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'page_with_curl',
			{
				keywords: _List_fromArray(
					['Page with Curl', 'documents', 'office', 'paper']),
				name: 'Page with Curl',
				_native: '📃',
				nativeNonQual: '📃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'whale',
			{
				keywords: _List_fromArray(
					['Spouting Whale', 'animal', 'nature', 'sea', 'ocean']),
				name: 'Spouting Whale',
				_native: '🐳',
				nativeNonQual: '🐳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_symbols_on_mouth',
			{
				keywords: _List_fromArray(
					['Serious Face with Symbols Covering Mouth']),
				name: 'Serious Face with Symbols Covering Mouth',
				_native: '\uD83E\uDD2C',
				nativeNonQual: '\uD83E\uDD2C',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-do',
			{
				keywords: _List_fromArray(
					['Dominican Republic Flag']),
				name: 'Dominican Republic Flag',
				_native: '🇩🇴',
				nativeNonQual: '🇩🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'metro',
			{
				keywords: _List_fromArray(
					['Metro', 'transportation', 'blue-square', 'mrt', 'underground', 'tube']),
				name: 'Metro',
				_native: '🚇',
				nativeNonQual: '🚇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'icecream',
			{
				keywords: _List_fromArray(
					['Soft Ice Cream', 'food', 'hot', 'dessert', 'summer']),
				name: 'Soft Ice Cream',
				_native: '🍦',
				nativeNonQual: '🍦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'aquarius',
			{
				keywords: _List_fromArray(
					['Aquarius', 'sign', 'purple-square', 'zodiac', 'astrology']),
				name: 'Aquarius',
				_native: '♒',
				nativeNonQual: '♒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-dz',
			{
				keywords: _List_fromArray(
					['Algeria Flag']),
				name: 'Algeria Flag',
				_native: '🇩🇿',
				nativeNonQual: '🇩🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'whale2',
			{
				keywords: _List_fromArray(
					['Whale', 'animal', 'nature', 'sea', 'ocean']),
				name: 'Whale',
				_native: '🐋',
				nativeNonQual: '🐋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mask',
			{
				keywords: _List_fromArray(
					['Face with Medical Mask', 'face', 'sick', 'ill', 'disease']),
				name: 'Face with Medical Mask',
				_native: '😷',
				nativeNonQual: '😷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'scroll',
			{
				keywords: _List_fromArray(
					['Scroll', 'documents', 'ancient', 'history', 'paper']),
				name: 'Scroll',
				_native: '📜',
				nativeNonQual: '📜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shaved_ice',
			{
				keywords: _List_fromArray(
					['Shaved Ice', 'hot', 'dessert', 'summer']),
				name: 'Shaved Ice',
				_native: '🍧',
				nativeNonQual: '🍧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pisces',
			{
				keywords: _List_fromArray(
					['Pisces', 'purple-square', 'sign', 'zodiac', 'astrology']),
				name: 'Pisces',
				_native: '♓',
				nativeNonQual: '♓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'light_rail',
			{
				keywords: _List_fromArray(
					['Light Rail', 'transportation', 'vehicle']),
				name: 'Light Rail',
				_native: '🚈',
				nativeNonQual: '🚈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dolphin',
			{
				keywords: _List_fromArray(
					['Dolphin', 'animal', 'nature', 'fish', 'sea', 'ocean', 'flipper', 'fins', 'beach']),
				name: 'Dolphin',
				_native: '🐬',
				nativeNonQual: '🐬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_thermometer',
			{
				keywords: _List_fromArray(
					['Face with Thermometer', 'sick', 'temperature', 'thermometer', 'cold', 'fever']),
				name: 'Face with Thermometer',
				_native: '\uD83E\uDD12',
				nativeNonQual: '\uD83E\uDD12',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'flag-ea',
			{
				keywords: _List_fromArray(
					['Ceuta & Melilla Flag']),
				name: 'Ceuta & Melilla Flag',
				_native: '🇪🇦',
				nativeNonQual: '🇪🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ophiuchus',
			{
				keywords: _List_fromArray(
					['Ophiuchus', 'sign', 'purple-square', 'constellation', 'astrology']),
				name: 'Ophiuchus',
				_native: '⛎',
				nativeNonQual: '⛎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'station',
			{
				keywords: _List_fromArray(
					['Station', 'transportation', 'vehicle', 'public']),
				name: 'Station',
				_native: '🚉',
				nativeNonQual: '🚉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ice_cream',
			{
				keywords: _List_fromArray(
					['Ice Cream', 'food', 'hot', 'dessert']),
				name: 'Ice Cream',
				_native: '🍨',
				nativeNonQual: '🍨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'page_facing_up',
			{
				keywords: _List_fromArray(
					['Page Facing Up', 'documents', 'office', 'paper', 'information']),
				name: 'Page Facing Up',
				_native: '📄',
				nativeNonQual: '📄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'doughnut',
			{
				keywords: _List_fromArray(
					['Doughnut', 'food', 'dessert', 'snack', 'sweet', 'donut']),
				name: 'Doughnut',
				_native: '🍩',
				nativeNonQual: '🍩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_head_bandage',
			{
				keywords: _List_fromArray(
					['Face with Head-Bandage', 'injured', 'clumsy', 'bandage', 'hurt']),
				name: 'Face with Head-Bandage',
				_native: '\uD83E\uDD15',
				nativeNonQual: '\uD83E\uDD15',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'fish',
			{
				keywords: _List_fromArray(
					['Fish', 'animal', 'food', 'nature']),
				name: 'Fish',
				_native: '🐟',
				nativeNonQual: '🐟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'newspaper',
			{
				keywords: _List_fromArray(
					['Newspaper', 'press', 'headline']),
				name: 'Newspaper',
				_native: '📰',
				nativeNonQual: '📰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tram',
			{
				keywords: _List_fromArray(
					['Tram', 'transportation', 'vehicle']),
				name: 'Tram',
				_native: '🚊',
				nativeNonQual: '🚊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ec',
			{
				keywords: _List_fromArray(
					['Ecuador Flag']),
				name: 'Ecuador Flag',
				_native: '🇪🇨',
				nativeNonQual: '🇪🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'twisted_rightwards_arrows',
			{
				keywords: _List_fromArray(
					['Twisted Rightwards Arrows', 'blue-square', 'shuffle', 'music', 'random']),
				name: 'Twisted Rightwards Arrows',
				_native: '🔀',
				nativeNonQual: '🔀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ee',
			{
				keywords: _List_fromArray(
					['Estonia Flag']),
				name: 'Estonia Flag',
				_native: '🇪🇪',
				nativeNonQual: '🇪🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cookie',
			{
				keywords: _List_fromArray(
					['Cookie', 'food', 'snack', 'oreo', 'chocolate', 'sweet', 'dessert']),
				name: 'Cookie',
				_native: '🍪',
				nativeNonQual: '🍪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'monorail',
			{
				keywords: _List_fromArray(
					['Monorail', 'transportation', 'vehicle']),
				name: 'Monorail',
				_native: '🚝',
				nativeNonQual: '🚝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tropical_fish',
			{
				keywords: _List_fromArray(
					['Tropical Fish', 'animal', 'swim', 'ocean', 'beach', 'nemo']),
				name: 'Tropical Fish',
				_native: '🐠',
				nativeNonQual: '🐠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rolled_up_newspaper',
			{
				keywords: _List_fromArray(
					['Rolled Up Newspaper']),
				name: 'Rolled Up Newspaper',
				_native: '🗞️',
				nativeNonQual: '🗞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'nauseated_face',
			{
				keywords: _List_fromArray(
					['Nauseated Face', 'face', 'vomit', 'gross', 'green', 'sick', 'throw up', 'ill']),
				name: 'Nauseated Face',
				_native: '\uD83E\uDD22',
				nativeNonQual: '\uD83E\uDD22',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'repeat',
			{
				keywords: _List_fromArray(
					['Clockwise Rightwards and Leftwards Open Circle Arrows', 'loop', 'record']),
				name: 'Clockwise Rightwards and Leftwards Open Circle Arrows',
				_native: '🔁',
				nativeNonQual: '🔁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bookmark_tabs',
			{
				keywords: _List_fromArray(
					['Bookmark Tabs', 'favorite', 'save', 'order', 'tidy']),
				name: 'Bookmark Tabs',
				_native: '📑',
				nativeNonQual: '📑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'repeat_one',
			{
				keywords: _List_fromArray(
					['Clockwise Rightwards and Leftwards Open Circle Arrows with Circled One Overlay', 'blue-square', 'loop']),
				name: 'Clockwise Rightwards and Leftwards Open Circle Arrows with Circled One Overlay',
				_native: '🔂',
				nativeNonQual: '🔂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-eg',
			{
				keywords: _List_fromArray(
					['Egypt Flag']),
				name: 'Egypt Flag',
				_native: '🇪🇬',
				nativeNonQual: '🇪🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mountain_railway',
			{
				keywords: _List_fromArray(
					['Mountain Railway', 'transportation', 'vehicle']),
				name: 'Mountain Railway',
				_native: '🚞',
				nativeNonQual: '🚞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'birthday',
			{
				keywords: _List_fromArray(
					['Birthday Cake', 'food', 'dessert', 'cake']),
				name: 'Birthday Cake',
				_native: '🎂',
				nativeNonQual: '🎂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'blowfish',
			{
				keywords: _List_fromArray(
					['Blowfish', 'animal', 'nature', 'food', 'sea', 'ocean']),
				name: 'Blowfish',
				_native: '🐡',
				nativeNonQual: '🐡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_vomiting',
			{
				keywords: _List_fromArray(
					['Face with Open Mouth Vomiting']),
				name: 'Face with Open Mouth Vomiting',
				_native: '\uD83E\uDD2E',
				nativeNonQual: '\uD83E\uDD2E',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'arrow_forward',
			{
				keywords: _List_fromArray(
					['Black Right-Pointing Triangle', 'blue-square', 'right', 'direction', 'play']),
				name: 'Black Right-Pointing Triangle',
				_native: '▶️',
				nativeNonQual: '▶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'bookmark',
			{
				keywords: _List_fromArray(
					['Bookmark', 'favorite', 'label', 'save']),
				name: 'Bookmark',
				_native: '🔖',
				nativeNonQual: '🔖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-eh',
			{
				keywords: _List_fromArray(
					['Western Sahara Flag']),
				name: 'Western Sahara Flag',
				_native: '🇪🇭',
				nativeNonQual: '🇪🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shark',
			{
				keywords: _List_fromArray(
					['Shark', 'animal', 'nature', 'fish', 'sea', 'ocean', 'jaws', 'fins', 'beach']),
				name: 'Shark',
				_native: '\uD83E\uDD88',
				nativeNonQual: '\uD83E\uDD88',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'train',
			{
				keywords: _List_fromArray(
					['Tram Car', 'transportation', 'vehicle', 'carriage', 'public', 'travel']),
				name: 'Tram Car',
				_native: '🚋',
				nativeNonQual: '🚋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sneezing_face',
			{
				keywords: _List_fromArray(
					['Sneezing Face', 'face', 'gesundheit', 'sneeze', 'sick', 'allergy']),
				name: 'Sneezing Face',
				_native: '\uD83E\uDD27',
				nativeNonQual: '\uD83E\uDD27',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'cake',
			{
				keywords: _List_fromArray(
					['Shortcake', 'food', 'dessert']),
				name: 'Shortcake',
				_native: '🍰',
				nativeNonQual: '🍰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bus',
			{
				keywords: _List_fromArray(
					['Bus', 'car', 'vehicle', 'transportation']),
				name: 'Bus',
				_native: '🚌',
				nativeNonQual: '🚌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pie',
			{
				keywords: _List_fromArray(
					['Pie']),
				name: 'Pie',
				_native: '\uD83E\uDD67',
				nativeNonQual: '\uD83E\uDD67',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'innocent',
			{
				keywords: _List_fromArray(
					['Smiling Face with Halo', 'face', 'angel', 'heaven', 'halo']),
				name: 'Smiling Face with Halo',
				_native: '😇',
				nativeNonQual: '😇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fast_forward',
			{
				keywords: _List_fromArray(
					['Black Right-Pointing Double Triangle', 'blue-square', 'play', 'speed', 'continue']),
				name: 'Black Right-Pointing Double Triangle',
				_native: '⏩',
				nativeNonQual: '⏩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'label',
			{
				keywords: _List_fromArray(
					['Label', 'sale', 'tag']),
				name: 'Label',
				_native: '🏷️',
				nativeNonQual: '🏷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'octopus',
			{
				keywords: _List_fromArray(
					['Octopus', 'animal', 'creature', 'ocean', 'sea', 'nature', 'beach']),
				name: 'Octopus',
				_native: '🐙',
				nativeNonQual: '🐙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-er',
			{
				keywords: _List_fromArray(
					['Eritrea Flag']),
				name: 'Eritrea Flag',
				_native: '🇪🇷',
				nativeNonQual: '🇪🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_right_pointing_double_triangle_with_vertical_bar',
			{
				keywords: _List_fromArray(
					['Black Right Pointing Double Triangle with Vertical Bar']),
				name: 'Black Right Pointing Double Triangle with Vertical Bar',
				_native: '⏭️',
				nativeNonQual: '⏭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'chocolate_bar',
			{
				keywords: _List_fromArray(
					['Chocolate Bar', 'food', 'snack', 'dessert', 'sweet']),
				name: 'Chocolate Bar',
				_native: '🍫',
				nativeNonQual: '🍫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'oncoming_bus',
			{
				keywords: _List_fromArray(
					['Oncoming Bus', 'vehicle', 'transportation']),
				name: 'Oncoming Bus',
				_native: '🚍',
				nativeNonQual: '🚍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shell',
			{
				keywords: _List_fromArray(
					['Spiral Shell', 'nature', 'sea', 'beach']),
				name: 'Spiral Shell',
				_native: '🐚',
				nativeNonQual: '🐚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_cowboy_hat',
			{
				keywords: _List_fromArray(
					['Face with Cowboy Hat']),
				name: 'Face with Cowboy Hat',
				_native: '\uD83E\uDD20',
				nativeNonQual: '\uD83E\uDD20',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'moneybag',
			{
				keywords: _List_fromArray(
					['Money Bag', 'dollar', 'payment', 'coins', 'sale']),
				name: 'Money Bag',
				_native: '💰',
				nativeNonQual: '💰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'es',
			{
				keywords: _List_fromArray(
					['Spain Flag', 'spain', 'flag', 'nation', 'country', 'banner']),
				name: 'Spain Flag',
				_native: '🇪🇸',
				nativeNonQual: '🇪🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'crab',
			{
				keywords: _List_fromArray(
					['Crab', 'animal', 'crustacean']),
				name: 'Crab',
				_native: '\uD83E\uDD80',
				nativeNonQual: '\uD83E\uDD80',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'yen',
			{
				keywords: _List_fromArray(
					['Banknote with Yen Sign', 'money', 'sales', 'japanese', 'dollar', 'currency']),
				name: 'Banknote with Yen Sign',
				_native: '💴',
				nativeNonQual: '💴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-et',
			{
				keywords: _List_fromArray(
					['Ethiopia Flag']),
				name: 'Ethiopia Flag',
				_native: '🇪🇹',
				nativeNonQual: '🇪🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clown_face',
			{
				keywords: _List_fromArray(
					['Clown Face', 'face']),
				name: 'Clown Face',
				_native: '\uD83E\uDD21',
				nativeNonQual: '\uD83E\uDD21',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'black_right_pointing_triangle_with_double_vertical_bar',
			{
				keywords: _List_fromArray(
					['Black Right Pointing Triangle with Double Vertical Bar']),
				name: 'Black Right Pointing Triangle with Double Vertical Bar',
				_native: '⏯️',
				nativeNonQual: '⏯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'trolleybus',
			{
				keywords: _List_fromArray(
					['Trolleybus', 'bart', 'transportation', 'vehicle']),
				name: 'Trolleybus',
				_native: '🚎',
				nativeNonQual: '🚎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'candy',
			{
				keywords: _List_fromArray(
					['Candy', 'snack', 'dessert', 'sweet', 'lolly']),
				name: 'Candy',
				_native: '🍬',
				nativeNonQual: '🍬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lying_face',
			{
				keywords: _List_fromArray(
					['Lying Face', 'face', 'lie', 'pinocchio']),
				name: 'Lying Face',
				_native: '\uD83E\uDD25',
				nativeNonQual: '\uD83E\uDD25',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'arrow_backward',
			{
				keywords: _List_fromArray(
					['Black Left-Pointing Triangle', 'blue-square', 'left', 'direction']),
				name: 'Black Left-Pointing Triangle',
				_native: '◀️',
				nativeNonQual: '◀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'dollar',
			{
				keywords: _List_fromArray(
					['Banknote with Dollar Sign', 'money', 'sales', 'bill', 'currency']),
				name: 'Banknote with Dollar Sign',
				_native: '💵',
				nativeNonQual: '💵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shrimp',
			{
				keywords: _List_fromArray(
					['Shrimp', 'animal', 'ocean', 'nature', 'seafood']),
				name: 'Shrimp',
				_native: '\uD83E\uDD90',
				nativeNonQual: '\uD83E\uDD90',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'minibus',
			{
				keywords: _List_fromArray(
					['Minibus', 'vehicle', 'car', 'transportation']),
				name: 'Minibus',
				_native: '🚐',
				nativeNonQual: '🚐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-eu',
			{
				keywords: _List_fromArray(
					['European Union Flag']),
				name: 'European Union Flag',
				_native: '🇪🇺',
				nativeNonQual: '🇪🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lollipop',
			{
				keywords: _List_fromArray(
					['Lollipop', 'food', 'snack', 'candy', 'sweet']),
				name: 'Lollipop',
				_native: '🍭',
				nativeNonQual: '🍭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'squid',
			{
				keywords: _List_fromArray(
					['Squid', 'animal', 'nature', 'ocean', 'sea']),
				name: 'Squid',
				_native: '\uD83E\uDD91',
				nativeNonQual: '\uD83E\uDD91',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'euro',
			{
				keywords: _List_fromArray(
					['Banknote with Euro Sign', 'money', 'sales', 'dollar', 'currency']),
				name: 'Banknote with Euro Sign',
				_native: '💶',
				nativeNonQual: '💶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-fi',
			{
				keywords: _List_fromArray(
					['Finland Flag']),
				name: 'Finland Flag',
				_native: '🇫🇮',
				nativeNonQual: '🇫🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ambulance',
			{
				keywords: _List_fromArray(
					['Ambulance', 'health', '911', 'hospital']),
				name: 'Ambulance',
				_native: '🚑',
				nativeNonQual: '🚑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'custard',
			{
				keywords: _List_fromArray(
					['Custard', 'dessert', 'food']),
				name: 'Custard',
				_native: '🍮',
				nativeNonQual: '🍮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shushing_face',
			{
				keywords: _List_fromArray(
					['Face with Finger Covering Closed Lips']),
				name: 'Face with Finger Covering Closed Lips',
				_native: '\uD83E\uDD2B',
				nativeNonQual: '\uD83E\uDD2B',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'rewind',
			{
				keywords: _List_fromArray(
					['Black Left-Pointing Double Triangle', 'play', 'blue-square']),
				name: 'Black Left-Pointing Double Triangle',
				_native: '⏪',
				nativeNonQual: '⏪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_left_pointing_double_triangle_with_vertical_bar',
			{
				keywords: _List_fromArray(
					['Black Left Pointing Double Triangle with Vertical Bar']),
				name: 'Black Left Pointing Double Triangle with Vertical Bar',
				_native: '⏮️',
				nativeNonQual: '⏮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_hand_over_mouth',
			{
				keywords: _List_fromArray(
					['Smiling Face with Smiling Eyes and Hand Covering Mouth']),
				name: 'Smiling Face with Smiling Eyes and Hand Covering Mouth',
				_native: '\uD83E\uDD2D',
				nativeNonQual: '\uD83E\uDD2D',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-fj',
			{
				keywords: _List_fromArray(
					['Fiji Flag']),
				name: 'Fiji Flag',
				_native: '🇫🇯',
				nativeNonQual: '🇫🇯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'honey_pot',
			{
				keywords: _List_fromArray(
					['Honey Pot', 'bees', 'sweet', 'kitchen']),
				name: 'Honey Pot',
				_native: '🍯',
				nativeNonQual: '🍯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'snail',
			{
				keywords: _List_fromArray(
					['Snail', 'slow', 'animal', 'shell']),
				name: 'Snail',
				_native: '🐌',
				nativeNonQual: '🐌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pound',
			{
				keywords: _List_fromArray(
					['Banknote with Pound Sign', 'british', 'sterling', 'money', 'sales', 'bills', 'uk', 'england', 'currency']),
				name: 'Banknote with Pound Sign',
				_native: '💷',
				nativeNonQual: '💷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fire_engine',
			{
				keywords: _List_fromArray(
					['Fire Engine', 'transportation', 'cars', 'vehicle']),
				name: 'Fire Engine',
				_native: '🚒',
				nativeNonQual: '🚒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'baby_bottle',
			{
				keywords: _List_fromArray(
					['Baby Bottle', 'food', 'container', 'milk']),
				name: 'Baby Bottle',
				_native: '🍼',
				nativeNonQual: '🍼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-fk',
			{
				keywords: _List_fromArray(
					['Falkland Islands Flag']),
				name: 'Falkland Islands Flag',
				_native: '🇫🇰',
				nativeNonQual: '🇫🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'butterfly',
			{
				keywords: _List_fromArray(
					['Butterfly', 'animal', 'insect', 'nature', 'caterpillar']),
				name: 'Butterfly',
				_native: '\uD83E\uDD8B',
				nativeNonQual: '\uD83E\uDD8B',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'money_with_wings',
			{
				keywords: _List_fromArray(
					['Money with Wings', 'dollar', 'bills', 'payment', 'sale']),
				name: 'Money with Wings',
				_native: '💸',
				nativeNonQual: '💸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_with_monocle',
			{
				keywords: _List_fromArray(
					['Face with Monocle']),
				name: 'Face with Monocle',
				_native: '\uD83E\uDDD0',
				nativeNonQual: '\uD83E\uDDD0',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'police_car',
			{
				keywords: _List_fromArray(
					['Police Car', 'vehicle', 'cars', 'transportation', 'law', 'legal', 'enforcement']),
				name: 'Police Car',
				_native: '🚓',
				nativeNonQual: '🚓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_up_small',
			{
				keywords: _List_fromArray(
					['Up-Pointing Small Red Triangle', 'blue-square', 'triangle', 'direction', 'point', 'forward', 'top']),
				name: 'Up-Pointing Small Red Triangle',
				_native: '🔼',
				nativeNonQual: '🔼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-fm',
			{
				keywords: _List_fromArray(
					['Micronesia Flag']),
				name: 'Micronesia Flag',
				_native: '🇫🇲',
				nativeNonQual: '🇫🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'glass_of_milk',
			{
				keywords: _List_fromArray(
					['Glass of Milk']),
				name: 'Glass of Milk',
				_native: '\uD83E\uDD5B',
				nativeNonQual: '\uD83E\uDD5B',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'credit_card',
			{
				keywords: _List_fromArray(
					['Credit Card', 'money', 'sales', 'dollar', 'bill', 'payment', 'shopping']),
				name: 'Credit Card',
				_native: '💳',
				nativeNonQual: '💳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'oncoming_police_car',
			{
				keywords: _List_fromArray(
					['Oncoming Police Car', 'vehicle', 'law', 'legal', 'enforcement', '911']),
				name: 'Oncoming Police Car',
				_native: '🚔',
				nativeNonQual: '🚔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bug',
			{
				keywords: _List_fromArray(
					['Bug', 'animal', 'insect', 'nature', 'worm']),
				name: 'Bug',
				_native: '🐛',
				nativeNonQual: '🐛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'nerd_face',
			{
				keywords: _List_fromArray(
					['Nerd Face', 'face', 'nerdy', 'geek', 'dork']),
				name: 'Nerd Face',
				_native: '\uD83E\uDD13',
				nativeNonQual: '\uD83E\uDD13',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'arrow_double_up',
			{
				keywords: _List_fromArray(
					['Black Up-Pointing Double Triangle', 'blue-square', 'direction', 'top']),
				name: 'Black Up-Pointing Double Triangle',
				_native: '⏫',
				nativeNonQual: '⏫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'chart',
			{
				keywords: _List_fromArray(
					['Chart with Upwards Trend and Yen Sign', 'green-square', 'graph', 'presentation', 'stats']),
				name: 'Chart with Upwards Trend and Yen Sign',
				_native: '💹',
				nativeNonQual: '💹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-fo',
			{
				keywords: _List_fromArray(
					['Faroe Islands Flag']),
				name: 'Faroe Islands Flag',
				_native: '🇫🇴',
				nativeNonQual: '🇫🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ant',
			{
				keywords: _List_fromArray(
					['Ant', 'animal', 'insect', 'nature', 'bug']),
				name: 'Ant',
				_native: '🐜',
				nativeNonQual: '🐜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_down_small',
			{
				keywords: _List_fromArray(
					['Down-Pointing Small Red Triangle', 'blue-square', 'direction', 'bottom']),
				name: 'Down-Pointing Small Red Triangle',
				_native: '🔽',
				nativeNonQual: '🔽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'smiling_imp',
			{
				keywords: _List_fromArray(
					['Smiling Face with Horns', 'devil', 'horns']),
				name: 'Smiling Face with Horns',
				_native: '😈',
				nativeNonQual: '😈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'taxi',
			{
				keywords: _List_fromArray(
					['Taxi', 'uber', 'vehicle', 'cars', 'transportation']),
				name: 'Taxi',
				_native: '🚕',
				nativeNonQual: '🚕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'coffee',
			{
				keywords: _List_fromArray(
					['Hot Beverage', 'beverage', 'caffeine', 'latte', 'espresso']),
				name: 'Hot Beverage',
				_native: '☕',
				nativeNonQual: '☕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'fr',
			{
				keywords: _List_fromArray(
					['France Flag', 'banner', 'flag', 'nation', 'france', 'french', 'country']),
				name: 'France Flag',
				_native: '🇫🇷',
				nativeNonQual: '🇫🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'oncoming_taxi',
			{
				keywords: _List_fromArray(
					['Oncoming Taxi', 'vehicle', 'cars', 'uber']),
				name: 'Oncoming Taxi',
				_native: '🚖',
				nativeNonQual: '🚖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'arrow_double_down',
			{
				keywords: _List_fromArray(
					['Black Down-Pointing Double Triangle', 'blue-square', 'direction', 'bottom']),
				name: 'Black Down-Pointing Double Triangle',
				_native: '⏬',
				nativeNonQual: '⏬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'imp',
			{
				keywords: _List_fromArray(
					['Imp', 'devil', 'angry', 'horns']),
				name: 'Imp',
				_native: '👿',
				nativeNonQual: '👿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'currency_exchange',
			{
				keywords: _List_fromArray(
					['Currency Exchange', 'money', 'sales', 'dollar', 'travel']),
				name: 'Currency Exchange',
				_native: '💱',
				nativeNonQual: '💱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tea',
			{
				keywords: _List_fromArray(
					['Teacup Without Handle', 'drink', 'bowl', 'breakfast', 'green', 'british']),
				name: 'Teacup Without Handle',
				_native: '🍵',
				nativeNonQual: '🍵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bee',
			{
				keywords: _List_fromArray(
					['Honeybee']),
				name: 'Honeybee',
				_native: '🐝',
				nativeNonQual: '🐝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heavy_dollar_sign',
			{
				keywords: _List_fromArray(
					['Heavy Dollar Sign', 'money', 'sales', 'payment', 'currency', 'buck']),
				name: 'Heavy Dollar Sign',
				_native: '💲',
				nativeNonQual: '💲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'car',
			{
				keywords: _List_fromArray(
					['Automobile']),
				name: 'Automobile',
				_native: '🚗',
				nativeNonQual: '🚗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sake',
			{
				keywords: _List_fromArray(
					['Sake Bottle and Cup', 'wine', 'drink', 'drunk', 'beverage', 'japanese', 'alcohol', 'booze']),
				name: 'Sake Bottle and Cup',
				_native: '🍶',
				nativeNonQual: '🍶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ga',
			{
				keywords: _List_fromArray(
					['Gabon Flag']),
				name: 'Gabon Flag',
				_native: '🇬🇦',
				nativeNonQual: '🇬🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'beetle',
			{
				keywords: _List_fromArray(
					['Lady Beetle', 'animal', 'insect', 'nature', 'ladybug']),
				name: 'Lady Beetle',
				_native: '🐞',
				nativeNonQual: '🐞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'japanese_ogre',
			{
				keywords: _List_fromArray(
					['Japanese Ogre', 'monster', 'red', 'mask', 'halloween', 'scary', 'creepy', 'devil', 'demon', 'japanese', 'ogre']),
				name: 'Japanese Ogre',
				_native: '👹',
				nativeNonQual: '👹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'double_vertical_bar',
			{
				keywords: _List_fromArray(
					['Double Vertical Bar']),
				name: 'Double Vertical Bar',
				_native: '⏸️',
				nativeNonQual: '⏸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'champagne',
			{
				keywords: _List_fromArray(
					['Bottle with Popping Cork', 'drink', 'wine', 'bottle', 'celebration']),
				name: 'Bottle with Popping Cork',
				_native: '\uD83C\uDF7E',
				nativeNonQual: '\uD83C\uDF7E',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'japanese_goblin',
			{
				keywords: _List_fromArray(
					['Japanese Goblin', 'red', 'evil', 'mask', 'monster', 'scary', 'creepy', 'japanese', 'goblin']),
				name: 'Japanese Goblin',
				_native: '👺',
				nativeNonQual: '👺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_square_for_stop',
			{
				keywords: _List_fromArray(
					['Black Square for Stop']),
				name: 'Black Square for Stop',
				_native: '⏹️',
				nativeNonQual: '⏹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'oncoming_automobile',
			{
				keywords: _List_fromArray(
					['Oncoming Automobile', 'car', 'vehicle', 'transportation']),
				name: 'Oncoming Automobile',
				_native: '🚘',
				nativeNonQual: '🚘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'email',
			{
				keywords: _List_fromArray(
					['Envelope', 'letter', 'postal', 'inbox', 'communication']),
				name: 'Envelope',
				_native: '✉️',
				nativeNonQual: '✉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'cricket',
			{
				keywords: _List_fromArray(
					['Cricket', 'sports']),
				name: 'Cricket',
				_native: '\uD83E\uDD97',
				nativeNonQual: '\uD83E\uDD97',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'gb',
			{
				keywords: _List_fromArray(
					['United Kingdom Flag']),
				name: 'United Kingdom Flag',
				_native: '🇬🇧',
				nativeNonQual: '🇬🇧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_circle_for_record',
			{
				keywords: _List_fromArray(
					['Black Circle for Record']),
				name: 'Black Circle for Record',
				_native: '⏺️',
				nativeNonQual: '⏺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-gd',
			{
				keywords: _List_fromArray(
					['Grenada Flag']),
				name: 'Grenada Flag',
				_native: '🇬🇩',
				nativeNonQual: '🇬🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'spider',
			{
				keywords: _List_fromArray(
					['Spider', 'animal', 'arachnid']),
				name: 'Spider',
				_native: '🕷️',
				nativeNonQual: '🕷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'blue_car',
			{
				keywords: _List_fromArray(
					['Recreational Vehicle', 'transportation', 'vehicle']),
				name: 'Recreational Vehicle',
				_native: '🚙',
				nativeNonQual: '🚙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'skull',
			{
				keywords: _List_fromArray(
					['Skull', 'dead', 'skeleton', 'creepy', 'death']),
				name: 'Skull',
				_native: '💀',
				nativeNonQual: '💀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'e-mail',
			{
				keywords: _List_fromArray(
					['E-Mail Symbol', 'communication', 'inbox']),
				name: 'E-Mail Symbol',
				_native: '📧',
				nativeNonQual: '📧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wine_glass',
			{
				keywords: _List_fromArray(
					['Wine Glass', 'drink', 'beverage', 'drunk', 'alcohol', 'booze']),
				name: 'Wine Glass',
				_native: '🍷',
				nativeNonQual: '🍷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'spider_web',
			{
				keywords: _List_fromArray(
					['Spider Web', 'animal', 'insect', 'arachnid', 'silk']),
				name: 'Spider Web',
				_native: '🕸️',
				nativeNonQual: '🕸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'cocktail',
			{
				keywords: _List_fromArray(
					['Cocktail Glass', 'drink', 'drunk', 'alcohol', 'beverage', 'booze', 'mojito']),
				name: 'Cocktail Glass',
				_native: '🍸',
				nativeNonQual: '🍸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'skull_and_crossbones',
			{
				keywords: _List_fromArray(
					['Skull and Crossbones', 'poison', 'danger', 'deadly', 'scary', 'death', 'pirate', 'evil']),
				name: 'Skull and Crossbones',
				_native: '☠️',
				nativeNonQual: '☠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-ge',
			{
				keywords: _List_fromArray(
					['Georgia Flag']),
				name: 'Georgia Flag',
				_native: '🇬🇪',
				nativeNonQual: '🇬🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'eject',
			{
				keywords: _List_fromArray(
					['Eject']),
				name: 'Eject',
				_native: '⏏️',
				nativeNonQual: '⏏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'truck',
			{
				keywords: _List_fromArray(
					['Delivery Truck', 'cars', 'transportation']),
				name: 'Delivery Truck',
				_native: '🚚',
				nativeNonQual: '🚚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'incoming_envelope',
			{
				keywords: _List_fromArray(
					['Incoming Envelope', 'email', 'inbox']),
				name: 'Incoming Envelope',
				_native: '📨',
				nativeNonQual: '📨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tropical_drink',
			{
				keywords: _List_fromArray(
					['Tropical Drink', 'beverage', 'cocktail', 'summer', 'beach', 'alcohol', 'booze', 'mojito']),
				name: 'Tropical Drink',
				_native: '🍹',
				nativeNonQual: '🍹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'scorpion',
			{
				keywords: _List_fromArray(
					['Scorpion', 'animal', 'arachnid']),
				name: 'Scorpion',
				_native: '\uD83E\uDD82',
				nativeNonQual: '\uD83E\uDD82',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'cinema',
			{
				keywords: _List_fromArray(
					['Cinema', 'blue-square', 'record', 'film', 'movie', 'curtain', 'stage', 'theater']),
				name: 'Cinema',
				_native: '🎦',
				nativeNonQual: '🎦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'articulated_lorry',
			{
				keywords: _List_fromArray(
					['Articulated Lorry', 'vehicle', 'cars', 'transportation', 'express']),
				name: 'Articulated Lorry',
				_native: '🚛',
				nativeNonQual: '🚛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'envelope_with_arrow',
			{
				keywords: _List_fromArray(
					['Envelope with Downwards Arrow Above', 'email', 'communication']),
				name: 'Envelope with Downwards Arrow Above',
				_native: '📩',
				nativeNonQual: '📩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ghost',
			{
				keywords: _List_fromArray(
					['Ghost', 'halloween', 'spooky', 'scary']),
				name: 'Ghost',
				_native: '👻',
				nativeNonQual: '👻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gf',
			{
				keywords: _List_fromArray(
					['French Guiana Flag']),
				name: 'French Guiana Flag',
				_native: '🇬🇫',
				nativeNonQual: '🇬🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bouquet',
			{
				keywords: _List_fromArray(
					['Bouquet', 'flowers', 'nature', 'spring']),
				name: 'Bouquet',
				_native: '💐',
				nativeNonQual: '💐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tractor',
			{
				keywords: _List_fromArray(
					['Tractor', 'vehicle', 'car', 'farming', 'agriculture']),
				name: 'Tractor',
				_native: '🚜',
				nativeNonQual: '🚜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'beer',
			{
				keywords: _List_fromArray(
					['Beer Mug', 'relax', 'beverage', 'drink', 'drunk', 'party', 'pub', 'summer', 'alcohol', 'booze']),
				name: 'Beer Mug',
				_native: '🍺',
				nativeNonQual: '🍺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'outbox_tray',
			{
				keywords: _List_fromArray(
					['Outbox Tray', 'inbox', 'email']),
				name: 'Outbox Tray',
				_native: '📤',
				nativeNonQual: '📤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'low_brightness',
			{
				keywords: _List_fromArray(
					['Low Brightness Symbol', 'sun', 'afternoon', 'warm', 'summer']),
				name: 'Low Brightness Symbol',
				_native: '🔅',
				nativeNonQual: '🔅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'alien',
			{
				keywords: _List_fromArray(
					['Extraterrestrial Alien', 'UFO', 'paul', 'weird', 'outer_space']),
				name: 'Extraterrestrial Alien',
				_native: '👽',
				nativeNonQual: '👽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gg',
			{
				keywords: _List_fromArray(
					['Guernsey Flag']),
				name: 'Guernsey Flag',
				_native: '🇬🇬',
				nativeNonQual: '🇬🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cherry_blossom',
			{
				keywords: _List_fromArray(
					['Cherry Blossom', 'nature', 'plant', 'spring', 'flower']),
				name: 'Cherry Blossom',
				_native: '🌸',
				nativeNonQual: '🌸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'inbox_tray',
			{
				keywords: _List_fromArray(
					['Inbox Tray', 'email', 'documents']),
				name: 'Inbox Tray',
				_native: '📥',
				nativeNonQual: '📥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gh',
			{
				keywords: _List_fromArray(
					['Ghana Flag']),
				name: 'Ghana Flag',
				_native: '🇬🇭',
				nativeNonQual: '🇬🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bike',
			{
				keywords: _List_fromArray(
					['Bicycle', 'sports', 'bicycle', 'exercise', 'hipster']),
				name: 'Bicycle',
				_native: '🚲',
				nativeNonQual: '🚲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'space_invader',
			{
				keywords: _List_fromArray(
					['Alien Monster', 'game', 'arcade', 'play']),
				name: 'Alien Monster',
				_native: '👾',
				nativeNonQual: '👾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'beers',
			{
				keywords: _List_fromArray(
					['Clinking Beer Mugs', 'relax', 'beverage', 'drink', 'drunk', 'party', 'pub', 'summer', 'alcohol', 'booze']),
				name: 'Clinking Beer Mugs',
				_native: '🍻',
				nativeNonQual: '🍻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'high_brightness',
			{
				keywords: _List_fromArray(
					['High Brightness Symbol', 'sun', 'light']),
				name: 'High Brightness Symbol',
				_native: '🔆',
				nativeNonQual: '🔆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'package',
			{
				keywords: _List_fromArray(
					['Package', 'mail', 'gift', 'cardboard', 'box', 'moving']),
				name: 'Package',
				_native: '📦',
				nativeNonQual: '📦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'scooter',
			{
				keywords: _List_fromArray(
					['Scooter']),
				name: 'Scooter',
				_native: '\uD83D\uDEF4',
				nativeNonQual: '\uD83D\uDEF4',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'white_flower',
			{
				keywords: _List_fromArray(
					['White Flower', 'japanese', 'spring']),
				name: 'White Flower',
				_native: '💮',
				nativeNonQual: '💮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clinking_glasses',
			{
				keywords: _List_fromArray(
					['Clinking Glasses', 'beverage', 'drink', 'party', 'alcohol', 'celebrate', 'cheers']),
				name: 'Clinking Glasses',
				_native: '\uD83E\uDD42',
				nativeNonQual: '\uD83E\uDD42',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'robot_face',
			{
				keywords: _List_fromArray(
					['Robot Face']),
				name: 'Robot Face',
				_native: '\uD83E\uDD16',
				nativeNonQual: '\uD83E\uDD16',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'signal_strength',
			{
				keywords: _List_fromArray(
					['Antenna with Bars', 'blue-square', 'reception', 'phone', 'internet', 'connection', 'wifi', 'bluetooth', 'bars']),
				name: 'Antenna with Bars',
				_native: '📶',
				nativeNonQual: '📶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gi',
			{
				keywords: _List_fromArray(
					['Gibraltar Flag']),
				name: 'Gibraltar Flag',
				_native: '🇬🇮',
				nativeNonQual: '🇬🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gl',
			{
				keywords: _List_fromArray(
					['Greenland Flag']),
				name: 'Greenland Flag',
				_native: '🇬🇱',
				nativeNonQual: '🇬🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'motor_scooter',
			{
				keywords: _List_fromArray(
					['Motor Scooter', 'vehicle', 'vespa', 'sasha']),
				name: 'Motor Scooter',
				_native: '\uD83D\uDEF5',
				nativeNonQual: '\uD83D\uDEF5',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'mailbox',
			{
				keywords: _List_fromArray(
					['Closed Mailbox with Raised Flag', 'email', 'inbox', 'communication']),
				name: 'Closed Mailbox with Raised Flag',
				_native: '📫',
				nativeNonQual: '📫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'vibration_mode',
			{
				keywords: _List_fromArray(
					['Vibration Mode', 'orange-square', 'phone']),
				name: 'Vibration Mode',
				_native: '📳',
				nativeNonQual: '📳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hankey',
			{
				keywords: _List_fromArray(
					['Pile of Poo']),
				name: 'Pile of Poo',
				_native: '💩',
				nativeNonQual: '💩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rosette',
			{
				keywords: _List_fromArray(
					['Rosette', 'flower', 'decoration', 'military']),
				name: 'Rosette',
				_native: '🏵️',
				nativeNonQual: '🏵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'tumbler_glass',
			{
				keywords: _List_fromArray(
					['Tumbler Glass', 'drink', 'beverage', 'drunk', 'alcohol', 'liquor', 'booze', 'bourbon', 'scotch', 'whisky', 'glass', 'shot']),
				name: 'Tumbler Glass',
				_native: '\uD83E\uDD43',
				nativeNonQual: '\uD83E\uDD43',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'cup_with_straw',
			{
				keywords: _List_fromArray(
					['Cup with Straw']),
				name: 'Cup with Straw',
				_native: '\uD83E\uDD64',
				nativeNonQual: '\uD83E\uDD64',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-gm',
			{
				keywords: _List_fromArray(
					['Gambia Flag']),
				name: 'Gambia Flag',
				_native: '🇬🇲',
				nativeNonQual: '🇬🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mailbox_closed',
			{
				keywords: _List_fromArray(
					['Closed Mailbox with Lowered Flag', 'email', 'communication', 'inbox']),
				name: 'Closed Mailbox with Lowered Flag',
				_native: '📪',
				nativeNonQual: '📪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mobile_phone_off',
			{
				keywords: _List_fromArray(
					['Mobile Phone off', 'mute', 'orange-square', 'silence', 'quiet']),
				name: 'Mobile Phone off',
				_native: '📴',
				nativeNonQual: '📴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'busstop',
			{
				keywords: _List_fromArray(
					['Bus Stop', 'transportation', 'wait']),
				name: 'Bus Stop',
				_native: '🚏',
				nativeNonQual: '🚏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'smiley_cat',
			{
				keywords: _List_fromArray(
					['Smiling Cat Face with Open Mouth', 'animal', 'cats', 'happy', 'smile']),
				name: 'Smiling Cat Face with Open Mouth',
				_native: '😺',
				nativeNonQual: '😺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rose',
			{
				keywords: _List_fromArray(
					['Rose', 'flowers', 'valentines', 'love', 'spring']),
				name: 'Rose',
				_native: '🌹',
				nativeNonQual: '🌹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'motorway',
			{
				keywords: _List_fromArray(
					['Motorway', 'road', 'cupertino', 'interstate', 'highway']),
				name: 'Motorway',
				_native: '🛣️',
				nativeNonQual: '🛣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'smile_cat',
			{
				keywords: _List_fromArray(
					['Grinning Cat Face with Smiling Eyes', 'animal', 'cats', 'smile']),
				name: 'Grinning Cat Face with Smiling Eyes',
				_native: '😸',
				nativeNonQual: '😸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gn',
			{
				keywords: _List_fromArray(
					['Guinea Flag']),
				name: 'Guinea Flag',
				_native: '🇬🇳',
				nativeNonQual: '🇬🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wilted_flower',
			{
				keywords: _List_fromArray(
					['Wilted Flower', 'plant', 'nature', 'flower']),
				name: 'Wilted Flower',
				_native: '\uD83E\uDD40',
				nativeNonQual: '\uD83E\uDD40',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'mailbox_with_mail',
			{
				keywords: _List_fromArray(
					['Open Mailbox with Raised Flag', 'email', 'inbox', 'communication']),
				name: 'Open Mailbox with Raised Flag',
				_native: '📬',
				nativeNonQual: '📬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'chopsticks',
			{
				keywords: _List_fromArray(
					['Chopsticks']),
				name: 'Chopsticks',
				_native: '\uD83E\uDD62',
				nativeNonQual: '\uD83E\uDD62',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'mailbox_with_no_mail',
			{
				keywords: _List_fromArray(
					['Open Mailbox with Lowered Flag', 'email', 'inbox']),
				name: 'Open Mailbox with Lowered Flag',
				_native: '📭',
				nativeNonQual: '📭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'knife_fork_plate',
			{
				keywords: _List_fromArray(
					['Knife Fork Plate']),
				name: 'Knife Fork Plate',
				_native: '🍽️',
				nativeNonQual: '🍽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'hibiscus',
			{
				keywords: _List_fromArray(
					['Hibiscus', 'plant', 'vegetable', 'flowers', 'beach']),
				name: 'Hibiscus',
				_native: '🌺',
				nativeNonQual: '🌺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gp',
			{
				keywords: _List_fromArray(
					['Guadeloupe Flag']),
				name: 'Guadeloupe Flag',
				_native: '🇬🇵',
				nativeNonQual: '🇬🇵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'railway_track',
			{
				keywords: _List_fromArray(
					['Railway Track', 'train', 'transportation']),
				name: 'Railway Track',
				_native: '🛤️',
				nativeNonQual: '🛤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'joy_cat',
			{
				keywords: _List_fromArray(
					['Cat Face with Tears of Joy', 'animal', 'cats', 'haha', 'happy', 'tears']),
				name: 'Cat Face with Tears of Joy',
				_native: '😹',
				nativeNonQual: '😹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fuelpump',
			{
				keywords: _List_fromArray(
					['Fuel Pump', 'gas station', 'petroleum']),
				name: 'Fuel Pump',
				_native: '⛽',
				nativeNonQual: '⛽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sunflower',
			{
				keywords: _List_fromArray(
					['Sunflower', 'nature', 'plant', 'fall']),
				name: 'Sunflower',
				_native: '🌻',
				nativeNonQual: '🌻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'postbox',
			{
				keywords: _List_fromArray(
					['Postbox', 'email', 'letter', 'envelope']),
				name: 'Postbox',
				_native: '📮',
				nativeNonQual: '📮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gq',
			{
				keywords: _List_fromArray(
					['Equatorial Guinea Flag']),
				name: 'Equatorial Guinea Flag',
				_native: '🇬🇶',
				nativeNonQual: '🇬🇶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heart_eyes_cat',
			{
				keywords: _List_fromArray(
					['Smiling Cat Face with Heart-Shaped Eyes', 'animal', 'love', 'like', 'affection', 'cats', 'valentines', 'heart']),
				name: 'Smiling Cat Face with Heart-Shaped Eyes',
				_native: '😻',
				nativeNonQual: '😻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fork_and_knife',
			{
				keywords: _List_fromArray(
					['Fork and Knife', 'cutlery', 'kitchen']),
				name: 'Fork and Knife',
				_native: '🍴',
				nativeNonQual: '🍴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'recycle',
			{
				keywords: _List_fromArray(
					['Black Universal Recycling Symbol', 'arrow', 'environment', 'garbage', 'trash']),
				name: 'Black Universal Recycling Symbol',
				_native: '♻️',
				nativeNonQual: '♻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'spoon',
			{
				keywords: _List_fromArray(
					['Spoon', 'cutlery', 'kitchen', 'tableware']),
				name: 'Spoon',
				_native: '\uD83E\uDD44',
				nativeNonQual: '\uD83E\uDD44',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'blossom',
			{
				keywords: _List_fromArray(
					['Blossom', 'nature', 'flowers', 'yellow']),
				name: 'Blossom',
				_native: '🌼',
				nativeNonQual: '🌼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rotating_light',
			{
				keywords: _List_fromArray(
					['Police Cars Revolving Light', 'police', 'ambulance', '911', 'emergency', 'alert', 'error', 'pinged', 'law', 'legal']),
				name: 'Police Cars Revolving Light',
				_native: '🚨',
				nativeNonQual: '🚨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'smirk_cat',
			{
				keywords: _List_fromArray(
					['Cat Face with Wry Smile', 'animal', 'cats', 'smirk']),
				name: 'Cat Face with Wry Smile',
				_native: '😼',
				nativeNonQual: '😼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ballot_box_with_ballot',
			{
				keywords: _List_fromArray(
					['Ballot Box with Ballot']),
				name: 'Ballot Box with Ballot',
				_native: '🗳️',
				nativeNonQual: '🗳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-gr',
			{
				keywords: _List_fromArray(
					['Greece Flag']),
				name: 'Greece Flag',
				_native: '🇬🇷',
				nativeNonQual: '🇬🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'kissing_cat',
			{
				keywords: _List_fromArray(
					['Kissing Cat Face with Closed Eyes', 'animal', 'cats', 'kiss']),
				name: 'Kissing Cat Face with Closed Eyes',
				_native: '😽',
				nativeNonQual: '😽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pencil2',
			{
				keywords: _List_fromArray(
					['Pencil', 'stationery', 'write', 'paper', 'writing', 'school', 'study']),
				name: 'Pencil',
				_native: '✏️',
				nativeNonQual: '✏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'traffic_light',
			{
				keywords: _List_fromArray(
					['Horizontal Traffic Light', 'transportation', 'signal']),
				name: 'Horizontal Traffic Light',
				_native: '🚥',
				nativeNonQual: '🚥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fleur_de_lis',
			{
				keywords: _List_fromArray(
					['Fleur De Lis', 'decorative', 'scout']),
				name: 'Fleur De Lis',
				_native: '⚜️',
				nativeNonQual: '⚜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'tulip',
			{
				keywords: _List_fromArray(
					['Tulip', 'flowers', 'plant', 'nature', 'summer', 'spring']),
				name: 'Tulip',
				_native: '🌷',
				nativeNonQual: '🌷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hocho',
			{
				keywords: _List_fromArray(
					['Hocho', 'knife', 'blade', 'cutlery', 'kitchen', 'weapon']),
				name: 'Hocho',
				_native: '🔪',
				nativeNonQual: '🔪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gs',
			{
				keywords: _List_fromArray(
					['South Georgia & South Sandwich Islands Flag']),
				name: 'South Georgia & South Sandwich Islands Flag',
				_native: '🇬🇸',
				nativeNonQual: '🇬🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'seedling',
			{
				keywords: _List_fromArray(
					['Seedling', 'plant', 'nature', 'grass', 'lawn', 'spring']),
				name: 'Seedling',
				_native: '🌱',
				nativeNonQual: '🌱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'amphora',
			{
				keywords: _List_fromArray(
					['Amphora', 'vase', 'jar']),
				name: 'Amphora',
				_native: '\uD83C\uDFFA',
				nativeNonQual: '\uD83C\uDFFA',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'scream_cat',
			{
				keywords: _List_fromArray(
					['Weary Cat Face', 'animal', 'cats', 'munch', 'scared', 'scream']),
				name: 'Weary Cat Face',
				_native: '🙀',
				nativeNonQual: '🙀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'vertical_traffic_light',
			{
				keywords: _List_fromArray(
					['Vertical Traffic Light', 'transportation', 'driving']),
				name: 'Vertical Traffic Light',
				_native: '🚦',
				nativeNonQual: '🚦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_nib',
			{
				keywords: _List_fromArray(
					['Black Nib', 'pen', 'stationery', 'writing', 'write']),
				name: 'Black Nib',
				_native: '✒️',
				nativeNonQual: '✒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-gt',
			{
				keywords: _List_fromArray(
					['Guatemala Flag']),
				name: 'Guatemala Flag',
				_native: '🇬🇹',
				nativeNonQual: '🇬🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'trident',
			{
				keywords: _List_fromArray(
					['Trident Emblem', 'weapon', 'spear']),
				name: 'Trident Emblem',
				_native: '🔱',
				nativeNonQual: '🔱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gu',
			{
				keywords: _List_fromArray(
					['Guam Flag']),
				name: 'Guam Flag',
				_native: '🇬🇺',
				nativeNonQual: '🇬🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'name_badge',
			{
				keywords: _List_fromArray(
					['Name Badge', 'fire', 'forbid']),
				name: 'Name Badge',
				_native: '📛',
				nativeNonQual: '📛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'construction',
			{
				keywords: _List_fromArray(
					['Construction Sign', 'wip', 'progress', 'caution', 'warning']),
				name: 'Construction Sign',
				_native: '🚧',
				nativeNonQual: '🚧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lower_left_fountain_pen',
			{
				keywords: _List_fromArray(
					['Lower Left Fountain Pen']),
				name: 'Lower Left Fountain Pen',
				_native: '🖋️',
				nativeNonQual: '🖋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'evergreen_tree',
			{
				keywords: _List_fromArray(
					['Evergreen Tree', 'plant', 'nature']),
				name: 'Evergreen Tree',
				_native: '🌲',
				nativeNonQual: '🌲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'crying_cat_face',
			{
				keywords: _List_fromArray(
					['Crying Cat Face', 'animal', 'tears', 'weep', 'sad', 'cats', 'upset', 'cry']),
				name: 'Crying Cat Face',
				_native: '😿',
				nativeNonQual: '😿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gw',
			{
				keywords: _List_fromArray(
					['Guinea-Bissau Flag']),
				name: 'Guinea-Bissau Flag',
				_native: '🇬🇼',
				nativeNonQual: '🇬🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lower_left_ballpoint_pen',
			{
				keywords: _List_fromArray(
					['Lower Left Ballpoint Pen']),
				name: 'Lower Left Ballpoint Pen',
				_native: '🖊️',
				nativeNonQual: '🖊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'pouting_cat',
			{
				keywords: _List_fromArray(
					['Pouting Cat Face', 'animal', 'cats']),
				name: 'Pouting Cat Face',
				_native: '😾',
				nativeNonQual: '😾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'deciduous_tree',
			{
				keywords: _List_fromArray(
					['Deciduous Tree', 'plant', 'nature']),
				name: 'Deciduous Tree',
				_native: '🌳',
				nativeNonQual: '🌳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'octagonal_sign',
			{
				keywords: _List_fromArray(
					['Octagonal Sign']),
				name: 'Octagonal Sign',
				_native: '\uD83D\uDED1',
				nativeNonQual: '\uD83D\uDED1',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'beginner',
			{
				keywords: _List_fromArray(
					['Japanese Symbol for Beginner', 'badge', 'shield']),
				name: 'Japanese Symbol for Beginner',
				_native: '🔰',
				nativeNonQual: '🔰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-gy',
			{
				keywords: _List_fromArray(
					['Guyana Flag']),
				name: 'Guyana Flag',
				_native: '🇬🇾',
				nativeNonQual: '🇬🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lower_left_paintbrush',
			{
				keywords: _List_fromArray(
					['Lower Left Paintbrush']),
				name: 'Lower Left Paintbrush',
				_native: '🖌️',
				nativeNonQual: '🖌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'o',
			{
				keywords: _List_fromArray(
					['Heavy Large Circle', 'circle', 'round']),
				name: 'Heavy Large Circle',
				_native: '⭕',
				nativeNonQual: '⭕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'palm_tree',
			{
				keywords: _List_fromArray(
					['Palm Tree', 'plant', 'vegetable', 'nature', 'summer', 'beach', 'mojito', 'tropical']),
				name: 'Palm Tree',
				_native: '🌴',
				nativeNonQual: '🌴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'anchor',
			{
				keywords: _List_fromArray(
					['Anchor', 'ship', 'ferry', 'sea', 'boat']),
				name: 'Anchor',
				_native: '⚓',
				nativeNonQual: '⚓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'see_no_evil',
			{
				keywords: _List_fromArray(
					['See-No-Evil Monkey', 'monkey', 'animal', 'nature', 'haha']),
				name: 'See-No-Evil Monkey',
				_native: '🙈',
				nativeNonQual: '🙈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'boat',
			{
				keywords: _List_fromArray(
					['Sailboat']),
				name: 'Sailboat',
				_native: '⛵',
				nativeNonQual: '⛵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'white_check_mark',
			{
				keywords: _List_fromArray(
					['White Heavy Check Mark', 'green-square', 'ok', 'agree', 'vote', 'election', 'answer', 'tick']),
				name: 'White Heavy Check Mark',
				_native: '✅',
				nativeNonQual: '✅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-hk',
			{
				keywords: _List_fromArray(
					['Hong Kong Sar China Flag']),
				name: 'Hong Kong Sar China Flag',
				_native: '🇭🇰',
				nativeNonQual: '🇭🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lower_left_crayon',
			{
				keywords: _List_fromArray(
					['Lower Left Crayon']),
				name: 'Lower Left Crayon',
				_native: '🖍️',
				nativeNonQual: '🖍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'hear_no_evil',
			{
				keywords: _List_fromArray(
					['Hear-No-Evil Monkey', 'animal', 'monkey', 'nature']),
				name: 'Hear-No-Evil Monkey',
				_native: '🙉',
				nativeNonQual: '🙉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cactus',
			{
				keywords: _List_fromArray(
					['Cactus', 'vegetable', 'plant', 'nature']),
				name: 'Cactus',
				_native: '🌵',
				nativeNonQual: '🌵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ear_of_rice',
			{
				keywords: _List_fromArray(
					['Ear of Rice', 'nature', 'plant']),
				name: 'Ear of Rice',
				_native: '🌾',
				nativeNonQual: '🌾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'speak_no_evil',
			{
				keywords: _List_fromArray(
					['Speak-No-Evil Monkey', 'monkey', 'animal', 'nature', 'omg']),
				name: 'Speak-No-Evil Monkey',
				_native: '🙊',
				nativeNonQual: '🙊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-hm',
			{
				keywords: _List_fromArray(
					['Heard & Mcdonald Islands Flag']),
				name: 'Heard & Mcdonald Islands Flag',
				_native: '🇭🇲',
				nativeNonQual: '🇭🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ballot_box_with_check',
			{
				keywords: _List_fromArray(
					['Ballot Box with Check', 'ok', 'agree', 'confirm', 'black-square', 'vote', 'election', 'yes', 'tick']),
				name: 'Ballot Box with Check',
				_native: '☑️',
				nativeNonQual: '☑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'canoe',
			{
				keywords: _List_fromArray(
					['Canoe', 'boat', 'paddle', 'water', 'ship']),
				name: 'Canoe',
				_native: '\uD83D\uDEF6',
				nativeNonQual: '\uD83D\uDEF6',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'memo',
			{
				keywords: _List_fromArray(
					['Memo', 'write', 'documents', 'stationery', 'pencil', 'paper', 'writing', 'legal', 'exam', 'quiz', 'test', 'study', 'compose']),
				name: 'Memo',
				_native: '📝',
				nativeNonQual: '📝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'herb',
			{
				keywords: _List_fromArray(
					['Herb', 'vegetable', 'plant', 'medicine', 'weed', 'grass', 'lawn']),
				name: 'Herb',
				_native: '🌿',
				nativeNonQual: '🌿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-hn',
			{
				keywords: _List_fromArray(
					['Honduras Flag']),
				name: 'Honduras Flag',
				_native: '🇭🇳',
				nativeNonQual: '🇭🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heavy_check_mark',
			{
				keywords: _List_fromArray(
					['Heavy Check Mark', 'ok', 'nike', 'answer', 'yes', 'tick']),
				name: 'Heavy Check Mark',
				_native: '✔️',
				nativeNonQual: '✔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'briefcase',
			{
				keywords: _List_fromArray(
					['Briefcase', 'business', 'documents', 'work', 'law', 'legal', 'job', 'career']),
				name: 'Briefcase',
				_native: '💼',
				nativeNonQual: '💼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'speedboat',
			{
				keywords: _List_fromArray(
					['Speedboat', 'ship', 'transportation', 'vehicle', 'summer']),
				name: 'Speedboat',
				_native: '🚤',
				nativeNonQual: '🚤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'baby',
			{
				keywords: _List_fromArray(
					['Baby', 'child', 'boy', 'girl', 'toddler']),
				name: 'Baby',
				_native: '👶',
				nativeNonQual: '👶',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👶\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👶\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👶\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👶\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👶\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'heavy_multiplication_x',
			{
				keywords: _List_fromArray(
					['Heavy Multiplication X', 'math', 'calculation']),
				name: 'Heavy Multiplication X',
				_native: '✖️',
				nativeNonQual: '✖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'child',
			{
				keywords: _List_fromArray(
					['Child']),
				name: 'Child',
				_native: '\uD83E\uDDD2',
				nativeNonQual: '\uD83E\uDDD2',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD2\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD2\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD2\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD2\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD2\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'shamrock',
			{
				keywords: _List_fromArray(
					['Shamrock', 'vegetable', 'plant', 'nature', 'irish', 'clover']),
				name: 'Shamrock',
				_native: '☘️',
				nativeNonQual: '☘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'passenger_ship',
			{
				keywords: _List_fromArray(
					['Passenger Ship', 'yacht', 'cruise', 'ferry']),
				name: 'Passenger Ship',
				_native: '🛳️',
				nativeNonQual: '🛳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-hr',
			{
				keywords: _List_fromArray(
					['Croatia Flag']),
				name: 'Croatia Flag',
				_native: '🇭🇷',
				nativeNonQual: '🇭🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'file_folder',
			{
				keywords: _List_fromArray(
					['File Folder', 'documents', 'business', 'office']),
				name: 'File Folder',
				_native: '📁',
				nativeNonQual: '📁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'x',
			{
				keywords: _List_fromArray(
					['Cross Mark', 'no', 'delete', 'remove', 'cancel']),
				name: 'Cross Mark',
				_native: '❌',
				nativeNonQual: '❌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'four_leaf_clover',
			{
				keywords: _List_fromArray(
					['Four Leaf Clover', 'vegetable', 'plant', 'nature', 'lucky', 'irish']),
				name: 'Four Leaf Clover',
				_native: '🍀',
				nativeNonQual: '🍀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'open_file_folder',
			{
				keywords: _List_fromArray(
					['Open File Folder', 'documents', 'load']),
				name: 'Open File Folder',
				_native: '📂',
				nativeNonQual: '📂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'boy',
			{
				keywords: _List_fromArray(
					['Boy', 'man', 'male', 'guy', 'teenager']),
				name: 'Boy',
				_native: '👦',
				nativeNonQual: '👦',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👦\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👦\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👦\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👦\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👦\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'ferry',
			{
				keywords: _List_fromArray(
					['Ferry', 'boat', 'ship', 'yacht']),
				name: 'Ferry',
				_native: '⛴️',
				nativeNonQual: '⛴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ht',
			{
				keywords: _List_fromArray(
					['Haiti Flag']),
				name: 'Haiti Flag',
				_native: '🇭🇹',
				nativeNonQual: '🇭🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'girl',
			{
				keywords: _List_fromArray(
					['Girl', 'female', 'woman', 'teenager']),
				name: 'Girl',
				_native: '👧',
				nativeNonQual: '👧',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👧\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👧\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👧\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👧\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👧\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'negative_squared_cross_mark',
			{
				keywords: _List_fromArray(
					['Negative Squared Cross Mark', 'x', 'green-square', 'no', 'deny']),
				name: 'Negative Squared Cross Mark',
				_native: '❎',
				nativeNonQual: '❎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-hu',
			{
				keywords: _List_fromArray(
					['Hungary Flag']),
				name: 'Hungary Flag',
				_native: '🇭🇺',
				nativeNonQual: '🇭🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'card_index_dividers',
			{
				keywords: _List_fromArray(
					['Card Index Dividers', 'organizing', 'business', 'stationery']),
				name: 'Card Index Dividers',
				_native: '🗂️',
				nativeNonQual: '🗂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'maple_leaf',
			{
				keywords: _List_fromArray(
					['Maple Leaf', 'nature', 'plant', 'vegetable', 'ca', 'fall']),
				name: 'Maple Leaf',
				_native: '🍁',
				nativeNonQual: '🍁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'motor_boat',
			{
				keywords: _List_fromArray(
					['Motor Boat', 'ship']),
				name: 'Motor Boat',
				_native: '🛥️',
				nativeNonQual: '🛥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-ic',
			{
				keywords: _List_fromArray(
					['Canary Islands Flag']),
				name: 'Canary Islands Flag',
				_native: '🇮🇨',
				nativeNonQual: '🇮🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fallen_leaf',
			{
				keywords: _List_fromArray(
					['Fallen Leaf', 'nature', 'plant', 'vegetable', 'leaves']),
				name: 'Fallen Leaf',
				_native: '🍂',
				nativeNonQual: '🍂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'adult',
			{
				keywords: _List_fromArray(
					['Adult']),
				name: 'Adult',
				_native: '\uD83E\uDDD1',
				nativeNonQual: '\uD83E\uDDD1',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD1\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD1\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD1\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD1\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD1\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'ship',
			{
				keywords: _List_fromArray(
					['Ship', 'transportation', 'titanic', 'deploy']),
				name: 'Ship',
				_native: '🚢',
				nativeNonQual: '🚢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heavy_plus_sign',
			{
				keywords: _List_fromArray(
					['Heavy Plus Sign', 'math', 'calculation', 'addition', 'more', 'increase']),
				name: 'Heavy Plus Sign',
				_native: '➕',
				nativeNonQual: '➕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'date',
			{
				keywords: _List_fromArray(
					['Calendar', 'calendar', 'schedule']),
				name: 'Calendar',
				_native: '📅',
				nativeNonQual: '📅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man',
			{
				keywords: _List_fromArray(
					['Man', 'mustache', 'father', 'dad', 'guy', 'classy', 'sir', 'moustache']),
				name: 'Man',
				_native: '👨',
				nativeNonQual: '👨',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-id',
			{
				keywords: _List_fromArray(
					['Indonesia Flag']),
				name: 'Indonesia Flag',
				_native: '🇮🇩',
				nativeNonQual: '🇮🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'leaves',
			{
				keywords: _List_fromArray(
					['Leaf Fluttering in Wind', 'nature', 'plant', 'tree', 'vegetable', 'grass', 'lawn', 'spring']),
				name: 'Leaf Fluttering in Wind',
				_native: '🍃',
				nativeNonQual: '🍃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heavy_minus_sign',
			{
				keywords: _List_fromArray(
					['Heavy Minus Sign', 'math', 'calculation', 'subtract', 'less']),
				name: 'Heavy Minus Sign',
				_native: '➖',
				nativeNonQual: '➖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'calendar',
			{
				keywords: _List_fromArray(
					['Tear-off Calendar', 'schedule', 'date', 'planning']),
				name: 'Tear-off Calendar',
				_native: '📆',
				nativeNonQual: '📆',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'airplane',
			{
				keywords: _List_fromArray(
					['Airplane', 'vehicle', 'transportation', 'flight', 'fly']),
				name: 'Airplane',
				_native: '✈️',
				nativeNonQual: '✈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'spiral_note_pad',
			{
				keywords: _List_fromArray(
					['Spiral Note Pad']),
				name: 'Spiral Note Pad',
				_native: '🗒️',
				nativeNonQual: '🗒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'heavy_division_sign',
			{
				keywords: _List_fromArray(
					['Heavy Division Sign', 'divide', 'math', 'calculation']),
				name: 'Heavy Division Sign',
				_native: '➗',
				nativeNonQual: '➗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'small_airplane',
			{
				keywords: _List_fromArray(
					['Small Airplane', 'flight', 'transportation', 'fly', 'vehicle']),
				name: 'Small Airplane',
				_native: '🛩️',
				nativeNonQual: '🛩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'woman',
			{
				keywords: _List_fromArray(
					['Woman', 'female', 'girls', 'lady']),
				name: 'Woman',
				_native: '👩',
				nativeNonQual: '👩',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ie',
			{
				keywords: _List_fromArray(
					['Ireland Flag']),
				name: 'Ireland Flag',
				_native: '🇮🇪',
				nativeNonQual: '🇮🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'curly_loop',
			{
				keywords: _List_fromArray(
					['Curly Loop', 'scribble', 'draw', 'shape', 'squiggle']),
				name: 'Curly Loop',
				_native: '➰',
				nativeNonQual: '➰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-il',
			{
				keywords: _List_fromArray(
					['Israel Flag']),
				name: 'Israel Flag',
				_native: '🇮🇱',
				nativeNonQual: '🇮🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'airplane_departure',
			{
				keywords: _List_fromArray(
					['Airplane Departure']),
				name: 'Airplane Departure',
				_native: '🛫',
				nativeNonQual: '🛫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'spiral_calendar_pad',
			{
				keywords: _List_fromArray(
					['Spiral Calendar Pad']),
				name: 'Spiral Calendar Pad',
				_native: '🗓️',
				nativeNonQual: '🗓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'older_adult',
			{
				keywords: _List_fromArray(
					['Older Adult']),
				name: 'Older Adult',
				_native: '\uD83E\uDDD3',
				nativeNonQual: '\uD83E\uDDD3',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD3\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD3\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD3\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD3\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD3\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'airplane_arriving',
			{
				keywords: _List_fromArray(
					['Airplane Arriving']),
				name: 'Airplane Arriving',
				_native: '🛬',
				nativeNonQual: '🛬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'card_index',
			{
				keywords: _List_fromArray(
					['Card Index', 'business', 'stationery']),
				name: 'Card Index',
				_native: '📇',
				nativeNonQual: '📇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'loop',
			{
				keywords: _List_fromArray(
					['Double Curly Loop', 'tape', 'cassette']),
				name: 'Double Curly Loop',
				_native: '➿',
				nativeNonQual: '➿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'older_man',
			{
				keywords: _List_fromArray(
					['Older Man', 'human', 'male', 'men', 'old', 'elder', 'senior']),
				name: 'Older Man',
				_native: '👴',
				nativeNonQual: '👴',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👴\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👴\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👴\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👴\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👴\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-im',
			{
				keywords: _List_fromArray(
					['Isle of Man Flag']),
				name: 'Isle of Man Flag',
				_native: '🇮🇲',
				nativeNonQual: '🇮🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-in',
			{
				keywords: _List_fromArray(
					['India Flag']),
				name: 'India Flag',
				_native: '🇮🇳',
				nativeNonQual: '🇮🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'chart_with_upwards_trend',
			{
				keywords: _List_fromArray(
					['Chart with Upwards Trend', 'graph', 'presentation', 'stats', 'recovery', 'business', 'economics', 'money', 'sales', 'good', 'success']),
				name: 'Chart with Upwards Trend',
				_native: '📈',
				nativeNonQual: '📈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'part_alternation_mark',
			{
				keywords: _List_fromArray(
					['Part Alternation Mark', 'graph', 'presentation', 'stats', 'business', 'economics', 'bad']),
				name: 'Part Alternation Mark',
				_native: '〽️',
				nativeNonQual: '〽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'seat',
			{
				keywords: _List_fromArray(
					['Seat', 'sit', 'airplane', 'transport', 'bus', 'flight', 'fly']),
				name: 'Seat',
				_native: '💺',
				nativeNonQual: '💺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'older_woman',
			{
				keywords: _List_fromArray(
					['Older Woman', 'human', 'female', 'women', 'lady', 'old', 'elder', 'senior']),
				name: 'Older Woman',
				_native: '👵',
				nativeNonQual: '👵',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👵\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👵\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👵\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👵\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👵\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'eight_spoked_asterisk',
			{
				keywords: _List_fromArray(
					['Eight Spoked Asterisk', 'star', 'sparkle', 'green-square']),
				name: 'Eight Spoked Asterisk',
				_native: '✳️',
				nativeNonQual: '✳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'chart_with_downwards_trend',
			{
				keywords: _List_fromArray(
					['Chart with Downwards Trend', 'graph', 'presentation', 'stats', 'recession', 'business', 'economics', 'money', 'sales', 'bad', 'failure']),
				name: 'Chart with Downwards Trend',
				_native: '📉',
				nativeNonQual: '📉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-io',
			{
				keywords: _List_fromArray(
					['British Indian Ocean Territory Flag']),
				name: 'British Indian Ocean Territory Flag',
				_native: '🇮🇴',
				nativeNonQual: '🇮🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-doctor',
			{
				keywords: _List_fromArray(
					['Male Doctor']),
				name: 'Male Doctor',
				_native: '👨\u200D⚕️',
				nativeNonQual: '👨\u200D⚕',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D⚕️'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D⚕️'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D⚕️'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D⚕️'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D⚕️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'helicopter',
			{
				keywords: _List_fromArray(
					['Helicopter', 'transportation', 'vehicle', 'fly']),
				name: 'Helicopter',
				_native: '🚁',
				nativeNonQual: '🚁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-doctor',
			{
				keywords: _List_fromArray(
					['Female Doctor']),
				name: 'Female Doctor',
				_native: '👩\u200D⚕️',
				nativeNonQual: '👩\u200D⚕',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D⚕️'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D⚕️'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D⚕️'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D⚕️'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D⚕️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'suspension_railway',
			{
				keywords: _List_fromArray(
					['Suspension Railway', 'vehicle', 'transportation']),
				name: 'Suspension Railway',
				_native: '🚟',
				nativeNonQual: '🚟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bar_chart',
			{
				keywords: _List_fromArray(
					['Bar Chart', 'graph', 'presentation', 'stats']),
				name: 'Bar Chart',
				_native: '📊',
				nativeNonQual: '📊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-iq',
			{
				keywords: _List_fromArray(
					['Iraq Flag']),
				name: 'Iraq Flag',
				_native: '🇮🇶',
				nativeNonQual: '🇮🇶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'eight_pointed_black_star',
			{
				keywords: _List_fromArray(
					['Eight Pointed Black Star', 'orange-square', 'shape', 'polygon']),
				name: 'Eight Pointed Black Star',
				_native: '✴️',
				nativeNonQual: '✴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'mountain_cableway',
			{
				keywords: _List_fromArray(
					['Mountain Cableway', 'transportation', 'vehicle', 'ski']),
				name: 'Mountain Cableway',
				_native: '🚠',
				nativeNonQual: '🚠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-student',
			{
				keywords: _List_fromArray(
					['Male Student']),
				name: 'Male Student',
				_native: '👨\u200D🎓',
				nativeNonQual: '👨\u200D🎓',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🎓'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🎓'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🎓'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🎓'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🎓')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'clipboard',
			{
				keywords: _List_fromArray(
					['Clipboard', 'stationery', 'documents']),
				name: 'Clipboard',
				_native: '📋',
				nativeNonQual: '📋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ir',
			{
				keywords: _List_fromArray(
					['Iran Flag']),
				name: 'Iran Flag',
				_native: '🇮🇷',
				nativeNonQual: '🇮🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sparkle',
			{
				keywords: _List_fromArray(
					['Sparkle', 'stars', 'green-square', 'awesome', 'good', 'fireworks']),
				name: 'Sparkle',
				_native: '❇️',
				nativeNonQual: '❇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'female-student',
			{
				keywords: _List_fromArray(
					['Female Student']),
				name: 'Female Student',
				_native: '👩\u200D🎓',
				nativeNonQual: '👩\u200D🎓',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🎓'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🎓'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🎓'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🎓'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🎓')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'pushpin',
			{
				keywords: _List_fromArray(
					['Pushpin', 'stationery', 'mark', 'here']),
				name: 'Pushpin',
				_native: '📌',
				nativeNonQual: '📌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'aerial_tramway',
			{
				keywords: _List_fromArray(
					['Aerial Tramway', 'transportation', 'vehicle', 'ski']),
				name: 'Aerial Tramway',
				_native: '🚡',
				nativeNonQual: '🚡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-is',
			{
				keywords: _List_fromArray(
					['Iceland Flag']),
				name: 'Iceland Flag',
				_native: '🇮🇸',
				nativeNonQual: '🇮🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bangbang',
			{
				keywords: _List_fromArray(
					['Double Exclamation Mark', 'exclamation', 'surprise']),
				name: 'Double Exclamation Mark',
				_native: '‼️',
				nativeNonQual: '‼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'interrobang',
			{
				keywords: _List_fromArray(
					['Exclamation Question Mark', 'wat', 'punctuation', 'surprise']),
				name: 'Exclamation Question Mark',
				_native: '⁉️',
				nativeNonQual: '⁉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'satellite',
			{
				keywords: _List_fromArray(
					['Satellite', 'communication', 'future', 'radio', 'space']),
				name: 'Satellite',
				_native: '🛰️',
				nativeNonQual: '🛰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'it',
			{
				keywords: _List_fromArray(
					['Italy Flag', 'italy', 'flag', 'nation', 'country', 'banner']),
				name: 'Italy Flag',
				_native: '🇮🇹',
				nativeNonQual: '🇮🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-teacher',
			{
				keywords: _List_fromArray(
					['Male Teacher']),
				name: 'Male Teacher',
				_native: '👨\u200D🏫',
				nativeNonQual: '👨\u200D🏫',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🏫'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🏫'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🏫'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🏫'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🏫')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'round_pushpin',
			{
				keywords: _List_fromArray(
					['Round Pushpin', 'stationery', 'location', 'map', 'here']),
				name: 'Round Pushpin',
				_native: '📍',
				nativeNonQual: '📍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-je',
			{
				keywords: _List_fromArray(
					['Jersey Flag']),
				name: 'Jersey Flag',
				_native: '🇯🇪',
				nativeNonQual: '🇯🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'question',
			{
				keywords: _List_fromArray(
					['Black Question Mark Ornament', 'doubt', 'confused']),
				name: 'Black Question Mark Ornament',
				_native: '❓',
				nativeNonQual: '❓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rocket',
			{
				keywords: _List_fromArray(
					['Rocket', 'launch', 'ship', 'staffmode', 'NASA', 'outer space', 'outer_space', 'fly']),
				name: 'Rocket',
				_native: '🚀',
				nativeNonQual: '🚀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-teacher',
			{
				keywords: _List_fromArray(
					['Female Teacher']),
				name: 'Female Teacher',
				_native: '👩\u200D🏫',
				nativeNonQual: '👩\u200D🏫',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🏫'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🏫'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🏫'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🏫'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🏫')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'paperclip',
			{
				keywords: _List_fromArray(
					['Paperclip', 'documents', 'stationery']),
				name: 'Paperclip',
				_native: '📎',
				nativeNonQual: '📎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'linked_paperclips',
			{
				keywords: _List_fromArray(
					['Linked Paperclips']),
				name: 'Linked Paperclips',
				_native: '🖇️',
				nativeNonQual: '🖇',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flying_saucer',
			{
				keywords: _List_fromArray(
					['Flying Saucer']),
				name: 'Flying Saucer',
				_native: '\uD83D\uDEF8',
				nativeNonQual: '\uD83D\uDEF8',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'male-judge',
			{
				keywords: _List_fromArray(
					['Male Judge']),
				name: 'Male Judge',
				_native: '👨\u200D⚖️',
				nativeNonQual: '👨\u200D⚖',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D⚖️'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D⚖️'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D⚖️'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D⚖️'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D⚖️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'grey_question',
			{
				keywords: _List_fromArray(
					['White Question Mark Ornament', 'doubts', 'gray', 'huh', 'confused']),
				name: 'White Question Mark Ornament',
				_native: '❔',
				nativeNonQual: '❔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-jm',
			{
				keywords: _List_fromArray(
					['Jamaica Flag']),
				name: 'Jamaica Flag',
				_native: '🇯🇲',
				nativeNonQual: '🇯🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bellhop_bell',
			{
				keywords: _List_fromArray(
					['Bellhop Bell', 'service']),
				name: 'Bellhop Bell',
				_native: '🛎️',
				nativeNonQual: '🛎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'straight_ruler',
			{
				keywords: _List_fromArray(
					['Straight Ruler', 'stationery', 'calculate', 'length', 'math', 'school', 'drawing', 'architect', 'sketch']),
				name: 'Straight Ruler',
				_native: '📏',
				nativeNonQual: '📏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-jo',
			{
				keywords: _List_fromArray(
					['Jordan Flag']),
				name: 'Jordan Flag',
				_native: '🇯🇴',
				nativeNonQual: '🇯🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-judge',
			{
				keywords: _List_fromArray(
					['Female Judge']),
				name: 'Female Judge',
				_native: '👩\u200D⚖️',
				nativeNonQual: '👩\u200D⚖',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D⚖️'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D⚖️'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D⚖️'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D⚖️'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D⚖️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'grey_exclamation',
			{
				keywords: _List_fromArray(
					['White Exclamation Mark Ornament', 'surprise', 'punctuation', 'gray', 'wow', 'warning']),
				name: 'White Exclamation Mark Ornament',
				_native: '❕',
				nativeNonQual: '❕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'door',
			{
				keywords: _List_fromArray(
					['Door', 'house', 'entry', 'exit']),
				name: 'Door',
				_native: '🚪',
				nativeNonQual: '🚪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-farmer',
			{
				keywords: _List_fromArray(
					['Male Farmer']),
				name: 'Male Farmer',
				_native: '👨\u200D🌾',
				nativeNonQual: '👨\u200D🌾',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🌾'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🌾'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🌾'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🌾'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🌾')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'jp',
			{
				keywords: _List_fromArray(
					['Japan Flag', 'japanese', 'nation', 'flag', 'country', 'banner']),
				name: 'Japan Flag',
				_native: '🇯🇵',
				nativeNonQual: '🇯🇵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'triangular_ruler',
			{
				keywords: _List_fromArray(
					['Triangular Ruler', 'stationery', 'math', 'architect', 'sketch']),
				name: 'Triangular Ruler',
				_native: '📐',
				nativeNonQual: '📐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'exclamation',
			{
				keywords: _List_fromArray(
					['Heavy Exclamation Mark Symbol', 'heavy_exclamation_mark', 'danger', 'surprise', 'punctuation', 'wow', 'warning']),
				name: 'Heavy Exclamation Mark Symbol',
				_native: '❗',
				nativeNonQual: '❗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bed',
			{
				keywords: _List_fromArray(
					['Bed', 'sleep', 'rest']),
				name: 'Bed',
				_native: '🛏️',
				nativeNonQual: '🛏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'female-farmer',
			{
				keywords: _List_fromArray(
					['Female Farmer']),
				name: 'Female Farmer',
				_native: '👩\u200D🌾',
				nativeNonQual: '👩\u200D🌾',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🌾'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🌾'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🌾'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🌾'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🌾')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'scissors',
			{
				keywords: _List_fromArray(
					['Black Scissors', 'stationery', 'cut']),
				name: 'Black Scissors',
				_native: '✂️',
				nativeNonQual: '✂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'wavy_dash',
			{
				keywords: _List_fromArray(
					['Wavy Dash', 'draw', 'line', 'moustache', 'mustache', 'squiggle', 'scribble']),
				name: 'Wavy Dash',
				_native: '〰️',
				nativeNonQual: '〰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-ke',
			{
				keywords: _List_fromArray(
					['Kenya Flag']),
				name: 'Kenya Flag',
				_native: '🇰🇪',
				nativeNonQual: '🇰🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-kg',
			{
				keywords: _List_fromArray(
					['Kyrgyzstan Flag']),
				name: 'Kyrgyzstan Flag',
				_native: '🇰🇬',
				nativeNonQual: '🇰🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'couch_and_lamp',
			{
				keywords: _List_fromArray(
					['Couch and Lamp', 'read', 'chill']),
				name: 'Couch and Lamp',
				_native: '🛋️',
				nativeNonQual: '🛋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'male-cook',
			{
				keywords: _List_fromArray(
					['Male Cook']),
				name: 'Male Cook',
				_native: '👨\u200D🍳',
				nativeNonQual: '👨\u200D🍳',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🍳'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🍳'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🍳'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🍳'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🍳')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'card_file_box',
			{
				keywords: _List_fromArray(
					['Card File Box', 'business', 'stationery']),
				name: 'Card File Box',
				_native: '🗃️',
				nativeNonQual: '🗃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'copyright',
			{
				keywords: _List_fromArray(
					['Copyright Sign', 'ip', 'license', 'circle', 'law', 'legal']),
				name: 'Copyright Sign',
				_native: '©️',
				nativeNonQual: '©',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'file_cabinet',
			{
				keywords: _List_fromArray(
					['File Cabinet', 'filing', 'organizing']),
				name: 'File Cabinet',
				_native: '🗄️',
				nativeNonQual: '🗄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'registered',
			{
				keywords: _List_fromArray(
					['Registered Sign', 'alphabet', 'circle']),
				name: 'Registered Sign',
				_native: '®️',
				nativeNonQual: '®',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-kh',
			{
				keywords: _List_fromArray(
					['Cambodia Flag']),
				name: 'Cambodia Flag',
				_native: '🇰🇭',
				nativeNonQual: '🇰🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-cook',
			{
				keywords: _List_fromArray(
					['Female Cook']),
				name: 'Female Cook',
				_native: '👩\u200D🍳',
				nativeNonQual: '👩\u200D🍳',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🍳'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🍳'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🍳'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🍳'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🍳')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'toilet',
			{
				keywords: _List_fromArray(
					['Toilet', 'restroom', 'wc', 'washroom', 'bathroom', 'potty']),
				name: 'Toilet',
				_native: '🚽',
				nativeNonQual: '🚽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wastebasket',
			{
				keywords: _List_fromArray(
					['Wastebasket', 'bin', 'trash', 'rubbish', 'garbage', 'toss']),
				name: 'Wastebasket',
				_native: '🗑️',
				nativeNonQual: '🗑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-ki',
			{
				keywords: _List_fromArray(
					['Kiribati Flag']),
				name: 'Kiribati Flag',
				_native: '🇰🇮',
				nativeNonQual: '🇰🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shower',
			{
				keywords: _List_fromArray(
					['Shower', 'clean', 'water', 'bathroom']),
				name: 'Shower',
				_native: '🚿',
				nativeNonQual: '🚿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-mechanic',
			{
				keywords: _List_fromArray(
					['Male Mechanic']),
				name: 'Male Mechanic',
				_native: '👨\u200D🔧',
				nativeNonQual: '👨\u200D🔧',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🔧'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🔧'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🔧'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🔧'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🔧')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'tm',
			{
				keywords: _List_fromArray(
					['Trade Mark Sign', 'trademark', 'brand', 'law', 'legal']),
				name: 'Trade Mark Sign',
				_native: '™️',
				nativeNonQual: '™',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'hash',
			{
				keywords: _List_fromArray(
					['Hash Key', 'symbol', 'blue-square', 'twitter']),
				name: 'Hash Key',
				_native: '#️⃣',
				nativeNonQual: '#⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-km',
			{
				keywords: _List_fromArray(
					['Comoros Flag']),
				name: 'Comoros Flag',
				_native: '🇰🇲',
				nativeNonQual: '🇰🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bathtub',
			{
				keywords: _List_fromArray(
					['Bathtub', 'clean', 'shower', 'bathroom']),
				name: 'Bathtub',
				_native: '🛁',
				nativeNonQual: '🛁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-mechanic',
			{
				keywords: _List_fromArray(
					['Female Mechanic']),
				name: 'Female Mechanic',
				_native: '👩\u200D🔧',
				nativeNonQual: '👩\u200D🔧',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🔧'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🔧'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🔧'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🔧'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🔧')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'lock',
			{
				keywords: _List_fromArray(
					['Lock', 'security', 'password', 'padlock']),
				name: 'Lock',
				_native: '🔒',
				nativeNonQual: '🔒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-factory-worker',
			{
				keywords: _List_fromArray(
					['Male Factory Worker']),
				name: 'Male Factory Worker',
				_native: '👨\u200D🏭',
				nativeNonQual: '👨\u200D🏭',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🏭'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🏭'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🏭'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🏭'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🏭')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-kn',
			{
				keywords: _List_fromArray(
					['St. Kitts & Nevis Flag']),
				name: 'St. Kitts & Nevis Flag',
				_native: '🇰🇳',
				nativeNonQual: '🇰🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hourglass',
			{
				keywords: _List_fromArray(
					['Hourglass', 'time', 'clock', 'oldschool', 'limit', 'exam', 'quiz', 'test']),
				name: 'Hourglass',
				_native: '⌛',
				nativeNonQual: '⌛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'keycap_star',
			{
				keywords: _List_fromArray(
					['Keycap Star']),
				name: 'Keycap Star',
				_native: '*️⃣',
				nativeNonQual: '*⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'unlock',
			{
				keywords: _List_fromArray(
					['Open Lock', 'privacy', 'security']),
				name: 'Open Lock',
				_native: '🔓',
				nativeNonQual: '🔓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-kp',
			{
				keywords: _List_fromArray(
					['North Korea Flag']),
				name: 'North Korea Flag',
				_native: '🇰🇵',
				nativeNonQual: '🇰🇵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-factory-worker',
			{
				keywords: _List_fromArray(
					['Female Factory Worker']),
				name: 'Female Factory Worker',
				_native: '👩\u200D🏭',
				nativeNonQual: '👩\u200D🏭',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🏭'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🏭'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🏭'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🏭'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🏭')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'zero',
			{
				keywords: _List_fromArray(
					['Keycap 0', '0', 'numbers', 'blue-square', 'null']),
				name: 'Keycap 0',
				_native: '0️⃣',
				nativeNonQual: '0⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'lock_with_ink_pen',
			{
				keywords: _List_fromArray(
					['Lock with Ink Pen', 'security', 'secret']),
				name: 'Lock with Ink Pen',
				_native: '🔏',
				nativeNonQual: '🔏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hourglass_flowing_sand',
			{
				keywords: _List_fromArray(
					['Hourglass with Flowing Sand', 'oldschool', 'time', 'countdown']),
				name: 'Hourglass with Flowing Sand',
				_native: '⏳',
				nativeNonQual: '⏳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'one',
			{
				keywords: _List_fromArray(
					['Keycap 1', 'blue-square', 'numbers', '1']),
				name: 'Keycap 1',
				_native: '1️⃣',
				nativeNonQual: '1⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'kr',
			{
				keywords: _List_fromArray(
					['South Korea Flag', 'south', 'korea', 'nation', 'flag', 'country', 'banner']),
				name: 'South Korea Flag',
				_native: '🇰🇷',
				nativeNonQual: '🇰🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'watch',
			{
				keywords: _List_fromArray(
					['Watch', 'time', 'accessories']),
				name: 'Watch',
				_native: '⌚',
				nativeNonQual: '⌚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'male-office-worker',
			{
				keywords: _List_fromArray(
					['Male Office Worker']),
				name: 'Male Office Worker',
				_native: '👨\u200D💼',
				nativeNonQual: '👨\u200D💼',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D💼'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D💼'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D💼'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D💼'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D💼')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'closed_lock_with_key',
			{
				keywords: _List_fromArray(
					['Closed Lock with Key', 'security', 'privacy']),
				name: 'Closed Lock with Key',
				_native: '🔐',
				nativeNonQual: '🔐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-office-worker',
			{
				keywords: _List_fromArray(
					['Female Office Worker']),
				name: 'Female Office Worker',
				_native: '👩\u200D💼',
				nativeNonQual: '👩\u200D💼',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D💼'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D💼'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D💼'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D💼'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D💼')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'two',
			{
				keywords: _List_fromArray(
					['Keycap 2', 'numbers', '2', 'prime', 'blue-square']),
				name: 'Keycap 2',
				_native: '2️⃣',
				nativeNonQual: '2⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'alarm_clock',
			{
				keywords: _List_fromArray(
					['Alarm Clock', 'time', 'wake']),
				name: 'Alarm Clock',
				_native: '⏰',
				nativeNonQual: '⏰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'key',
			{
				keywords: _List_fromArray(
					['Key', 'lock', 'door', 'password']),
				name: 'Key',
				_native: '🔑',
				nativeNonQual: '🔑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-kw',
			{
				keywords: _List_fromArray(
					['Kuwait Flag']),
				name: 'Kuwait Flag',
				_native: '🇰🇼',
				nativeNonQual: '🇰🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stopwatch',
			{
				keywords: _List_fromArray(
					['Stopwatch', 'time', 'deadline']),
				name: 'Stopwatch',
				_native: '⏱️',
				nativeNonQual: '⏱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-scientist',
			{
				keywords: _List_fromArray(
					['Male Scientist']),
				name: 'Male Scientist',
				_native: '👨\u200D🔬',
				nativeNonQual: '👨\u200D🔬',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🔬'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🔬'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🔬'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🔬'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🔬')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'three',
			{
				keywords: _List_fromArray(
					['Keycap 3', '3', 'numbers', 'prime', 'blue-square']),
				name: 'Keycap 3',
				_native: '3️⃣',
				nativeNonQual: '3⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-ky',
			{
				keywords: _List_fromArray(
					['Cayman Islands Flag']),
				name: 'Cayman Islands Flag',
				_native: '🇰🇾',
				nativeNonQual: '🇰🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'old_key',
			{
				keywords: _List_fromArray(
					['Old Key', 'lock', 'door', 'password']),
				name: 'Old Key',
				_native: '🗝️',
				nativeNonQual: '🗝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-kz',
			{
				keywords: _List_fromArray(
					['Kazakhstan Flag']),
				name: 'Kazakhstan Flag',
				_native: '🇰🇿',
				nativeNonQual: '🇰🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hammer',
			{
				keywords: _List_fromArray(
					['Hammer', 'tools', 'build', 'create']),
				name: 'Hammer',
				_native: '🔨',
				nativeNonQual: '🔨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-scientist',
			{
				keywords: _List_fromArray(
					['Female Scientist']),
				name: 'Female Scientist',
				_native: '👩\u200D🔬',
				nativeNonQual: '👩\u200D🔬',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🔬'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🔬'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🔬'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🔬'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🔬')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'timer_clock',
			{
				keywords: _List_fromArray(
					['Timer Clock', 'alarm']),
				name: 'Timer Clock',
				_native: '⏲️',
				nativeNonQual: '⏲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'four',
			{
				keywords: _List_fromArray(
					['Keycap 4', '4', 'numbers', 'blue-square']),
				name: 'Keycap 4',
				_native: '4️⃣',
				nativeNonQual: '4⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'male-technologist',
			{
				keywords: _List_fromArray(
					['Male Technologist']),
				name: 'Male Technologist',
				_native: '👨\u200D💻',
				nativeNonQual: '👨\u200D💻',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D💻'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D💻'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D💻'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D💻'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D💻')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'mantelpiece_clock',
			{
				keywords: _List_fromArray(
					['Mantelpiece Clock', 'time']),
				name: 'Mantelpiece Clock',
				_native: '🕰️',
				nativeNonQual: '🕰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'five',
			{
				keywords: _List_fromArray(
					['Keycap 5', '5', 'numbers', 'blue-square', 'prime']),
				name: 'Keycap 5',
				_native: '5️⃣',
				nativeNonQual: '5⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-la',
			{
				keywords: _List_fromArray(
					['Laos Flag']),
				name: 'Laos Flag',
				_native: '🇱🇦',
				nativeNonQual: '🇱🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pick',
			{
				keywords: _List_fromArray(
					['Pick', 'tools', 'dig']),
				name: 'Pick',
				_native: '⛏️',
				nativeNonQual: '⛏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-lb',
			{
				keywords: _List_fromArray(
					['Lebanon Flag']),
				name: 'Lebanon Flag',
				_native: '🇱🇧',
				nativeNonQual: '🇱🇧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock12',
			{
				keywords: _List_fromArray(
					['Clock Face Twelve Oclock', 'time', 'noon', 'midnight', 'midday', 'late', 'early', 'schedule']),
				name: 'Clock Face Twelve Oclock',
				_native: '🕛',
				nativeNonQual: '🕛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hammer_and_pick',
			{
				keywords: _List_fromArray(
					['Hammer and Pick', 'tools', 'build', 'create']),
				name: 'Hammer and Pick',
				_native: '⚒️',
				nativeNonQual: '⚒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'six',
			{
				keywords: _List_fromArray(
					['Keycap 6', '6', 'numbers', 'blue-square']),
				name: 'Keycap 6',
				_native: '6️⃣',
				nativeNonQual: '6⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'female-technologist',
			{
				keywords: _List_fromArray(
					['Female Technologist']),
				name: 'Female Technologist',
				_native: '👩\u200D💻',
				nativeNonQual: '👩\u200D💻',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D💻'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D💻'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D💻'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D💻'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D💻')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'hammer_and_wrench',
			{
				keywords: _List_fromArray(
					['Hammer and Wrench', 'tools', 'build', 'create']),
				name: 'Hammer and Wrench',
				_native: '🛠️',
				nativeNonQual: '🛠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-lc',
			{
				keywords: _List_fromArray(
					['St. Lucia Flag']),
				name: 'St. Lucia Flag',
				_native: '🇱🇨',
				nativeNonQual: '🇱🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock1230',
			{
				keywords: _List_fromArray(
					['Clock Face Twelve-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Twelve-Thirty',
				_native: '🕧',
				nativeNonQual: '🕧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'seven',
			{
				keywords: _List_fromArray(
					['Keycap 7', '7', 'numbers', 'blue-square', 'prime']),
				name: 'Keycap 7',
				_native: '7️⃣',
				nativeNonQual: '7⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'male-singer',
			{
				keywords: _List_fromArray(
					['Male Singer']),
				name: 'Male Singer',
				_native: '👨\u200D🎤',
				nativeNonQual: '👨\u200D🎤',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🎤'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🎤'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🎤'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🎤'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🎤')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'eight',
			{
				keywords: _List_fromArray(
					['Keycap 8', '8', 'blue-square', 'numbers']),
				name: 'Keycap 8',
				_native: '8️⃣',
				nativeNonQual: '8⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-li',
			{
				keywords: _List_fromArray(
					['Liechtenstein Flag']),
				name: 'Liechtenstein Flag',
				_native: '🇱🇮',
				nativeNonQual: '🇱🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dagger_knife',
			{
				keywords: _List_fromArray(
					['Dagger Knife']),
				name: 'Dagger Knife',
				_native: '🗡️',
				nativeNonQual: '🗡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'clock1',
			{
				keywords: _List_fromArray(
					['Clock Face One Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face One Oclock',
				_native: '🕐',
				nativeNonQual: '🕐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-singer',
			{
				keywords: _List_fromArray(
					['Female Singer']),
				name: 'Female Singer',
				_native: '👩\u200D🎤',
				nativeNonQual: '👩\u200D🎤',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🎤'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🎤'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🎤'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🎤'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🎤')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'male-artist',
			{
				keywords: _List_fromArray(
					['Male Artist']),
				name: 'Male Artist',
				_native: '👨\u200D🎨',
				nativeNonQual: '👨\u200D🎨',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🎨'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🎨'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🎨'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🎨'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🎨')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'crossed_swords',
			{
				keywords: _List_fromArray(
					['Crossed Swords', 'weapon']),
				name: 'Crossed Swords',
				_native: '⚔️',
				nativeNonQual: '⚔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'nine',
			{
				keywords: _List_fromArray(
					['Keycap 9', 'blue-square', 'numbers', '9']),
				name: 'Keycap 9',
				_native: '9️⃣',
				nativeNonQual: '9⃣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-lk',
			{
				keywords: _List_fromArray(
					['Sri Lanka Flag']),
				name: 'Sri Lanka Flag',
				_native: '🇱🇰',
				nativeNonQual: '🇱🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock130',
			{
				keywords: _List_fromArray(
					['Clock Face One-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face One-Thirty',
				_native: '🕜',
				nativeNonQual: '🕜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock2',
			{
				keywords: _List_fromArray(
					['Clock Face Two Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Two Oclock',
				_native: '🕑',
				nativeNonQual: '🕑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'gun',
			{
				keywords: _List_fromArray(
					['Pistol', 'violence', 'weapon', 'pistol', 'revolver']),
				name: 'Pistol',
				_native: '🔫',
				nativeNonQual: '🔫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'keycap_ten',
			{
				keywords: _List_fromArray(
					['Keycap Ten', 'numbers', '10', 'blue-square']),
				name: 'Keycap Ten',
				_native: '🔟',
				nativeNonQual: '🔟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-artist',
			{
				keywords: _List_fromArray(
					['Female Artist']),
				name: 'Female Artist',
				_native: '👩\u200D🎨',
				nativeNonQual: '👩\u200D🎨',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🎨'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🎨'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🎨'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🎨'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🎨')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-lr',
			{
				keywords: _List_fromArray(
					['Liberia Flag']),
				name: 'Liberia Flag',
				_native: '🇱🇷',
				nativeNonQual: '🇱🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock230',
			{
				keywords: _List_fromArray(
					['Clock Face Two-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Two-Thirty',
				_native: '🕝',
				nativeNonQual: '🕝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bow_and_arrow',
			{
				keywords: _List_fromArray(
					['Bow and Arrow', 'sports']),
				name: 'Bow and Arrow',
				_native: '\uD83C\uDFF9',
				nativeNonQual: '\uD83C\uDFF9',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'male-pilot',
			{
				keywords: _List_fromArray(
					['Male Pilot']),
				name: 'Male Pilot',
				_native: '👨\u200D✈️',
				nativeNonQual: '👨\u200D✈',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D✈️'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D✈️'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D✈️'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D✈️'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D✈️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ls',
			{
				keywords: _List_fromArray(
					['Lesotho Flag']),
				name: 'Lesotho Flag',
				_native: '🇱🇸',
				nativeNonQual: '🇱🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-lt',
			{
				keywords: _List_fromArray(
					['Lithuania Flag']),
				name: 'Lithuania Flag',
				_native: '🇱🇹',
				nativeNonQual: '🇱🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'capital_abcd',
			{
				keywords: _List_fromArray(
					['Input Symbol for Latin Capital Letters', 'alphabet', 'words', 'blue-square']),
				name: 'Input Symbol for Latin Capital Letters',
				_native: '🔠',
				nativeNonQual: '🔠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-pilot',
			{
				keywords: _List_fromArray(
					['Female Pilot']),
				name: 'Female Pilot',
				_native: '👩\u200D✈️',
				nativeNonQual: '👩\u200D✈',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D✈️'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D✈️'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D✈️'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D✈️'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D✈️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'clock3',
			{
				keywords: _List_fromArray(
					['Clock Face Three Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Three Oclock',
				_native: '🕒',
				nativeNonQual: '🕒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shield',
			{
				keywords: _List_fromArray(
					['Shield', 'protection', 'security']),
				name: 'Shield',
				_native: '🛡️',
				nativeNonQual: '🛡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'male-astronaut',
			{
				keywords: _List_fromArray(
					['Male Astronaut']),
				name: 'Male Astronaut',
				_native: '👨\u200D🚀',
				nativeNonQual: '👨\u200D🚀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🚀'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🚀'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🚀'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🚀'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🚀')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'abcd',
			{
				keywords: _List_fromArray(
					['Input Symbol for Latin Small Letters', 'blue-square', 'alphabet']),
				name: 'Input Symbol for Latin Small Letters',
				_native: '🔡',
				nativeNonQual: '🔡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock330',
			{
				keywords: _List_fromArray(
					['Clock Face Three-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Three-Thirty',
				_native: '🕞',
				nativeNonQual: '🕞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-lu',
			{
				keywords: _List_fromArray(
					['Luxembourg Flag']),
				name: 'Luxembourg Flag',
				_native: '🇱🇺',
				nativeNonQual: '🇱🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wrench',
			{
				keywords: _List_fromArray(
					['Wrench', 'tools', 'diy', 'ikea', 'fix', 'maintainer']),
				name: 'Wrench',
				_native: '🔧',
				nativeNonQual: '🔧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'nut_and_bolt',
			{
				keywords: _List_fromArray(
					['Nut and Bolt', 'handy', 'tools', 'fix']),
				name: 'Nut and Bolt',
				_native: '🔩',
				nativeNonQual: '🔩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock4',
			{
				keywords: _List_fromArray(
					['Clock Face Four Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Four Oclock',
				_native: '🕓',
				nativeNonQual: '🕓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-astronaut',
			{
				keywords: _List_fromArray(
					['Female Astronaut']),
				name: 'Female Astronaut',
				_native: '👩\u200D🚀',
				nativeNonQual: '👩\u200D🚀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🚀'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🚀'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🚀'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🚀'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🚀')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-lv',
			{
				keywords: _List_fromArray(
					['Latvia Flag']),
				name: 'Latvia Flag',
				_native: '🇱🇻',
				nativeNonQual: '🇱🇻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'gear',
			{
				keywords: _List_fromArray(
					['Gear', 'cog']),
				name: 'Gear',
				_native: '⚙️',
				nativeNonQual: '⚙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'male-firefighter',
			{
				keywords: _List_fromArray(
					['Male Firefighter']),
				name: 'Male Firefighter',
				_native: '👨\u200D🚒',
				nativeNonQual: '👨\u200D🚒',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👨\uD83C\uDFFF\u200D🚒'),
							_Utils_Tuple2('light', '👨\uD83C\uDFFB\u200D🚒'),
							_Utils_Tuple2('medium', '👨\uD83C\uDFFD\u200D🚒'),
							_Utils_Tuple2('mediumDark', '👨\uD83C\uDFFE\u200D🚒'),
							_Utils_Tuple2('mediumLight', '👨\uD83C\uDFFC\u200D🚒')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ly',
			{
				keywords: _List_fromArray(
					['Libya Flag']),
				name: 'Libya Flag',
				_native: '🇱🇾',
				nativeNonQual: '🇱🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'symbols',
			{
				keywords: _List_fromArray(
					['Input Symbol for Symbols', 'blue-square', 'music', 'note', 'ampersand', 'percent', 'glyphs', 'characters']),
				name: 'Input Symbol for Symbols',
				_native: '🔣',
				nativeNonQual: '🔣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock430',
			{
				keywords: _List_fromArray(
					['Clock Face Four-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Four-Thirty',
				_native: '🕟',
				nativeNonQual: '🕟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ma',
			{
				keywords: _List_fromArray(
					['Morocco Flag']),
				name: 'Morocco Flag',
				_native: '🇲🇦',
				nativeNonQual: '🇲🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'compression',
			{
				keywords: _List_fromArray(
					['Compression']),
				name: 'Compression',
				_native: '🗜️',
				nativeNonQual: '🗜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'female-firefighter',
			{
				keywords: _List_fromArray(
					['Female Firefighter']),
				name: 'Female Firefighter',
				_native: '👩\u200D🚒',
				nativeNonQual: '👩\u200D🚒',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👩\uD83C\uDFFF\u200D🚒'),
							_Utils_Tuple2('light', '👩\uD83C\uDFFB\u200D🚒'),
							_Utils_Tuple2('medium', '👩\uD83C\uDFFD\u200D🚒'),
							_Utils_Tuple2('mediumDark', '👩\uD83C\uDFFE\u200D🚒'),
							_Utils_Tuple2('mediumLight', '👩\uD83C\uDFFC\u200D🚒')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'abc',
			{
				keywords: _List_fromArray(
					['Input Symbol for Latin Letters', 'blue-square', 'alphabet']),
				name: 'Input Symbol for Latin Letters',
				_native: '🔤',
				nativeNonQual: '🔤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock5',
			{
				keywords: _List_fromArray(
					['Clock Face Five Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Five Oclock',
				_native: '🕔',
				nativeNonQual: '🕔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock530',
			{
				keywords: _List_fromArray(
					['Clock Face Five-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Five-Thirty',
				_native: '🕠',
				nativeNonQual: '🕠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'a',
			{
				keywords: _List_fromArray(
					['Negative Squared Latin Capital Letter a', 'red-square', 'alphabet', 'letter']),
				name: 'Negative Squared Latin Capital Letter a',
				_native: '🅰️',
				nativeNonQual: '🅰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'alembic',
			{
				keywords: _List_fromArray(
					['Alembic', 'distilling', 'science', 'experiment', 'chemistry']),
				name: 'Alembic',
				_native: '⚗️',
				nativeNonQual: '⚗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'flag-mc',
			{
				keywords: _List_fromArray(
					['Monaco Flag']),
				name: 'Monaco Flag',
				_native: '🇲🇨',
				nativeNonQual: '🇲🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cop',
			{
				keywords: _List_fromArray(
					['Police Officer']),
				name: 'Police Officer',
				_native: '👮',
				nativeNonQual: '👮',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👮\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👮\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👮\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👮\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👮\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'scales',
			{
				keywords: _List_fromArray(
					['Scales']),
				name: 'Scales',
				_native: '⚖️',
				nativeNonQual: '⚖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'clock6',
			{
				keywords: _List_fromArray(
					['Clock Face Six Oclock', 'time', 'late', 'early', 'schedule', 'dawn', 'dusk']),
				name: 'Clock Face Six Oclock',
				_native: '🕕',
				nativeNonQual: '🕕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-md',
			{
				keywords: _List_fromArray(
					['Moldova Flag']),
				name: 'Moldova Flag',
				_native: '🇲🇩',
				nativeNonQual: '🇲🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ab',
			{
				keywords: _List_fromArray(
					['Negative Squared Ab', 'red-square', 'alphabet']),
				name: 'Negative Squared Ab',
				_native: '🆎',
				nativeNonQual: '🆎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-police-officer',
			{
				keywords: _List_fromArray(
					['Male Police Officer']),
				name: 'Male Police Officer',
				_native: '👮\u200D♂️',
				nativeNonQual: '👮\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👮\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '👮\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '👮\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '👮\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '👮\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'link',
			{
				keywords: _List_fromArray(
					['Link Symbol', 'rings', 'url']),
				name: 'Link Symbol',
				_native: '🔗',
				nativeNonQual: '🔗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-me',
			{
				keywords: _List_fromArray(
					['Montenegro Flag']),
				name: 'Montenegro Flag',
				_native: '🇲🇪',
				nativeNonQual: '🇲🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock630',
			{
				keywords: _List_fromArray(
					['Clock Face Six-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Six-Thirty',
				_native: '🕡',
				nativeNonQual: '🕡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'b',
			{
				keywords: _List_fromArray(
					['Negative Squared Latin Capital Letter B', 'red-square', 'alphabet', 'letter']),
				name: 'Negative Squared Latin Capital Letter B',
				_native: '🅱️',
				nativeNonQual: '🅱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-police-officer',
			{
				keywords: _List_fromArray(
					['Female Police Officer']),
				name: 'Female Police Officer',
				_native: '👮\u200D♀️',
				nativeNonQual: '👮\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👮\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '👮\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '👮\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '👮\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '👮\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'clock7',
			{
				keywords: _List_fromArray(
					['Clock Face Seven Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Seven Oclock',
				_native: '🕖',
				nativeNonQual: '🕖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cl',
			{
				keywords: _List_fromArray(
					['Squared Cl', 'alphabet', 'words', 'red-square']),
				name: 'Squared Cl',
				_native: '🆑',
				nativeNonQual: '🆑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sleuth_or_spy',
			{
				keywords: _List_fromArray(
					['Sleuth or Spy']),
				name: 'Sleuth or Spy',
				_native: '🕵️',
				nativeNonQual: '🕵',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🕵\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🕵\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🕵\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🕵\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🕵\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-mf',
			{
				keywords: _List_fromArray(
					['St. Martin Flag']),
				name: 'St. Martin Flag',
				_native: '🇲🇫',
				nativeNonQual: '🇲🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'chains',
			{
				keywords: _List_fromArray(
					['Chains', 'lock', 'arrest']),
				name: 'Chains',
				_native: '⛓️',
				nativeNonQual: '⛓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'syringe',
			{
				keywords: _List_fromArray(
					['Syringe', 'health', 'hospital', 'drugs', 'blood', 'medicine', 'needle', 'doctor', 'nurse']),
				name: 'Syringe',
				_native: '💉',
				nativeNonQual: '💉',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-detective',
			{
				keywords: _List_fromArray(
					['Male Detective']),
				name: 'Male Detective',
				_native: '🕵️\u200D♂️',
				nativeNonQual: '🕵️\u200D♂️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🕵\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🕵\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🕵\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🕵\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🕵\uD83C\uDFFC\u200D♂️')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'cool',
			{
				keywords: _List_fromArray(
					['Squared Cool', 'words', 'blue-square']),
				name: 'Squared Cool',
				_native: '🆒',
				nativeNonQual: '🆒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock730',
			{
				keywords: _List_fromArray(
					['Clock Face Seven-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Seven-Thirty',
				_native: '🕢',
				nativeNonQual: '🕢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mg',
			{
				keywords: _List_fromArray(
					['Madagascar Flag']),
				name: 'Madagascar Flag',
				_native: '🇲🇬',
				nativeNonQual: '🇲🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'free',
			{
				keywords: _List_fromArray(
					['Squared Free', 'blue-square', 'words']),
				name: 'Squared Free',
				_native: '🆓',
				nativeNonQual: '🆓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mh',
			{
				keywords: _List_fromArray(
					['Marshall Islands Flag']),
				name: 'Marshall Islands Flag',
				_native: '🇲🇭',
				nativeNonQual: '🇲🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock8',
			{
				keywords: _List_fromArray(
					['Clock Face Eight Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Eight Oclock',
				_native: '🕗',
				nativeNonQual: '🕗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pill',
			{
				keywords: _List_fromArray(
					['Pill', 'health', 'medicine', 'doctor', 'pharmacy', 'drug']),
				name: 'Pill',
				_native: '💊',
				nativeNonQual: '💊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-detective',
			{
				keywords: _List_fromArray(
					['Female Detective']),
				name: 'Female Detective',
				_native: '🕵️\u200D♀️',
				nativeNonQual: '🕵️\u200D♀️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🕵\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🕵\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🕵\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🕵\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🕵\uD83C\uDFFC\u200D♀️')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'clock830',
			{
				keywords: _List_fromArray(
					['Clock Face Eight-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Eight-Thirty',
				_native: '🕣',
				nativeNonQual: '🕣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'guardsman',
			{
				keywords: _List_fromArray(
					['Guardsman', 'uk', 'gb', 'british', 'male', 'guy', 'royal']),
				name: 'Guardsman',
				_native: '💂',
				nativeNonQual: '💂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💂\uD83C\uDFFF'),
							_Utils_Tuple2('light', '💂\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '💂\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '💂\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '💂\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'information_source',
			{
				keywords: _List_fromArray(
					['Information Source', 'blue-square', 'alphabet', 'letter']),
				name: 'Information Source',
				_native: 'ℹ️',
				nativeNonQual: 'ℹ',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-mk',
			{
				keywords: _List_fromArray(
					['Macedonia Flag']),
				name: 'Macedonia Flag',
				_native: '🇲🇰',
				nativeNonQual: '🇲🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'smoking',
			{
				keywords: _List_fromArray(
					['Smoking Symbol', 'kills', 'tobacco', 'cigarette', 'joint', 'smoke']),
				name: 'Smoking Symbol',
				_native: '🚬',
				nativeNonQual: '🚬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'id',
			{
				keywords: _List_fromArray(
					['Squared Id', 'purple-square', 'words']),
				name: 'Squared Id',
				_native: '🆔',
				nativeNonQual: '🆔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock9',
			{
				keywords: _List_fromArray(
					['Clock Face Nine Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Nine Oclock',
				_native: '🕘',
				nativeNonQual: '🕘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ml',
			{
				keywords: _List_fromArray(
					['Mali Flag']),
				name: 'Mali Flag',
				_native: '🇲🇱',
				nativeNonQual: '🇲🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'coffin',
			{
				keywords: _List_fromArray(
					['Coffin', 'vampire', 'dead', 'die', 'death', 'rip', 'graveyard', 'cemetery', 'casket', 'funeral', 'box']),
				name: 'Coffin',
				_native: '⚰️',
				nativeNonQual: '⚰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'male-guard',
			{
				keywords: _List_fromArray(
					['Male Guard']),
				name: 'Male Guard',
				_native: '💂\u200D♂️',
				nativeNonQual: '💂\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💂\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '💂\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '💂\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '💂\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '💂\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'm',
			{
				keywords: _List_fromArray(
					['Circled Latin Capital Letter M', 'alphabet', 'blue-circle', 'letter']),
				name: 'Circled Latin Capital Letter M',
				_native: 'Ⓜ️',
				nativeNonQual: 'Ⓜ',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'funeral_urn',
			{
				keywords: _List_fromArray(
					['Funeral Urn', 'dead', 'die', 'death', 'rip', 'ashes']),
				name: 'Funeral Urn',
				_native: '⚱️',
				nativeNonQual: '⚱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'female-guard',
			{
				keywords: _List_fromArray(
					['Female Guard']),
				name: 'Female Guard',
				_native: '💂\u200D♀️',
				nativeNonQual: '💂\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💂\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '💂\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '💂\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '💂\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '💂\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mm',
			{
				keywords: _List_fromArray(
					['Myanmar (burma) Flag']),
				name: 'Myanmar (burma) Flag',
				_native: '🇲🇲',
				nativeNonQual: '🇲🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock930',
			{
				keywords: _List_fromArray(
					['Clock Face Nine-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Nine-Thirty',
				_native: '🕤',
				nativeNonQual: '🕤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'moyai',
			{
				keywords: _List_fromArray(
					['Moyai', 'rock', 'easter island', 'moai']),
				name: 'Moyai',
				_native: '🗿',
				nativeNonQual: '🗿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'new',
			{
				keywords: _List_fromArray(
					['Squared New', 'blue-square', 'words', 'start']),
				name: 'Squared New',
				_native: '🆕',
				nativeNonQual: '🆕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mn',
			{
				keywords: _List_fromArray(
					['Mongolia Flag']),
				name: 'Mongolia Flag',
				_native: '🇲🇳',
				nativeNonQual: '🇲🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'construction_worker',
			{
				keywords: _List_fromArray(
					['Construction Worker']),
				name: 'Construction Worker',
				_native: '👷',
				nativeNonQual: '👷',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👷\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👷\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👷\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👷\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👷\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'clock10',
			{
				keywords: _List_fromArray(
					['Clock Face Ten Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Ten Oclock',
				_native: '🕙',
				nativeNonQual: '🕙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock1030',
			{
				keywords: _List_fromArray(
					['Clock Face Ten-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Ten-Thirty',
				_native: '🕥',
				nativeNonQual: '🕥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ng',
			{
				keywords: _List_fromArray(
					['Squared Ng', 'blue-square', 'words', 'shape', 'icon']),
				name: 'Squared Ng',
				_native: '🆖',
				nativeNonQual: '🆖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male-construction-worker',
			{
				keywords: _List_fromArray(
					['Male Construction Worker']),
				name: 'Male Construction Worker',
				_native: '👷\u200D♂️',
				nativeNonQual: '👷\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👷\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '👷\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '👷\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '👷\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '👷\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mo',
			{
				keywords: _List_fromArray(
					['Macau Sar China Flag']),
				name: 'Macau Sar China Flag',
				_native: '🇲🇴',
				nativeNonQual: '🇲🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'oil_drum',
			{
				keywords: _List_fromArray(
					['Oil Drum', 'barrell']),
				name: 'Oil Drum',
				_native: '🛢️',
				nativeNonQual: '🛢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'o2',
			{
				keywords: _List_fromArray(
					['Negative Squared Latin Capital Letter O', 'alphabet', 'red-square', 'letter']),
				name: 'Negative Squared Latin Capital Letter O',
				_native: '🅾️',
				nativeNonQual: '🅾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female-construction-worker',
			{
				keywords: _List_fromArray(
					['Female Construction Worker']),
				name: 'Female Construction Worker',
				_native: '👷\u200D♀️',
				nativeNonQual: '👷\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👷\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '👷\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '👷\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '👷\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '👷\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'clock11',
			{
				keywords: _List_fromArray(
					['Clock Face Eleven Oclock', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Eleven Oclock',
				_native: '🕚',
				nativeNonQual: '🕚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'crystal_ball',
			{
				keywords: _List_fromArray(
					['Crystal Ball', 'disco', 'party', 'magic', 'circus', 'fortune_teller']),
				name: 'Crystal Ball',
				_native: '🔮',
				nativeNonQual: '🔮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mp',
			{
				keywords: _List_fromArray(
					['Northern Mariana Islands Flag']),
				name: 'Northern Mariana Islands Flag',
				_native: '🇲🇵',
				nativeNonQual: '🇲🇵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mq',
			{
				keywords: _List_fromArray(
					['Martinique Flag']),
				name: 'Martinique Flag',
				_native: '🇲🇶',
				nativeNonQual: '🇲🇶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'prince',
			{
				keywords: _List_fromArray(
					['Prince', 'boy', 'man', 'male', 'crown', 'royal', 'king']),
				name: 'Prince',
				_native: '\uD83E\uDD34',
				nativeNonQual: '\uD83E\uDD34',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD34\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD34\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD34\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD34\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD34\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'ok',
			{
				keywords: _List_fromArray(
					['Squared Ok', 'good', 'agree', 'yes', 'blue-square']),
				name: 'Squared Ok',
				_native: '🆗',
				nativeNonQual: '🆗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'clock1130',
			{
				keywords: _List_fromArray(
					['Clock Face Eleven-Thirty', 'time', 'late', 'early', 'schedule']),
				name: 'Clock Face Eleven-Thirty',
				_native: '🕦',
				nativeNonQual: '🕦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shopping_trolley',
			{
				keywords: _List_fromArray(
					['Shopping Trolley']),
				name: 'Shopping Trolley',
				_native: '\uD83D\uDED2',
				nativeNonQual: '\uD83D\uDED2',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-mr',
			{
				keywords: _List_fromArray(
					['Mauritania Flag']),
				name: 'Mauritania Flag',
				_native: '🇲🇷',
				nativeNonQual: '🇲🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'princess',
			{
				keywords: _List_fromArray(
					['Princess', 'girl', 'woman', 'female', 'blond', 'crown', 'royal', 'queen']),
				name: 'Princess',
				_native: '👸',
				nativeNonQual: '👸',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👸\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👸\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👸\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👸\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👸\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'new_moon',
			{
				keywords: _List_fromArray(
					['New Moon Symbol', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'New Moon Symbol',
				_native: '🌑',
				nativeNonQual: '🌑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'parking',
			{
				keywords: _List_fromArray(
					['Negative Squared Latin Capital Letter P', 'cars', 'blue-square', 'alphabet', 'letter']),
				name: 'Negative Squared Latin Capital Letter P',
				_native: '🅿️',
				nativeNonQual: '🅿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sos',
			{
				keywords: _List_fromArray(
					['Squared Sos', 'help', 'red-square', 'words', 'emergency', '911']),
				name: 'Squared Sos',
				_native: '🆘',
				nativeNonQual: '🆘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man_with_turban',
			{
				keywords: _List_fromArray(
					['Man with Turban', 'male', 'indian', 'hinduism', 'arabs']),
				name: 'Man with Turban',
				_native: '👳',
				nativeNonQual: '👳',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👳\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👳\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👳\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👳\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👳\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ms',
			{
				keywords: _List_fromArray(
					['Montserrat Flag']),
				name: 'Montserrat Flag',
				_native: '🇲🇸',
				nativeNonQual: '🇲🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'waxing_crescent_moon',
			{
				keywords: _List_fromArray(
					['Waxing Crescent Moon Symbol', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'Waxing Crescent Moon Symbol',
				_native: '🌒',
				nativeNonQual: '🌒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'up',
			{
				keywords: _List_fromArray(
					['Squared Up with Exclamation Mark', 'blue-square', 'above', 'high']),
				name: 'Squared Up with Exclamation Mark',
				_native: '🆙',
				nativeNonQual: '🆙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'first_quarter_moon',
			{
				keywords: _List_fromArray(
					['First Quarter Moon Symbol', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'First Quarter Moon Symbol',
				_native: '🌓',
				nativeNonQual: '🌓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mt',
			{
				keywords: _List_fromArray(
					['Malta Flag']),
				name: 'Malta Flag',
				_native: '🇲🇹',
				nativeNonQual: '🇲🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-wearing-turban',
			{
				keywords: _List_fromArray(
					['Man Wearing Turban']),
				name: 'Man Wearing Turban',
				_native: '👳\u200D♂️',
				nativeNonQual: '👳\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👳\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '👳\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '👳\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '👳\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '👳\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'moon',
			{
				keywords: _List_fromArray(
					['Waxing Gibbous Moon Symbol']),
				name: 'Waxing Gibbous Moon Symbol',
				_native: '🌔',
				nativeNonQual: '🌔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-wearing-turban',
			{
				keywords: _List_fromArray(
					['Woman Wearing Turban']),
				name: 'Woman Wearing Turban',
				_native: '👳\u200D♀️',
				nativeNonQual: '👳\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👳\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '👳\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '👳\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '👳\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '👳\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'vs',
			{
				keywords: _List_fromArray(
					['Squared Vs', 'words', 'orange-square']),
				name: 'Squared Vs',
				_native: '🆚',
				nativeNonQual: '🆚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mu',
			{
				keywords: _List_fromArray(
					['Mauritius Flag']),
				name: 'Mauritius Flag',
				_native: '🇲🇺',
				nativeNonQual: '🇲🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man_with_gua_pi_mao',
			{
				keywords: _List_fromArray(
					['Man with Gua Pi Mao', 'male', 'boy', 'chinese']),
				name: 'Man with Gua Pi Mao',
				_native: '👲',
				nativeNonQual: '👲',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👲\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👲\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👲\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👲\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👲\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'koko',
			{
				keywords: _List_fromArray(
					['Squared Katakana Koko', 'blue-square', 'here', 'katakana', 'japanese', 'destination']),
				name: 'Squared Katakana Koko',
				_native: '🈁',
				nativeNonQual: '🈁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'full_moon',
			{
				keywords: _List_fromArray(
					['Full Moon Symbol', 'nature', 'yellow', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'Full Moon Symbol',
				_native: '🌕',
				nativeNonQual: '🌕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mv',
			{
				keywords: _List_fromArray(
					['Maldives Flag']),
				name: 'Maldives Flag',
				_native: '🇲🇻',
				nativeNonQual: '🇲🇻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'person_with_headscarf',
			{
				keywords: _List_fromArray(
					['Person with Headscarf']),
				name: 'Person with Headscarf',
				_native: '\uD83E\uDDD5',
				nativeNonQual: '\uD83E\uDDD5',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD5\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD5\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD5\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD5\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD5\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'waning_gibbous_moon',
			{
				keywords: _List_fromArray(
					['Waning Gibbous Moon Symbol', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep', 'waxing_gibbous_moon']),
				name: 'Waning Gibbous Moon Symbol',
				_native: '🌖',
				nativeNonQual: '🌖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sa',
			{
				keywords: _List_fromArray(
					['Squared Katakana Sa', 'japanese', 'blue-square', 'katakana']),
				name: 'Squared Katakana Sa',
				_native: '🈂️',
				nativeNonQual: '🈂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mw',
			{
				keywords: _List_fromArray(
					['Malawi Flag']),
				name: 'Malawi Flag',
				_native: '🇲🇼',
				nativeNonQual: '🇲🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'last_quarter_moon',
			{
				keywords: _List_fromArray(
					['Last Quarter Moon Symbol', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'Last Quarter Moon Symbol',
				_native: '🌗',
				nativeNonQual: '🌗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'u6708',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-6708', 'chinese', 'month', 'moon', 'japanese', 'orange-square', 'kanji']),
				name: 'Squared Cjk Unified Ideograph-6708',
				_native: '🈷️',
				nativeNonQual: '🈷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bearded_person',
			{
				keywords: _List_fromArray(
					['Bearded Person']),
				name: 'Bearded Person',
				_native: '\uD83E\uDDD4',
				nativeNonQual: '\uD83E\uDDD4',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD4\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD4\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD4\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD4\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD4\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-mx',
			{
				keywords: _List_fromArray(
					['Mexico Flag']),
				name: 'Mexico Flag',
				_native: '🇲🇽',
				nativeNonQual: '🇲🇽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'u6709',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-6709', 'orange-square', 'chinese', 'have', 'kanji']),
				name: 'Squared Cjk Unified Ideograph-6709',
				_native: '🈶',
				nativeNonQual: '🈶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'person_with_blond_hair',
			{
				keywords: _List_fromArray(
					['Person with Blond Hair']),
				name: 'Person with Blond Hair',
				_native: '👱',
				nativeNonQual: '👱',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👱\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👱\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👱\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👱\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👱\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'waning_crescent_moon',
			{
				keywords: _List_fromArray(
					['Waning Crescent Moon Symbol', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'Waning Crescent Moon Symbol',
				_native: '🌘',
				nativeNonQual: '🌘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-my',
			{
				keywords: _List_fromArray(
					['Malaysia Flag']),
				name: 'Malaysia Flag',
				_native: '🇲🇾',
				nativeNonQual: '🇲🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'u6307',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-6307', 'chinese', 'point', 'green-square', 'kanji']),
				name: 'Squared Cjk Unified Ideograph-6307',
				_native: '🈯',
				nativeNonQual: '🈯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'blond-haired-man',
			{
				keywords: _List_fromArray(
					['Blond Haired Man']),
				name: 'Blond Haired Man',
				_native: '👱\u200D♂️',
				nativeNonQual: '👱\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👱\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '👱\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '👱\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '👱\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '👱\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'crescent_moon',
			{
				keywords: _List_fromArray(
					['Crescent Moon', 'night', 'sleep', 'sky', 'evening', 'magic']),
				name: 'Crescent Moon',
				_native: '🌙',
				nativeNonQual: '🌙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-mz',
			{
				keywords: _List_fromArray(
					['Mozambique Flag']),
				name: 'Mozambique Flag',
				_native: '🇲🇿',
				nativeNonQual: '🇲🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'new_moon_with_face',
			{
				keywords: _List_fromArray(
					['New Moon with Face', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'New Moon with Face',
				_native: '🌚',
				nativeNonQual: '🌚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-na',
			{
				keywords: _List_fromArray(
					['Namibia Flag']),
				name: 'Namibia Flag',
				_native: '🇳🇦',
				nativeNonQual: '🇳🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'blond-haired-woman',
			{
				keywords: _List_fromArray(
					['Blond Haired Woman']),
				name: 'Blond Haired Woman',
				_native: '👱\u200D♀️',
				nativeNonQual: '👱\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👱\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '👱\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '👱\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '👱\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '👱\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'ideograph_advantage',
			{
				keywords: _List_fromArray(
					['Circled Ideograph Advantage', 'chinese', 'kanji', 'obtain', 'get', 'circle']),
				name: 'Circled Ideograph Advantage',
				_native: '🉐',
				nativeNonQual: '🉐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'first_quarter_moon_with_face',
			{
				keywords: _List_fromArray(
					['First Quarter Moon with Face', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'First Quarter Moon with Face',
				_native: '🌛',
				nativeNonQual: '🌛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man_in_tuxedo',
			{
				keywords: _List_fromArray(
					['Man in Tuxedo', 'couple', 'marriage', 'wedding', 'groom']),
				name: 'Man in Tuxedo',
				_native: '\uD83E\uDD35',
				nativeNonQual: '\uD83E\uDD35',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD35\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD35\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD35\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD35\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD35\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-nc',
			{
				keywords: _List_fromArray(
					['New Caledonia Flag']),
				name: 'New Caledonia Flag',
				_native: '🇳🇨',
				nativeNonQual: '🇳🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'u5272',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-5272', 'cut', 'divide', 'chinese', 'kanji', 'pink-square']),
				name: 'Squared Cjk Unified Ideograph-5272',
				_native: '🈹',
				nativeNonQual: '🈹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ne',
			{
				keywords: _List_fromArray(
					['Niger Flag']),
				name: 'Niger Flag',
				_native: '🇳🇪',
				nativeNonQual: '🇳🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'last_quarter_moon_with_face',
			{
				keywords: _List_fromArray(
					['Last Quarter Moon with Face', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'Last Quarter Moon with Face',
				_native: '🌜',
				nativeNonQual: '🌜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'u7121',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-7121', 'nothing', 'chinese', 'kanji', 'japanese', 'orange-square']),
				name: 'Squared Cjk Unified Ideograph-7121',
				_native: '🈚',
				nativeNonQual: '🈚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bride_with_veil',
			{
				keywords: _List_fromArray(
					['Bride with Veil', 'couple', 'marriage', 'wedding', 'woman', 'bride']),
				name: 'Bride with Veil',
				_native: '👰',
				nativeNonQual: '👰',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👰\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👰\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👰\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👰\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👰\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'u7981',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-7981', 'kanji', 'japanese', 'chinese', 'forbidden', 'limit', 'restricted', 'red-square']),
				name: 'Squared Cjk Unified Ideograph-7981',
				_native: '🈲',
				nativeNonQual: '🈲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pregnant_woman',
			{
				keywords: _List_fromArray(
					['Pregnant Woman', 'baby']),
				name: 'Pregnant Woman',
				_native: '\uD83E\uDD30',
				nativeNonQual: '\uD83E\uDD30',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD30\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD30\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD30\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD30\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD30\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'thermometer',
			{
				keywords: _List_fromArray(
					['Thermometer', 'weather', 'temperature', 'hot', 'cold']),
				name: 'Thermometer',
				_native: '🌡️',
				nativeNonQual: '🌡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-nf',
			{
				keywords: _List_fromArray(
					['Norfolk Island Flag']),
				name: 'Norfolk Island Flag',
				_native: '🇳🇫',
				nativeNonQual: '🇳🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sunny',
			{
				keywords: _List_fromArray(
					['Black Sun with Rays', 'weather', 'nature', 'brightness', 'summer', 'beach', 'spring']),
				name: 'Black Sun with Rays',
				_native: '☀️',
				nativeNonQual: '☀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'accept',
			{
				keywords: _List_fromArray(
					['Circled Ideograph Accept', 'ok', 'good', 'chinese', 'kanji', 'agree', 'yes', 'orange-circle']),
				name: 'Circled Ideograph Accept',
				_native: '🉑',
				nativeNonQual: '🉑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ng',
			{
				keywords: _List_fromArray(
					['Nigeria Flag']),
				name: 'Nigeria Flag',
				_native: '🇳🇬',
				nativeNonQual: '🇳🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'breast-feeding',
			{
				keywords: _List_fromArray(
					['Breast-Feeding']),
				name: 'Breast-Feeding',
				_native: '\uD83E\uDD31',
				nativeNonQual: '\uD83E\uDD31',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD31\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD31\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD31\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD31\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD31\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'full_moon_with_face',
			{
				keywords: _List_fromArray(
					['Full Moon with Face', 'nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep']),
				name: 'Full Moon with Face',
				_native: '🌝',
				nativeNonQual: '🌝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ni',
			{
				keywords: _List_fromArray(
					['Nicaragua Flag']),
				name: 'Nicaragua Flag',
				_native: '🇳🇮',
				nativeNonQual: '🇳🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'u7533',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-7533', 'chinese', 'japanese', 'kanji', 'orange-square']),
				name: 'Squared Cjk Unified Ideograph-7533',
				_native: '🈸',
				nativeNonQual: '🈸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'angel',
			{
				keywords: _List_fromArray(
					['Baby Angel', 'heaven', 'wings', 'halo']),
				name: 'Baby Angel',
				_native: '👼',
				nativeNonQual: '👼',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👼\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👼\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👼\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👼\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👼\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'sun_with_face',
			{
				keywords: _List_fromArray(
					['Sun with Face', 'nature', 'morning', 'sky']),
				name: 'Sun with Face',
				_native: '🌞',
				nativeNonQual: '🌞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'santa',
			{
				keywords: _List_fromArray(
					['Father Christmas', 'festival', 'man', 'male', 'xmas', 'father christmas']),
				name: 'Father Christmas',
				_native: '🎅',
				nativeNonQual: '🎅',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🎅\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🎅\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🎅\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🎅\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🎅\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'u5408',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-5408', 'japanese', 'chinese', 'join', 'kanji', 'red-square']),
				name: 'Squared Cjk Unified Ideograph-5408',
				_native: '🈴',
				nativeNonQual: '🈴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-nl',
			{
				keywords: _List_fromArray(
					['Netherlands Flag']),
				name: 'Netherlands Flag',
				_native: '🇳🇱',
				nativeNonQual: '🇳🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mrs_claus',
			{
				keywords: _List_fromArray(
					['Mother Christmas', 'woman', 'female', 'xmas', 'mother christmas']),
				name: 'Mother Christmas',
				_native: '\uD83E\uDD36',
				nativeNonQual: '\uD83E\uDD36',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD36\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD36\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD36\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD36\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD36\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'u7a7a',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-7a7a', 'kanji', 'japanese', 'chinese', 'empty', 'sky', 'blue-square']),
				name: 'Squared Cjk Unified Ideograph-7a7a',
				_native: '🈳',
				nativeNonQual: '🈳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'star',
			{
				keywords: _List_fromArray(
					['White Medium Star', 'night', 'yellow']),
				name: 'White Medium Star',
				_native: '⭐',
				nativeNonQual: '⭐',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-no',
			{
				keywords: _List_fromArray(
					['Norway Flag']),
				name: 'Norway Flag',
				_native: '🇳🇴',
				nativeNonQual: '🇳🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mage',
			{
				keywords: _List_fromArray(
					['Mage']),
				name: 'Mage',
				_native: '\uD83E\uDDD9',
				nativeNonQual: '\uD83E\uDDD9',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD9\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD9\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD9\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD9\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD9\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'star2',
			{
				keywords: _List_fromArray(
					['Glowing Star', 'night', 'sparkle', 'awesome', 'good', 'magic']),
				name: 'Glowing Star',
				_native: '🌟',
				nativeNonQual: '🌟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-np',
			{
				keywords: _List_fromArray(
					['Nepal Flag']),
				name: 'Nepal Flag',
				_native: '🇳🇵',
				nativeNonQual: '🇳🇵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'congratulations',
			{
				keywords: _List_fromArray(
					['Circled Ideograph Congratulation', 'chinese', 'kanji', 'japanese', 'red-circle']),
				name: 'Circled Ideograph Congratulation',
				_native: '㊗️',
				nativeNonQual: '㊗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-nr',
			{
				keywords: _List_fromArray(
					['Nauru Flag']),
				name: 'Nauru Flag',
				_native: '🇳🇷',
				nativeNonQual: '🇳🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'stars',
			{
				keywords: _List_fromArray(
					['Shooting Star', 'night', 'photo']),
				name: 'Shooting Star',
				_native: '🌠',
				nativeNonQual: '🌠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female_mage',
			{
				keywords: _List_fromArray(
					['Female Mage']),
				name: 'Female Mage',
				_native: '\uD83E\uDDD9\u200D♀️',
				nativeNonQual: '\uD83E\uDDD9\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD9\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDD9\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD9\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD9\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD9\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'secret',
			{
				keywords: _List_fromArray(
					['Circled Ideograph Secret', 'privacy', 'chinese', 'sshh', 'kanji', 'red-circle']),
				name: 'Circled Ideograph Secret',
				_native: '㊙️',
				nativeNonQual: '㊙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-nu',
			{
				keywords: _List_fromArray(
					['Niue Flag']),
				name: 'Niue Flag',
				_native: '🇳🇺',
				nativeNonQual: '🇳🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'u55b6',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-55b6', 'japanese', 'opening hours', 'orange-square']),
				name: 'Squared Cjk Unified Ideograph-55b6',
				_native: '🈺',
				nativeNonQual: '🈺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male_mage',
			{
				keywords: _List_fromArray(
					['Male Mage']),
				name: 'Male Mage',
				_native: '\uD83E\uDDD9\u200D♂️',
				nativeNonQual: '\uD83E\uDDD9\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD9\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDD9\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD9\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD9\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD9\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'cloud',
			{
				keywords: _List_fromArray(
					['Cloud', 'weather', 'sky']),
				name: 'Cloud',
				_native: '☁️',
				nativeNonQual: '☁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-nz',
			{
				keywords: _List_fromArray(
					['New Zealand Flag']),
				name: 'New Zealand Flag',
				_native: '🇳🇿',
				nativeNonQual: '🇳🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'partly_sunny',
			{
				keywords: _List_fromArray(
					['Sun Behind Cloud', 'weather', 'nature', 'cloudy', 'morning', 'fall', 'spring']),
				name: 'Sun Behind Cloud',
				_native: '⛅',
				nativeNonQual: '⛅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fairy',
			{
				keywords: _List_fromArray(
					['Fairy']),
				name: 'Fairy',
				_native: '\uD83E\uDDDA',
				nativeNonQual: '\uD83E\uDDDA',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDA\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDDA\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDDA\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDA\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDA\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'u6e80',
			{
				keywords: _List_fromArray(
					['Squared Cjk Unified Ideograph-6e80', 'full', 'chinese', 'japanese', 'red-square', 'kanji']),
				name: 'Squared Cjk Unified Ideograph-6e80',
				_native: '🈵',
				nativeNonQual: '🈵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_small_square',
			{
				keywords: _List_fromArray(
					['Black Small Square', 'shape', 'icon']),
				name: 'Black Small Square',
				_native: '▪️',
				nativeNonQual: '▪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'thunder_cloud_and_rain',
			{
				keywords: _List_fromArray(
					['Thunder Cloud and Rain']),
				name: 'Thunder Cloud and Rain',
				_native: '⛈️',
				nativeNonQual: '⛈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female_fairy',
			{
				keywords: _List_fromArray(
					['Female Fairy']),
				name: 'Female Fairy',
				_native: '\uD83E\uDDDA\u200D♀️',
				nativeNonQual: '\uD83E\uDDDA\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDA\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDDA\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDA\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDA\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDA\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-om',
			{
				keywords: _List_fromArray(
					['Oman Flag']),
				name: 'Oman Flag',
				_native: '🇴🇲',
				nativeNonQual: '🇴🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'white_small_square',
			{
				keywords: _List_fromArray(
					['White Small Square', 'shape', 'icon']),
				name: 'White Small Square',
				_native: '▫️',
				nativeNonQual: '▫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'flag-pa',
			{
				keywords: _List_fromArray(
					['Panama Flag']),
				name: 'Panama Flag',
				_native: '🇵🇦',
				nativeNonQual: '🇵🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mostly_sunny',
			{
				keywords: _List_fromArray(
					['Mostly Sunny']),
				name: 'Mostly Sunny',
				_native: '🌤️',
				nativeNonQual: '🌤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'male_fairy',
			{
				keywords: _List_fromArray(
					['Male Fairy']),
				name: 'Male Fairy',
				_native: '\uD83E\uDDDA\u200D♂️',
				nativeNonQual: '\uD83E\uDDDA\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDA\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDDA\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDA\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDA\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDA\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'barely_sunny',
			{
				keywords: _List_fromArray(
					['Barely Sunny']),
				name: 'Barely Sunny',
				_native: '🌥️',
				nativeNonQual: '🌥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'white_medium_square',
			{
				keywords: _List_fromArray(
					['White Medium Square', 'shape', 'stone', 'icon']),
				name: 'White Medium Square',
				_native: '◻️',
				nativeNonQual: '◻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'flag-pe',
			{
				keywords: _List_fromArray(
					['Peru Flag']),
				name: 'Peru Flag',
				_native: '🇵🇪',
				nativeNonQual: '🇵🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'vampire',
			{
				keywords: _List_fromArray(
					['Vampire']),
				name: 'Vampire',
				_native: '\uD83E\uDDDB',
				nativeNonQual: '\uD83E\uDDDB',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDB\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDDB\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDDB\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDB\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDB\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'female_vampire',
			{
				keywords: _List_fromArray(
					['Female Vampire']),
				name: 'Female Vampire',
				_native: '\uD83E\uDDDB\u200D♀️',
				nativeNonQual: '\uD83E\uDDDB\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDB\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDDB\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDB\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDB\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDB\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'partly_sunny_rain',
			{
				keywords: _List_fromArray(
					['Partly Sunny Rain']),
				name: 'Partly Sunny Rain',
				_native: '🌦️',
				nativeNonQual: '🌦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-pf',
			{
				keywords: _List_fromArray(
					['French Polynesia Flag']),
				name: 'French Polynesia Flag',
				_native: '🇵🇫',
				nativeNonQual: '🇵🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_medium_square',
			{
				keywords: _List_fromArray(
					['Black Medium Square', 'shape', 'button', 'icon']),
				name: 'Black Medium Square',
				_native: '◼️',
				nativeNonQual: '◼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'white_medium_small_square',
			{
				keywords: _List_fromArray(
					['White Medium Small Square', 'shape', 'stone', 'icon', 'button']),
				name: 'White Medium Small Square',
				_native: '◽',
				nativeNonQual: '◽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'rain_cloud',
			{
				keywords: _List_fromArray(
					['Rain Cloud']),
				name: 'Rain Cloud',
				_native: '🌧️',
				nativeNonQual: '🌧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-pg',
			{
				keywords: _List_fromArray(
					['Papua New Guinea Flag']),
				name: 'Papua New Guinea Flag',
				_native: '🇵🇬',
				nativeNonQual: '🇵🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male_vampire',
			{
				keywords: _List_fromArray(
					['Male Vampire']),
				name: 'Male Vampire',
				_native: '\uD83E\uDDDB\u200D♂️',
				nativeNonQual: '\uD83E\uDDDB\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDB\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDDB\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDB\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDB\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDB\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-ph',
			{
				keywords: _List_fromArray(
					['Philippines Flag']),
				name: 'Philippines Flag',
				_native: '🇵🇭',
				nativeNonQual: '🇵🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'merperson',
			{
				keywords: _List_fromArray(
					['Merperson']),
				name: 'Merperson',
				_native: '\uD83E\uDDDC',
				nativeNonQual: '\uD83E\uDDDC',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDC\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDDC\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDDC\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDC\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDC\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'black_medium_small_square',
			{
				keywords: _List_fromArray(
					['Black Medium Small Square', 'icon', 'shape', 'button']),
				name: 'Black Medium Small Square',
				_native: '◾',
				nativeNonQual: '◾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 3
			}),
			_Utils_Tuple2(
			'snow_cloud',
			{
				keywords: _List_fromArray(
					['Snow Cloud']),
				name: 'Snow Cloud',
				_native: '🌨️',
				nativeNonQual: '🌨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'lightning',
			{
				keywords: _List_fromArray(
					['Lightning']),
				name: 'Lightning',
				_native: '🌩️',
				nativeNonQual: '🌩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'black_large_square',
			{
				keywords: _List_fromArray(
					['Black Large Square', 'shape', 'icon', 'button']),
				name: 'Black Large Square',
				_native: '⬛',
				nativeNonQual: '⬛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mermaid',
			{
				keywords: _List_fromArray(
					['Mermaid']),
				name: 'Mermaid',
				_native: '\uD83E\uDDDC\u200D♀️',
				nativeNonQual: '\uD83E\uDDDC\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDC\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDDC\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDC\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDC\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDC\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-pk',
			{
				keywords: _List_fromArray(
					['Pakistan Flag']),
				name: 'Pakistan Flag',
				_native: '🇵🇰',
				nativeNonQual: '🇵🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'merman',
			{
				keywords: _List_fromArray(
					['Merman']),
				name: 'Merman',
				_native: '\uD83E\uDDDC\u200D♂️',
				nativeNonQual: '\uD83E\uDDDC\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDC\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDDC\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDC\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDC\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDC\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'white_large_square',
			{
				keywords: _List_fromArray(
					['White Large Square', 'shape', 'icon', 'stone', 'button']),
				name: 'White Large Square',
				_native: '⬜',
				nativeNonQual: '⬜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tornado',
			{
				keywords: _List_fromArray(
					['Tornado', 'weather', 'cyclone', 'twister']),
				name: 'Tornado',
				_native: '🌪️',
				nativeNonQual: '🌪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-pl',
			{
				keywords: _List_fromArray(
					['Poland Flag']),
				name: 'Poland Flag',
				_native: '🇵🇱',
				nativeNonQual: '🇵🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'elf',
			{
				keywords: _List_fromArray(
					['Elf']),
				name: 'Elf',
				_native: '\uD83E\uDDDD',
				nativeNonQual: '\uD83E\uDDDD',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDD\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDDD\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDDD\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDD\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDD\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'fog',
			{
				keywords: _List_fromArray(
					['Fog', 'weather']),
				name: 'Fog',
				_native: '🌫️',
				nativeNonQual: '🌫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'large_orange_diamond',
			{
				keywords: _List_fromArray(
					['Large Orange Diamond', 'shape', 'jewel', 'gem']),
				name: 'Large Orange Diamond',
				_native: '🔶',
				nativeNonQual: '🔶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-pm',
			{
				keywords: _List_fromArray(
					['St. Pierre & Miquelon Flag']),
				name: 'St. Pierre & Miquelon Flag',
				_native: '🇵🇲',
				nativeNonQual: '🇵🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-pn',
			{
				keywords: _List_fromArray(
					['Pitcairn Islands Flag']),
				name: 'Pitcairn Islands Flag',
				_native: '🇵🇳',
				nativeNonQual: '🇵🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'wind_blowing_face',
			{
				keywords: _List_fromArray(
					['Wind Blowing Face']),
				name: 'Wind Blowing Face',
				_native: '🌬️',
				nativeNonQual: '🌬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'female_elf',
			{
				keywords: _List_fromArray(
					['Female Elf']),
				name: 'Female Elf',
				_native: '\uD83E\uDDDD\u200D♀️',
				nativeNonQual: '\uD83E\uDDDD\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDD\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDDD\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDD\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDD\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDD\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'large_blue_diamond',
			{
				keywords: _List_fromArray(
					['Large Blue Diamond', 'shape', 'jewel', 'gem']),
				name: 'Large Blue Diamond',
				_native: '🔷',
				nativeNonQual: '🔷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'male_elf',
			{
				keywords: _List_fromArray(
					['Male Elf']),
				name: 'Male Elf',
				_native: '\uD83E\uDDDD\u200D♂️',
				nativeNonQual: '\uD83E\uDDDD\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDDD\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDDD\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDDD\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDDD\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDDD\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'small_orange_diamond',
			{
				keywords: _List_fromArray(
					['Small Orange Diamond', 'shape', 'jewel', 'gem']),
				name: 'Small Orange Diamond',
				_native: '🔸',
				nativeNonQual: '🔸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-pr',
			{
				keywords: _List_fromArray(
					['Puerto Rico Flag']),
				name: 'Puerto Rico Flag',
				_native: '🇵🇷',
				nativeNonQual: '🇵🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cyclone',
			{
				keywords: _List_fromArray(
					['Cyclone', 'weather', 'swirl', 'blue', 'cloud', 'vortex', 'spiral', 'whirlpool', 'spin', 'tornado', 'hurricane', 'typhoon']),
				name: 'Cyclone',
				_native: '🌀',
				nativeNonQual: '🌀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'rainbow',
			{
				keywords: _List_fromArray(
					['Rainbow', 'nature', 'happy', 'unicorn_face', 'photo', 'sky', 'spring']),
				name: 'Rainbow',
				_native: '🌈',
				nativeNonQual: '🌈',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'small_blue_diamond',
			{
				keywords: _List_fromArray(
					['Small Blue Diamond', 'shape', 'jewel', 'gem']),
				name: 'Small Blue Diamond',
				_native: '🔹',
				nativeNonQual: '🔹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'genie',
			{
				keywords: _List_fromArray(
					['Genie']),
				name: 'Genie',
				_native: '\uD83E\uDDDE',
				nativeNonQual: '\uD83E\uDDDE',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-ps',
			{
				keywords: _List_fromArray(
					['Palestinian Territories Flag']),
				name: 'Palestinian Territories Flag',
				_native: '🇵🇸',
				nativeNonQual: '🇵🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'small_red_triangle',
			{
				keywords: _List_fromArray(
					['Up-Pointing Red Triangle', 'shape', 'direction', 'up', 'top']),
				name: 'Up-Pointing Red Triangle',
				_native: '🔺',
				nativeNonQual: '🔺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'closed_umbrella',
			{
				keywords: _List_fromArray(
					['Closed Umbrella', 'weather', 'rain', 'drizzle']),
				name: 'Closed Umbrella',
				_native: '🌂',
				nativeNonQual: '🌂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female_genie',
			{
				keywords: _List_fromArray(
					['Female Genie']),
				name: 'Female Genie',
				_native: '\uD83E\uDDDE\u200D♀️',
				nativeNonQual: '\uD83E\uDDDE\u200D♀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-pt',
			{
				keywords: _List_fromArray(
					['Portugal Flag']),
				name: 'Portugal Flag',
				_native: '🇵🇹',
				nativeNonQual: '🇵🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-pw',
			{
				keywords: _List_fromArray(
					['Palau Flag']),
				name: 'Palau Flag',
				_native: '🇵🇼',
				nativeNonQual: '🇵🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'small_red_triangle_down',
			{
				keywords: _List_fromArray(
					['Down-Pointing Red Triangle', 'shape', 'direction', 'bottom']),
				name: 'Down-Pointing Red Triangle',
				_native: '🔻',
				nativeNonQual: '🔻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'umbrella',
			{
				keywords: _List_fromArray(
					['Umbrella', 'rainy', 'weather', 'spring']),
				name: 'Umbrella',
				_native: '☂️',
				nativeNonQual: '☂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'male_genie',
			{
				keywords: _List_fromArray(
					['Male Genie']),
				name: 'Male Genie',
				_native: '\uD83E\uDDDE\u200D♂️',
				nativeNonQual: '\uD83E\uDDDE\u200D♂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'zombie',
			{
				keywords: _List_fromArray(
					['Zombie']),
				name: 'Zombie',
				_native: '\uD83E\uDDDF',
				nativeNonQual: '\uD83E\uDDDF',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-py',
			{
				keywords: _List_fromArray(
					['Paraguay Flag']),
				name: 'Paraguay Flag',
				_native: '🇵🇾',
				nativeNonQual: '🇵🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'diamond_shape_with_a_dot_inside',
			{
				keywords: _List_fromArray(
					['Diamond Shape with a Dot Inside', 'jewel', 'blue', 'gem', 'crystal', 'fancy']),
				name: 'Diamond Shape with a Dot Inside',
				_native: '💠',
				nativeNonQual: '💠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'umbrella_with_rain_drops',
			{
				keywords: _List_fromArray(
					['Umbrella with Rain Drops']),
				name: 'Umbrella with Rain Drops',
				_native: '☔',
				nativeNonQual: '☔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'radio_button',
			{
				keywords: _List_fromArray(
					['Radio Button', 'input', 'old', 'music', 'circle']),
				name: 'Radio Button',
				_native: '🔘',
				nativeNonQual: '🔘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'female_zombie',
			{
				keywords: _List_fromArray(
					['Female Zombie']),
				name: 'Female Zombie',
				_native: '\uD83E\uDDDF\u200D♀️',
				nativeNonQual: '\uD83E\uDDDF\u200D♀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-qa',
			{
				keywords: _List_fromArray(
					['Qatar Flag']),
				name: 'Qatar Flag',
				_native: '🇶🇦',
				nativeNonQual: '🇶🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'umbrella_on_ground',
			{
				keywords: _List_fromArray(
					['Umbrella on Ground']),
				name: 'Umbrella on Ground',
				_native: '⛱️',
				nativeNonQual: '⛱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_square_button',
			{
				keywords: _List_fromArray(
					['Black Square Button', 'shape', 'input', 'frame']),
				name: 'Black Square Button',
				_native: '🔲',
				nativeNonQual: '🔲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'zap',
			{
				keywords: _List_fromArray(
					['High Voltage Sign', 'thunder', 'weather', 'lightning bolt', 'fast']),
				name: 'High Voltage Sign',
				_native: '⚡',
				nativeNonQual: '⚡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'male_zombie',
			{
				keywords: _List_fromArray(
					['Male Zombie']),
				name: 'Male Zombie',
				_native: '\uD83E\uDDDF\u200D♂️',
				nativeNonQual: '\uD83E\uDDDF\u200D♂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-re',
			{
				keywords: _List_fromArray(
					['Réunion Flag']),
				name: 'Réunion Flag',
				_native: '🇷🇪',
				nativeNonQual: '🇷🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ro',
			{
				keywords: _List_fromArray(
					['Romania Flag']),
				name: 'Romania Flag',
				_native: '🇷🇴',
				nativeNonQual: '🇷🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'snowflake',
			{
				keywords: _List_fromArray(
					['Snowflake', 'winter', 'season', 'cold', 'weather', 'christmas', 'xmas']),
				name: 'Snowflake',
				_native: '❄️',
				nativeNonQual: '❄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'white_square_button',
			{
				keywords: _List_fromArray(
					['White Square Button', 'shape', 'input']),
				name: 'White Square Button',
				_native: '🔳',
				nativeNonQual: '🔳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'person_frowning',
			{
				keywords: _List_fromArray(
					['Person Frowning']),
				name: 'Person Frowning',
				_native: '🙍',
				nativeNonQual: '🙍',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙍\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙍\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙍\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙍\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙍\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-rs',
			{
				keywords: _List_fromArray(
					['Serbia Flag']),
				name: 'Serbia Flag',
				_native: '🇷🇸',
				nativeNonQual: '🇷🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-frowning',
			{
				keywords: _List_fromArray(
					['Man Frowning']),
				name: 'Man Frowning',
				_native: '🙍\u200D♂️',
				nativeNonQual: '🙍\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙍\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🙍\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🙍\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🙍\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🙍\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'white_circle',
			{
				keywords: _List_fromArray(
					['Medium White Circle', 'shape', 'round']),
				name: 'Medium White Circle',
				_native: '⚪',
				nativeNonQual: '⚪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'snowman',
			{
				keywords: _List_fromArray(
					['Snowman', 'winter', 'season', 'cold', 'weather', 'christmas', 'xmas', 'frozen', 'without_snow']),
				name: 'Snowman',
				_native: '☃️',
				nativeNonQual: '☃',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'snowman_without_snow',
			{
				keywords: _List_fromArray(
					['Snowman Without Snow']),
				name: 'Snowman Without Snow',
				_native: '⛄',
				nativeNonQual: '⛄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ru',
			{
				keywords: _List_fromArray(
					['Russia Flag', 'russian', 'federation', 'flag', 'nation', 'country', 'banner']),
				name: 'Russia Flag',
				_native: '🇷🇺',
				nativeNonQual: '🇷🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_circle',
			{
				keywords: _List_fromArray(
					['Medium Black Circle', 'shape', 'button', 'round']),
				name: 'Medium Black Circle',
				_native: '⚫',
				nativeNonQual: '⚫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 4
			}),
			_Utils_Tuple2(
			'woman-frowning',
			{
				keywords: _List_fromArray(
					['Woman Frowning']),
				name: 'Woman Frowning',
				_native: '🙍\u200D♀️',
				nativeNonQual: '🙍\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙍\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🙍\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🙍\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🙍\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🙍\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-rw',
			{
				keywords: _List_fromArray(
					['Rwanda Flag']),
				name: 'Rwanda Flag',
				_native: '🇷🇼',
				nativeNonQual: '🇷🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'comet',
			{
				keywords: _List_fromArray(
					['Comet', 'space']),
				name: 'Comet',
				_native: '☄️',
				nativeNonQual: '☄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'person_with_pouting_face',
			{
				keywords: _List_fromArray(
					['Person with Pouting Face']),
				name: 'Person with Pouting Face',
				_native: '🙎',
				nativeNonQual: '🙎',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙎\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙎\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙎\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙎\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙎\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'red_circle',
			{
				keywords: _List_fromArray(
					['Large Red Circle', 'shape', 'error', 'danger']),
				name: 'Large Red Circle',
				_native: '🔴',
				nativeNonQual: '🔴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'large_blue_circle',
			{
				keywords: _List_fromArray(
					['Large Blue Circle', 'shape', 'icon', 'button']),
				name: 'Large Blue Circle',
				_native: '🔵',
				nativeNonQual: '🔵',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-pouting',
			{
				keywords: _List_fromArray(
					['Man Pouting']),
				name: 'Man Pouting',
				_native: '🙎\u200D♂️',
				nativeNonQual: '🙎\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙎\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🙎\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🙎\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🙎\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🙎\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sa',
			{
				keywords: _List_fromArray(
					['Saudi Arabia Flag']),
				name: 'Saudi Arabia Flag',
				_native: '🇸🇦',
				nativeNonQual: '🇸🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fire',
			{
				keywords: _List_fromArray(
					['Fire', 'hot', 'cook', 'flame']),
				name: 'Fire',
				_native: '🔥',
				nativeNonQual: '🔥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-pouting',
			{
				keywords: _List_fromArray(
					['Woman Pouting']),
				name: 'Woman Pouting',
				_native: '🙎\u200D♀️',
				nativeNonQual: '🙎\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙎\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🙎\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🙎\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🙎\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🙎\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sb',
			{
				keywords: _List_fromArray(
					['Solomon Islands Flag']),
				name: 'Solomon Islands Flag',
				_native: '🇸🇧',
				nativeNonQual: '🇸🇧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'droplet',
			{
				keywords: _List_fromArray(
					['Droplet', 'water', 'drip', 'faucet', 'spring']),
				name: 'Droplet',
				_native: '💧',
				nativeNonQual: '💧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'no_good',
			{
				keywords: _List_fromArray(
					['Face with No Good Gesture']),
				name: 'Face with No Good Gesture',
				_native: '🙅',
				nativeNonQual: '🙅',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙅\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙅\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙅\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙅\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙅\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sc',
			{
				keywords: _List_fromArray(
					['Seychelles Flag']),
				name: 'Seychelles Flag',
				_native: '🇸🇨',
				nativeNonQual: '🇸🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ocean',
			{
				keywords: _List_fromArray(
					['Water Wave', 'sea', 'water', 'wave', 'nature', 'tsunami', 'disaster']),
				name: 'Water Wave',
				_native: '🌊',
				nativeNonQual: '🌊',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-gesturing-no',
			{
				keywords: _List_fromArray(
					['Man Gesturing No']),
				name: 'Man Gesturing No',
				_native: '🙅\u200D♂️',
				nativeNonQual: '🙅\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙅\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🙅\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🙅\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🙅\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🙅\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sd',
			{
				keywords: _List_fromArray(
					['Sudan Flag']),
				name: 'Sudan Flag',
				_native: '🇸🇩',
				nativeNonQual: '🇸🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-gesturing-no',
			{
				keywords: _List_fromArray(
					['Woman Gesturing No']),
				name: 'Woman Gesturing No',
				_native: '🙅\u200D♀️',
				nativeNonQual: '🙅\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙅\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🙅\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🙅\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🙅\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🙅\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-se',
			{
				keywords: _List_fromArray(
					['Sweden Flag']),
				name: 'Sweden Flag',
				_native: '🇸🇪',
				nativeNonQual: '🇸🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sg',
			{
				keywords: _List_fromArray(
					['Singapore Flag']),
				name: 'Singapore Flag',
				_native: '🇸🇬',
				nativeNonQual: '🇸🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ok_woman',
			{
				keywords: _List_fromArray(
					['Face with Ok Gesture', 'women', 'girl', 'female', 'pink', 'human', 'woman']),
				name: 'Face with Ok Gesture',
				_native: '🙆',
				nativeNonQual: '🙆',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙆\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙆\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙆\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙆\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙆\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sh',
			{
				keywords: _List_fromArray(
					['St. Helena Flag']),
				name: 'St. Helena Flag',
				_native: '🇸🇭',
				nativeNonQual: '🇸🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-gesturing-ok',
			{
				keywords: _List_fromArray(
					['Man Gesturing Ok']),
				name: 'Man Gesturing Ok',
				_native: '🙆\u200D♂️',
				nativeNonQual: '🙆\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙆\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🙆\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🙆\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🙆\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🙆\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-si',
			{
				keywords: _List_fromArray(
					['Slovenia Flag']),
				name: 'Slovenia Flag',
				_native: '🇸🇮',
				nativeNonQual: '🇸🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-gesturing-ok',
			{
				keywords: _List_fromArray(
					['Woman Gesturing Ok']),
				name: 'Woman Gesturing Ok',
				_native: '🙆\u200D♀️',
				nativeNonQual: '🙆\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙆\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🙆\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🙆\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🙆\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🙆\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'information_desk_person',
			{
				keywords: _List_fromArray(
					['Information Desk Person']),
				name: 'Information Desk Person',
				_native: '💁',
				nativeNonQual: '💁',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💁\uD83C\uDFFF'),
							_Utils_Tuple2('light', '💁\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '💁\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '💁\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '💁\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sj',
			{
				keywords: _List_fromArray(
					['Svalbard & Jan Mayen Flag']),
				name: 'Svalbard & Jan Mayen Flag',
				_native: '🇸🇯',
				nativeNonQual: '🇸🇯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-tipping-hand',
			{
				keywords: _List_fromArray(
					['Man Tipping Hand']),
				name: 'Man Tipping Hand',
				_native: '💁\u200D♂️',
				nativeNonQual: '💁\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💁\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '💁\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '💁\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '💁\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '💁\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sk',
			{
				keywords: _List_fromArray(
					['Slovakia Flag']),
				name: 'Slovakia Flag',
				_native: '🇸🇰',
				nativeNonQual: '🇸🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sl',
			{
				keywords: _List_fromArray(
					['Sierra Leone Flag']),
				name: 'Sierra Leone Flag',
				_native: '🇸🇱',
				nativeNonQual: '🇸🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-tipping-hand',
			{
				keywords: _List_fromArray(
					['Woman Tipping Hand']),
				name: 'Woman Tipping Hand',
				_native: '💁\u200D♀️',
				nativeNonQual: '💁\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💁\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '💁\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '💁\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '💁\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '💁\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sm',
			{
				keywords: _List_fromArray(
					['San Marino Flag']),
				name: 'San Marino Flag',
				_native: '🇸🇲',
				nativeNonQual: '🇸🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'raising_hand',
			{
				keywords: _List_fromArray(
					['Happy Person Raising One Hand']),
				name: 'Happy Person Raising One Hand',
				_native: '🙋',
				nativeNonQual: '🙋',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙋\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙋\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙋\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙋\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙋\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sn',
			{
				keywords: _List_fromArray(
					['Senegal Flag']),
				name: 'Senegal Flag',
				_native: '🇸🇳',
				nativeNonQual: '🇸🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-raising-hand',
			{
				keywords: _List_fromArray(
					['Man Raising Hand']),
				name: 'Man Raising Hand',
				_native: '🙋\u200D♂️',
				nativeNonQual: '🙋\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙋\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🙋\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🙋\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🙋\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🙋\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-so',
			{
				keywords: _List_fromArray(
					['Somalia Flag']),
				name: 'Somalia Flag',
				_native: '🇸🇴',
				nativeNonQual: '🇸🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-raising-hand',
			{
				keywords: _List_fromArray(
					['Woman Raising Hand']),
				name: 'Woman Raising Hand',
				_native: '🙋\u200D♀️',
				nativeNonQual: '🙋\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙋\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🙋\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🙋\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🙋\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🙋\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sr',
			{
				keywords: _List_fromArray(
					['Suriname Flag']),
				name: 'Suriname Flag',
				_native: '🇸🇷',
				nativeNonQual: '🇸🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bow',
			{
				keywords: _List_fromArray(
					['Person Bowing Deeply']),
				name: 'Person Bowing Deeply',
				_native: '🙇',
				nativeNonQual: '🙇',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙇\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙇\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙇\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙇\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙇\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'man-bowing',
			{
				keywords: _List_fromArray(
					['Man Bowing']),
				name: 'Man Bowing',
				_native: '🙇\u200D♂️',
				nativeNonQual: '🙇\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙇\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🙇\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🙇\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🙇\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🙇\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ss',
			{
				keywords: _List_fromArray(
					['South Sudan Flag']),
				name: 'South Sudan Flag',
				_native: '🇸🇸',
				nativeNonQual: '🇸🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-bowing',
			{
				keywords: _List_fromArray(
					['Woman Bowing']),
				name: 'Woman Bowing',
				_native: '🙇\u200D♀️',
				nativeNonQual: '🙇\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙇\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🙇\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🙇\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🙇\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🙇\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-st',
			{
				keywords: _List_fromArray(
					['São Tomé & Príncipe Flag']),
				name: 'São Tomé & Príncipe Flag',
				_native: '🇸🇹',
				nativeNonQual: '🇸🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'face_palm',
			{
				keywords: _List_fromArray(
					['Face Palm']),
				name: 'Face Palm',
				_native: '\uD83E\uDD26',
				nativeNonQual: '\uD83E\uDD26',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD26\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD26\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD26\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD26\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD26\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-sv',
			{
				keywords: _List_fromArray(
					['El Salvador Flag']),
				name: 'El Salvador Flag',
				_native: '🇸🇻',
				nativeNonQual: '🇸🇻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-facepalming',
			{
				keywords: _List_fromArray(
					['Man Facepalming']),
				name: 'Man Facepalming',
				_native: '\uD83E\uDD26\u200D♂️',
				nativeNonQual: '\uD83E\uDD26\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD26\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDD26\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDD26\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD26\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD26\uD83C\uDFFC\u200D♂️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-sx',
			{
				keywords: _List_fromArray(
					['Sint Maarten Flag']),
				name: 'Sint Maarten Flag',
				_native: '🇸🇽',
				nativeNonQual: '🇸🇽',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-sy',
			{
				keywords: _List_fromArray(
					['Syria Flag']),
				name: 'Syria Flag',
				_native: '🇸🇾',
				nativeNonQual: '🇸🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-facepalming',
			{
				keywords: _List_fromArray(
					['Woman Facepalming']),
				name: 'Woman Facepalming',
				_native: '\uD83E\uDD26\u200D♀️',
				nativeNonQual: '\uD83E\uDD26\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD26\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDD26\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDD26\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD26\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD26\uD83C\uDFFC\u200D♀️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'shrug',
			{
				keywords: _List_fromArray(
					['Shrug']),
				name: 'Shrug',
				_native: '\uD83E\uDD37',
				nativeNonQual: '\uD83E\uDD37',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD37\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD37\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD37\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD37\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD37\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-sz',
			{
				keywords: _List_fromArray(
					['Swaziland Flag']),
				name: 'Swaziland Flag',
				_native: '🇸🇿',
				nativeNonQual: '🇸🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ta',
			{
				keywords: _List_fromArray(
					['Tristan Da Cunha Flag']),
				name: 'Tristan Da Cunha Flag',
				_native: '🇹🇦',
				nativeNonQual: '🇹🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-shrugging',
			{
				keywords: _List_fromArray(
					['Man Shrugging']),
				name: 'Man Shrugging',
				_native: '\uD83E\uDD37\u200D♂️',
				nativeNonQual: '\uD83E\uDD37\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD37\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDD37\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDD37\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD37\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD37\uD83C\uDFFC\u200D♂️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'woman-shrugging',
			{
				keywords: _List_fromArray(
					['Woman Shrugging']),
				name: 'Woman Shrugging',
				_native: '\uD83E\uDD37\u200D♀️',
				nativeNonQual: '\uD83E\uDD37\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD37\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDD37\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDD37\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD37\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD37\uD83C\uDFFC\u200D♀️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-tc',
			{
				keywords: _List_fromArray(
					['Turks & Caicos Islands Flag']),
				name: 'Turks & Caicos Islands Flag',
				_native: '🇹🇨',
				nativeNonQual: '🇹🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'massage',
			{
				keywords: _List_fromArray(
					['Face Massage']),
				name: 'Face Massage',
				_native: '💆',
				nativeNonQual: '💆',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💆\uD83C\uDFFF'),
							_Utils_Tuple2('light', '💆\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '💆\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '💆\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '💆\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-td',
			{
				keywords: _List_fromArray(
					['Chad Flag']),
				name: 'Chad Flag',
				_native: '🇹🇩',
				nativeNonQual: '🇹🇩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-getting-massage',
			{
				keywords: _List_fromArray(
					['Man Getting Massage']),
				name: 'Man Getting Massage',
				_native: '💆\u200D♂️',
				nativeNonQual: '💆\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💆\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '💆\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '💆\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '💆\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '💆\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tf',
			{
				keywords: _List_fromArray(
					['French Southern Territories Flag']),
				name: 'French Southern Territories Flag',
				_native: '🇹🇫',
				nativeNonQual: '🇹🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-getting-massage',
			{
				keywords: _List_fromArray(
					['Woman Getting Massage']),
				name: 'Woman Getting Massage',
				_native: '💆\u200D♀️',
				nativeNonQual: '💆\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💆\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '💆\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '💆\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '💆\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '💆\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tg',
			{
				keywords: _List_fromArray(
					['Togo Flag']),
				name: 'Togo Flag',
				_native: '🇹🇬',
				nativeNonQual: '🇹🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'haircut',
			{
				keywords: _List_fromArray(
					['Haircut']),
				name: 'Haircut',
				_native: '💇',
				nativeNonQual: '💇',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💇\uD83C\uDFFF'),
							_Utils_Tuple2('light', '💇\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '💇\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '💇\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '💇\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-th',
			{
				keywords: _List_fromArray(
					['Thailand Flag']),
				name: 'Thailand Flag',
				_native: '🇹🇭',
				nativeNonQual: '🇹🇭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-getting-haircut',
			{
				keywords: _List_fromArray(
					['Man Getting Haircut']),
				name: 'Man Getting Haircut',
				_native: '💇\u200D♂️',
				nativeNonQual: '💇\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💇\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '💇\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '💇\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '💇\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '💇\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tj',
			{
				keywords: _List_fromArray(
					['Tajikistan Flag']),
				name: 'Tajikistan Flag',
				_native: '🇹🇯',
				nativeNonQual: '🇹🇯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tk',
			{
				keywords: _List_fromArray(
					['Tokelau Flag']),
				name: 'Tokelau Flag',
				_native: '🇹🇰',
				nativeNonQual: '🇹🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-getting-haircut',
			{
				keywords: _List_fromArray(
					['Woman Getting Haircut']),
				name: 'Woman Getting Haircut',
				_native: '💇\u200D♀️',
				nativeNonQual: '💇\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💇\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '💇\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '💇\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '💇\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '💇\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'walking',
			{
				keywords: _List_fromArray(
					['Pedestrian']),
				name: 'Pedestrian',
				_native: '🚶',
				nativeNonQual: '🚶',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚶\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🚶\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🚶\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🚶\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🚶\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tl',
			{
				keywords: _List_fromArray(
					['Timor-Leste Flag']),
				name: 'Timor-Leste Flag',
				_native: '🇹🇱',
				nativeNonQual: '🇹🇱',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-walking',
			{
				keywords: _List_fromArray(
					['Man Walking']),
				name: 'Man Walking',
				_native: '🚶\u200D♂️',
				nativeNonQual: '🚶\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚶\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🚶\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🚶\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🚶\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🚶\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tm',
			{
				keywords: _List_fromArray(
					['Turkmenistan Flag']),
				name: 'Turkmenistan Flag',
				_native: '🇹🇲',
				nativeNonQual: '🇹🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-walking',
			{
				keywords: _List_fromArray(
					['Woman Walking']),
				name: 'Woman Walking',
				_native: '🚶\u200D♀️',
				nativeNonQual: '🚶\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚶\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🚶\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🚶\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🚶\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🚶\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tn',
			{
				keywords: _List_fromArray(
					['Tunisia Flag']),
				name: 'Tunisia Flag',
				_native: '🇹🇳',
				nativeNonQual: '🇹🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'runner',
			{
				keywords: _List_fromArray(
					['Runner']),
				name: 'Runner',
				_native: '🏃',
				nativeNonQual: '🏃',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏃\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🏃\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🏃\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🏃\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🏃\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-to',
			{
				keywords: _List_fromArray(
					['Tonga Flag']),
				name: 'Tonga Flag',
				_native: '🇹🇴',
				nativeNonQual: '🇹🇴',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-running',
			{
				keywords: _List_fromArray(
					['Man Running']),
				name: 'Man Running',
				_native: '🏃\u200D♂️',
				nativeNonQual: '🏃\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏃\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🏃\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🏃\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🏃\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🏃\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tr',
			{
				keywords: _List_fromArray(
					['Turkey Flag']),
				name: 'Turkey Flag',
				_native: '🇹🇷',
				nativeNonQual: '🇹🇷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tt',
			{
				keywords: _List_fromArray(
					['Trinidad & Tobago Flag']),
				name: 'Trinidad & Tobago Flag',
				_native: '🇹🇹',
				nativeNonQual: '🇹🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-running',
			{
				keywords: _List_fromArray(
					['Woman Running']),
				name: 'Woman Running',
				_native: '🏃\u200D♀️',
				nativeNonQual: '🏃\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏃\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🏃\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🏃\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🏃\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🏃\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tv',
			{
				keywords: _List_fromArray(
					['Tuvalu Flag']),
				name: 'Tuvalu Flag',
				_native: '🇹🇻',
				nativeNonQual: '🇹🇻',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dancer',
			{
				keywords: _List_fromArray(
					['Dancer', 'female', 'girl', 'woman', 'fun']),
				name: 'Dancer',
				_native: '💃',
				nativeNonQual: '💃',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💃\uD83C\uDFFF'),
							_Utils_Tuple2('light', '💃\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '💃\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '💃\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '💃\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tw',
			{
				keywords: _List_fromArray(
					['Taiwan Flag']),
				name: 'Taiwan Flag',
				_native: '🇹🇼',
				nativeNonQual: '🇹🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man_dancing',
			{
				keywords: _List_fromArray(
					['Man Dancing', 'male', 'boy', 'fun', 'dancer']),
				name: 'Man Dancing',
				_native: '\uD83D\uDD7A',
				nativeNonQual: '\uD83D\uDD7A',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83D\uDD7A\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83D\uDD7A\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83D\uDD7A\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83D\uDD7A\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83D\uDD7A\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'dancers',
			{
				keywords: _List_fromArray(
					['Woman with Bunny Ears']),
				name: 'Woman with Bunny Ears',
				_native: '👯',
				nativeNonQual: '👯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-tz',
			{
				keywords: _List_fromArray(
					['Tanzania Flag']),
				name: 'Tanzania Flag',
				_native: '🇹🇿',
				nativeNonQual: '🇹🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ua',
			{
				keywords: _List_fromArray(
					['Ukraine Flag']),
				name: 'Ukraine Flag',
				_native: '🇺🇦',
				nativeNonQual: '🇺🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-with-bunny-ears-partying',
			{
				keywords: _List_fromArray(
					['Man with Bunny Ears Partying']),
				name: 'Man with Bunny Ears Partying',
				_native: '👯\u200D♂️',
				nativeNonQual: '👯\u200D♂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-with-bunny-ears-partying',
			{
				keywords: _List_fromArray(
					['Woman with Bunny Ears Partying']),
				name: 'Woman with Bunny Ears Partying',
				_native: '👯\u200D♀️',
				nativeNonQual: '👯\u200D♀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ug',
			{
				keywords: _List_fromArray(
					['Uganda Flag']),
				name: 'Uganda Flag',
				_native: '🇺🇬',
				nativeNonQual: '🇺🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-um',
			{
				keywords: _List_fromArray(
					['U.s. Outlying Islands Flag']),
				name: 'U.s. Outlying Islands Flag',
				_native: '🇺🇲',
				nativeNonQual: '🇺🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'person_in_steamy_room',
			{
				keywords: _List_fromArray(
					['Person in Steamy Room']),
				name: 'Person in Steamy Room',
				_native: '\uD83E\uDDD6',
				nativeNonQual: '\uD83E\uDDD6',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD6\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD6\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD6\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD6\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD6\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'woman_in_steamy_room',
			{
				keywords: _List_fromArray(
					['Woman in Steamy Room']),
				name: 'Woman in Steamy Room',
				_native: '\uD83E\uDDD6\u200D♀️',
				nativeNonQual: '\uD83E\uDDD6\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD6\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDD6\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD6\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD6\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD6\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'us',
			{
				keywords: _List_fromArray(
					['United States Flag', 'united', 'states', 'america', 'flag', 'nation', 'country', 'banner']),
				name: 'United States Flag',
				_native: '🇺🇸',
				nativeNonQual: '🇺🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man_in_steamy_room',
			{
				keywords: _List_fromArray(
					['Man in Steamy Room']),
				name: 'Man in Steamy Room',
				_native: '\uD83E\uDDD6\u200D♂️',
				nativeNonQual: '\uD83E\uDDD6\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD6\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDD6\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD6\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD6\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD6\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'person_climbing',
			{
				keywords: _List_fromArray(
					['Person Climbing']),
				name: 'Person Climbing',
				_native: '\uD83E\uDDD7',
				nativeNonQual: '\uD83E\uDDD7',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD7\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD7\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD7\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD7\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD7\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-uy',
			{
				keywords: _List_fromArray(
					['Uruguay Flag']),
				name: 'Uruguay Flag',
				_native: '🇺🇾',
				nativeNonQual: '🇺🇾',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman_climbing',
			{
				keywords: _List_fromArray(
					['Woman Climbing']),
				name: 'Woman Climbing',
				_native: '\uD83E\uDDD7\u200D♀️',
				nativeNonQual: '\uD83E\uDDD7\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD7\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDD7\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD7\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD7\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD7\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-uz',
			{
				keywords: _List_fromArray(
					['Uzbekistan Flag']),
				name: 'Uzbekistan Flag',
				_native: '🇺🇿',
				nativeNonQual: '🇺🇿',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man_climbing',
			{
				keywords: _List_fromArray(
					['Man Climbing']),
				name: 'Man Climbing',
				_native: '\uD83E\uDDD7\u200D♂️',
				nativeNonQual: '\uD83E\uDDD7\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD7\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDD7\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD7\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD7\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD7\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-va',
			{
				keywords: _List_fromArray(
					['Vatican City Flag']),
				name: 'Vatican City Flag',
				_native: '🇻🇦',
				nativeNonQual: '🇻🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'person_in_lotus_position',
			{
				keywords: _List_fromArray(
					['Person in Lotus Position']),
				name: 'Person in Lotus Position',
				_native: '\uD83E\uDDD8',
				nativeNonQual: '\uD83E\uDDD8',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD8\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDDD8\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDDD8\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD8\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD8\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-vc',
			{
				keywords: _List_fromArray(
					['St. Vincent & Grenadines Flag']),
				name: 'St. Vincent & Grenadines Flag',
				_native: '🇻🇨',
				nativeNonQual: '🇻🇨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ve',
			{
				keywords: _List_fromArray(
					['Venezuela Flag']),
				name: 'Venezuela Flag',
				_native: '🇻🇪',
				nativeNonQual: '🇻🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman_in_lotus_position',
			{
				keywords: _List_fromArray(
					['Woman in Lotus Position']),
				name: 'Woman in Lotus Position',
				_native: '\uD83E\uDDD8\u200D♀️',
				nativeNonQual: '\uD83E\uDDD8\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD8\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDDD8\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD8\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD8\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD8\uD83C\uDFFC\u200D♀️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'man_in_lotus_position',
			{
				keywords: _List_fromArray(
					['Man in Lotus Position']),
				name: 'Man in Lotus Position',
				_native: '\uD83E\uDDD8\u200D♂️',
				nativeNonQual: '\uD83E\uDDD8\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDDD8\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDDD8\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDDD8\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDDD8\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDDD8\uD83C\uDFFC\u200D♂️')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'flag-vg',
			{
				keywords: _List_fromArray(
					['British Virgin Islands Flag']),
				name: 'British Virgin Islands Flag',
				_native: '🇻🇬',
				nativeNonQual: '🇻🇬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-vi',
			{
				keywords: _List_fromArray(
					['U.s. Virgin Islands Flag']),
				name: 'U.s. Virgin Islands Flag',
				_native: '🇻🇮',
				nativeNonQual: '🇻🇮',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bath',
			{
				keywords: _List_fromArray(
					['Bath', 'clean', 'shower', 'bathroom']),
				name: 'Bath',
				_native: '🛀',
				nativeNonQual: '🛀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🛀\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🛀\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🛀\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🛀\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🛀\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'sleeping_accommodation',
			{
				keywords: _List_fromArray(
					['Sleeping Accommodation']),
				name: 'Sleeping Accommodation',
				_native: '🛌',
				nativeNonQual: '🛌',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🛌\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🛌\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🛌\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🛌\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🛌\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-vn',
			{
				keywords: _List_fromArray(
					['Vietnam Flag']),
				name: 'Vietnam Flag',
				_native: '🇻🇳',
				nativeNonQual: '🇻🇳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man_in_business_suit_levitating',
			{
				keywords: _List_fromArray(
					['Man in Business Suit Levitating']),
				name: 'Man in Business Suit Levitating',
				_native: '🕴️',
				nativeNonQual: '🕴',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🕴\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🕴\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🕴\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🕴\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🕴\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-vu',
			{
				keywords: _List_fromArray(
					['Vanuatu Flag']),
				name: 'Vanuatu Flag',
				_native: '🇻🇺',
				nativeNonQual: '🇻🇺',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-wf',
			{
				keywords: _List_fromArray(
					['Wallis & Futuna Flag']),
				name: 'Wallis & Futuna Flag',
				_native: '🇼🇫',
				nativeNonQual: '🇼🇫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'speaking_head_in_silhouette',
			{
				keywords: _List_fromArray(
					['Speaking Head in Silhouette']),
				name: 'Speaking Head in Silhouette',
				_native: '🗣️',
				nativeNonQual: '🗣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'bust_in_silhouette',
			{
				keywords: _List_fromArray(
					['Bust in Silhouette', 'user', 'person', 'human']),
				name: 'Bust in Silhouette',
				_native: '👤',
				nativeNonQual: '👤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-ws',
			{
				keywords: _List_fromArray(
					['Samoa Flag']),
				name: 'Samoa Flag',
				_native: '🇼🇸',
				nativeNonQual: '🇼🇸',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'busts_in_silhouette',
			{
				keywords: _List_fromArray(
					['Busts in Silhouette', 'user', 'person', 'human', 'group', 'team']),
				name: 'Busts in Silhouette',
				_native: '👥',
				nativeNonQual: '👥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-xk',
			{
				keywords: _List_fromArray(
					['Kosovo Flag']),
				name: 'Kosovo Flag',
				_native: '🇽🇰',
				nativeNonQual: '🇽🇰',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'fencer',
			{
				keywords: _List_fromArray(
					['Fencer']),
				name: 'Fencer',
				_native: '\uD83E\uDD3A',
				nativeNonQual: '\uD83E\uDD3A',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'flag-ye',
			{
				keywords: _List_fromArray(
					['Yemen Flag']),
				name: 'Yemen Flag',
				_native: '🇾🇪',
				nativeNonQual: '🇾🇪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-yt',
			{
				keywords: _List_fromArray(
					['Mayotte Flag']),
				name: 'Mayotte Flag',
				_native: '🇾🇹',
				nativeNonQual: '🇾🇹',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'horse_racing',
			{
				keywords: _List_fromArray(
					['Horse Racing', 'animal', 'betting', 'competition', 'gambling', 'luck']),
				name: 'Horse Racing',
				_native: '🏇',
				nativeNonQual: '🏇',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏇\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🏇\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🏇\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🏇\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🏇\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-za',
			{
				keywords: _List_fromArray(
					['South Africa Flag']),
				name: 'South Africa Flag',
				_native: '🇿🇦',
				nativeNonQual: '🇿🇦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'skier',
			{
				keywords: _List_fromArray(
					['Skier', 'sports', 'winter', 'snow']),
				name: 'Skier',
				_native: '⛷️',
				nativeNonQual: '⛷',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'flag-zm',
			{
				keywords: _List_fromArray(
					['Zambia Flag']),
				name: 'Zambia Flag',
				_native: '🇿🇲',
				nativeNonQual: '🇿🇲',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'snowboarder',
			{
				keywords: _List_fromArray(
					['Snowboarder', 'sports', 'winter']),
				name: 'Snowboarder',
				_native: '🏂',
				nativeNonQual: '🏂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏂\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🏂\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🏂\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🏂\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🏂\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'golfer',
			{
				keywords: _List_fromArray(
					['Golfer']),
				name: 'Golfer',
				_native: '🏌️',
				nativeNonQual: '🏌',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏌\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🏌\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🏌\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🏌\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🏌\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-zw',
			{
				keywords: _List_fromArray(
					['Zimbabwe Flag']),
				name: 'Zimbabwe Flag',
				_native: '🇿🇼',
				nativeNonQual: '🇿🇼',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-golfing',
			{
				keywords: _List_fromArray(
					['Man Golfing']),
				name: 'Man Golfing',
				_native: '🏌️\u200D♂️',
				nativeNonQual: '🏌️\u200D♂️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏌\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🏌\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🏌\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🏌\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🏌\uD83C\uDFFC\u200D♂️')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-england',
			{
				keywords: _List_fromArray(
					['England Flag']),
				name: 'England Flag',
				_native: '🏴\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F',
				nativeNonQual: '🏴\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'woman-golfing',
			{
				keywords: _List_fromArray(
					['Woman Golfing']),
				name: 'Woman Golfing',
				_native: '🏌️\u200D♀️',
				nativeNonQual: '🏌️\u200D♀️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏌\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🏌\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🏌\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🏌\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🏌\uD83C\uDFFC\u200D♀️')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-scotland',
			{
				keywords: _List_fromArray(
					['Scotland Flag']),
				name: 'Scotland Flag',
				_native: '🏴\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F',
				nativeNonQual: '🏴\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'flag-wales',
			{
				keywords: _List_fromArray(
					['Wales Flag']),
				name: 'Wales Flag',
				_native: '🏴\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F',
				nativeNonQual: '🏴\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'surfer',
			{
				keywords: _List_fromArray(
					['Surfer']),
				name: 'Surfer',
				_native: '🏄',
				nativeNonQual: '🏄',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏄\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🏄\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🏄\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🏄\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🏄\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'man-surfing',
			{
				keywords: _List_fromArray(
					['Man Surfing']),
				name: 'Man Surfing',
				_native: '🏄\u200D♂️',
				nativeNonQual: '🏄\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏄\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🏄\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🏄\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🏄\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🏄\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-surfing',
			{
				keywords: _List_fromArray(
					['Woman Surfing']),
				name: 'Woman Surfing',
				_native: '🏄\u200D♀️',
				nativeNonQual: '🏄\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏄\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🏄\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🏄\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🏄\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🏄\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'rowboat',
			{
				keywords: _List_fromArray(
					['Rowboat']),
				name: 'Rowboat',
				_native: '🚣',
				nativeNonQual: '🚣',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚣\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🚣\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🚣\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🚣\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🚣\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'man-rowing-boat',
			{
				keywords: _List_fromArray(
					['Man Rowing Boat']),
				name: 'Man Rowing Boat',
				_native: '🚣\u200D♂️',
				nativeNonQual: '🚣\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚣\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🚣\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🚣\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🚣\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🚣\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-rowing-boat',
			{
				keywords: _List_fromArray(
					['Woman Rowing Boat']),
				name: 'Woman Rowing Boat',
				_native: '🚣\u200D♀️',
				nativeNonQual: '🚣\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚣\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🚣\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🚣\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🚣\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🚣\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'swimmer',
			{
				keywords: _List_fromArray(
					['Swimmer']),
				name: 'Swimmer',
				_native: '🏊',
				nativeNonQual: '🏊',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏊\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🏊\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🏊\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🏊\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🏊\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'man-swimming',
			{
				keywords: _List_fromArray(
					['Man Swimming']),
				name: 'Man Swimming',
				_native: '🏊\u200D♂️',
				nativeNonQual: '🏊\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏊\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🏊\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🏊\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🏊\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🏊\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-swimming',
			{
				keywords: _List_fromArray(
					['Woman Swimming']),
				name: 'Woman Swimming',
				_native: '🏊\u200D♀️',
				nativeNonQual: '🏊\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏊\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🏊\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🏊\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🏊\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🏊\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'person_with_ball',
			{
				keywords: _List_fromArray(
					['Person with Ball']),
				name: 'Person with Ball',
				_native: '⛹️',
				nativeNonQual: '⛹',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '⛹\uD83C\uDFFF'),
							_Utils_Tuple2('light', '⛹\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '⛹\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '⛹\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '⛹\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'man-bouncing-ball',
			{
				keywords: _List_fromArray(
					['Man Bouncing Ball']),
				name: 'Man Bouncing Ball',
				_native: '⛹️\u200D♂️',
				nativeNonQual: '⛹️\u200D♂️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '⛹\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '⛹\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '⛹\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '⛹\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '⛹\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-bouncing-ball',
			{
				keywords: _List_fromArray(
					['Woman Bouncing Ball']),
				name: 'Woman Bouncing Ball',
				_native: '⛹️\u200D♀️',
				nativeNonQual: '⛹️\u200D♀️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '⛹\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '⛹\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '⛹\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '⛹\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '⛹\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'weight_lifter',
			{
				keywords: _List_fromArray(
					['Weight Lifter']),
				name: 'Weight Lifter',
				_native: '🏋️',
				nativeNonQual: '🏋',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏋\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🏋\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🏋\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🏋\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🏋\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'man-lifting-weights',
			{
				keywords: _List_fromArray(
					['Man Lifting Weights']),
				name: 'Man Lifting Weights',
				_native: '🏋️\u200D♂️',
				nativeNonQual: '🏋️\u200D♂️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏋\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🏋\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🏋\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🏋\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🏋\uD83C\uDFFC\u200D♂️')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'woman-lifting-weights',
			{
				keywords: _List_fromArray(
					['Woman Lifting Weights']),
				name: 'Woman Lifting Weights',
				_native: '🏋️\u200D♀️',
				nativeNonQual: '🏋️\u200D♀️',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🏋\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🏋\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🏋\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🏋\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🏋\uD83C\uDFFC\u200D♀️')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'bicyclist',
			{
				keywords: _List_fromArray(
					['Bicyclist']),
				name: 'Bicyclist',
				_native: '🚴',
				nativeNonQual: '🚴',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚴\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🚴\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🚴\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🚴\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🚴\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'man-biking',
			{
				keywords: _List_fromArray(
					['Man Biking']),
				name: 'Man Biking',
				_native: '🚴\u200D♂️',
				nativeNonQual: '🚴\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚴\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🚴\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🚴\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🚴\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🚴\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-biking',
			{
				keywords: _List_fromArray(
					['Woman Biking']),
				name: 'Woman Biking',
				_native: '🚴\u200D♀️',
				nativeNonQual: '🚴\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚴\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🚴\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🚴\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🚴\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🚴\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'mountain_bicyclist',
			{
				keywords: _List_fromArray(
					['Mountain Bicyclist']),
				name: 'Mountain Bicyclist',
				_native: '🚵',
				nativeNonQual: '🚵',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚵\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🚵\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🚵\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🚵\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🚵\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'man-mountain-biking',
			{
				keywords: _List_fromArray(
					['Man Mountain Biking']),
				name: 'Man Mountain Biking',
				_native: '🚵\u200D♂️',
				nativeNonQual: '🚵\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚵\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '🚵\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '🚵\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '🚵\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '🚵\uD83C\uDFFC\u200D♂️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-mountain-biking',
			{
				keywords: _List_fromArray(
					['Woman Mountain Biking']),
				name: 'Woman Mountain Biking',
				_native: '🚵\u200D♀️',
				nativeNonQual: '🚵\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🚵\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '🚵\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '🚵\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '🚵\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '🚵\uD83C\uDFFC\u200D♀️')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'racing_car',
			{
				keywords: _List_fromArray(
					['Racing Car', 'sports', 'race', 'fast', 'formula', 'f1']),
				name: 'Racing Car',
				_native: '🏎️',
				nativeNonQual: '🏎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'racing_motorcycle',
			{
				keywords: _List_fromArray(
					['Racing Motorcycle']),
				name: 'Racing Motorcycle',
				_native: '🏍️',
				nativeNonQual: '🏍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'person_doing_cartwheel',
			{
				keywords: _List_fromArray(
					['Person Doing Cartwheel']),
				name: 'Person Doing Cartwheel',
				_native: '\uD83E\uDD38',
				nativeNonQual: '\uD83E\uDD38',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD38\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD38\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD38\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD38\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD38\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'man-cartwheeling',
			{
				keywords: _List_fromArray(
					['Man Cartwheeling']),
				name: 'Man Cartwheeling',
				_native: '\uD83E\uDD38\u200D♂️',
				nativeNonQual: '\uD83E\uDD38\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD38\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDD38\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDD38\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD38\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD38\uD83C\uDFFC\u200D♂️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'woman-cartwheeling',
			{
				keywords: _List_fromArray(
					['Woman Cartwheeling']),
				name: 'Woman Cartwheeling',
				_native: '\uD83E\uDD38\u200D♀️',
				nativeNonQual: '\uD83E\uDD38\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD38\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDD38\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDD38\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD38\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD38\uD83C\uDFFC\u200D♀️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'wrestlers',
			{
				keywords: _List_fromArray(
					['Wrestlers']),
				name: 'Wrestlers',
				_native: '\uD83E\uDD3C',
				nativeNonQual: '\uD83E\uDD3C',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'man-wrestling',
			{
				keywords: _List_fromArray(
					['Man Wrestling']),
				name: 'Man Wrestling',
				_native: '\uD83E\uDD3C\u200D♂️',
				nativeNonQual: '\uD83E\uDD3C\u200D♂',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'woman-wrestling',
			{
				keywords: _List_fromArray(
					['Woman Wrestling']),
				name: 'Woman Wrestling',
				_native: '\uD83E\uDD3C\u200D♀️',
				nativeNonQual: '\uD83E\uDD3C\u200D♀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'water_polo',
			{
				keywords: _List_fromArray(
					['Water Polo']),
				name: 'Water Polo',
				_native: '\uD83E\uDD3D',
				nativeNonQual: '\uD83E\uDD3D',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD3D\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD3D\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD3D\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD3D\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD3D\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'man-playing-water-polo',
			{
				keywords: _List_fromArray(
					['Man Playing Water Polo']),
				name: 'Man Playing Water Polo',
				_native: '\uD83E\uDD3D\u200D♂️',
				nativeNonQual: '\uD83E\uDD3D\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD3D\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDD3D\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDD3D\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD3D\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD3D\uD83C\uDFFC\u200D♂️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'woman-playing-water-polo',
			{
				keywords: _List_fromArray(
					['Woman Playing Water Polo']),
				name: 'Woman Playing Water Polo',
				_native: '\uD83E\uDD3D\u200D♀️',
				nativeNonQual: '\uD83E\uDD3D\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD3D\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDD3D\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDD3D\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD3D\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD3D\uD83C\uDFFC\u200D♀️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'handball',
			{
				keywords: _List_fromArray(
					['Handball']),
				name: 'Handball',
				_native: '\uD83E\uDD3E',
				nativeNonQual: '\uD83E\uDD3E',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD3E\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD3E\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD3E\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD3E\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD3E\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'man-playing-handball',
			{
				keywords: _List_fromArray(
					['Man Playing Handball']),
				name: 'Man Playing Handball',
				_native: '\uD83E\uDD3E\u200D♂️',
				nativeNonQual: '\uD83E\uDD3E\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD3E\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDD3E\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDD3E\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD3E\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD3E\uD83C\uDFFC\u200D♂️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'woman-playing-handball',
			{
				keywords: _List_fromArray(
					['Woman Playing Handball']),
				name: 'Woman Playing Handball',
				_native: '\uD83E\uDD3E\u200D♀️',
				nativeNonQual: '\uD83E\uDD3E\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD3E\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDD3E\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDD3E\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD3E\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD3E\uD83C\uDFFC\u200D♀️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'juggling',
			{
				keywords: _List_fromArray(
					['Juggling']),
				name: 'Juggling',
				_native: '\uD83E\uDD39',
				nativeNonQual: '\uD83E\uDD39',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD39\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD39\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD39\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD39\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD39\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'man-juggling',
			{
				keywords: _List_fromArray(
					['Man Juggling']),
				name: 'Man Juggling',
				_native: '\uD83E\uDD39\u200D♂️',
				nativeNonQual: '\uD83E\uDD39\u200D♂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD39\uD83C\uDFFF\u200D♂️'),
							_Utils_Tuple2('light', '\uD83E\uDD39\uD83C\uDFFB\u200D♂️'),
							_Utils_Tuple2('medium', '\uD83E\uDD39\uD83C\uDFFD\u200D♂️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD39\uD83C\uDFFE\u200D♂️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD39\uD83C\uDFFC\u200D♂️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'woman-juggling',
			{
				keywords: _List_fromArray(
					['Woman Juggling']),
				name: 'Woman Juggling',
				_native: '\uD83E\uDD39\u200D♀️',
				nativeNonQual: '\uD83E\uDD39\u200D♀',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD39\uD83C\uDFFF\u200D♀️'),
							_Utils_Tuple2('light', '\uD83E\uDD39\uD83C\uDFFB\u200D♀️'),
							_Utils_Tuple2('medium', '\uD83E\uDD39\uD83C\uDFFD\u200D♀️'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD39\uD83C\uDFFE\u200D♀️'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD39\uD83C\uDFFC\u200D♀️')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'couple',
			{
				keywords: _List_fromArray(
					['Man and Woman Holding Hands', 'pair', 'people', 'human', 'love', 'date', 'dating', 'like', 'affection', 'valentines', 'marriage']),
				name: 'Man and Woman Holding Hands',
				_native: '👫',
				nativeNonQual: '👫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'two_men_holding_hands',
			{
				keywords: _List_fromArray(
					['Two Men Holding Hands', 'pair', 'couple', 'love', 'like', 'bromance', 'friendship', 'people', 'human']),
				name: 'Two Men Holding Hands',
				_native: '👬',
				nativeNonQual: '👬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'two_women_holding_hands',
			{
				keywords: _List_fromArray(
					['Two Women Holding Hands', 'pair', 'friendship', 'couple', 'love', 'like', 'female', 'people', 'human']),
				name: 'Two Women Holding Hands',
				_native: '👭',
				nativeNonQual: '👭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'couplekiss',
			{
				keywords: _List_fromArray(
					['Kiss']),
				name: 'Kiss',
				_native: '💏',
				nativeNonQual: '💏',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-kiss-man',
			{
				keywords: _List_fromArray(
					['Woman Kiss Man']),
				name: 'Woman Kiss Man',
				_native: '👩\u200D❤️\u200D💋\u200D👨',
				nativeNonQual: '👩\u200D❤\u200D💋\u200D👨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-kiss-man',
			{
				keywords: _List_fromArray(
					['Man Kiss Man']),
				name: 'Man Kiss Man',
				_native: '👨\u200D❤️\u200D💋\u200D👨',
				nativeNonQual: '👨\u200D❤\u200D💋\u200D👨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-kiss-woman',
			{
				keywords: _List_fromArray(
					['Woman Kiss Woman']),
				name: 'Woman Kiss Woman',
				_native: '👩\u200D❤️\u200D💋\u200D👩',
				nativeNonQual: '👩\u200D❤\u200D💋\u200D👩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'couple_with_heart',
			{
				keywords: _List_fromArray(
					['Couple with Heart']),
				name: 'Couple with Heart',
				_native: '💑',
				nativeNonQual: '💑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-heart-man',
			{
				keywords: _List_fromArray(
					['Woman Heart Man']),
				name: 'Woman Heart Man',
				_native: '👩\u200D❤️\u200D👨',
				nativeNonQual: '👩\u200D❤\u200D👨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-heart-man',
			{
				keywords: _List_fromArray(
					['Man Heart Man']),
				name: 'Man Heart Man',
				_native: '👨\u200D❤️\u200D👨',
				nativeNonQual: '👨\u200D❤\u200D👨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-heart-woman',
			{
				keywords: _List_fromArray(
					['Woman Heart Woman']),
				name: 'Woman Heart Woman',
				_native: '👩\u200D❤️\u200D👩',
				nativeNonQual: '👩\u200D❤\u200D👩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'family',
			{
				keywords: _List_fromArray(
					['Family']),
				name: 'Family',
				_native: '👪',
				nativeNonQual: '👪',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-woman-boy',
			{
				keywords: _List_fromArray(
					['Man Woman Boy']),
				name: 'Man Woman Boy',
				_native: '👨\u200D👩\u200D👦',
				nativeNonQual: '👨\u200D👩\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-woman-girl',
			{
				keywords: _List_fromArray(
					['Man Woman Girl']),
				name: 'Man Woman Girl',
				_native: '👨\u200D👩\u200D👧',
				nativeNonQual: '👨\u200D👩\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-woman-girl-boy',
			{
				keywords: _List_fromArray(
					['Man Woman Girl Boy']),
				name: 'Man Woman Girl Boy',
				_native: '👨\u200D👩\u200D👧\u200D👦',
				nativeNonQual: '👨\u200D👩\u200D👧\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-woman-boy-boy',
			{
				keywords: _List_fromArray(
					['Man Woman Boy Boy']),
				name: 'Man Woman Boy Boy',
				_native: '👨\u200D👩\u200D👦\u200D👦',
				nativeNonQual: '👨\u200D👩\u200D👦\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-woman-girl-girl',
			{
				keywords: _List_fromArray(
					['Man Woman Girl Girl']),
				name: 'Man Woman Girl Girl',
				_native: '👨\u200D👩\u200D👧\u200D👧',
				nativeNonQual: '👨\u200D👩\u200D👧\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-man-boy',
			{
				keywords: _List_fromArray(
					['Man Man Boy']),
				name: 'Man Man Boy',
				_native: '👨\u200D👨\u200D👦',
				nativeNonQual: '👨\u200D👨\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-man-girl',
			{
				keywords: _List_fromArray(
					['Man Man Girl']),
				name: 'Man Man Girl',
				_native: '👨\u200D👨\u200D👧',
				nativeNonQual: '👨\u200D👨\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-man-girl-boy',
			{
				keywords: _List_fromArray(
					['Man Man Girl Boy']),
				name: 'Man Man Girl Boy',
				_native: '👨\u200D👨\u200D👧\u200D👦',
				nativeNonQual: '👨\u200D👨\u200D👧\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-man-boy-boy',
			{
				keywords: _List_fromArray(
					['Man Man Boy Boy']),
				name: 'Man Man Boy Boy',
				_native: '👨\u200D👨\u200D👦\u200D👦',
				nativeNonQual: '👨\u200D👨\u200D👦\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-man-girl-girl',
			{
				keywords: _List_fromArray(
					['Man Man Girl Girl']),
				name: 'Man Man Girl Girl',
				_native: '👨\u200D👨\u200D👧\u200D👧',
				nativeNonQual: '👨\u200D👨\u200D👧\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-woman-boy',
			{
				keywords: _List_fromArray(
					['Woman Woman Boy']),
				name: 'Woman Woman Boy',
				_native: '👩\u200D👩\u200D👦',
				nativeNonQual: '👩\u200D👩\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-woman-girl',
			{
				keywords: _List_fromArray(
					['Woman Woman Girl']),
				name: 'Woman Woman Girl',
				_native: '👩\u200D👩\u200D👧',
				nativeNonQual: '👩\u200D👩\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-woman-girl-boy',
			{
				keywords: _List_fromArray(
					['Woman Woman Girl Boy']),
				name: 'Woman Woman Girl Boy',
				_native: '👩\u200D👩\u200D👧\u200D👦',
				nativeNonQual: '👩\u200D👩\u200D👧\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-woman-boy-boy',
			{
				keywords: _List_fromArray(
					['Woman Woman Boy Boy']),
				name: 'Woman Woman Boy Boy',
				_native: '👩\u200D👩\u200D👦\u200D👦',
				nativeNonQual: '👩\u200D👩\u200D👦\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-woman-girl-girl',
			{
				keywords: _List_fromArray(
					['Woman Woman Girl Girl']),
				name: 'Woman Woman Girl Girl',
				_native: '👩\u200D👩\u200D👧\u200D👧',
				nativeNonQual: '👩\u200D👩\u200D👧\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-boy',
			{
				keywords: _List_fromArray(
					['Man Boy']),
				name: 'Man Boy',
				_native: '👨\u200D👦',
				nativeNonQual: '👨\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-boy-boy',
			{
				keywords: _List_fromArray(
					['Man Boy Boy']),
				name: 'Man Boy Boy',
				_native: '👨\u200D👦\u200D👦',
				nativeNonQual: '👨\u200D👦\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-girl',
			{
				keywords: _List_fromArray(
					['Man Girl']),
				name: 'Man Girl',
				_native: '👨\u200D👧',
				nativeNonQual: '👨\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-girl-boy',
			{
				keywords: _List_fromArray(
					['Man Girl Boy']),
				name: 'Man Girl Boy',
				_native: '👨\u200D👧\u200D👦',
				nativeNonQual: '👨\u200D👧\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'man-girl-girl',
			{
				keywords: _List_fromArray(
					['Man Girl Girl']),
				name: 'Man Girl Girl',
				_native: '👨\u200D👧\u200D👧',
				nativeNonQual: '👨\u200D👧\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-boy',
			{
				keywords: _List_fromArray(
					['Woman Boy']),
				name: 'Woman Boy',
				_native: '👩\u200D👦',
				nativeNonQual: '👩\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-boy-boy',
			{
				keywords: _List_fromArray(
					['Woman Boy Boy']),
				name: 'Woman Boy Boy',
				_native: '👩\u200D👦\u200D👦',
				nativeNonQual: '👩\u200D👦\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-girl',
			{
				keywords: _List_fromArray(
					['Woman Girl']),
				name: 'Woman Girl',
				_native: '👩\u200D👧',
				nativeNonQual: '👩\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-girl-boy',
			{
				keywords: _List_fromArray(
					['Woman Girl Boy']),
				name: 'Woman Girl Boy',
				_native: '👩\u200D👧\u200D👦',
				nativeNonQual: '👩\u200D👧\u200D👦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'woman-girl-girl',
			{
				keywords: _List_fromArray(
					['Woman Girl Girl']),
				name: 'Woman Girl Girl',
				_native: '👩\u200D👧\u200D👧',
				nativeNonQual: '👩\u200D👧\u200D👧',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'selfie',
			{
				keywords: _List_fromArray(
					['Selfie', 'camera', 'phone']),
				name: 'Selfie',
				_native: '\uD83E\uDD33',
				nativeNonQual: '\uD83E\uDD33',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD33\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD33\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD33\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD33\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD33\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'muscle',
			{
				keywords: _List_fromArray(
					['Flexed Biceps', 'arm', 'flex', 'hand', 'summer', 'strong', 'biceps']),
				name: 'Flexed Biceps',
				_native: '💪',
				nativeNonQual: '💪',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💪\uD83C\uDFFF'),
							_Utils_Tuple2('light', '💪\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '💪\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '💪\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '💪\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'point_left',
			{
				keywords: _List_fromArray(
					['White Left Pointing Backhand Index', 'direction', 'fingers', 'hand', 'left']),
				name: 'White Left Pointing Backhand Index',
				_native: '👈',
				nativeNonQual: '👈',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👈\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👈\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👈\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👈\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👈\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'point_right',
			{
				keywords: _List_fromArray(
					['White Right Pointing Backhand Index', 'fingers', 'hand', 'direction', 'right']),
				name: 'White Right Pointing Backhand Index',
				_native: '👉',
				nativeNonQual: '👉',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👉\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👉\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👉\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👉\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👉\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'point_up',
			{
				keywords: _List_fromArray(
					['White Up Pointing Index', 'hand', 'fingers', 'direction', 'up']),
				name: 'White Up Pointing Index',
				_native: '☝️',
				nativeNonQual: '☝',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '☝\uD83C\uDFFF'),
							_Utils_Tuple2('light', '☝\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '☝\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '☝\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '☝\uD83C\uDFFC')
						])),
				version: 1
			}),
			_Utils_Tuple2(
			'point_up_2',
			{
				keywords: _List_fromArray(
					['White Up Pointing Backhand Index', 'fingers', 'hand', 'direction', 'up']),
				name: 'White Up Pointing Backhand Index',
				_native: '👆',
				nativeNonQual: '👆',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👆\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👆\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👆\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👆\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👆\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'middle_finger',
			{
				keywords: _List_fromArray(
					['Reversed Hand with Middle Finger Extended']),
				name: 'Reversed Hand with Middle Finger Extended',
				_native: '🖕',
				nativeNonQual: '🖕',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🖕\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🖕\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🖕\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🖕\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🖕\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'point_down',
			{
				keywords: _List_fromArray(
					['White Down Pointing Backhand Index', 'fingers', 'hand', 'direction', 'down']),
				name: 'White Down Pointing Backhand Index',
				_native: '👇',
				nativeNonQual: '👇',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👇\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👇\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👇\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👇\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👇\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'v',
			{
				keywords: _List_fromArray(
					['Victory Hand', 'fingers', 'ohyeah', 'hand', 'peace', 'victory', 'two']),
				name: 'Victory Hand',
				_native: '✌️',
				nativeNonQual: '✌',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '✌\uD83C\uDFFF'),
							_Utils_Tuple2('light', '✌\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '✌\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '✌\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '✌\uD83C\uDFFC')
						])),
				version: 1
			}),
			_Utils_Tuple2(
			'crossed_fingers',
			{
				keywords: _List_fromArray(
					['Hand with Index and Middle Fingers Crossed', 'good', 'lucky']),
				name: 'Hand with Index and Middle Fingers Crossed',
				_native: '\uD83E\uDD1E',
				nativeNonQual: '\uD83E\uDD1E',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD1E\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD1E\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD1E\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD1E\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD1E\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'spock-hand',
			{
				keywords: _List_fromArray(
					['Raised Hand with Part Between Middle and Ring Fingers']),
				name: 'Raised Hand with Part Between Middle and Ring Fingers',
				_native: '🖖',
				nativeNonQual: '🖖',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🖖\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🖖\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🖖\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🖖\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🖖\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'the_horns',
			{
				keywords: _List_fromArray(
					['Sign of the Horns']),
				name: 'Sign of the Horns',
				_native: '\uD83E\uDD18',
				nativeNonQual: '\uD83E\uDD18',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD18\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD18\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD18\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD18\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD18\uD83C\uDFFC')
						])),
				version: 8
			}),
			_Utils_Tuple2(
			'call_me_hand',
			{
				keywords: _List_fromArray(
					['Call Me Hand', 'hands', 'gesture']),
				name: 'Call Me Hand',
				_native: '\uD83E\uDD19',
				nativeNonQual: '\uD83E\uDD19',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD19\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD19\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD19\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD19\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD19\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'raised_hand_with_fingers_splayed',
			{
				keywords: _List_fromArray(
					['Raised Hand with Fingers Splayed', 'hand', 'fingers', 'palm']),
				name: 'Raised Hand with Fingers Splayed',
				_native: '🖐️',
				nativeNonQual: '🖐',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🖐\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🖐\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🖐\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🖐\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🖐\uD83C\uDFFC')
						])),
				version: 7
			}),
			_Utils_Tuple2(
			'hand',
			{
				keywords: _List_fromArray(
					['Raised Hand']),
				name: 'Raised Hand',
				_native: '✋',
				nativeNonQual: '✋',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '✋\uD83C\uDFFF'),
							_Utils_Tuple2('light', '✋\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '✋\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '✋\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '✋\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'ok_hand',
			{
				keywords: _List_fromArray(
					['Ok Hand Sign', 'fingers', 'limbs', 'perfect', 'ok', 'okay']),
				name: 'Ok Hand Sign',
				_native: '👌',
				nativeNonQual: '👌',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👌\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👌\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👌\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👌\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👌\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'+1',
			{
				keywords: _List_fromArray(
					['Thumbs Up Sign', 'thumbsup', 'yes', 'awesome', 'good', 'agree', 'accept', 'cool', 'hand', 'like']),
				name: 'Thumbs Up Sign',
				_native: '👍',
				nativeNonQual: '👍',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👍\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👍\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👍\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👍\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👍\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'-1',
			{
				keywords: _List_fromArray(
					['Thumbs Down Sign', 'thumbsdown', 'no', 'dislike', 'hand']),
				name: 'Thumbs Down Sign',
				_native: '👎',
				nativeNonQual: '👎',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👎\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👎\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👎\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👎\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👎\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'fist',
			{
				keywords: _List_fromArray(
					['Raised Fist', 'fingers', 'hand', 'grasp']),
				name: 'Raised Fist',
				_native: '✊',
				nativeNonQual: '✊',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '✊\uD83C\uDFFF'),
							_Utils_Tuple2('light', '✊\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '✊\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '✊\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '✊\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'facepunch',
			{
				keywords: _List_fromArray(
					['Fisted Hand Sign', 'angry', 'violence', 'fist', 'hit', 'attack', 'hand']),
				name: 'Fisted Hand Sign',
				_native: '👊',
				nativeNonQual: '👊',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👊\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👊\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👊\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👊\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👊\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'left-facing_fist',
			{
				keywords: _List_fromArray(
					['Left-Facing Fist']),
				name: 'Left-Facing Fist',
				_native: '\uD83E\uDD1B',
				nativeNonQual: '\uD83E\uDD1B',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD1B\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD1B\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD1B\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD1B\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD1B\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'right-facing_fist',
			{
				keywords: _List_fromArray(
					['Right-Facing Fist']),
				name: 'Right-Facing Fist',
				_native: '\uD83E\uDD1C',
				nativeNonQual: '\uD83E\uDD1C',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD1C\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD1C\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD1C\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD1C\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD1C\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'raised_back_of_hand',
			{
				keywords: _List_fromArray(
					['Raised Back of Hand', 'fingers', 'raised', 'backhand']),
				name: 'Raised Back of Hand',
				_native: '\uD83E\uDD1A',
				nativeNonQual: '\uD83E\uDD1A',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD1A\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD1A\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD1A\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD1A\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD1A\uD83C\uDFFC')
						])),
				version: 9
			}),
			_Utils_Tuple2(
			'wave',
			{
				keywords: _List_fromArray(
					['Waving Hand Sign', 'hands', 'gesture', 'goodbye', 'solong', 'farewell', 'hello', 'hi', 'palm']),
				name: 'Waving Hand Sign',
				_native: '👋',
				nativeNonQual: '👋',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👋\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👋\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👋\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👋\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👋\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'i_love_you_hand_sign',
			{
				keywords: _List_fromArray(
					['I Love You Hand Sign']),
				name: 'I Love You Hand Sign',
				_native: '\uD83E\uDD1F',
				nativeNonQual: '\uD83E\uDD1F',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD1F\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD1F\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD1F\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD1F\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD1F\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'writing_hand',
			{
				keywords: _List_fromArray(
					['Writing Hand', 'lower_left_ballpoint_pen', 'stationery', 'write', 'compose']),
				name: 'Writing Hand',
				_native: '✍️',
				nativeNonQual: '✍',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '✍\uD83C\uDFFF'),
							_Utils_Tuple2('light', '✍\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '✍\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '✍\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '✍\uD83C\uDFFC')
						])),
				version: 1
			}),
			_Utils_Tuple2(
			'clap',
			{
				keywords: _List_fromArray(
					['Clapping Hands Sign', 'hands', 'praise', 'applause', 'congrats', 'yay']),
				name: 'Clapping Hands Sign',
				_native: '👏',
				nativeNonQual: '👏',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👏\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👏\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👏\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👏\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👏\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'open_hands',
			{
				keywords: _List_fromArray(
					['Open Hands Sign', 'fingers', 'butterfly', 'hands', 'open']),
				name: 'Open Hands Sign',
				_native: '👐',
				nativeNonQual: '👐',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👐\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👐\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👐\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👐\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👐\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'raised_hands',
			{
				keywords: _List_fromArray(
					['Person Raising Both Hands in Celebration', 'gesture', 'hooray', 'yea', 'celebration', 'hands']),
				name: 'Person Raising Both Hands in Celebration',
				_native: '🙌',
				nativeNonQual: '🙌',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙌\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙌\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙌\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙌\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙌\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'palms_up_together',
			{
				keywords: _List_fromArray(
					['Palms Up Together']),
				name: 'Palms Up Together',
				_native: '\uD83E\uDD32',
				nativeNonQual: '\uD83E\uDD32',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '\uD83E\uDD32\uD83C\uDFFF'),
							_Utils_Tuple2('light', '\uD83E\uDD32\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '\uD83E\uDD32\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '\uD83E\uDD32\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '\uD83E\uDD32\uD83C\uDFFC')
						])),
				version: 10
			}),
			_Utils_Tuple2(
			'pray',
			{
				keywords: _List_fromArray(
					['Person with Folded Hands', 'please', 'hope', 'wish', 'namaste', 'highfive']),
				name: 'Person with Folded Hands',
				_native: '🙏',
				nativeNonQual: '🙏',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '🙏\uD83C\uDFFF'),
							_Utils_Tuple2('light', '🙏\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '🙏\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '🙏\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '🙏\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'handshake',
			{
				keywords: _List_fromArray(
					['Handshake', 'agreement', 'shake']),
				name: 'Handshake',
				_native: '\uD83E\uDD1D',
				nativeNonQual: '\uD83E\uDD1D',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'nail_care',
			{
				keywords: _List_fromArray(
					['Nail Polish', 'beauty', 'manicure', 'finger', 'fashion', 'nail']),
				name: 'Nail Polish',
				_native: '💅',
				nativeNonQual: '💅',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '💅\uD83C\uDFFF'),
							_Utils_Tuple2('light', '💅\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '💅\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '💅\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '💅\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'ear',
			{
				keywords: _List_fromArray(
					['Ear', 'face', 'hear', 'sound', 'listen']),
				name: 'Ear',
				_native: '👂',
				nativeNonQual: '👂',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👂\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👂\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👂\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👂\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👂\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'nose',
			{
				keywords: _List_fromArray(
					['Nose', 'smell', 'sniff']),
				name: 'Nose',
				_native: '👃',
				nativeNonQual: '👃',
				skinVariations: $elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2('dark', '👃\uD83C\uDFFF'),
							_Utils_Tuple2('light', '👃\uD83C\uDFFB'),
							_Utils_Tuple2('medium', '👃\uD83C\uDFFD'),
							_Utils_Tuple2('mediumDark', '👃\uD83C\uDFFE'),
							_Utils_Tuple2('mediumLight', '👃\uD83C\uDFFC')
						])),
				version: 5
			}),
			_Utils_Tuple2(
			'footprints',
			{
				keywords: _List_fromArray(
					['Footprints', 'feet', 'tracking', 'walking', 'beach']),
				name: 'Footprints',
				_native: '👣',
				nativeNonQual: '👣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'eyes',
			{
				keywords: _List_fromArray(
					['Eyes', 'look', 'watch', 'stalk', 'peek', 'see']),
				name: 'Eyes',
				_native: '👀',
				nativeNonQual: '👀',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'eye',
			{
				keywords: _List_fromArray(
					['Eye', 'face', 'look', 'see', 'watch', 'stare']),
				name: 'Eye',
				_native: '👁️',
				nativeNonQual: '👁',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'eye-in-speech-bubble',
			{
				keywords: _List_fromArray(
					['Eye in Speech Bubble']),
				name: 'Eye in Speech Bubble',
				_native: '👁️\u200D🗨️',
				nativeNonQual: '👁️\u200D🗨️',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'brain',
			{
				keywords: _List_fromArray(
					['Brain']),
				name: 'Brain',
				_native: '\uD83E\uDDE0',
				nativeNonQual: '\uD83E\uDDE0',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'tongue',
			{
				keywords: _List_fromArray(
					['Tongue', 'mouth', 'playful']),
				name: 'Tongue',
				_native: '👅',
				nativeNonQual: '👅',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'lips',
			{
				keywords: _List_fromArray(
					['Mouth', 'mouth', 'kiss']),
				name: 'Mouth',
				_native: '👄',
				nativeNonQual: '👄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'kiss',
			{
				keywords: _List_fromArray(
					['Kiss Mark', 'face', 'lips', 'love', 'like', 'affection', 'valentines']),
				name: 'Kiss Mark',
				_native: '💋',
				nativeNonQual: '💋',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'cupid',
			{
				keywords: _List_fromArray(
					['Heart with Arrow', 'love', 'like', 'heart', 'affection', 'valentines']),
				name: 'Heart with Arrow',
				_native: '💘',
				nativeNonQual: '💘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heart',
			{
				keywords: _List_fromArray(
					['Heavy Black Heart', 'love', 'like', 'valentines']),
				name: 'Heavy Black Heart',
				_native: '❤️',
				nativeNonQual: '❤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'heartbeat',
			{
				keywords: _List_fromArray(
					['Beating Heart', 'love', 'like', 'affection', 'valentines', 'pink', 'heart']),
				name: 'Beating Heart',
				_native: '💓',
				nativeNonQual: '💓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'broken_heart',
			{
				keywords: _List_fromArray(
					['Broken Heart', 'sad', 'sorry', 'break', 'heart', 'heartbreak']),
				name: 'Broken Heart',
				_native: '💔',
				nativeNonQual: '💔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'two_hearts',
			{
				keywords: _List_fromArray(
					['Two Hearts', 'love', 'like', 'affection', 'valentines', 'heart']),
				name: 'Two Hearts',
				_native: '💕',
				nativeNonQual: '💕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sparkling_heart',
			{
				keywords: _List_fromArray(
					['Sparkling Heart', 'love', 'like', 'affection', 'valentines']),
				name: 'Sparkling Heart',
				_native: '💖',
				nativeNonQual: '💖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heartpulse',
			{
				keywords: _List_fromArray(
					['Growing Heart', 'like', 'love', 'affection', 'valentines', 'pink']),
				name: 'Growing Heart',
				_native: '💗',
				nativeNonQual: '💗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'blue_heart',
			{
				keywords: _List_fromArray(
					['Blue Heart', 'love', 'like', 'affection', 'valentines']),
				name: 'Blue Heart',
				_native: '💙',
				nativeNonQual: '💙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'green_heart',
			{
				keywords: _List_fromArray(
					['Green Heart', 'love', 'like', 'affection', 'valentines']),
				name: 'Green Heart',
				_native: '💚',
				nativeNonQual: '💚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'yellow_heart',
			{
				keywords: _List_fromArray(
					['Yellow Heart', 'love', 'like', 'affection', 'valentines']),
				name: 'Yellow Heart',
				_native: '💛',
				nativeNonQual: '💛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'orange_heart',
			{
				keywords: _List_fromArray(
					['Orange Heart']),
				name: 'Orange Heart',
				_native: '\uD83E\uDDE1',
				nativeNonQual: '\uD83E\uDDE1',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'purple_heart',
			{
				keywords: _List_fromArray(
					['Purple Heart', 'love', 'like', 'affection', 'valentines']),
				name: 'Purple Heart',
				_native: '💜',
				nativeNonQual: '💜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'black_heart',
			{
				keywords: _List_fromArray(
					['Black Heart', 'evil']),
				name: 'Black Heart',
				_native: '\uD83D\uDDA4',
				nativeNonQual: '\uD83D\uDDA4',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 9
			}),
			_Utils_Tuple2(
			'gift_heart',
			{
				keywords: _List_fromArray(
					['Heart with Ribbon', 'love', 'valentines']),
				name: 'Heart with Ribbon',
				_native: '💝',
				nativeNonQual: '💝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'revolving_hearts',
			{
				keywords: _List_fromArray(
					['Revolving Hearts', 'love', 'like', 'affection', 'valentines']),
				name: 'Revolving Hearts',
				_native: '💞',
				nativeNonQual: '💞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heart_decoration',
			{
				keywords: _List_fromArray(
					['Heart Decoration', 'purple-square', 'love', 'like']),
				name: 'Heart Decoration',
				_native: '💟',
				nativeNonQual: '💟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'heavy_heart_exclamation_mark_ornament',
			{
				keywords: _List_fromArray(
					['Heavy Heart Exclamation Mark Ornament']),
				name: 'Heavy Heart Exclamation Mark Ornament',
				_native: '❣️',
				nativeNonQual: '❣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 1
			}),
			_Utils_Tuple2(
			'love_letter',
			{
				keywords: _List_fromArray(
					['Love Letter', 'email', 'like', 'affection', 'envelope', 'valentines']),
				name: 'Love Letter',
				_native: '💌',
				nativeNonQual: '💌',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'zzz',
			{
				keywords: _List_fromArray(
					['Sleeping Symbol', 'sleepy', 'tired', 'dream']),
				name: 'Sleeping Symbol',
				_native: '💤',
				nativeNonQual: '💤',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'anger',
			{
				keywords: _List_fromArray(
					['Anger Symbol', 'angry', 'mad']),
				name: 'Anger Symbol',
				_native: '💢',
				nativeNonQual: '💢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bomb',
			{
				keywords: _List_fromArray(
					['Bomb', 'boom', 'explode', 'explosion', 'terrorism']),
				name: 'Bomb',
				_native: '💣',
				nativeNonQual: '💣',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'boom',
			{
				keywords: _List_fromArray(
					['Collision Symbol', 'bomb', 'explode', 'explosion', 'collision', 'blown']),
				name: 'Collision Symbol',
				_native: '💥',
				nativeNonQual: '💥',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sweat_drops',
			{
				keywords: _List_fromArray(
					['Splashing Sweat Symbol', 'water', 'drip', 'oops']),
				name: 'Splashing Sweat Symbol',
				_native: '💦',
				nativeNonQual: '💦',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dash',
			{
				keywords: _List_fromArray(
					['Dash Symbol', 'wind', 'air', 'fast', 'shoo', 'fart', 'smoke', 'puff']),
				name: 'Dash Symbol',
				_native: '💨',
				nativeNonQual: '💨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dizzy',
			{
				keywords: _List_fromArray(
					['Dizzy Symbol', 'star', 'sparkle', 'shoot', 'magic']),
				name: 'Dizzy Symbol',
				_native: '💫',
				nativeNonQual: '💫',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'speech_balloon',
			{
				keywords: _List_fromArray(
					['Speech Balloon', 'bubble', 'words', 'message', 'talk', 'chatting']),
				name: 'Speech Balloon',
				_native: '💬',
				nativeNonQual: '💬',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'left_speech_bubble',
			{
				keywords: _List_fromArray(
					['Left Speech Bubble', 'words', 'message', 'talk', 'chatting']),
				name: 'Left Speech Bubble',
				_native: '🗨️',
				nativeNonQual: '🗨',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'right_anger_bubble',
			{
				keywords: _List_fromArray(
					['Right Anger Bubble', 'caption', 'speech', 'thinking', 'mad']),
				name: 'Right Anger Bubble',
				_native: '🗯️',
				nativeNonQual: '🗯',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'thought_balloon',
			{
				keywords: _List_fromArray(
					['Thought Balloon', 'bubble', 'cloud', 'speech', 'thinking', 'dream']),
				name: 'Thought Balloon',
				_native: '💭',
				nativeNonQual: '💭',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'hole',
			{
				keywords: _List_fromArray(
					['Hole', 'embarrassing']),
				name: 'Hole',
				_native: '🕳️',
				nativeNonQual: '🕳',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'eyeglasses',
			{
				keywords: _List_fromArray(
					['Eyeglasses', 'fashion', 'accessories', 'eyesight', 'nerdy', 'dork', 'geek']),
				name: 'Eyeglasses',
				_native: '👓',
				nativeNonQual: '👓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'dark_sunglasses',
			{
				keywords: _List_fromArray(
					['Dark Sunglasses', 'face', 'cool', 'accessories']),
				name: 'Dark Sunglasses',
				_native: '🕶️',
				nativeNonQual: '🕶',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'necktie',
			{
				keywords: _List_fromArray(
					['Necktie', 'shirt', 'suitup', 'formal', 'fashion', 'cloth', 'business']),
				name: 'Necktie',
				_native: '👔',
				nativeNonQual: '👔',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shirt',
			{
				keywords: _List_fromArray(
					['T-Shirt']),
				name: 'T-Shirt',
				_native: '👕',
				nativeNonQual: '👕',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'jeans',
			{
				keywords: _List_fromArray(
					['Jeans', 'fashion', 'shopping']),
				name: 'Jeans',
				_native: '👖',
				nativeNonQual: '👖',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'scarf',
			{
				keywords: _List_fromArray(
					['Scarf']),
				name: 'Scarf',
				_native: '\uD83E\uDDE3',
				nativeNonQual: '\uD83E\uDDE3',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'gloves',
			{
				keywords: _List_fromArray(
					['Gloves']),
				name: 'Gloves',
				_native: '\uD83E\uDDE4',
				nativeNonQual: '\uD83E\uDDE4',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'coat',
			{
				keywords: _List_fromArray(
					['Coat']),
				name: 'Coat',
				_native: '\uD83E\uDDE5',
				nativeNonQual: '\uD83E\uDDE5',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'socks',
			{
				keywords: _List_fromArray(
					['Socks']),
				name: 'Socks',
				_native: '\uD83E\uDDE6',
				nativeNonQual: '\uD83E\uDDE6',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'dress',
			{
				keywords: _List_fromArray(
					['Dress', 'clothes', 'fashion', 'shopping']),
				name: 'Dress',
				_native: '👗',
				nativeNonQual: '👗',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'kimono',
			{
				keywords: _List_fromArray(
					['Kimono', 'dress', 'fashion', 'women', 'female', 'japanese']),
				name: 'Kimono',
				_native: '👘',
				nativeNonQual: '👘',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'bikini',
			{
				keywords: _List_fromArray(
					['Bikini', 'swimming', 'female', 'woman', 'girl', 'fashion', 'beach', 'summer']),
				name: 'Bikini',
				_native: '👙',
				nativeNonQual: '👙',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'womans_clothes',
			{
				keywords: _List_fromArray(
					['Womans Clothes', 'fashion', 'shopping_bags', 'female']),
				name: 'Womans Clothes',
				_native: '👚',
				nativeNonQual: '👚',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'purse',
			{
				keywords: _List_fromArray(
					['Purse', 'fashion', 'accessories', 'money', 'sales', 'shopping']),
				name: 'Purse',
				_native: '👛',
				nativeNonQual: '👛',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'handbag',
			{
				keywords: _List_fromArray(
					['Handbag', 'fashion', 'accessory', 'accessories', 'shopping']),
				name: 'Handbag',
				_native: '👜',
				nativeNonQual: '👜',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'pouch',
			{
				keywords: _List_fromArray(
					['Pouch', 'bag', 'accessories', 'shopping']),
				name: 'Pouch',
				_native: '👝',
				nativeNonQual: '👝',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'shopping_bags',
			{
				keywords: _List_fromArray(
					['Shopping Bags']),
				name: 'Shopping Bags',
				_native: '🛍️',
				nativeNonQual: '🛍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 7
			}),
			_Utils_Tuple2(
			'school_satchel',
			{
				keywords: _List_fromArray(
					['School Satchel', 'student', 'education', 'bag', 'backpack']),
				name: 'School Satchel',
				_native: '🎒',
				nativeNonQual: '🎒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mans_shoe',
			{
				keywords: _List_fromArray(
					['Mans Shoe', 'fashion', 'male']),
				name: 'Mans Shoe',
				_native: '👞',
				nativeNonQual: '👞',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'athletic_shoe',
			{
				keywords: _List_fromArray(
					['Athletic Shoe', 'shoes', 'sports', 'sneakers']),
				name: 'Athletic Shoe',
				_native: '👟',
				nativeNonQual: '👟',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'high_heel',
			{
				keywords: _List_fromArray(
					['High-Heeled Shoe', 'fashion', 'shoes', 'female', 'pumps', 'stiletto']),
				name: 'High-Heeled Shoe',
				_native: '👠',
				nativeNonQual: '👠',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'sandal',
			{
				keywords: _List_fromArray(
					['Womans Sandal', 'shoes', 'fashion', 'flip flops']),
				name: 'Womans Sandal',
				_native: '👡',
				nativeNonQual: '👡',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'boot',
			{
				keywords: _List_fromArray(
					['Womans Boots', 'shoes', 'fashion']),
				name: 'Womans Boots',
				_native: '👢',
				nativeNonQual: '👢',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'crown',
			{
				keywords: _List_fromArray(
					['Crown', 'king', 'kod', 'leader', 'royalty', 'lord']),
				name: 'Crown',
				_native: '👑',
				nativeNonQual: '👑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'womans_hat',
			{
				keywords: _List_fromArray(
					['Womans Hat', 'fashion', 'accessories', 'female', 'lady', 'spring']),
				name: 'Womans Hat',
				_native: '👒',
				nativeNonQual: '👒',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'tophat',
			{
				keywords: _List_fromArray(
					['Top Hat', 'magic', 'gentleman', 'classy', 'circus']),
				name: 'Top Hat',
				_native: '🎩',
				nativeNonQual: '🎩',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'mortar_board',
			{
				keywords: _List_fromArray(
					['Graduation Cap', 'school', 'college', 'degree', 'university', 'graduation', 'cap', 'hat', 'legal', 'learn', 'education']),
				name: 'Graduation Cap',
				_native: '🎓',
				nativeNonQual: '🎓',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'billed_cap',
			{
				keywords: _List_fromArray(
					['Billed Cap']),
				name: 'Billed Cap',
				_native: '\uD83E\uDDE2',
				nativeNonQual: '\uD83E\uDDE2',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 10
			}),
			_Utils_Tuple2(
			'helmet_with_white_cross',
			{
				keywords: _List_fromArray(
					['Helmet with White Cross']),
				name: 'Helmet with White Cross',
				_native: '⛑️',
				nativeNonQual: '⛑',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'prayer_beads',
			{
				keywords: _List_fromArray(
					['Prayer Beads', 'dhikr', 'religious']),
				name: 'Prayer Beads',
				_native: '\uD83D\uDCFF',
				nativeNonQual: '\uD83D\uDCFF',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 8
			}),
			_Utils_Tuple2(
			'lipstick',
			{
				keywords: _List_fromArray(
					['Lipstick', 'female', 'girl', 'fashion', 'woman']),
				name: 'Lipstick',
				_native: '💄',
				nativeNonQual: '💄',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'ring',
			{
				keywords: _List_fromArray(
					['Ring', 'wedding', 'propose', 'marriage', 'valentines', 'diamond', 'fashion', 'jewelry', 'gem', 'engagement']),
				name: 'Ring',
				_native: '💍',
				nativeNonQual: '💍',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			}),
			_Utils_Tuple2(
			'gem',
			{
				keywords: _List_fromArray(
					['Gem Stone', 'blue', 'ruby', 'diamond', 'jewelry']),
				name: 'Gem Stone',
				_native: '💎',
				nativeNonQual: '💎',
				skinVariations: $elm$core$Dict$fromList(_List_Nil),
				version: 5
			})
		]));
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Styles$emojiPicker = F2(
	function (offsetX, offsetY) {
		return _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding', '0px'),
				A2($elm$html$Html$Attributes$style, 'backgroundColor', 'rgb(255, 255, 255)'),
				A2($elm$html$Html$Attributes$style, 'z-index', '5'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'align-content', 'stretch'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$elm$core$String$fromFloat(offsetY) + 'px'),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$elm$core$String$fromFloat(offsetX) + 'px'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'left')
			]);
	});
var $author$project$Styles$emojisMain = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'flex', '1 1 auto'),
		A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
		A2($elm$html$Html$Attributes$style, 'padding', '0px 0px 0px 5px'),
		A2($elm$html$Html$Attributes$style, 'white-space', 'normal')
	]);
var $author$project$Icons$activity_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113')
	]);
var $author$project$Icons$activity = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['jack_o_lantern', 'christmas_tree', 'fireworks', 'sparkler', 'sparkles', 'balloon', 'tada', 'confetti_ball', 'tanabata_tree', 'bamboo', 'dolls', 'flags', 'wind_chime', 'rice_scene', 'ribbon', 'gift', 'reminder_ribbon', 'admission_tickets', 'ticket', 'medal', 'trophy', 'sports_medal', 'first_place_medal', 'second_place_medal', 'third_place_medal', 'soccer', 'baseball', 'basketball', 'volleyball', 'football', 'rugby_football', 'tennis', '8ball', 'bowling', 'cricket_bat_and_ball', 'field_hockey_stick_and_ball', 'ice_hockey_stick_and_puck', 'table_tennis_paddle_and_ball', 'badminton_racquet_and_shuttlecock', 'boxing_glove', 'martial_arts_uniform', 'goal_net', 'dart', 'golf', 'ice_skate', 'fishing_pole_and_fish', 'running_shirt_with_sash', 'ski', 'sled', 'curling_stone', 'video_game', 'joystick', 'game_die', 'spades', 'hearts', 'diamonds', 'clubs', 'black_joker', 'mahjong', 'flower_playing_cards']),
		id: 'activity',
		name: 'Activities'
	},
	$author$project$Icons$helperFun($author$project$Icons$activity_path));
var $author$project$Icons$flags_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z')
	]);
var $author$project$Icons$flags = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['checkered_flag', 'cn', 'crossed_flags', 'de', 'es', 'flag-ac', 'flag-ad', 'flag-ae', 'flag-af', 'flag-ag', 'flag-ai', 'flag-al', 'flag-am', 'flag-ao', 'flag-aq', 'flag-ar', 'flag-as', 'flag-at', 'flag-au', 'flag-aw', 'flag-ax', 'flag-az', 'flag-ba', 'flag-bb', 'flag-bd', 'flag-be', 'flag-bf', 'flag-bg', 'flag-bh', 'flag-bi', 'flag-bj', 'flag-bl', 'flag-bm', 'flag-bn', 'flag-bo', 'flag-bq', 'flag-br', 'flag-bs', 'flag-bt', 'flag-bv', 'flag-bw', 'flag-by', 'flag-bz', 'flag-ca', 'flag-cc', 'flag-cd', 'flag-cf', 'flag-cg', 'flag-ch', 'flag-ci', 'flag-ck', 'flag-cl', 'flag-cm', 'flag-co', 'flag-cp', 'flag-cr', 'flag-cu', 'flag-cv', 'flag-cw', 'flag-cx', 'flag-cy', 'flag-cz', 'flag-dg', 'flag-dj', 'flag-dk', 'flag-dm', 'flag-do', 'flag-dz', 'flag-ea', 'flag-ec', 'flag-ee', 'flag-eg', 'flag-eh', 'flag-england', 'flag-er', 'flag-et', 'flag-eu', 'flag-fi', 'flag-fj', 'flag-fk', 'flag-fm', 'flag-fo', 'flag-ga', 'flag-gd', 'flag-ge', 'flag-gf', 'flag-gg', 'flag-gh', 'flag-gi', 'flag-gl', 'flag-gm', 'flag-gn', 'flag-gp', 'flag-gq', 'flag-gr', 'flag-gs', 'flag-gt', 'flag-gu', 'flag-gw', 'flag-gy', 'flag-hk', 'flag-hm', 'flag-hn', 'flag-hr', 'flag-ht', 'flag-hu', 'flag-ic', 'flag-id', 'flag-ie', 'flag-il', 'flag-im', 'flag-in', 'flag-io', 'flag-iq', 'flag-ir', 'flag-is', 'flag-je', 'flag-jm', 'flag-jo', 'flag-ke', 'flag-kg', 'flag-kh', 'flag-ki', 'flag-km', 'flag-kn', 'flag-kp', 'flag-kw', 'flag-ky', 'flag-kz', 'flag-la', 'flag-lb', 'flag-lc', 'flag-li', 'flag-lk', 'flag-lr', 'flag-ls', 'flag-lt', 'flag-lu', 'flag-lv', 'flag-ly', 'flag-ma', 'flag-mc', 'flag-md', 'flag-me', 'flag-mf', 'flag-mg', 'flag-mh', 'flag-mk', 'flag-ml', 'flag-mm', 'flag-mn', 'flag-mo', 'flag-mp', 'flag-mq', 'flag-mr', 'flag-ms', 'flag-mt', 'flag-mu', 'flag-mv', 'flag-mw', 'flag-mx', 'flag-my', 'flag-mz', 'flag-na', 'flag-nc', 'flag-ne', 'flag-nf', 'flag-ng', 'flag-ni', 'flag-nl', 'flag-no', 'flag-np', 'flag-nr', 'flag-nu', 'flag-nz', 'flag-om', 'flag-pa', 'flag-pe', 'flag-pf', 'flag-pg', 'flag-ph', 'flag-pk', 'flag-pl', 'flag-pm', 'flag-pn', 'flag-pr', 'flag-ps', 'flag-pt', 'flag-pw', 'flag-py', 'flag-qa', 'flag-re', 'flag-ro', 'flag-rs', 'flag-rw', 'flag-sa', 'flag-sb', 'flag-sc', 'flag-scotland', 'flag-sd', 'flag-se', 'flag-sg', 'flag-sh', 'flag-si', 'flag-sj', 'flag-sk', 'flag-sl', 'flag-sm', 'flag-sn', 'flag-so', 'flag-sr', 'flag-ss', 'flag-st', 'flag-sv', 'flag-sx', 'flag-sy', 'flag-sz', 'flag-ta', 'flag-tc', 'flag-td', 'flag-tf', 'flag-tg', 'flag-th', 'flag-tj', 'flag-tk', 'flag-tl', 'flag-tm', 'flag-tn', 'flag-to', 'flag-tr', 'flag-tt', 'flag-tv', 'flag-tw', 'flag-tz', 'flag-ua', 'flag-ug', 'flag-um', 'flag-uy', 'flag-uz', 'flag-va', 'flag-vc', 'flag-ve', 'flag-vg', 'flag-vi', 'flag-vn', 'flag-vu', 'flag-wales', 'flag-wf', 'flag-ws', 'flag-xk', 'flag-ye', 'flag-yt', 'flag-za', 'flag-zm', 'flag-zw', 'fr', 'gb', 'it', 'jp', 'kr', 'rainbow-flag', 'ru', 'triangular_flag_on_post', 'us', 'waving_black_flag', 'waving_white_flag']),
		id: 'flags',
		name: 'Flags'
	},
	$author$project$Icons$helperFun($author$project$Icons$flags_path));
var $author$project$Icons$foods_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9')
	]);
var $author$project$Icons$foods = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['grapes', 'melon', 'watermelon', 'tangerine', 'lemon', 'banana', 'pineapple', 'apple', 'green_apple', 'pear', 'peach', 'cherries', 'strawberry', 'kiwifruit', 'tomato', 'coconut', 'avocado', 'eggplant', 'potato', 'carrot', 'corn', 'hot_pepper', 'cucumber', 'broccoli', 'mushroom', 'peanuts', 'chestnut', 'bread', 'croissant', 'baguette_bread', 'pretzel', 'pancakes', 'cheese_wedge', 'meat_on_bone', 'poultry_leg', 'cut_of_meat', 'bacon', 'hamburger', 'fries', 'pizza', 'hotdog', 'sandwich', 'taco', 'burrito', 'stuffed_flatbread', 'egg', 'fried_egg', 'shallow_pan_of_food', 'stew', 'bowl_with_spoon', 'green_salad', 'popcorn', 'canned_food', 'bento', 'rice_cracker', 'rice_ball', 'rice', 'curry', 'ramen', 'spaghetti', 'sweet_potato', 'oden', 'sushi', 'fried_shrimp', 'fish_cake', 'dango', 'dumpling', 'fortune_cookie', 'takeout_box', 'icecream', 'shaved_ice', 'ice_cream', 'doughnut', 'cookie', 'birthday', 'cake', 'pie', 'chocolate_bar', 'candy', 'lollipop', 'custard', 'honey_pot', 'baby_bottle', 'glass_of_milk', 'coffee', 'tea', 'sake', 'champagne', 'wine_glass', 'cocktail', 'tropical_drink', 'beer', 'beers', 'clinking_glasses', 'tumbler_glass', 'cup_with_straw', 'chopsticks', 'knife_fork_plate', 'fork_and_knife', 'spoon', 'hocho', 'amphora']),
		id: 'foods',
		name: 'Food & Drink'
	},
	$author$project$Icons$helperFun($author$project$Icons$foods_path));
var $author$project$Icons$nature_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8'),
		$elm$svg$Svg$Attributes$d('M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235')
	]);
var $author$project$Icons$nature = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['monkey_face', 'monkey', 'gorilla', 'dog', 'dog2', 'poodle', 'wolf', 'fox_face', 'cat', 'cat2', 'lion_face', 'tiger', 'tiger2', 'leopard', 'horse', 'racehorse', 'unicorn_face', 'zebra_face', 'deer', 'cow', 'ox', 'water_buffalo', 'cow2', 'pig', 'pig2', 'boar', 'pig_nose', 'ram', 'sheep', 'goat', 'dromedary_camel', 'camel', 'giraffe_face', 'elephant', 'rhinoceros', 'mouse', 'mouse2', 'rat', 'hamster', 'rabbit', 'rabbit2', 'chipmunk', 'hedgehog', 'bat', 'bear', 'koala', 'panda_face', 'feet', 'turkey', 'chicken', 'rooster', 'hatching_chick', 'baby_chick', 'hatched_chick', 'bird', 'penguin', 'dove_of_peace', 'eagle', 'duck', 'owl', 'frog', 'crocodile', 'turtle', 'lizard', 'snake', 'dragon_face', 'dragon', 'sauropod', 't-rex', 'whale', 'whale2', 'dolphin', 'fish', 'tropical_fish', 'blowfish', 'shark', 'octopus', 'shell', 'crab', 'shrimp', 'squid', 'snail', 'butterfly', 'bug', 'ant', 'bee', 'beetle', 'cricket', 'spider', 'spider_web', 'scorpion', 'bouquet', 'cherry_blossom', 'white_flower', 'rosette', 'rose', 'wilted_flower', 'hibiscus', 'sunflower', 'blossom', 'tulip', 'seedling', 'evergreen_tree', 'deciduous_tree', 'palm_tree', 'cactus', 'ear_of_rice', 'herb', 'shamrock', 'four_leaf_clover', 'maple_leaf', 'fallen_leaf', 'leaves']),
		id: 'nature',
		name: 'Animals & Nature'
	},
	$author$project$Icons$helperFun($author$project$Icons$nature_path));
var $author$project$Icons$objects_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z'),
		$elm$svg$Svg$Attributes$d('M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789')
	]);
var $author$project$Icons$objects = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['mute', 'speaker', 'sound', 'loud_sound', 'loudspeaker', 'mega', 'postal_horn', 'bell', 'no_bell', 'musical_score', 'musical_note', 'notes', 'studio_microphone', 'level_slider', 'control_knobs', 'microphone', 'headphones', 'radio', 'saxophone', 'guitar', 'musical_keyboard', 'trumpet', 'violin', 'drum_with_drumsticks', 'iphone', 'calling', 'phone', 'telephone_receiver', 'pager', 'fax', 'battery', 'electric_plug', 'computer', 'desktop_computer', 'printer', 'keyboard', 'three_button_mouse', 'trackball', 'minidisc', 'floppy_disk', 'cd', 'dvd', 'movie_camera', 'film_frames', 'film_projector', 'clapper', 'tv', 'camera', 'camera_with_flash', 'video_camera', 'vhs', 'mag', 'mag_right', 'microscope', 'telescope', 'satellite_antenna', 'candle', 'bulb', 'flashlight', 'izakaya_lantern', 'notebook_with_decorative_cover', 'closed_book', 'book', 'green_book', 'blue_book', 'orange_book', 'books', 'notebook', 'ledger', 'page_with_curl', 'scroll', 'page_facing_up', 'newspaper', 'rolled_up_newspaper', 'bookmark_tabs', 'bookmark', 'label', 'moneybag', 'yen', 'dollar', 'euro', 'pound', 'money_with_wings', 'credit_card', 'chart', 'currency_exchange', 'heavy_dollar_sign', 'email', 'e-mail', 'incoming_envelope', 'envelope_with_arrow', 'outbox_tray', 'inbox_tray', 'package', 'mailbox', 'mailbox_closed', 'mailbox_with_mail', 'mailbox_with_no_mail', 'postbox', 'ballot_box_with_ballot', 'pencil2', 'black_nib', 'lower_left_fountain_pen', 'lower_left_ballpoint_pen', 'lower_left_paintbrush', 'lower_left_crayon', 'memo', 'briefcase', 'file_folder', 'open_file_folder', 'card_index_dividers', 'date', 'calendar', 'spiral_note_pad', 'spiral_calendar_pad', 'card_index', 'chart_with_upwards_trend', 'chart_with_downwards_trend', 'bar_chart', 'clipboard', 'pushpin', 'round_pushpin', 'paperclip', 'linked_paperclips', 'straight_ruler', 'triangular_ruler', 'scissors', 'card_file_box', 'file_cabinet', 'wastebasket', 'lock', 'unlock', 'lock_with_ink_pen', 'closed_lock_with_key', 'key', 'old_key', 'hammer', 'pick', 'hammer_and_pick', 'hammer_and_wrench', 'dagger_knife', 'crossed_swords', 'gun', 'bow_and_arrow', 'shield', 'wrench', 'nut_and_bolt', 'gear', 'compression', 'alembic', 'scales', 'link', 'chains', 'syringe', 'pill', 'smoking', 'coffin', 'funeral_urn', 'moyai', 'oil_drum', 'crystal_ball', 'shopping_trolley']),
		id: 'objects',
		name: 'Objects'
	},
	$author$project$Icons$helperFun($author$project$Icons$objects_path));
var $author$project$Icons$places_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5'),
		$elm$svg$Svg$Attributes$d('M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z')
	]);
var $author$project$Icons$places = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['earth_africa', 'earth_americas', 'earth_asia', 'globe_with_meridians', 'world_map', 'japan', 'snow_capped_mountain', 'mountain', 'volcano', 'mount_fuji', 'camping', 'beach_with_umbrella', 'desert', 'desert_island', 'national_park', 'stadium', 'classical_building', 'building_construction', 'house_buildings', 'cityscape', 'derelict_house_building', 'house', 'house_with_garden', 'office', 'post_office', 'european_post_office', 'hospital', 'bank', 'hotel', 'love_hotel', 'convenience_store', 'school', 'department_store', 'factory', 'japanese_castle', 'european_castle', 'wedding', 'tokyo_tower', 'statue_of_liberty', 'church', 'mosque', 'synagogue', 'shinto_shrine', 'kaaba', 'fountain', 'tent', 'foggy', 'night_with_stars', 'sunrise_over_mountains', 'sunrise', 'city_sunset', 'city_sunrise', 'bridge_at_night', 'hotsprings', 'milky_way', 'carousel_horse', 'ferris_wheel', 'roller_coaster', 'barber', 'circus_tent', 'performing_arts', 'frame_with_picture', 'art', 'slot_machine', 'steam_locomotive', 'railway_car', 'bullettrain_side', 'bullettrain_front', 'train2', 'metro', 'light_rail', 'station', 'tram', 'monorail', 'mountain_railway', 'train', 'bus', 'oncoming_bus', 'trolleybus', 'minibus', 'ambulance', 'fire_engine', 'police_car', 'oncoming_police_car', 'taxi', 'oncoming_taxi', 'car', 'oncoming_automobile', 'blue_car', 'truck', 'articulated_lorry', 'tractor', 'bike', 'scooter', 'motor_scooter', 'busstop', 'motorway', 'railway_track', 'fuelpump', 'rotating_light', 'traffic_light', 'vertical_traffic_light', 'construction', 'octagonal_sign', 'anchor', 'boat', 'canoe', 'speedboat', 'passenger_ship', 'ferry', 'motor_boat', 'ship', 'airplane', 'small_airplane', 'airplane_departure', 'airplane_arriving', 'seat', 'helicopter', 'suspension_railway', 'mountain_cableway', 'aerial_tramway', 'satellite', 'rocket', 'flying_saucer', 'bellhop_bell', 'door', 'bed', 'couch_and_lamp', 'toilet', 'shower', 'bathtub', 'hourglass', 'hourglass_flowing_sand', 'watch', 'alarm_clock', 'stopwatch', 'timer_clock', 'mantelpiece_clock', 'clock12', 'clock1230', 'clock1', 'clock130', 'clock2', 'clock230', 'clock3', 'clock330', 'clock4', 'clock430', 'clock5', 'clock530', 'clock6', 'clock630', 'clock7', 'clock730', 'clock8', 'clock830', 'clock9', 'clock930', 'clock10', 'clock1030', 'clock11', 'clock1130', 'new_moon', 'waxing_crescent_moon', 'first_quarter_moon', 'moon', 'full_moon', 'waning_gibbous_moon', 'last_quarter_moon', 'waning_crescent_moon', 'crescent_moon', 'new_moon_with_face', 'first_quarter_moon_with_face', 'last_quarter_moon_with_face', 'thermometer', 'sunny', 'full_moon_with_face', 'sun_with_face', 'star', 'star2', 'stars', 'cloud', 'partly_sunny', 'thunder_cloud_and_rain', 'mostly_sunny', 'barely_sunny', 'partly_sunny_rain', 'rain_cloud', 'snow_cloud', 'lightning', 'tornado', 'fog', 'wind_blowing_face', 'cyclone', 'rainbow', 'closed_umbrella', 'umbrella', 'umbrella_with_rain_drops', 'umbrella_on_ground', 'zap', 'snowflake', 'snowman', 'snowman_without_snow', 'comet', 'fire', 'droplet', 'ocean']),
		id: 'places',
		name: 'Travel & Places'
	},
	$author$project$Icons$helperFun($author$project$Icons$places_path));
var $author$project$Icons$symbols_path = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$d('M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76')
	]);
var $author$project$Icons$symbols = _Utils_Tuple2(
	{
		emojis: _List_fromArray(
			['atm', 'put_litter_in_its_place', 'potable_water', 'wheelchair', 'mens', 'womens', 'restroom', 'baby_symbol', 'wc', 'passport_control', 'customs', 'baggage_claim', 'left_luggage', 'warning', 'children_crossing', 'no_entry', 'no_entry_sign', 'no_bicycles', 'no_smoking', 'do_not_litter', 'non-potable_water', 'no_pedestrians', 'no_mobile_phones', 'underage', 'radioactive_sign', 'biohazard_sign', 'arrow_up', 'arrow_upper_right', 'arrow_right', 'arrow_lower_right', 'arrow_down', 'arrow_lower_left', 'arrow_left', 'arrow_upper_left', 'arrow_up_down', 'left_right_arrow', 'leftwards_arrow_with_hook', 'arrow_right_hook', 'arrow_heading_up', 'arrow_heading_down', 'arrows_clockwise', 'arrows_counterclockwise', 'back', 'end', 'on', 'soon', 'top', 'place_of_worship', 'atom_symbol', 'om_symbol', 'star_of_david', 'wheel_of_dharma', 'yin_yang', 'latin_cross', 'orthodox_cross', 'star_and_crescent', 'peace_symbol', 'menorah_with_nine_branches', 'six_pointed_star', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpius', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'ophiuchus', 'twisted_rightwards_arrows', 'repeat', 'repeat_one', 'arrow_forward', 'fast_forward', 'black_right_pointing_double_triangle_with_vertical_bar', 'black_right_pointing_triangle_with_double_vertical_bar', 'arrow_backward', 'rewind', 'black_left_pointing_double_triangle_with_vertical_bar', 'arrow_up_small', 'arrow_double_up', 'arrow_down_small', 'arrow_double_down', 'double_vertical_bar', 'black_square_for_stop', 'black_circle_for_record', 'eject', 'cinema', 'low_brightness', 'high_brightness', 'signal_strength', 'vibration_mode', 'mobile_phone_off', 'recycle', 'fleur_de_lis', 'trident', 'name_badge', 'beginner', 'o', 'white_check_mark', 'ballot_box_with_check', 'heavy_check_mark', 'heavy_multiplication_x', 'x', 'negative_squared_cross_mark', 'heavy_plus_sign', 'heavy_minus_sign', 'heavy_division_sign', 'curly_loop', 'loop', 'part_alternation_mark', 'eight_spoked_asterisk', 'eight_pointed_black_star', 'sparkle', 'bangbang', 'interrobang', 'question', 'grey_question', 'grey_exclamation', 'exclamation', 'wavy_dash', 'copyright', 'registered', 'tm', 'hash', 'keycap_star', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'keycap_ten', '100', 'capital_abcd', 'abcd', '1234', 'symbols', 'abc', 'a', 'ab', 'b', 'cl', 'cool', 'free', 'information_source', 'id', 'm', 'new', 'ng', 'o2', 'ok', 'parking', 'sos', 'up', 'vs', 'koko', 'sa', 'u6708', 'u6709', 'u6307', 'ideograph_advantage', 'u5272', 'u7121', 'u7981', 'accept', 'u7533', 'u5408', 'u7a7a', 'congratulations', 'secret', 'u55b6', 'u6e80', 'black_small_square', 'white_small_square', 'white_medium_square', 'black_medium_square', 'white_medium_small_square', 'black_medium_small_square', 'black_large_square', 'white_large_square', 'large_orange_diamond', 'large_blue_diamond', 'small_orange_diamond', 'small_blue_diamond', 'small_red_triangle', 'small_red_triangle_down', 'diamond_shape_with_a_dot_inside', 'radio_button', 'black_square_button', 'white_square_button', 'white_circle', 'black_circle', 'red_circle', 'large_blue_circle']),
		id: 'symbols',
		name: 'Symbols'
	},
	$author$project$Icons$helperFun($author$project$Icons$symbols_path));
var $author$project$Icons$iconList = _List_fromArray(
	[$author$project$Icons$people, $author$project$Icons$nature, $author$project$Icons$foods, $author$project$Icons$activity, $author$project$Icons$places, $author$project$Icons$objects, $author$project$Icons$symbols, $author$project$Icons$flags]);
var $author$project$Styles$iconPanel = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'flex', '0 0 40px'),
		A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
		A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
		A2($elm$html$Html$Attributes$style, 'padding', '7px 0px 0px 0px'),
		A2($elm$html$Html$Attributes$style, 'border-top-width', '1px'),
		A2($elm$html$Html$Attributes$style, 'border-top-color', 'rgba(0, 0, 0, 0.15)'),
		A2($elm$html$Html$Attributes$style, 'border-top-style', 'solid')
	]);
var $author$project$EmojiPicker$EmojiPicker$view = function (model) {
	var icons = A2(
		$elm$core$List$map,
		$author$project$EmojiPicker$EmojiPicker$displayCategoryIcon(model.activeCategory),
		$author$project$Icons$iconList);
	var emojiVersion = 10;
	var emojis = A4($author$project$EmojiPicker$EmojiPicker$displayCategory, emojiVersion, $author$project$Emojis$emojiDict, model.skinColor, model.activeCategory);
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				A2($author$project$Styles$emojiPicker, model.offsetX, model.offsetY),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						$author$project$Styles$emojisMain,
						_List_fromArray(
							[emojis])),
						A2($elm$html$Html$div, $author$project$Styles$iconPanel, icons)
					]))
			]));
};
var $author$project$PlayingScreen$viewEmojiPicker = function (model) {
	return A2(
		$elm$html$Html$map,
		$author$project$PlayingScreen$EmojiMsg,
		$author$project$EmojiPicker$EmojiPicker$view(model));
};
var $author$project$PlayingScreen$SkipTurn = {$: 'SkipTurn'};
var $mgold$elm_nonempty_list$List$Nonempty$length = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return $elm$core$List$length(xs) + 1;
};
var $author$project$PlayingScreen$viewInfoDisplay = function (game) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('info-display')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						'Turn ' + $elm$core$String$fromInt(
							$mgold$elm_nonempty_list$List$Nonempty$length(game.turns))),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$PlayingScreen$SkipTurn)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Skip')
							]))
					]))
			]));
};
var $author$project$PlayingScreen$viewInviteOtherPlayers = function (link) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('invite-players')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Send your friends this link to invite them to the game:')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('invite-link')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(link)
					]))
			]));
};
var $author$project$PlayingScreen$KickPlayerConfirm = function (a) {
	return {$: 'KickPlayerConfirm', a: a};
};
var $author$project$PlayingScreen$viewKickConfirm = function (player) {
	var _v0 = player.name;
	var playerName = _v0.a;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('kick-confirm')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Do you want to throw ' + (playerName + ' out of the game?'))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$PlayingScreen$KickPlayerConfirm(true))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Yes')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$PlayingScreen$KickPlayerConfirm(false))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('No')
							]))
					]))
			]));
};
var $author$project$PlayingScreen$Submit = {$: 'Submit'};
var $author$project$PlayingScreen$UpdateSubmission = function (a) {
	return {$: 'UpdateSubmission', a: a};
};
var $author$project$PlayingScreen$viewPhrase = function (turn) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('phrase')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(turn.phrase)
			]));
};
var $author$project$PlayingScreen$viewSubmissionForm = F2(
	function (model, submission) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('submission-form-container')
				]),
			_List_fromArray(
				[
					$author$project$PlayingScreen$viewPhrase(
					$author$project$PlayingScreen$currentTurn(model.game)),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('submission-form')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Events$onInput($author$project$PlayingScreen$UpdateSubmission),
									$elm$html$Html$Attributes$placeholder('My Submission'),
									$elm$html$Html$Attributes$value(submission)
								]),
							_List_Nil),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$PlayingScreen$Submit)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Submit')
								]))
						]))
				]));
	});
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $pzp1997$assoc_list$AssocList$values = function (_v0) {
	var alist = _v0.a;
	return A2($elm$core$List$map, $elm$core$Tuple$second, alist);
};
var $author$project$PlayingScreen$viewSubmissions = function (turn) {
	var _v0 = turn.guesser;
	var guesserName = _v0.a;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('submission-list')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(turn.phrase)
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (s) {
						return A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(s)
								]));
					},
					$pzp1997$assoc_list$AssocList$values(turn.submissions))),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Wait for ' + (guesserName + ' to guess.'))
					]))
			]));
};
var $author$project$PlayingScreen$Best = function (a) {
	return {$: 'Best', a: a};
};
var $author$project$PlayingScreen$FinishTurn = function (a) {
	return {$: 'FinishTurn', a: a};
};
var $author$project$PlayingScreen$Nope = {$: 'Nope'};
var $pzp1997$assoc_list$AssocList$toList = function (_v0) {
	var alist = _v0.a;
	return alist;
};
var $author$project$PlayingScreen$viewVotingButtons = function (turn) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('voting-buttons')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (_v0) {
						var k = _v0.a.a;
						var v = _v0.b;
						return A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(
									$author$project$PlayingScreen$FinishTurn(
										$author$project$PlayingScreen$Best(k)))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(v)
								]));
					},
					$pzp1997$assoc_list$AssocList$toList(turn.submissions))),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('vote-nope'),
						$elm$html$Html$Events$onClick(
						$author$project$PlayingScreen$FinishTurn($author$project$PlayingScreen$Nope))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('\uD83E\uDD37')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('vote-help')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Did you get it? Talk to the other players. Then choose who did the best job or click \uD83E\uDD37 if you didn\'t guess it right.')
					]))
			]));
};
var $author$project$PlayingScreen$viewSubmissionsForGuesser = function (turn) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('submission-list')
			]),
		_List_fromArray(
			[
				$author$project$PlayingScreen$viewVotingButtons(turn)
			]));
};
var $author$project$PlayingScreen$viewWaitForSubmissions = function (_v0) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('wait-for-submissions')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('Waiting for the other players')
			]));
};
var $author$project$PlayingScreen$viewMainWindow = function (model) {
	var _v0 = model.phase;
	switch (_v0.$) {
		case 'Invite':
			return $author$project$PlayingScreen$viewInviteOtherPlayers(model.link);
		case 'Wait':
			return $author$project$PlayingScreen$viewWaitForSubmissions(model.game);
		case 'Write':
			var submission = _v0.a;
			return A2($author$project$PlayingScreen$viewSubmissionForm, model, submission);
		case 'Submissions':
			return $author$project$PlayingScreen$viewSubmissions(
				$author$project$PlayingScreen$currentTurn(model.game));
		case 'Guess':
			return $author$project$PlayingScreen$viewSubmissionsForGuesser(
				$author$project$PlayingScreen$currentTurn(model.game));
		default:
			var player = _v0.a;
			return $author$project$PlayingScreen$viewKickConfirm(player);
	}
};
var $author$project$PlayingScreen$KickPlayer = function (a) {
	return {$: 'KickPlayer', a: a};
};
var $author$project$PlayingScreen$isTheGuesser = F2(
	function (game, player) {
		return _Utils_eq(
			$author$project$PlayingScreen$currentTurn(game).guesser,
			player.name);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mgold$elm_nonempty_list$List$Nonempty$tail = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return xs;
};
var $author$project$PlayingScreen$playerGotPointLastTurn = F2(
	function (game, player) {
		var _v0 = $elm$core$List$head(
			$mgold$elm_nonempty_list$List$Nonempty$tail(game.turns));
		if (_v0.$ === 'Nothing') {
			return false;
		} else {
			var turn = _v0.a;
			var _v1 = turn.bestSubmissionPlayerName;
			if (_v1.$ === 'Nothing') {
				return false;
			} else {
				var playerName = _v1.a;
				return _Utils_eq(playerName, player.name);
			}
		}
	});
var $author$project$PlayingScreen$playerHasSubmitted = F2(
	function (game, player) {
		return A2(
			$elm$core$List$member,
			player.name,
			$pzp1997$assoc_list$AssocList$keys(
				$author$project$PlayingScreen$currentTurn(game).submissions));
	});
var $author$project$PlayingScreen$viewPlayer = F2(
	function (model, player) {
		var _v0 = player.name;
		var playerName = _v0.a;
		return A2(
			$elm$html$Html$li,
			_Utils_ap(
				_Utils_eq(player.name, model.credentials.playerName) ? _List_fromArray(
					[
						$elm$html$Html$Attributes$class('player-self')
					]) : _List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$PlayingScreen$KickPlayer(player))
					])),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('player-icon1')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$PlayingScreen$isTheGuesser, model.game, player) ? '🕵️\u200D♂️' : ((!A2($author$project$PlayingScreen$playerHasSubmitted, model.game, player)) ? '⏳' : ''))
						])),
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('player-name')
							]),
						player.active ? _List_Nil : _List_fromArray(
							[
								$elm$html$Html$Attributes$class('inactive')
							])),
					_List_fromArray(
						[
							$elm$html$Html$text(playerName)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('player-icon2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$PlayingScreen$playerGotPointLastTurn, model.game, player) ? '\uD83E\uDD47' : ((!player.active) ? '😴' : ''))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('player-points')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(player.points))
						]))
				]));
	});
var $author$project$PlayingScreen$viewPlayerList = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('player-list')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					$author$project$PlayingScreen$viewPlayer(model),
					model.game.players))
			]));
};
var $author$project$PlayingScreen$viewPlaying = function (model) {
	return A2(
		$elm$html$Html$div,
		_Utils_ap(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('room')
				]),
			function () {
				var _v0 = model.phase;
				if (_v0.$ === 'Write') {
					return _List_fromArray(
						[
							$elm$html$Html$Attributes$class('write-mode')
						]);
				} else {
					return _List_Nil;
				}
			}()),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('left-col')
					]),
				_List_fromArray(
					[
						$author$project$PlayingScreen$viewPlayerList(model),
						$author$project$PlayingScreen$viewInfoDisplay(model.game)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('main-window')
					]),
				_List_fromArray(
					[
						$author$project$PlayingScreen$viewMainWindow(model)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('emoji-picker'),
						A2($elm$html$Html$Attributes$style, 'position', 'relative')
					]),
				_List_fromArray(
					[
						$author$project$PlayingScreen$viewEmojiPicker(model.emojiPicker)
					]))
			]));
};
var $author$project$Emojigame$view = function (model) {
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('container')
					]),
				_List_fromArray(
					[
						function () {
						var _v0 = model.page;
						switch (_v0.$) {
							case 'Disconnected':
								return $author$project$Emojigame$viewDisconnected;
							case 'CreatingScreen':
								var settings = _v0.a;
								var playerName = _v0.b;
								return A2($author$project$Emojigame$viewCreating, settings, playerName);
							case 'Creating':
								var settings = _v0.a;
								var playerName = _v0.b;
								return $author$project$Emojigame$viewLoading;
							case 'JoiningScreen':
								var roomId = _v0.a;
								var playerName = _v0.b;
								return A2($author$project$Emojigame$viewJoining, roomId, playerName);
							case 'Joining':
								var roomId = _v0.a;
								var playerName = _v0.b;
								return $author$project$Emojigame$viewLoading;
							case 'Playing':
								var playingModel = _v0.a;
								return A2(
									$elm$html$Html$map,
									$author$project$Emojigame$PlayingMsg,
									$author$project$PlayingScreen$viewPlaying(playingModel));
							default:
								var msg = _v0.a;
								return A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(msg)
										]));
						}
					}()
					]))
			]),
		title: 'Emojigame'
	};
};
var $author$project$Emojigame$main = $elm$browser$Browser$application(
	{init: $author$project$Emojigame$init, onUrlChange: $author$project$Emojigame$UrlChanged, onUrlRequest: $author$project$Emojigame$UrlRequested, subscriptions: $author$project$Emojigame$subscriptions, update: $author$project$Emojigame$update, view: $author$project$Emojigame$view});
_Platform_export({'Emojigame':{'init':$author$project$Emojigame$main($elm$json$Json$Decode$value)(0)}});}(this));