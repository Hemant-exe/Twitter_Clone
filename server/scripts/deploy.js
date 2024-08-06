const main = async() => {
    const contractFactory = await ethers.getContractFactory("TwitterClone");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log("Contract deployed to: ", contract.address);

}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
        } catch (error) {
            console.error(error);
            process.exit(1);

    }
}

runMain();