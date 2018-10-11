# hederaHealth

## Goal
Provide new level of Digital Medical care using Hedera Hashgraph Teachnology & Machine Learning.

## Customer journey

1. Customer comes to Doctor with his challenge (loose weight for example)
2. Doctors' provide some diagnostic to get the data about client.
3. Doctors' start a CASE and store data in Hedera Hashgraph
4. Using machine learnign algoritms app found some "Strategies" (combining different types of medical treatments) for client and show forecast for usgin these strategies also.
5. Doctor & patitent together discuss the best option and subscribe for selected strategy.
6. Client recevies recommendations & notifications using mobile app. S/he provide feedback for each action was done (like training, taking each pill, provide specific treatment)
7. All these data stores in NoSQL database (we use smartcontract for this pruposes)
8. Next visit to doctors' they make all measures and they stores in SmartContract also.
9. When goal was achieved, doctors closes the case, and the data would be used for training ML models for better Digital Healthcare
10. As result Hedera Hashgraph becomes the most signifocant data provider for digital healthcare.

## Why we need blockchain for this solution?
- It creates transparent database which stores effictivness of different pharma providers.
- Collecting huge amount of immutable anonymised medical data provides great opportunity for Digital Healthcare and could disrupt medical services

## Whey we choose Hedera hashgraph?
- Hedera Hashgraph provides low-cost data immutable storage for this data
- Smartcopntracts and tokens help pharma companies to add doctors and patients into one supply chain and shift their mindset from pill production to providing digital healthcare services
- It creates real balance between different stakeholders (like big pharma companies, clinics and pationes)
- Storing 

## Components

- Doctor web app
- Patient web app
- Hedera Hashgraph smartcontracts
- DS_Helper - a tool which simplified using blockchain data in Jupiter notebooks for taking insights

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
