sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function (JSONModel, Device) {
		"use strict";

		return {

			createDeviceModel : function () {
				var oModel = new JSONModel(Device);
				// we don't want to modify the device info
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			}


		};

	}
);