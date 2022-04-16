import * as fs from "fs";
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import axios from "axios";
import protobuf from "protobufjs";
const apps_string = fs.readFileSync('./controllers/apps-list.json', 'utf8');



let apps = JSON.parse(apps_string);

protobuf.load("/home/christian/classes/webdev/node-server-cdesimone/protobuf/Protobufs/webui/service_storequery.proto", function(err, root) {
    if (err)
        throw err;

    // Obtain a message type
    var AwesomeMessage = root.lookupType("CStoreQuery_SearchSuggestions_Request");



    // Exemplary payload
    var payload = { key: "74B17A04048E9A8C089C6891366C9A15", search_term: "test" };

    var url = "https://api.steampowered.com/IStoreQueryService/SearchSuggestions/v1/?key=74B17A04048E9A8C089C6891366C9A15&search_term=test&max_results=5";

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);

    // Create a new message
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

    console.log(message);

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer

    axios.get(url).then(res => console.log(res.data));


    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var message = AwesomeMessage.decode(buffer);
    // ... do something with message

    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    var object = AwesomeMessage.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
    });
});



const findApps = (req, res) => {

    function getApp(queryElement) {
        if (apps.hasOwnProperty(queryElement)) {
            res.json(apps[queryElement]);
        } else {
            console.log("not found");
            axios
                .get(`https://store.steampowered.com/api/appdetails?cc=US&appids=${queryElement}`)
                .then(api_res => {
                    console.log(`statusCode: ${api_res.status}`)
                    console.log(api_res)
                    apps[queryElement] = api_res.data[queryElement].data;
                    console.log(apps[queryElement])
                    res.json(apps[queryElement]);
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

if (req['query'].hasOwnProperty('appid')) {
        getApp(req.query['appid'])
    }
else {
    res.json(apps);
}

}

const findApp = (req, res) => {
    console.log(req);
    axios
        .get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/?format=json`)
        .then(api_res => {
            console.log(`statusCode: ${api_res.status}`)
            console.log(api_res)
            console.log(api_res.data.applist.apps);
            res.json(api_res.data.applist.apps);
        })
        .catch(error => {
            console.error(error)
        })
}


export default (app) => {
    app.get('/api/apps', findApps);
    app.get('/api/search', findApp);
}