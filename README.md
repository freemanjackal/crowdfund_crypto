# MVP crowdfund crypto project
Allow create crowdfunding projects for any purpouse and share it on social media. Right now just configured to accept Ethereum.
## Requirements
You need to have ipfs locally installed for some features to work properly like images. Images uploaded when creating a crowfund project are stored in ipfs and are retrieved from there.
## Usage
Download the code and move to the source folder.
> npm install
Run a local ethereum network for testing purposes
> embark simulator
and then
> embark run 
or
> embark run --nodashboard
it will launch a server in locahost:8000
If you want to test in ethereum testnet you will need to change the network configuration. For more details refer to(embark)[https://embark.status.im/docs/quick_start.html].


