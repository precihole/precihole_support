// Copyright (c) 2024, Precihole Sports Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on("Commissioning", {
	before_save(frm) {
        const work_done = [
            'Machine foundation done according to PMT drawing. If required',
            'Install of machine as per layout',
            'Machine leveling',
            'Check electric input as per machine name plate',
            'Check all motor direction',
            'Oil filling as recommended by PMT',
            'Drill Re-Grinding machine installation',
            'Re-Grinding machine Manual',
            'Machine Manual'
        ];
        if (!frm.doc.work_done || frm.doc.work_done.length === 0){
            work_done.forEach(function(task) {
                var child = frm.add_child("work_done");
                child.task = task;
            });
        }
        frm.refresh_field("work_done");
	},
});
