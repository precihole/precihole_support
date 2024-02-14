// Copyright (c) 2024, Precihole Sports Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on("Training Sheet", {
    from_template: function(frm){
		if (frm.doc.from_template){
			frappe.db.get_doc("Training Sheet Template", frm.doc.from_template)
				.then((doc) => {
					frappe.model.clear_table(frm.doc, "trainings");
					update_jv_details(frm.doc, doc.test);
				});
		}
	}
    
});
var update_jv_details = function(doc, r) {
	$.each(r, function(i, d) {
		var row = frappe.model.add_child(doc, "Training Sheet Item", "trainings");
		frappe.model.set_value(row.doctype, row.name, "point", d.point)
	});
	refresh_field("trainings");
}
