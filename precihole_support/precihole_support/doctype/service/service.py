# Copyright (c) 2025, Precihole Sports Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Service(Document):
	
	def validate(self):
        # Run commissioning fetch logic before saving
		self.set_commissioning_details()

	def set_commissioning_details(self):
		if self.machine_no:
				commissioning = frappe.get_all(
					"Commissioning",
					filters={"machine_no": self.machine_no, "docstatus": 1},  # only submitted records
					fields=[
						"name",
						"customer",
						"location",
						"machine_no",
						"machine_type",
						"posting_date",
						"warranty_start_date",
						"warranty_end_date"
					]
				)

				if commissioning:
					data = commissioning[0]
					# link back to commissioning record
					self.commissioning_no = data.name
					self.customer = data.customer
					self.location = data.location
					self.machine_no = data.machine_no
					self.machine_type = data.machine_type

					self.warranty_start_date = data.warranty_start_date
					self.warranty_end_date = data.warranty_end_date
					self.dispatch_date = data.posting_date
					self.commissioning_date = data.warranty_start_date
				
