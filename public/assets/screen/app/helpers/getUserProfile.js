"use strict";

const config = require('../config');
const userAPI = require('../api/user');

function getUserProfile(vm) {
    let userId = vm.$store.state.user.userId || vm.$store.state.user.id,
        token = vm.$store.state.user.sessionId;

    userAPI.getProfiles(token, userId).then(response => {
        console.log(response);

        let fundProfile = response.data.find(profile => {
            return profile.schemaId == config.userProfileName;
        });

        console.log(fundProfile);

        if (fundProfile) {
            userAPI.getProfile(token, fundProfile.itemId).then(result => {
                console.log(result);

                vm.$store.commit('setUserProfileData', result.data);

            }).catch(error => {
                //todo: process error
                console.log (error);
            });
        } else {
            userAPI.assignProfile(token, config.userProfileName, { userId: userId })
                .then(result => {
                    vm.$store.commit('setUserProfileData', result.data);
                })
                .catch(error => {
                    //todo: process error
                });
        }
    }).catch(error => {
        console.log(error);
    });
}

module.exports = getUserProfile;
