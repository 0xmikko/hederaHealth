package com.hedera.contracts;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.hedera.account.AccountCreate;
import com.hedera.file.FileCreate;
import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.common.HederaDuration;
import com.hedera.sdk.common.HederaKey.KeyType;
import com.hedera.sdk.common.HederaTimeStamp;
import com.hedera.sdk.common.HederaTransactionAndQueryDefaults;
import com.hedera.sdk.contract.HederaContract;
import com.hedera.sdk.contract.HederaContractFunctionResult;
import com.hedera.sdk.cryptography.HederaCryptoKeyPair;
import com.hedera.sdk.file.HederaFile;
import com.hedera.utilities.ExampleUtilities;
import java.util.concurrent.TimeUnit;

public final class DemoContract2 {
	final static Logger logger = LoggerFactory.getLogger(DemoContract2.class);

	public static void main(String... arguments) throws Exception {

		// setup a set of defaults for query and transactions
		HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();
		txQueryDefaults = ExampleUtilities.getTxQueryDefaults();

		// create an account
		// new account object
		HederaAccount account = new HederaAccount();
		// setup transaction/query defaults (durations, etc...)
		account.txQueryDefaults = txQueryDefaults;


		// create an account
		HederaCryptoKeyPair newAccountKey = new HederaCryptoKeyPair(KeyType.ED25519);


		System.out.println("publicKey + " + newAccountKey.getPublicKeyEncodedHex());
		System.out.println("sectretKey + " + newAccountKey.getSecretKeyHex());
		account = AccountCreate.create(account, newAccountKey,  1000);

		System.out.println("Account num is: " + account.accountNum);
		System.out.println("Account shardNum is: " + account.shardNum);
		System.out.println("Account realmNum is: " + account.realmNum);
		System.out.println("Account balance is: " + account.getBalance());

		if (account != null) {
			// the paying account is now the new account
			txQueryDefaults.payingAccountID = account.getHederaAccountID();
			txQueryDefaults.payingKeyPair = newAccountKey;
			txQueryDefaults.fileWacl = newAccountKey;

			// create a file
			// new file object
			HederaFile file = new HederaFile();
			// setup transaction/query defaults (durations, etc...)
			file.txQueryDefaults = txQueryDefaults;

			// get file contents
			InputStream is = DemoContract2.class.getResourceAsStream("/main/resources/simpleStorage.bin");
		    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		    int nRead;
		    byte[] data = new byte[4096];
		    while ((nRead = is.read(data, 0, data.length)) != -1) {
		        buffer.write(data, 0, nRead);
		    }
		 
		    buffer.flush();
		    byte[] fileContents = buffer.toByteArray();

		    System.out.println("Waiting for creating file");
			TimeUnit.SECONDS.sleep(1);
			// create a file with contents
			file = FileCreate.create(file, fileContents);

			// new contract object
			HederaContract contract = new HederaContract();
			// setup transaction/query defaults (durations, etc...)
			contract.txQueryDefaults = txQueryDefaults;

			//contract.adminKey = new HederaKey(KeyType.ECDSA384, newAccountKey.getPublicKey());
			//contract.adminKeySignature = new HederaKeySignature(KeyType.ED25519, newAccountKey.getPublicKey(), newAccountKey.getSecretKey(), "keyDescription");


			System.out.println("Waiting before creating contract");
			TimeUnit.SECONDS.sleep(1);
			// create a contract
			contract = ContractCreate.create(contract, file.getFileID(), 0);
			//contract = create(contract, file.getFileID(), 1);
			if (contract != null) {
				// update the contract
				System.out.println("Contract created");
				HederaTimeStamp expirationTime = new HederaTimeStamp(100, 10);
				HederaDuration autoRenewDuration = new HederaDuration(10, 20);

				System.out.println("Waiting before updating contract");
				TimeUnit.SECONDS.sleep(1);

				contract = ContractUpdate.update(contract, expirationTime, autoRenewDuration);
				
				if (contract != null) {
					// getinfo
					System.out.println("Contract created");
					ContractGetInfo.getInfo(contract);
					// get bytecode
					ContractGetBytecode.getByteCode(contract);
					// call
					final String SC_SET_ABI = "{\"constant\":false,\"inputs\":[{\"name\":\"x\",\"type\":\"uint256\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}";
					long gas = 250000;
					long amount = 14;
					byte[] functionParameters = SoliditySupport.encodeSet(10,SC_SET_ABI);


					System.out.println("Waiting before contract call");
					TimeUnit.SECONDS.sleep(1);

					ContractCall.call(contract, gas, amount, functionParameters);
					// call local
					String SC_GET_ABI = "{\"constant\":true,\"inputs\":[],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}";
					
					byte[] function = SoliditySupport.encodeGetValue(SC_GET_ABI);
					long localGas = 250000;
					long maxResultSize = 5000;
					HederaContractFunctionResult functionResult = ContractRunLocal.runLocal(contract, localGas, maxResultSize, function);
					int decodeResult = SoliditySupport.decodeGetValueResult(functionResult.contractCallResult(),SC_GET_ABI);
					logger.info(String.format("===>Decoded functionResult= %d", decodeResult));
				}
			}
		}
	}
}