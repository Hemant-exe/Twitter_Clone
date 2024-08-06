(async () => {
  const { expect } = await import("chai");
  const { ethers } = await import("hardhat");


describe("Twitter Clone", function () {
  let Twitter;
  let twitter;
  let owner;

  const NUM_OF_TOTAL_TWEETS_WITHOUT_ME = 5;
  const NUM_OF_MY_TWEETS = 3;

  let totalTweets;
  let totalMyTweets;

  beforeEach(async function () {
    Twitter = await ethers.getContractFactory("TwitterClone");
    [owner, addr1, addr2] = await ethers.getSigners();
    twitter = await Twitter.deploy();

    totalTweets = [];
    totalMyTweets = [];
    for (let i = 0; i < NUM_OF_TOTAL_TWEETS_WITHOUT_ME; i++) {
      let tweet = {
        tweetText: "Random Text with id :- " + i,
        " username": addr1,
        isDeleted: false,
      };
      await twitter.connect(addr1).addTweet(tweet.tweetText, tweet.isDeleted);
      totalTweets.push(tweet);
    }

    for (let i = 0; i < NUM_OF_MY_TWEETS; i++) {
      let tweet = {
        tweetText: "Random Text with id :- " + (NUM_OF_MY_TWEETS + i),
        " username": owner,
        isDeleted: false,
      };
      await twitter.addTweet(tweet.tweetText, tweet.isDeleted);
      totalTweets.push(tweet);
      totalMyTweets.push(tweet);
    }
  });

  describe("Add Tweet", function () {
    it("should add a tweet and emit AddTweet event ", async function () {
      let tweet = {
        tweetText: "New Tweet ",
        isDeleted: false,
      };
      await expect(await twitter.addTweet(tweet.tweetText, tweet.isDeleted))
        .to.emit(twitter, "AddTweet")
        .withArgs(
          owner.address,
          NUM_OF_TOTAL_TWEETS_WITHOUT_ME,
          NUM_OF_MY_TWEETS
        );
    });
  });

  describe("Delete Tweet", function () {
    it("should delete a tweet and emit DeleteTweet event ", async function () {
      const TWEET_ID = 0;
      const TWEET_DELETED = true;

      await expect(twitter.connect(addr1).deleteTweet(TWEET_ID, TWEET_DELETED))
        .to.emit(twitter, "DeleteTweet")
        .withArgs(TWEET_ID, TWEET_DELETED);
    });
  });

  describe("Get All Tweet", function () {
    it("return total tweeets ", async function () {
      const allTweetsFromChain = await twitter.getAllTweet();
      expect(allTweetsFromChain.length).to.equal(
        NUM_OF_TOTAL_TWEETS_WITHOUT_ME + NUM_OF_MY_TWEETS
      );
    });

    it("return all my tweeets ", async function () {
      const myTweetsFromChain = await twitter.getMyTweet();
      expect(myTweetsFromChain.length).to.equal(NUM_OF_MY_TWEETS);
    });
  });
});
})();
