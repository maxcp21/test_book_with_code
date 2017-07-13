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