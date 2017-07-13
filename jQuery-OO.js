/**  
 * @author: xaofeixa  
 * @date: 2009-02-18  
 * @purpse: oop.core  
 */ 
$.showMessage = function(message) {
	alert(message);
}
/**
 * 創建命名空間和類
 */
$.Class = function(name, prototype) {
	// 命名空間
	var parentPakege = window;
	var nameSpace;
	var className = "";
	var createNameSpace = function(str) {
		parentPakege[str] = parentPakege[str] || {};
		nameSpace = parentPakege[str];
		parentPakege = nameSpace;
	};
	var namespaces = name.split(".");
	$.each(namespaces, function(i, str) {
				if (i == (namespaces.length - 1)) {
					className = str;
				} else {
					createNameSpace(str);
				}
			});
	nameSpace[className] = function(options) {
		this.options = $.extend({}, $.Class.defaults,
				nameSpace[className].defaults, options);
		this.instance();
	};
	// 繼承Class類基本屬性
	$.extend(nameSpace[className].prototype, $.Class.prototype);
	// 實現介面
	if (prototype.Implements) {
		$.each(prototype.Implements, function(i, inter) {
					$.Implements(nameSpace[className], inter);
				});
	}
	// 繼承基類
	if (prototype.Extends) {
		$.each(prototype.Extends, function(i, sub) {
					$.Extends(nameSpace[className], sub);
				});
	}
	// 本身屬性及實現
	$.extend(nameSpace[className].prototype, prototype);
};

$.Class.prototype = {
	Extends : [],
	Implements : [],
	instance : function() {

	},
	destroy : function() {

	},
	// 是否實現某些介面
	isImp : function() {
		var checkResult = true;
		var object = this;
		if (!object && typeof(object) != 'function') {
			return false;
		}
		$.each(arguments, function(i, interFace) {
					var result = $.grep(object.Implements, function(inter, i) {
								return inter = interFace;
							});
					if (result.length <= 0) {
						checkResult = false;
						return;
					}
				});
		return checkResult;
	},
	// 是否擴展自某些基類
	isExt : function() {
		var checkResult = true;
		var object = this;
		if (!object && typeof(object) != 'function') {
			return false;
		}
		$.each(arguments, function(i, supperClass) {
					var result = $.grep(object.Extends, function(sup, i) {
								return sup = supperClass;
							});
					if (result.length <= 0) {
						checkResult = false;
						return;
					}
				});
		return checkResult;
	}
};
$.Class.defaults = {
	enabled : true
};
/**
 * 介面
 */
$.Interface = function(name, prototype) {
	// 命名空間
	var parentPakege = window;
	var nameSpace;
	var interfaceName = "";
	var createNameSpace = function(str) {
		parentPakege[str] = parentPakege[str] || {};
		nameSpace = parentPakege[str];
		parentPakege = nameSpace;
	};
	var namespaces = name.split(".");
	$.each(namespaces, function(i, str) {
				if (i == (namespaces.length - 1)) {
					interfaceName = str;
				} else {
					createNameSpace(str);
				}
			});
	nameSpace[interfaceName] = function(options) {
		this.options = $.extend({}, $.Interface.defaults,
				nameSpace[interfaceName].defaults, options);
		this.instance();
		return null;
	};
	// 繼承Interface類基本屬性
	nameSpace[interfaceName].prototype = $.extend({}, $.Interface.prototype);
	// 繼承其他介面
	if (prototype.Extends) {
		$.each(prototype.Extends, function(i, subInterface) {
					$.Extends(nameSpace[interfaceName], subInterface);
				});
	}
	// 本身屬性及實現
	$.extend(nameSpace[interfaceName].prototype, prototype);
	// 介面方法
	if (prototype.Methods) {
		$.each(prototype.Methods, function(i, method) {
					nameSpace[interfaceName].prototype[method] = function() {
						$.showMessage("This is a interface method!");
					}
				});
	}

}
$.Interface.prototype = {
	Extends : [],
	Methords : [],
	instance : function() {
		$.showMessage("This is a interface!Can not instance!");
	},
	destroy : function() {

	}
}
$.Interface.defaults = {
	enabled : true
};
/**
 * 繼承基類屬性
 */
$.Extends = function(Class) {
	if (!Class && typeof(Class) != 'function') {
		return;
	}
	$.each(arguments, function(i) {
				if (i > 0) {
					$.extend(Class.prototype, this.prototype);
					Class.prototype.Extends.push(this);
				}
			});
}
/**
 * 實現介面屬性
 */
$.Implements = function(Class) {
	if (!Class && typeof(Class) != 'function') {
		return;
	}
	$.each(arguments, function(i) {
				if (i > 0) {
					Class.prototype.Implements.push(this);
					$.extend(Class.prototype, this.prototype);
				}
			});
}



               // class
	$.Class("xaofeixa.net.Test", {
				Extends : [],
				Implements : [],
				instance : function() {
					alert("wwww");
				},
				kkk : function() {
					alert("this is a supper method!");
				}
			});
	var test = new xaofeixa.net.Test();
	alert(test.isExt(xaofeixa.net.Test));
	alert(test.isImp(xaofeixa.Interface));
	// interface
	$.Interface("xaofeixa.Interface", {
				Extends : [],
				Implements : [],
				Methods : ['mehod1', 'method2']
			});
	// extends
	$.Class("xaofeixa.Test2", {
				Extends : [xaofeixa.net.Test],
				Implements : [xaofeixa.Interface],
				instance : function() {
					alert("sub class");
				}
			})
	var test2 = new xaofeixa.Test2();
	alert(test2.isExt(xaofeixa.net.Test));
	test2.kkk();
	test2.mehod1();
	alert(test2.isImp(xaofeixa.Interface));