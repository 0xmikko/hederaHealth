Smart contracts architecture:

## contract Goverment
Goverment is a smartcontract which owns by goverment and do following:
- Deploy Startegies
- Register cases
- Provide statisctics
- Approve selected 

### Data structure:
	# mapping Strategy Providers
	# mapping Cases
	# mapping Doctors

### Modifiers
onlyGoverment
onlyStrategyHolder
onlyDoctor

### Methods
	# addStrategyProvider(address) onlyGoverment
	# addDoctor(address) onlyGoverment
	# registerCase(address Patient) onlyDoctor



## contract Strategy (ERC-721)
Provides strategy and store data about it execution
Strategy contains Actions

### Data:

Struct Action
	# medical_treatment_address
	# status (planned, cancelled, done)
	# date_planned
	# date_executed
	# qty (for further)
	# hash#owner#contract
	# treatment_qr_code (for further dev)

Struct MedicalData
	# date (now in solidty during creation)
	# measurement_type
	# raw_data


### modifiers
onlyRegistredCases - for Registered 
onlyGoverement - for Govetment only

### Methods

submitAction(actionHash) onlyRegistredCases
closeCase() onlyRegisteredCases



## contract Case

### Data:

	# **address doctor** (doctor's id)
	# **address patient** (patient's id)
	# **uint care_type** (type of provided care)
	# **address strategy** (contract which contains strategy)


### Modifiers:

onlyDoctor - for methods allowed for doctor only
onlyPatient - for methods allowed for patient only
onlyPatientOrDoctor

### Methods:

constructor (address doctor, address patient)
setUpStrategy(address Strategy) onlyDoctor
submitAction(int64 hash) onlyPatient
addMedicalData() onlyPatientOrDoctor