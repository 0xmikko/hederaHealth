// Importing Open Zeppelin test helpers
import 'babel-polyfill';

import { ether } from 'openzeppelin-solidity/test/helpers/ether';
import { advanceBlock } from 'openzeppelin-solidity/test/helpers/advanceToBlock';
import { increaseTimeTo, duration } from 'openzeppelin-solidity/test/helpers/increaseTime';
import { latestTime } from 'openzeppelin-solidity/test/helpers/latestTime';
import { expectThrow } from 'openzeppelin-solidity/test/helpers/expectThrow';
import * as expectEvent from 'openzeppelin-solidity/test/helpers/expectEvent';

import { EVMRevert } from 'openzeppelin-solidity/test/helpers/EVMRevert';
import { assertRevert } from 'openzeppelin-solidity/test/helpers/assertRevert';
import { ethGetBalance, ethGetBlock } from 'openzeppelin-solidity/test/helpers/web3';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()


// Main Contracts
const GovernmentContractABI = artifacts.require('Government');

// Setting accounts as array with receiving function
// ts means tokenstarter

contract('Government', ([ govAccount, strategyAccount, doctorAccount, patientAccount]) => {

    let govContract;

    before(async () => {

        // Waiting for next block
        await advanceBlock();

        // Deploy Government Contract
        govContract =  await GovernmentContractABI.new({from: govAccount});

    });

    it ('Testing permission to add strategy', async () =>{

        await expectThrow(
            govContract.deployNewStrategy("StrategyProvider#1", {from: doctorAccount}),
             EVMRevert
        );
    });

    it ('Adding new strategy provider', async () =>{
        await expectEvent.inTransaction(
            govContract.deployNewStrategy("StrategyProvider#1", {from: govAccount}),
            'StrategyProviderAdded'
        );

    });

    it ('Checking quantity of deployed strategies', async () =>{
        // Checking quantity of Strategy Providers
        // Should be 1

        let strategiesQty = await govContract.getStrategyProviderQty();
        assert.equal(strategiesQty, 1, "Strategies Qty should be 1!");
    });


    it ('Testing permission to add doctor', async () =>{

        await expectThrow(
            govContract.addDoctor(doctorAccount, {from: doctorAccount}),
             EVMRevert
        );
    });

    it ('Testing permission to add new case', async () =>{
        await expectEvent.inTransaction(
            govContract.addDoctor(doctorAccount, {from: govAccount}),
            'DoctorAdded'
        );

    });

    it ('Testing permission to setup Case', async () =>{

        await expectThrow(
            govContract.setupCase(patientAccount, {from: patientAccount}),
             EVMRevert
        );
    });

    it ('Adding new case', async () =>{
        await expectEvent.inTransaction(
            govContract.setupCase(patientAccount, {from: doctorAccount}),
            'CaseAdded'
        );

    });

    /*it ('setSalesAgent: Checking setSalesAgent for onlyOwner permission', async () =>{
        // Try to setAdmin from startup account
        // Expected: throw cause tsAdminAccount has no permission to setSalesAgent
        await expectThrow(
            optionTokenContract.setSalesAgent(tsAdminAccount, {from: tsAdminAccount}),
            EVMRevert,
            );
    });

    it('setSalesAgent: Setting tsAdmin as Sales Agent', async () => {
        // Trying to setSalesAgent
        // Expected: SetSalesAgent event
        await expectEvent.inTransaction(
            optionTokenContract.setSalesAgent(tsAdminAccount, {from: tsAccount}),
            'SetSalesAgent'
        );
        // Checking that tsAdmin account is set as Sales Agent
        assert.equal(await optionTokenContract.salesAgent.call(), tsAdminAccount);
    });

    it('mint: Minting OptionTokens for investor', async () => {
        // Minting 500 tokens from startupAccount (has no permission) to investor
        // Expected: Throw
        await expectThrow(
            optionTokenContract.mint (investorAccount, 500, {from: startupAccount}),
            EVMRevert
        );

        // Minting 500 tokens from tsAccount (owner) to investor
        // Expected: Mint event
        await expectEvent.inTransaction(
            optionTokenContract.mint (investorAccount, 500, {from: tsAccount}),
            'Mint'
        );

        // Minting 500 tokens from tsAdmin (admin) to investor
        // Expected: Mint event
        await expectEvent.inTransaction(
            optionTokenContract.mint (investorAccount, 500, {from: tsAccount}),
            'Mint'
        );

        // Checking investorAccount balance
        // Expected 1000 = 500 + 500
        const balance = await optionTokenContract.balanceOf(investorAccount,  {from: investorAccount});
        assert.equal(balance, 1000);
    });

    it('fallbackFunction: Executing OptionTokenContract by investor', async () => {
        await expectEvent.inTransaction(
            optionTokenContract.sendTransaction({from: investorAccount, value: investorAmountToExecute}),
            'Execution'
        );

        (await tokenContract.balanceOf(investorAccount,  {from: investorAccount}))
            .should.be.bignumber.equal(investorAmountToExecute.mul(strikePriceRate));
    });

    it('withdraw: sending collected money to startup', async () => {
        const startupBalanceBefore = await ethGetBalance(startupAccount);

        const result = await optionTokenContract.withdraw({from: startupAccount});

        let tx = await web3.eth.getTransaction(result.tx);

        const gasUsed = result.receipt.gasUsed;
        const gasCost = tx.gasPrice.mul(gasUsed);

        const startupBalanceAfter = await ethGetBalance(startupAccount);

        (await (startupBalanceBefore.minus(startupBalanceAfter).plus(investorAmountToExecute)))
            .should.be.bignumber.equal(gasCost);

    });

    it('fallbackFunction: Executing options after expiration date', async () => {
        await increaseTimeTo(expiredAt + duration.days(1));
        await expectThrow(
            optionTokenContract.sendTransaction({from: investorAccount, value: investorAmountToExecute}),
            EVMRevert,
            );

    });*/
});