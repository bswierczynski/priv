Priv
====

Safely store private data with WeakMaps while using prototypal inheritance.


Usage
-----

	// Declaring your 'class' with private data using Priv:
	(function(global, priv) {

		function Box(contents) {
			priv(this).myHiddenData = contents;
		}

		Box.prototype.get = function() {
			return priv(this).myHiddenData;
		};

		global.Box = Box;

	})(this, Priv());

	// Using your 'class':
	var b1 = new Box("foo");
	var b2 = new Box("bar");

	[b1.hidden, b1.get(), b2.get()]; // undefined, "foo", "bar"


Source
------

	function Priv() {
		var privateInstances = new WeakMap();
		return function priv(ownerObj) {
			if (!privateInstances.has(ownerObj)) {
				privateInstances.set(ownerObj, {});
			}
			return privateInstances.get(ownerObj);
		};
	}


Why it works?
-------------

Your 'class' has its own instance of Priv. It's safely encapsulated by a closure,
so other code has no access to it.

For each instance of your 'class', an entry is stored in an encapsulated WeakMap.
This entry holds the object containing all private data for this particular instance.
