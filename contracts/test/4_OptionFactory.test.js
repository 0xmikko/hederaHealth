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
  .should();


// Contracts for testing purposes only
const TokenExampleMintable = artifacts.require('TokenExampleMintable');
const TokenExampleBurnable = artifacts.require('TokenExampleBurnable');

// Testing contract
const OptionFactory = artifacts.require('OptionFactory');
const OptionSale = artifacts.require('OptionSale');

// Setting accounts as array with receiving function
// ts means tokenstarter

contract('OptionFactory', ([ tsAccount, tsAdminAccount, startupAccount, investorAccount]) => {

    let factoryContract;
    let tokenContractMintable, tokenContractBurnable;
    let params = new Array();

    before(async () => {
        await advanceBlock();
        // Deploy Factory Contract
        factoryContract =  await OptionFactory.new({from: tsAccount});
        
        let tx = await web3.eth.getTransaction(factoryContract.transactionHash);
        console.log('Option Factory deployed at', factoryContract.address);
        let receipt = await web3.eth.getTransactionReceipt(factoryContract.transactionHash);
        //console.log('Option Factory deployed at', tx);
        console.log('Gas used', receipt.gasUsed);

        // Deploy token1Contract
        const tokenContractMintable = await TokenExampleMintable.new(
            "TestTokenMintable",
            "TEM",
            18,
            {from: startupAccount});


        const tokenContractBurnable =  await TokenExampleBurnable.new(
            "TokenExampleBurnable",
            "TEB",
            18,
            100000,
            {from: startupAccount});

        const now = (await latestTime());

        // OptionSale Contract
        const optionPremiumRate = new BigNumber(10);
        const optionStrikePriceRate = new BigNumber(10);
        const optionExpiredAt = now + duration.years(1);

        const salesStartTime = now;
        const salesFinishTime = now + duration.weeks(2);

        params[0] = [                       // PARAMETERS FOR MINTABLE TOKENS
            optionPremiumRate,              // Rate for Option premium
            optionStrikePriceRate,          // Rate for strike price
            optionExpiredAt,                      // Expiration date / time

            salesStartTime,                 // DateTime when sales start
            salesFinishTime,                // DateTime when sales finish
            tokenContractBurnable.address,  // Token address
            0x0,                            // TokenWallet doesn't make sense for Mintable contracts
            true,                           // TokenContract is not Mintable
            startupAccount,                 // Startup account
            ];

        params[1] = [                       // PARAMETERS FOR BURNABLE TOKENS
            optionPremiumRate,              // Rate for Option premium
            optionStrikePriceRate,          // Rate for strike price
            optionExpiredAt,                      // Expiration date / time

            salesStartTime,                 // DateTime when sales start
            salesFinishTime,                // DateTime when sales finish
            tokenContractBurnable.address,  // Token address
            startupAccount,                 // TokenWallet is startupAccount, we approve tokens from this address
            false,                          // TokenContract is not Mintable
            startupAccount,                 // Startup account
            ];

    });

    beforeEach(async () => {


    });

    it ('deployOptionContractsForMintable: Deploy contract when not whitelisted', async () => {
        await expectThrow(
            factoryContract.createOptionContracts(...params[0], {from: startupAccount}),
            EVMRevert,
            );
    });

    it ('setAdmin: Set Admin and add startup to whitelist', async () => {

        // Try to setAdmin from startup account
        await expectThrow(
            factoryContract.setAdmin(tsAdminAccount, {from: startupAccount}),
            EVMRevert,
            );

        await factoryContract.setAdmin(tsAdminAccount, {from: tsAccount});
        assert.equal(tsAdminAccount, await factoryContract.admin.call(),  "Admin role wasn\'t correctly set up");
    });

    it ('addToStartupWhiteList: Adding to whitelist', async () => {

        // Try to add Startup from startupAccount
        // Throw expected
        await expectThrow(
            factoryContract.addToStartupWhiteList(startupAccount, {from: startupAccount}),
            EVMRevert,
            );


        // Now we add startup to StartUpWhiteList and then we'll check to deply contracts one more time
        await factoryContract.addToStartupWhiteList(startupAccount, {from: tsAdminAccount});
        const checkStartupWhitelisted = await factoryContract.checkStartupWhitelisted(startupAccount, {from: startupAccount});
        assert.equal(true, checkStartupWhitelisted,  "Startup now whitelisted!");
    });

    it ('deployOptionContractsForMintable: Correct Deployment', async () => {

        let contractsQty = await factoryContract.getContractsQty();
        assert.equal(contractsQty, 0, "Contracts Qty should be zero!");

        // Deploy smart contracts
        await factoryContract.createOptionContracts(...params[0], {from: startupAccount});

        // Check how much qty added
        contractsQty = await factoryContract.getContractsQty();
        assert.equal(contractsQty, 1, "Not deployed as 1!");
    });

    it ('deployOptionContractsForBurnable: Correct Deployment', async () => {
        let contractsQty = await factoryContract.getContractsQty();
        assert.equal(contractsQty, 1, "Contracts Qty should be 1!");

        // Deploy smart contracts
        await factoryContract.createOptionContracts(...params[1], {from: startupAccount});

        // Check how much qty added
        contractsQty = await factoryContract.getContractsQty();
        assert.equal(contractsQty, 2, "Not deployed as 2!");
    });

    it ('Checking : Correct Deployment for all tested contracts', async () => {
        let optionParameters;
        let contractsQty = await factoryContract.getContractsQty();
        assert.equal(contractsQty, 2, "Contracts Qty should be 2!");

        for(let i=0; i < contractsQty; i++)
        {
            optionParameters = await factoryContract.getOptionParameters(i);
            for(let j=0; j<5; j++)
                params[i][j].should.be.bignumber.equal(optionParameters[j]);
        }


    });

    it ('Checking : Start sales with getOptionSaleContractAddress', async () => {
        let optionSaleContractAddress, optionSaleContract;
        let contractsQty = await factoryContract.getContractsQty();
        assert.equal(contractsQty, 2, "Contracts Qty should be 2!");

        for(let i=0; i < contractsQty; i++)
        {
            console.log("i", i)
            optionSaleContractAddress = await factoryContract.getSaleContractAddress(i);
            optionSaleContract = OptionSale.at(optionSaleContractAddress)
            optionSaleContract.startSales("Test", "TST", 18, {from: startupAccount})


        }


    });



});