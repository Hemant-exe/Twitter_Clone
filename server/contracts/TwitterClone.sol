// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

contract TwitterClone {
    struct Tweet {
        uint256 id;
        address username;
        string tweetText;
        bool isDeleted;
    }
    Tweet[] private tweets;
    event AddTweet(address reciepient, uint256 tweetId);
    event DeleteTweet(address reciepient, uint256 tweetId);

    // mapping tweet id => wallet address
    mapping(uint256 => address) TweetToOwner;

    //function to add tweet
    function addTweet(string memory text, bool isDeleted) external {
        uint256 tweetId = tweets.length;
        tweets.push(Tweet(tweetId, msg.sender, text, isDeleted));
        TweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }

    // get all the tweets
    function getAllTweet() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < tweets.length; i++) {
            if (tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // get your own tweet
    function getMyTweet() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < tweets.length; i++) {
            if (TweetToOwner[i] == msg.sender && tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // to delete tweet
    function deleteTweet(uint256 tweetId, bool isDeleted) external {
        if (TweetToOwner[tweetId] == msg.sender) {
            tweets[tweetId].isDeleted = isDeleted;
        }
        emit DeleteTweet(msg.sender, tweetId);
    }
}
