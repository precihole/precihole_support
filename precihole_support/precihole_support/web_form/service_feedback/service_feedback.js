frappe.ready(function() {
	frappe.web_form.on('machine_no', (field, value) => {
		if (value){
			frappe.call({
				method:"frappe.client.get_value",
				args: {
					doctype: "Service",
					filters: { machine_no: value },
					fieldname: ["name", "customer", "location"]

				},
				callback: function(r) {
					if (r.message) {
						let service = r.message;
						console.log(r.message);

						// Auto Fill parent fields
						frappe.web_form.set_value("customer", service.customer);
						frappe.web_form.set_value("location", service.location);
						
						// Set commissioning name (doc name)
						if (service.name) {
							frappe.web_form.set_value("service_no", service.name);
						}

						//  --Populate Parameters Child Table --
						frappe.web_form.doc.parameters = [];

						let parameter_list = [ 
							"Rate the service engineers understanding of problems and problem solving.",
							"Rate the responsiveness of the Precihole support team.",
							"The support team recognised the issue and was able to take neccessary action."
						];

						parameter_list.forEach(p => {
							frappe.web_form.doc.parameters.push({ parameter: p });
						});

						if(typeof frappe.web_form.refresh === "function") {
							frappe.web_form.refresh();
						} else {
							frappe.web_form.render();
						}	
					} else {
						console.log("No Service record found for machine_no:", value);
					}
					
				}
			});
		}
	});

	frappe.web_form.validate = async function() {
		let machine_no =  frappe.web_form.get_value('machine_no');

		if (machine_no) {
			let result = await frappe.call({
				method:"frappe.client.get_value",
				args: {
					doctype : "Service",
					filters: { machine_no: machine_no },
					fieldname: "name"
				}
			});

			if (!result.message) {
				frappe.throw(`No Service record found for machine ${machine_no}. Cannot save.`)
			}
		}
	};
});	