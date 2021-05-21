// Load required packages
import Client, { IClient } from "../models/client.model";
// Create endpoint /api/client for POST
const postClients = (req: any, res: any) => {
  // Create a new instance of the Client model
  const client: IClient = new Client();
  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;
  // Save the client and check for errors
  client.save(function (err) {
    if (err) res.send(err);
    res.json({ message: "Client added to the locker!", data: client });
  });
};
// Create endpoint /api/clients for GET
const getClients = (req: any, res: any) => {
  // Use the Client model to find all clients
  Client.find({ userId: req.user._id }, function (err, clients) {
    if (err) res.send(err);
    res.json(clients);
  });
};

export default {
  postClients: postClients,
  getClients: getClients,
};
