import static spark.Spark.*;
import com.google.gson.Gson;
import views.Case;
import com.hedera.sdk.account.*;

import javax.script.Bindings;
import java.util.HashMap;
import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.account.HederaAccountUpdateValues;
import com.hedera.sdk.account.HederaClaim;
import com.hedera.sdk.common.HederaKey;
import com.hedera.sdk.common.HederaKey.KeyType;
import com.hedera.sdk.common.HederaTransactionAndQueryDefaults;
import com.hedera.sdk.common.HederaTransactionID;
import com.hedera.sdk.common.HederaTransactionRecord;
import com.hedera.sdk.cryptography.HederaCryptoKeyPair;
import com.hedera.utilities.ExampleUtilities;


public class Server {
    public static void main(String[] args) {

        Gson gson = new Gson();
        Case myCase = new Case();

        port(4000);

        get("/hello", (req, res) -> "Hello World");
        get("/case/:id", "application/json", ((request, response) -> {
            HashMap al = new HashMap();
            al.put("Snow", "Hello");
            al.put("Your code", request.params(":id"));
            return al;
        }), gson::toJson);

    }
}
