# Copyright (c) 2024, Precihole Sports Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class TrainingSheetTemplate(Document):
	def before_insert(self):
		default_points = [
			"Gun Drill Machine and its Operation.",
			"Work Head Slide and its importance.",
			"Tool Head Slide and its importance.",
			"Bush box and its importance.",
			"Steady and its importance.",
			"Component clamping arrangement.",
			"Component length variation.",
			"Work head slide over travel alarm & initial proxy settings.",
			"Machine password and its level.",
			"Manual screen & its operation.",
			"Hydraulic System-",
			"Component clamping pressure & system pressure with setting.",
			"Job clamping HIgh & Low pressure selection on screen.",
			"Explaining System Pressure and Clamping Pressure.",
			"Pressure switch setting.",
			"Recipe Screen-",
			"Material and its selection.",
			"Drill diameter Standard chart.",
			"Cutting speed & feed rate.",
			"Coolant flow and selection as per drill size.",
			"Coolant pressure setting minimum & maximum.",
			"Initial position (How calculate & set).",
			"Final position (How calculate & set).",
			"Spindle current limit setting (How observed & set).",
			"Program save function.",
			"Program call & load function",
			"Make new program",
			"Program rename",
			"Auto screen",
			"Spindle selection",
			"Job count & its setting",
			"Component clamping selection High & low",
			"Tool life count & its setting",
			"Machine return & its function",
			"Auto step & its function. (Auto step selection)",
			"Parameter Screen",
			"Slide jog speed",
			"Difference between slide machine return speed & Auto return speed",
			"Slide Front & Rear over travel limit",
			"Spindle RPM in manual mode. (Do not run spindle in dry condition - cause Rotary union gets damage)",
			"HP pump flow section in manual mode. (Coolant actual pressure testing in manual)",
			"Lubrication interval timing",
			"Slide stop distance which is used for Auto step",
			"Slide stop delay which is used for Auto step",
			"Alarm screen & Sensor bypass screen",
			"Fault reset & clear",
			"HP pump pressure switch/Transducer",
			"Job clamp pressure switch",
			"Lubrication oil level switch",
			"Lubrication oil pressure switch",
			"Bag filter pressure switch 1 & its function",
			"Bag filter pressure switch 2 & its function",
			"Tool head spindle VFD",
			"Coolant HP pump VFD",
			"Lubrication system Explain & its importance",
			"Chilling unit & Setting",
			"LP/HP Trip switch explain on chilling unit",
			"Chilling unit cleaning procedure explain",
			"HP pump/ Relief valve",
			"Coolant pressure setting",
			"Coolant oil low and HIgh level alarm explain",
			"Clean tank & settling tank",
			"Filter system and filter bag changing process explain",
			"Tool head/Work head belt changing process explain",
			"Rotary union changing procedure",
			"Explain LP Pump flow/Pressure setting with respect to motor rated current.",
			"Drill Change Procedure",
			"Clamping cone locator selection",
			"Guide bush selection",
			"Explain Whip Guide, Coolant repeller, Locking cap, Drill adjusting stud & its importance",
			"Tool setting gauge explain",
			"Coolant tank cleaning procedure explain",
			"Conveyor cleaning procedure explain",
			"VFD parameter explain",
			"Electric panel explain",
			"Critical spare part list explain."
			
			
			

		]

		for p in default_points: 
			self.append("test", { 
				"point": p # field inside child table 'Test' 
			})
