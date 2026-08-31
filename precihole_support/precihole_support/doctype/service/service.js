// Copyright (c) 2025, Precihole Sports Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on("Service", {
    machine_no: function(frm) {
        if (!frm.doc.machine_no) return;

        frappe.db.get_value(
            "Commissioning",
            {
                machine_no: frm.doc.machine_no,
                docstatus: 1
            },
            [
                "name",
                "customer",
                "location",
                "machine_no",
                "machine_type",
                "posting_date",
                "warranty_start_date",
                "warranty_end_date"
            ]
        ).then(r => {

            if (!r.message) {
                frappe.msgprint("No submitted Commissioning record found for this Machine No.");
                return;
            }

            let data = r.message;

            frm.set_value("commissioning_no", data.name || "");
            frm.set_value("customer", data.customer || "");
            frm.set_value("location", data.location || "");
            frm.set_value("machine_type", data.machine_type || "");

            frm.set_value(
                "warranty_start_date",
                data.warranty_start_date || ""
            );

            frm.set_value(
                "warranty_end_date",
                data.warranty_end_date || ""
            );

            frm.set_value(
                "dispatch_date",
                data.posting_date || ""
            );

            frm.set_value(
                "commissioning_date",
                data.warranty_start_date || ""
            );

            // -----------------------------------
            // SERVICE TYPE BASED ON WARRANTY
            // -----------------------------------

            let today = frappe.datetime.get_today();

                let warranty_start = data.warranty_start_date;
                let warranty_end = data.warranty_end_date;

                let service_required = "";

                if (warranty_start && warranty_end) {

                    if (
                        today >= warranty_start &&
                        today <= warranty_end
                    ) {
                        service_required = "Under Warranty";
                    }

                    else if (today > warranty_end) {
                        service_required = "Out of Warranty";
                    }
                }

                frm.set_value("service_required", service_required);
                    });  
                }       
     });
