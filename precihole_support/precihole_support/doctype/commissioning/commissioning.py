# Copyright (c) 2024, Precihole Sports Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import formatdate
from frappe.utils import add_years, add_days


class Commissioning(Document):

    def before_submit(self):
        for task in self.work_done:
            if not task.out_comes:
                frappe.throw("Out comes is mandatory")

        docstatus = frappe.db.get_value(
            "Training Sheet",
            {"commissioning": self.name},
            "docstatus"
        )

        if docstatus is None:
            frappe.throw("No training sheet found")

        if docstatus != 1:
            frappe.throw("Either Training Sheet is in Draft or Cancelled")

        if not self.warranty_start_date:
            frappe.throw("Warranty Start Date is required")

        self.remark = (
            "The above mentioned machine has been commissioned satisfactorily on "
            + formatdate(self.warranty_start_date, "dd-MM-yyyy")
            + " and handed over to Production Department"
        )

    def validate(self):
        if self.warranty_start_date:
            self.warranty_end_date = add_days(
                add_years(self.warranty_start_date, 1),
                -1
            )