const Web3 = require('web3');
const contractAbi = [
  // Add the ABI of the deployed contract here
  // ...
];

const contractAddress = '0x...'; // Add the address of the deployed contract here

const web3 = new Web3('http://localhost:8545'); // Connect to your Ethereum client

const queueManagerContract = new web3.eth.Contract(contractAbi, contractAddress);

// Issue a new ticket and get the ticket number
queueManagerContract.methods.issueTicket().send({ from: '0x...' }) // Add the sender's Ethereum address here
  .on('receipt', function(receipt) {
    const ticketNumber = receipt.events.TicketIssued.returnValues.ticketNumber;
    console.log('Ticket issued. Ticket number:', ticketNumber);
  })
  .on('error', function(error) {
    console.error('Error issuing ticket:', error);
  });

// Get the next ticket number without issuing a new ticket
queueManagerContract.methods.getNextTicketNumber().call()
  .then(function(nextTicketNumber) {
    console.log('Next ticket number:', nextTicketNumber);
  })
  .catch(function(error) {
    console.error('Error getting next ticket number:', error);
  });
