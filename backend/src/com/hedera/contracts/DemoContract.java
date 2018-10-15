package com.hedera.contracts;

import java.io.ByteArrayOutputStream;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.io.InputStream;
import java.security.spec.InvalidKeySpecException;
import java.util.concurrent.TimeUnit;

import model.DeployContract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import model.Account;

public final class DemoContract {
	final static Logger logger = LoggerFactory.getLogger(DemoContract.class);

	public static void main(String... arguments) throws Exception {

			DeployContract newContract = new DeployContract("Government", "/main/resources/government.bin");

			HederaContract contract = newContract.getContract();

			if (contract != null) {
				// getinfo
				ContractGetInfo.getInfo(contract);
				// get bytecode
				ContractGetBytecode.getByteCode(contract);
				// call
				final String SC_SET_ABI = "{\"constant\":false,\"inputs\":[{\"name\":\"x\",\"type\":\"uint256\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}";
				long gas = 250000;
				long amount = 14;
				byte[] functionParameters = SoliditySupport.encodeSet(10,SC_SET_ABI);

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
