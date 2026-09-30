frappe.ready(function () {

    if (!frappe.web_form) {
        return;
    }

    // =====================================================
    // MACHINE NO LINK FILTER
    // Field Type: Link
    // Options: Project
    // =====================================================

    const machine_field = frappe.web_form.get_field("machine_no");

    if (machine_field) {
        machine_field.get_query = function () {
            return {
                filters: [
                    ["Project", "status", "=", "Open"],
                    [
                        "Project",
                        "custom_business_property",
                        "in",
                        [
                            "Machines - Local",
                            "Machines - Export"
                        ]
                    ]
                ]
            };
        };
    }


    let is_processing = false;


    // =====================================================
    // MACHINE NO CHANGE
    // =====================================================

    frappe.web_form.on("machine_no", function (field, value) {

        if (!value || is_processing) {
            return;
        }

        is_processing = true;

        frappe.call({
            method: "frappe.client.get_list",

            args: {
                doctype: "Commissioning",

                filters: {
                    machine_no: value
                },

                fields: [
                    "name",
                    "machine_no",
                    "customer",
                    "location"
                ],

                limit_page_length: 1
            },

            callback: function (r) {

                try {

                    if (
                        !r.message ||
                        !Array.isArray(r.message) ||
                        r.message.length === 0
                    ) {
                        return;
                    }

                    const commissioning = r.message[0];


                    // =====================================
                    // AUTO FILL COMMISSIONING DETAILS
                    // =====================================

                    frappe.web_form.set_value(
                        "commissioning",
                        commissioning.name || ""
                    );

                    frappe.web_form.set_value(
                        "customer",
                        commissioning.customer || ""
                    );

                    frappe.web_form.set_value(
                        "location",
                        commissioning.location || ""
                    );


                    // =====================================
                    // POPULATE PARAMETERS
                    // =====================================

                    frappe.web_form.doc.parameters = [];

                    const parameter_list = [
                        "Are you satisfied with the service engineer's know how?",
                        "Are you satisfied with the training's conduct?",
                        "Are you satisfied with the overall commissioning process?"
                    ];

                    parameter_list.forEach(function (parameter) {

                        frappe.web_form.doc.parameters.push({
                            parameter: parameter
                        });

                    });


                    // =====================================
                    // REFRESH ONLY PARAMETERS GRID
                    // =====================================

                    const parameter_field =
                        frappe.web_form.get_field("parameters");

                    if (
                        parameter_field &&
                        parameter_field.grid
                    ) {
                        parameter_field.grid.refresh();
                    }

                } finally {

                    is_processing = false;

                }

            },

            error: function () {
                is_processing = false;
            }

        });

    });


    // =====================================================
    // VALIDATION
    // =====================================================

    frappe.web_form.validate = async function () {

        const machine_no =
            frappe.web_form.get_value("machine_no");

        if (!machine_no) {
            return true;
        }

        const result = await frappe.call({
            method: "frappe.client.get_list",

            args: {
                doctype: "Commissioning",

                filters: {
                    machine_no: machine_no
                },

                fields: [
                    "name"
                ],

                limit_page_length: 1
            }
        });

        if (
            !result.message ||
            !Array.isArray(result.message) ||
            result.message.length === 0
        ) {

            frappe.throw(
                `No Commissioning record found for machine ${machine_no}. Cannot save.`
            );

            return false;
        }

        return true;

    };

});