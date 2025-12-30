# Copyright (c) 2025, Precihole Sports Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document



class ServiceFeedbackForm(Document):
	def before_save(self):
			if self.service_no:
				visit_items = frappe.get_all(
					"Service Visit Item",
					filters={"parent": self.service_no},
					fields=["engineer"],   # adjust if field is actually 'service_engineer'
					limit=1
				)

				if visit_items:
					self.service_engineer = visit_items[0].get("engineer") or ""



	def validate(self):
		if self.machine_no:
			service_records = frappe.get_all(
				"Service",
				filters={"machine_no": self.machine_no, "docstatus": 1},
				limit=1
			)
			if not service_records:
				frappe.throw(f"No submitted record found for machine {self.machine_no}. Cannot save.")

	