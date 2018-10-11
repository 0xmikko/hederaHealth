# hederaHealth

Smart contracts architecture:

## contract MedicalCase

Data:
**address doctor** (doctor's id)

**address patient** (patient's id)

**uint care_type** (type of provided care)

**address strategy** (contract which contains strategy)


Modifiers:

onlyDoctor - for methods allowed for doctor only
onlyPatient - for methods allowed for patient only

Methods:

** constructor (address doctor, address patient, address strategy)
** add_medical_care(
