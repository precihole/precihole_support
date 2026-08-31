frappe.ready(function() {

    let is_processing = false;

    frappe.web_form.on('machine_no', (field, value) => {

        if (!value || is_processing) return;

        is_processing = true;

        frappe.call({
            method: "frappe.client.get_value",
            args: {
                doctype: "Commissioning",
                filters: {
                    machine_no: value
                },
                fieldname: [
                    "name",
                    "customer",
                    "location"
                ]
            },

            callback: function(r) {

                try {

                    if (r.message) {

                        let commissioning = r.message;

                        console.log(r.message);

                        // Auto-fill parent fields
                        frappe.web_form.set_value(
                            "customer",
                            commissioning.customer || ""
                        );

                        frappe.web_form.set_value(
                            "location",
                            commissioning.location || ""
                        );

                        if (commissioning.name) {
                            frappe.web_form.set_value(
                                "commissioning",
                                commissioning.name
                            );
                        }


                        // -----------------------------
                        // Populate Parameters
                        // -----------------------------

                        frappe.web_form.doc.parameters = [];

                        let parameter_list = [
                            "Are you satisfied with the service engineer's know how?",
                            "Are you satisfied with the training's conduct?",
                            "Are you satisfied with the overall commissioning process?"
                        ];

                        parameter_list.forEach(function(p) {

                            frappe.web_form.doc.parameters.push({
                                parameter: p
                            });

                        });


                        // -----------------------------
                        // Refresh ONLY Parameters Grid
                        // -----------------------------

                        let parameter_field =
                            frappe.web_form.get_field("parameters");

                        if (
                            parameter_field &&
                            parameter_field.grid
                        ) {

                            parameter_field.grid.refresh();

                        } else {

                            console.error(
                                "Parameters grid not found"
                            );

                        }

                    } else {

                        console.log(
                            "No Commissioning record found:",
                            value
                        );

                    }

                } catch (e) {

                    console.error(
                        "Error:",
                        e
                    );

                } finally {

                    is_processing = false;

                }

            },

            error: function(err) {

                is_processing = false;

                console.error(err);

            }

        });

    });

});