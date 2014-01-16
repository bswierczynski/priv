function Priv() {
	var privateInstanceData = new WeakMap();
	return function priv(ownerObj) {
		if (!privateInstanceData.has(ownerObj)) {
			privateInstanceData.set(ownerObj, {});
		}
		return privateInstanceData.get(ownerObj);
	};
}
