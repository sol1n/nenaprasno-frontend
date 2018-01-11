"use strict";

function findInStore(id, $store) {
    return $store.state.form.data.filter(function (v) {
        return v.controlId == id;
    })[0];
}

function displayCondition(el, $store) {
    let result = true,
        conditions = el.displayCondition,
        displayResults = [];

    if (conditions) {
        Object.keys(conditions).forEach(function(conditionName) {
            let conditionValue = conditions[conditionName];

            // TODO: More complex conditions
            switch (conditionName) {
                case '$or':
                    let $orResults = false;

                    $store.state.form.data.forEach(function (c) {
                        conditionValue.forEach(function (input) {
                            let inputId = Object.keys(input)[0],
                                inputVal = input[inputId];

                            if (inputId == c.controlId && inputVal == c.value) {
                                $orResults = true;
                            }
                        });
                    });

                    displayResults.push($orResults);

                    break;

                // There will be functions maybe
                case '$func':
                    //Temp
                    displayResults.push(true);
                    break;

                // Simple conditions, like: "displayCondition":
                //
                // "control-id": 1
                //
                //--------------------------------
                //
                // "control-id": {
                //    "$in": [1,2,3,4,5,6,7]
                // }
                //
                //--------------------------------
                //
                // "control-id": {
                //    "$nin": [1,2,3,4,5,6,7]
                // }
                //
                default:
                    let subResult = false;

                    if (typeof conditionValue == 'object') {
                        switch (Object.keys(conditionValue)[0]) {
                            case '$in':
                                let $inResults = findInStore(conditionName, $store);
                                if ($inResults) {
                                    if (Array.isArray($inResults.value) && $inResults.value.length > 0) {
                                        subResult = conditionValue['$in'].some( r=> $inResults.value.indexOf(r) > -1 )
                                    } else {
                                        subResult = conditionValue['$in'].indexOf($inResults.value) >= 0
                                    }
                                }
                                break;

                            case '$nin':
                                let $ninResults = findInStore(conditionName, $store);
                                if ($ninResults) {
                                    if (Array.isArray($ninResults.value) && $ninResults.value.length > 0) {
                                        subResult = conditionValue['$nin'].some( r=> $ninResults.value.indexOf(r) < 0 )
                                    } else {
                                        subResult = conditionValue['$nin'].indexOf($ninResults.value) < 0
                                    }
                                }
                                break;

                            // Greater than
                            case '$gt':
                                let $gtResults = findInStore(conditionName, $store);
                                console.log('$gtResults', $gtResults);

                                if ($gtResults) {
                                    subResult = $gtResults.value > conditionValue['$gt'];
                                }

                                console.log(subResult);

                                break;

                            // Greater than or equal
                            case '$gte':
                                let $gteResults = findInStore(conditionName, $store);
                                console.log('$gteResults', $gteResults);

                                if ($gteResults) {
                                    subResult = $gteResults.value >= conditionValue['$gte'];
                                }

                                console.log(subResult);

                                break;

                            // Less than
                            case '$lt':
                                let $ltResults = findInStore(conditionName, $store);
                                console.log('$ltResults', $ltResults);

                                if ($ltResults) {
                                    subResult = $ltResults.value < conditionValue['$lt'];
                                }

                                console.log(subResult);

                                break;

                            // Less than or equal
                            case '$lte':
                                let $lteResults = findInStore(conditionName, $store);
                                console.log('$lteResults', $lteResults);

                                if ($lteResults) {
                                    subResult = $lteResults.value <= conditionValue['$lte'];
                                }

                                console.log(subResult);

                                break;

                            // Contains all values
                            case '$contains':
                                let $containsResults = findInStore(conditionName, $store);
                                console.log('$containsResults', $containsResults);

                                if ($containsResults) {
                                    if (Array.isArray($containsResults.value) && $containsResults.value.length > 0) {
                                        subResult = conditionValue['$contains'].every(r => $containsResults.value.indexOf(r) > -1);
                                    } else {
                                        subResult = conditionValue['$contains'].indexOf($containsResults.value) >= 0;
                                    }
                                }

                                console.log(subResult);

                                break;
                        }
                    } else {
                        $store.state.form.data.forEach(function (c) {
                            if (conditionName == c.controlId && conditionValue == c.value) {
                                subResult = true;
                            }
                        });
                    }

                    displayResults.push(subResult);

                    break;
            }

            if (displayResults.indexOf(false) < 0) {
                console.log(`Display results of element: "${el.title ? el.title : ''}" ${el.id} — %c${displayResults}`, "font-weight: bold; color: green;");
            } else {
                console.log(`Display results of element: "${el.title ? el.title : ''}" ${el.id} — %c${displayResults}`, "font-weight: bold; color: red;");
            }
        });

        result = displayResults.indexOf(false) === -1;
    } else {
        result = true;
    }

    return result;
}

module.exports = displayCondition;