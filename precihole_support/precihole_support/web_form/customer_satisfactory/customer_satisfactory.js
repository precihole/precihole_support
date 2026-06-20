frappe.ready(function() {
    frappe.web_form.on('machine_no',  (field, value) => {
        if (value) {
            frappe.call({
                method: "frappe.client.get_value",
                args: {
                    doctype: "Commissioning",   // your DocType
                    filters: { machine_no: value },  // filter by machine_no field
                    fieldname: ["name", "customer", "location"]
                },
                callback: function(r) {
                    if (r.message) {
                        let commissioning = r.message;
                        console.log(r.message);

                        // Auto-fill parent fields properlygit 
                        frappe.web_form.set_value("customer", commissioning.customer);
                        frappe.web_form.set_value("location", commissioning.location);

                        // Set commissioning name (doc name)
                        if (commissioning.name) {
                            frappe.web_form.set_value("commissioning", commissioning.name);
                        }

                        // --- Populate Parameters Child Table ---
                        // Always clear existing rows to avoid duplication
                        frappe.web_form.doc.parameters = [];

                        let parameter_list = [
                            "Are you satisfied with the service engineer's know how?",
                            "Are you satisfied with the training's conduct?",
                            "Are you satisfied with the overall commissioning process?",
                        ];

                        parameter_list.forEach(p => {
                            frappe.web_form.doc.parameters.push({ parameter: p });
                        });

                        // Force UI refresh so rows appear immediately
                        if (typeof frappe.web_form.refresh === "function") {
                            frappe.web_form.refresh();
                        } else {
                            frappe.web_form.render();
                        }
                    } else {
                        console.log("No Commissioning record found for machine_no:", value);
                    }
                }
            });
        }
    });
});