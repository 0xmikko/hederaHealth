package model;

import java.io.*;
import java.util.concurrent.TimeUnit;

import com.hedera.contracts.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.contract.HederaContract;
import com.hedera.sdk.contract.HederaContractFunctionResult;

public final class Contract {
	final static Logger logger = LoggerFactory.getLogger(Contract.class);

	HederaContract contract;
	HederaAccount account;

	public Contract() throws Exception {


		Account accountPool = new Account();
		account = accountPool.getAccountByName("Government");
		System.out.println("We are running with this f***ing solidity ID:");
		System.out.println(account.getSolidityContractAccountID());

		DeployContract newContract = new DeployContract("Government", "/main/resources/sc.bin"); //simpleStorage.bin");

		contract = newContract.getContract();
		System.out.println(contract.contractNum);
	}

	public void setHashValue(byte[] hash) throws Exception {
		if (contract != null) {
			System.out.println("SETTING HASH VALUE");

			// Read ABI for setCase function
			String SC_SET_ABI = getABI("/src/main/resources/setCase.json");

			// GetInfo for contract initialization
			ContractGetInfo.getInfo(contract);

			// Set timout for preventing node throttling
			TimeUnit.SECONDS.sleep(1);

			// get bytecode
			ContractGetBytecode.getByteCode(contract);

			// Setting gas
			long gas = 250000;
			long amount = 0;

			// Checking that solidity account is set up correctly
			//logger.info("Solidity account");
			//logger.info(account.getSolidityContractAccountID());


			// Setting hash as parameter
			byte[] functionParameters = SoliditySupport.encodeSet(hash, SC_SET_ABI);
			TimeUnit.SECONDS.sleep(1);
			ContractCall.call(contract, gas, amount, functionParameters);

			logger.info("Set Contract Call done!");
		}
	}

	public byte[] getHashValue() throws Exception {

		// Checking that contract is not null

		if (contract != null) {
			logger.info("GETTING HASH VALUE");

			// Loading getCase ABI
			String SC_GET_ABI = getABI("/src/main/resources/getCase.json");

			// Getting Info to initialize SC
			ContractGetInfo.getInfo(contract);

			// Set timout for preventing node throttling
			TimeUnit.SECONDS.sleep(1);

			// get bytecode
			ContractGetBytecode.getByteCode(contract);

			// Set timout for preventing node throttling
			TimeUnit.SECONDS.sleep(1);

			// Getting SC function by provided ABI
			byte[] function = SoliditySupport.encodeGetValue(SC_GET_ABI);

			// Make a get call
			long localGas = 250000;
			long maxResultSize = 5000;
			HederaContractFunctionResult functionResult = ContractRunLocal.runLocal(contract, localGas, maxResultSize, function);

			logger.info("Get Contract call done");

			byte[] returnValue = functionResult.contractCallResult();
			return returnValue;

		}
		return null;
	}

	// Get ABI from specific JSON
	// @param: filename - file with JSON ABI
	// return String contains ABI
	public String getABI(String filename) throws Exception {
		String cwd = System. getProperty("user.dir");
		System. out. println("Current working directory : " + cwd);
		File file = new File(cwd + filename);
		FileInputStream fis = new FileInputStream(file);
		byte[] data = new byte[(int) file.length()];
		fis.read(data);
		fis.close();

		String str = new String(data, "UTF-8");
		System.out.println(str);
		return str;
	}
}


