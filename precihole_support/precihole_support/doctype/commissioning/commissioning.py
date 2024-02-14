# Copyright (c) 2024, Precihole Sports Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Commissioning(Document):
	def before_submit(self):
		for task in self.work_done:
			if not task.out_comes:
				frappe.throw('Out comes is mandatory')
