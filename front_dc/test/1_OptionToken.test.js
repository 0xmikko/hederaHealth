// Importing Open Zeppelin test helpers
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


// Contracts for testing purposes only
const TokenExampleMintable = artifacts.require('TokenExampleMintable');
const TokenExampleBurnable = artifacts.require('TokenExampleBurnable');

// Main Contracts
const OptionToken = artifacts.require('OptionToken');

// Setting accounts as array with receiving function
// ts means tokenstarter

contract('OptionToken', ([ tsAccount, tsAdminAccount, startupAccount, investorAccount]) => {

    let tokenContract, tokenContractMintable, optionTokenContract;
    const investorAmountToExecute = new BigNumber(50);
    const premiumRate = new BigNumber(10);
    const strikePriceRate =  new BigNumber(10);
    let now, expiredAt;

    before(async () => {

        // Testing parameters

        now = (await latestTime());
        console.log('Now', now)
        expiredAt = now + duration.weeks(2);

        // Deploying contracts for testing
        tokenContract =  await TokenExampleBurnable.new(
            "TokenExampleBurnable",
            "TEB",
            18,
            100000,
            {from: startupAccount});

        optionTokenContract = await OptionToken.new(
            'OptionTokenStandard',  // Name
            'OTS',                  // Symbol
            18,                     // Decimals
            strikePriceRate,        // strike price
            expiredAt,              // expiration date / time
            tokenContract.address,  // tokenContract address
            startupAccount,         // tokenWallet account (a person who could allow to approve funds)
            false,                  // Non-mintable contract
            startupAccount,         // beneficiary for collected funds
            {from: tsAccount}
            );

    });

    it ('Approving 10,000 tokens for OptionTokenContract', async () =>{
        const expectedTokenAmount  = 10000;

        // Aoorove 10,000 tokens to OptionTokenContract
        // Expected: Approval event
        await expectEvent.inTransaction(
            tokenContract.approve(optionTokenContract.address, expectedTokenAmount, {from: startupAccount}),
            'Approval'
        );

        // Checking allowance for OptionTokenContract
        // Expected: 10000 tokens are allowed
        (await tokenContract.allowance(startupAccount, optionTokenContract.address,  {from: tsAccount}))
            .should.be.bignumber.equal(expectedTokenAmount);
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
    });*/

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

    });
});