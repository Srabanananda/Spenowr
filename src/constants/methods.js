import { AsyncStorage } from "react-native";

const setVoteDate = async (date) => {
    try {
        await AsyncStorage.setItem("currentDate", new Date().toLocaleDateString());
    } catch (error) {
        console.log("failed to save in VoteDate");
    }
};

const getVoteDate = async () => {
    try {
        const value = await AsyncStorage.getItem("currentDate");
        if (value !== null) {
        // We have data!!
            return value;
        }
    } catch (error) {
        console.log("failed to get data from VoteDate");
    }
};

export default { setVoteDate, getVoteDate };
