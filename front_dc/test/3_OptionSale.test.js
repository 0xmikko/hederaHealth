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
const OptionSale = artifacts.require('OptionSale');

// Setting accounts as array with receiving function
// ts means tokenstarter


contract('OptionToken', ([ tsAccount, tsAdminAccount, startupAccount, investorAccount]) => {

    let tokenContract, tokenContractMintable, optionTokenContract, optionSaleContract;
    const investorAmountToExecute = new BigNumber(50);
    const premiumRate = new BigNumber(10);
    const strikePriceRate =  new BigNumber(10);
    let now, expiredAt, salesStartTime, salesFinishTime;

    before(async () => {

        // Testing parameters

        now = (await latestTime());
        expiredAt = now + duration.weeks(52);
        salesStartTime = now;
        salesFinishTime = now + duration.weeks(8);

        // Deploying contracts for testing
         tokenContract =  await TokenExampleBurnable.new(
            "TokenExampleBurnable",
            "TEB",
            18,
            100000,
            {from: startupAccount});

        /*optionTokenContract = await OptionTokenStandard.new(
            startupAccount,         // beneficiary for collected funds

            tokenContract.address,  // tokenContract address
            startupAccount,         // tokenWallet account (a person who could allow to approve funds)
            {from: tsAccount}
            );*/

        optionSaleContract = await OptionSale.new(
            premiumRate,            // Rate for Option premium
            strikePriceRate,        // Rate for strike price
            expiredAt,              // Expiration date / time

            salesStartTime,         // DateTime when sales start
            salesFinishTime,        // DateTime when sales finish
            tokenContract.address,  // Token address
            startupAccount,         // TokenWallet is startupAccount, we approve tokens from this address
            false,                  // TokenContract is not Mintable
            startupAccount,         // Startup account
            {from: tsAccount});     // We deploy it from tsAccount. Its like factory will do

        console.log('Sales Option Token deployed at', optionSaleContract.address);



    });

    it ('Fallback: trying to send funds till OptionToken not deployed', async () =>{
        await expectThrow(
            optionSaleContract.sendTransaction({from: investorAccount, value: 5}),
            EVMRevert,
        );
    });

    it ('Starting Sales', async () =>{

        await optionSaleContract.startSales('OptionTokenStandard', 'OTS', 18, {from: startupAccount});
        const optionTokenContractAddress = await optionSaleContract.getOptionTokenAddress();

        console.log(optionTokenContractAddress);
        optionTokenContract = await OptionToken.at(optionTokenContractAddress);
        console.log('OptionToken deployed at:', optionTokenContract.address);
        optionTokenContract.address.should.be.not.equal(0);
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


    it('sendTransaction: Buying OptionTokens for investor', async () => {

        await optionSaleContract.sendTransaction({from: investorAccount, value: 5});
        const balance = await optionTokenContract.balanceOf(investorAccount,  {from: investorAccount});
        assert.equal(balance, 50);
    });

    it('Executing OptionTokenContract by investor', async () => {
        await optionTokenContract.sendTransaction({from: investorAccount, value: 5});
        const investor_balance = await web3.eth.getBalance(investorAccount);
        console.log(investor_balance);

        const balance = await tokenContract.balanceOf(investorAccount,  {from: investorAccount});
        assert.equal(balance, 50);
    });

    it('Buying OptionTokens for investor after FinishTime', async () => {
        await increaseTimeTo(salesFinishTime + duration.minutes(10));
        await expectThrow(
            optionSaleContract.sendTransaction({from: investorAccount, value: 5}),
            EVMRevert,
            );
    });

});