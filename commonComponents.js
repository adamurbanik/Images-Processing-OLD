var commonComponents = (function() {

	var myConfig;

	return {
		getConfig : function() {
			return myConfig;
		},
		setConfig : function (config) {
			myConfig = config;
		},
		/* Function overwrites given obj1 with values of obj2 as long as the property is the same */
		overwrite : function(obj1, obj2) {
			for (var prop in obj1) {
				if (obj2.hasOwnProperty(prop)) {
					obj1[prop] = obj2[prop];
				}
			}
			return obj1;
		}
	}

}());