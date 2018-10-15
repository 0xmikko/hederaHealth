package model;

import com.hedera.contracts.ContractCreate;
import com.hedera.contracts.ContractUpdate;
import com.hedera.contracts.DemoContract;
import com.hedera.file.FileCreate;
import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.common.HederaDuration;
import com.hedera.sdk.common.HederaTimeStamp;
import com.hedera.sdk.common.HederaTransactionAndQueryDefaults;
import com.hedera.sdk.contract.HederaContract;
import com.hedera.sdk.file.HederaFile;
import com.hedera.utilities.ExampleUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.concurrent.TimeUnit;

public class DeployContract {
    final static Logger logger = LoggerFactory.getLogger(DeployContract.class);

    HederaContract contract;

    public DeployContract(String accountName, String filename) throws Exception {
        HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();
        txQueryDefaults = ExampleUtilities.getTxQueryDefaults();

        Account newAccount = new Account();
        HederaAccount account = newAccount.getAccountByName("Government");

        // create a file
        // new file object
        HederaFile file = new HederaFile();
        // setup transaction/query defaults (durations, etc...)
        file.txQueryDefaults = txQueryDefaults;

        System.out.println("BINGO!");

        // get file contents
        InputStream is = DemoContract.class.getResourceAsStream(filename);
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead;
        byte[] data = new byte[4096];
        while ((nRead = is.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }

        buffer.flush();
        byte[] fileContents = buffer.toByteArray();

        // create a file with contents
        file = FileCreate.create(file, fileContents);

        // new contract object
        contract = new HederaContract();
        // setup transaction/query defaults (durations, etc...)
        contract.txQueryDefaults = account.txQueryDefaults;

        // create a contract
        contract = ContractCreate.create(contract, file.getFileID(), 0);
        if (contract != null) {
            // update the contract
            HederaTimeStamp expirationTime = new HederaTimeStamp(100, 10);
            HederaDuration autoRenewDuration = new HederaDuration(10, 20);
            TimeUnit.SECONDS.sleep(1);

            contract = ContractUpdate.update(contract, expirationTime, autoRenewDuration);
        }
    }

    public HederaContract getContract() {
        return contract;
    }
}
