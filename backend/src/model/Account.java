package model;

import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.account.HederaAccountUpdateValues;
import com.hedera.sdk.account.HederaClaim;
import com.hedera.sdk.common.HederaAccountID;
import com.hedera.sdk.common.HederaDuration;
import com.hedera.sdk.common.HederaKey;
import com.hedera.sdk.common.HederaKey.KeyType;
import com.hedera.sdk.common.HederaTransactionAndQueryDefaults;
import com.hedera.sdk.common.HederaTransactionID;
import com.hedera.sdk.common.HederaTransactionRecord;
import com.hedera.sdk.cryptography.HederaCryptoKeyPair;
import com.hedera.sdk.node.HederaNode;
import com.hedera.utilities.ExampleUtilities;

public final class Account{

    public HederaAccount getAccountByName(String name) {
        return accounts.get(name);
    }

    HashMap<String, HederaAccount> accounts;

    public Account() throws Exception {
       accounts = new HashMap();
       accounts.put("Government", setUpAccount(1001,
               "302a300506032b65700321003f0c113c3f24182ddcc4d018f434e2fa2ec7b50a256d48a56e8961fb9a7f547c",
               "302e020100300506032b6570042204202d1219af37ee94c1cd68e819e22dca2f1db345185c841a4d2925117456727781"));
       //accounts.put("Doctor", setUpAccount(1001, "ff", "ff"));
       //accounts.put("Patient", setUpAccount(1001, "ff", "ff"));
       //accounts.put("StrategyHolder", setUpAccount(1001, "ff", "ff"));

    }

    public HederaAccount setUpAccount (int accountNum, String publicKey, String privateKey) throws Exception {
        final Logger logger = LoggerFactory.getLogger(Account.class);

        // setup a set of defaults for query and transactions
        HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();
        txQueryDefaults = ExampleUtilities.getTxQueryDefaults();

        String nodeAddress = "testnet94.hedera.com";
        ExampleUtilities.getNodeDetails();
        HederaAccountID nodeAccountID = new HederaAccountID(0, 0, 3);
        HederaNode node = new HederaNode(nodeAddress, 80, nodeAccountID);

        // setup paying account
        HederaAccountID payingAccountID = new HederaAccountID(0, 0, accountNum);

        // setup paying keypair
        HederaCryptoKeyPair payingKeyPair = new HederaCryptoKeyPair(KeyType.ED25519, publicKey, privateKey);

        // setup a set of defaults for query and transactions
        txQueryDefaults.memo = "Unlocking account";
        txQueryDefaults.node = node;
        txQueryDefaults.payingAccountID = payingAccountID;
        txQueryDefaults.payingKeyPair = payingKeyPair;
        txQueryDefaults.transactionValidDuration = new HederaDuration(120, 0);
        txQueryDefaults.fileWacl = payingKeyPair;

        // new account objects
        HederaAccount account = new HederaAccount();
        account.accountNum = accountNum;

        // setup transaction/query defaults (durations, etc...)
        account.txQueryDefaults = txQueryDefaults;
        account.setNode(txQueryDefaults.node);
        account.getBalance();
        return account;
    }

}