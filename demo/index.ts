import { CreateExpenseRequestHandler } from "../create-expense-request-handler";
import { CleanServer } from "../lib/clean-server";
import { GetExpenseRequestHandler } from "./get-expense-request-handler";

const PORT = parseInt(process.env["PORT"] || "3000");

const server = new CleanServer();

server.addRequestHandler(new GetExpenseRequestHandler());
server.addRequestHandler(new CreateExpenseRequestHandler());

server.start(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
