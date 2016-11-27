/*
 * #1
 * Напишите функцию, которая будет преобразовывать массив
 * со вложенными массивами в один плоский массив
 * EX:
 * in  : [1, [2, 3, [4, 5], [2, 4]], 3, [[2, [3, [1]], 4], [3]]]
 * out : [1, 2, 3, 4, 5, 2, 4, 3, 2, 3, 1, 4, 3]
*/

{
    let example = [1, [2, 3, [4, 5], [2, 4]], 3, [[2, [3, [1]], 4], [3]]];

    function isArray(item) {
        return Object.prototype.toString.call( item ) === '[object Array]';
    }

    function convertToFlatArray(array) {

        function flattenIfHasSubArrays(array) {
            let result = [];
            for (let e of array) {
                if (isArray(e)) {
                    result = result.concat(flattenIfHasSubArrays(e));
                } else {
                    result.push(e);
                }
            }
            return result;
        }

        if (isArray(array)) {
            return flattenIfHasSubArrays(array);
        } else {
            return [].concat(array);
        }
    }

    console.log('task 1 output:');
    console.log('in:', example);
    console.log('out:', convertToFlatArray(example));

}

/*
 * #2
 * Напишите функцию, которая будет преобразовывать
 * ключи объекта в camelCase
 * EX 1:
 * in  : { user_name: 'shar', is_logged_in: true }
 * out : { userName: 'shar', isLoggedIn: true }
 *
 * EX 2:
 * in  : { 'user NAME': 'shar', TYPE: true }
 * out : { userName: 'shar', type: true }
*/

{
    let testObj1 = {
        user_name: 'shar',
        is_logged_in: true
    };

    let testObj2 = {
        'user NAME': 'shar',
        TYPE: true
    };

    function toCamelCase(str, separatorsRegEx) {
        return str.replace(/([A-Za-z0-9]+)/g, function (occurrence, trash, offset) {
            occurrence = occurrence.toLowerCase();
            return offset > 0 ?
                occurrence.charAt(0).toUpperCase() + occurrence.slice(1) :
                occurrence;
        }).replace(separatorsRegEx, '');
    }

    function fixObjectKeys(obj, separators) {
        var fixedObj = {};
        for (let key of Object.keys(obj)) {
            fixedObj[toCamelCase(key, separators)] = obj[key];
        }
        return fixedObj;
    }

    const separatorsRegEx = /[\s|_]/g;

    console.log('task 2 output:');
    console.log('test obj1 in:', testObj1);
    console.log('test obj1 out:', fixObjectKeys(testObj1, separatorsRegEx));
    console.log('test obj2 in:', testObj2);
    console.log('test obj2 out:', fixObjectKeys(testObj2, separatorsRegEx));

}

/*
 * #3
 * Усовершенствуйте функцию из задания выше так,
 * чтобы она работала и для вложенных структур тоже
 * EX:
 * in  : { all-users: [{ user_name: 'shar', info: { full_description: '42' } }] }
 * out : { allUsers: [{ userName: 'shar', info: { fullDescription: '42' } }] }
 *
 * P.S. Постарайтесь переиспользовать общую логику
*/

{

    const testObj = {
        'all-users': [{user_name: 'shar', info: {full_description: '42'}}]
    };

    function isObject(item) {
        return item === Object(item);
    }

    function fixWholeObject(obj, separators) {
        let fixedObj = fixObjectKeys(obj, separators);

        for (let key of Object.keys(fixedObj)) {
            const value = fixedObj[key];
            if (isArray(value)) {
                fixedObj[key] = value.map(elem => {
                    return fixWholeObject(elem, separators);
                });
            } else if (isObject(value)) {
                fixedObj[key] = fixWholeObject(value, separators);
            }
        }

        return fixedObj;
    }

    console.log('task 3 output:');
    console.log('test obj in:', testObj);
    console.log('test obj out:', fixWholeObject(testObj, /[\s|_|-]/g));

}
