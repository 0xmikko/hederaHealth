import static spark.Spark.*;
import com.google.gson.Gson;
import model.Contract;

import java.util.HashMap;
import javax.xml.bind.DatatypeConverter;

public class Server {
    public static void main(String[] args) throws Exception {

        Gson gson = new Gson();

        Contract dc = new Contract();
        System.out.println("DEMOCONTRACT DEPLOYED");

        // Internal test before running server
        // We set control value with setHashValue method
        // Than we get it and compare them
        System.out.println("INTERNAL TEST STARTED");

        // We use 32-bytes string "Hedera HashgraphHedera Hashgraph" for testing
        String controlValue  = DatatypeConverter.printHexBinary("Hedera HashgraphHedera Hashgraph".getBytes());
        controlValue = controlValue.toLowerCase();

        dc.setHashValue(DatatypeConverter.parseHexBinary(controlValue));
        System.out.println("HASH SET UP");

        // Getting store hash value
        byte[] result = dc.getHashValue();

        // compare these two values
        // If they are the same we would start server
        if (controlValue.equals(DatatypeConverter.printHexBinary(result).toLowerCase())) {
            System.out.println("Internal test passed");

            // Loading default case
            String defaultCase = "27d6dcbfa25fc4585af8a5a09be75de5a106bb15da4711a8ba190d4a11f78994";
            dc.setHashValue(DatatypeConverter.parseHexBinary(defaultCase));

            // Starting Spark server on port 4000
            port(4000);

            // Provide simple REST API


            // path /hello returns "Hello, Hedera!"
            get("/hello", (req, res) -> "Hello, Hedera!");

            // path /get returns JSON with set Hash
            get("/get/", "application/json", ((request, response) -> {
                HashMap al = new HashMap();
                byte[] res22 = dc.getHashValue();
                al.put("Hash", DatatypeConverter.printHexBinary(res22));
                System.out.println("Hash returned!");
                return al;
            }), gson::toJson);


            // path /set setup Hash value from JSON
            // returns JSON with Status and saved hash
            get("/set/:id", "application/json", ((request, response) -> {
                dc.setHashValue(DatatypeConverter.parseHexBinary(request.params(":id")));
                System.out.println("Set hash completed!");
                HashMap al = new HashMap();
                al.put("Status", "Ok");
                al.put("Hash", request.params(":id"));

                return al;
            }), gson::toJson);
        }

    }
}
