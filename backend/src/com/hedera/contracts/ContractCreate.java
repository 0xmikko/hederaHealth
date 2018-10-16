package com.hedera.contracts;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hedera.sdk.common.HederaDuration;
import com.hedera.sdk.common.HederaFileID;
import com.hedera.sdk.common.HederaPrecheckResult;
import com.hedera.sdk.common.HederaTransactionReceipt;
import com.hedera.sdk.common.HederaTransactionRecord;
import com.hedera.sdk.common.HederaTransactionStatus;
import com.hedera.sdk.common.Utilities;
import com.hedera.sdk.contract.HederaContract;
import com.hedera.sdk.transaction.HederaTransactionResult;

import java.util.concurrent.TimeUnit;

public final class ContractCreate {
	public static HederaContract create(HederaContract contract, HederaFileID fileID, long initialBalance) throws Exception {
		return create(contract, fileID, initialBalance, new byte[0]); 
	}
	
	public static HederaContract create(HederaContract contract, HederaFileID fileID, long initialBalance, byte[] constParams) throws Exception {
		final Logger logger = LoggerFactory.getLogger(HederaContract.class);
		// new contract
		long shardNum = 0;
		long realmNum = 0;
		long gas = 2500000000l;
		byte[] constructorParameters = constParams; 
		HederaDuration autoRenewPeriod = new HederaDuration(60, 10);

		//fee 100
		contract.txQueryDefaults.node.contractCreateTransactionFee = 1000000;
		contract.txQueryDefaults.generateRecord = true;
		contract.autoRenewPeriod = autoRenewPeriod;

		logger.info("");
		logger.info("CONTRACT CREATE");
		logger.info("");

		// create the new contract
		// contract creation transaction
        System.out.println("Wait-1");
        TimeUnit.SECONDS.sleep(1);
		HederaTransactionResult createResult = contract.create(shardNum, realmNum, fileID, initialBalance, gas,
				constructorParameters, autoRenewPeriod);
		// was it successful ?

		System.out.println("Result");
		System.out.println(createResult.getPrecheckResult());
		System.out.println(HederaPrecheckResult.OK);

		if (createResult.getPrecheckResult() == HederaPrecheckResult.OK) {
			// yes, get a receipt for the transaction
			logger.info(contract.txQueryDefaults.node.toString());

			HederaTransactionReceipt receipt = Utilities.getReceipt(contract.hederaTransactionID,
					contract.txQueryDefaults.node);
			// was that successful ?
			logger.info("Transcation status");
			logger.info(receipt.transactionStatus.toString());

			if (receipt.transactionStatus == HederaTransactionStatus.SUCCESS) {
				contract.contractNum = receipt.contractID.contractNum;
				// and print it out
				logger.info(String.format("===>Your new contract number is %d", contract.contractNum));
				HederaTransactionRecord record = new HederaTransactionRecord(contract.hederaTransactionID, contract.txQueryDefaults.node.contractGetRecordsQueryFee, contract.txQueryDefaults);
			} else {
				logger.info("Failed with transactionStatus:" + receipt.transactionStatus.toString());
				return null;
			}
		} else {
			logger.info("getPrecheckResult not OK: " + createResult.getPrecheckResult().name());
			return null;
		}
		return contract;
	}
}
