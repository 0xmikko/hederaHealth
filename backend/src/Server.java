import static spark.Spark.*;
import com.google.gson.Gson;
import views.Case;

import javax.script.Bindings;
import java.util.HashMap;



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
