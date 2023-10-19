require("dotenv").config();
const ethers = require("ethers");

const AAVE_POOL_V2_ABI = require("./aave.json");

const AAVE_POOL_V2_ADDR = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";

async function main() {
  const provider = new ethers.WebSocketProvider(
    "wss://mainnet.infura.io/ws/v3/" + process.env.INFURA_PROJECT_ID
  );
  const contract = new ethers.Contract(
    AAVE_POOL_V2_ADDR,
    AAVE_POOL_V2_ABI,
    provider
  );
  console.log("Listening to Aave lending pool...");
  contract.on(
    "FlashLoan",
    (assets, amounts, modes, onBehalfOf, params, referralCode, event) => {
      // readable time
      console.log("time:   " + new Date().toLocaleString());
      console.log("assets:   " + assets);
      console.log("amounts:   " + amounts);
      console.log("modes:   " + modes);
      console.log("onBehalfOf:   " + onBehalfOf);
      console.log("params:   " + params);
      console.log("referralCode:   " + referralCode);
      console.log("event:   " + event);
    }
  );
  contract.on("Withdraw", (to, amount, from) => {
    // Get the current date and time
    const currentDate = new Date();

    // Define an array of month names for formatting
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the components of the current date and time
    const year = currentDate.getFullYear();
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format the date and time as a readable string
    const formattedTime = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;

    // Display the formatted time
    console.log("A user withdrew funds from the Aave lending pool");
    console.log(formattedTime);
    console.log("to:   " + to);
    console.log("amount:   " + amount);
    console.log("from:   " + from);
  });
  contract.on("Deposit", (Listener) => {
    // Get the current date and time
    const currentDate = new Date();

    // Define an array of month names for formatting
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the components of the current date and time
    const year = currentDate.getFullYear();
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format the date and time as a readable string
    const formattedTime = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;

    // Display the formatted time
    console.log("A user deposited funds from the Aave lending pool");
    console.log(formattedTime);
    console.log("Listener:   " + Listener);
  });
}

main();
