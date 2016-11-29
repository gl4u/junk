/*
 * #1
 * Напишите функцию, которая будет преобразовывать массив
 * со вложенными массивами в один плоский массив
 * EX:
 * in  : [1, [2, 3, [4, 5], [2, 4]], 3, [[2, [3, [1]], 4], [3]]]
 * out : [1, 2, 3, 4, 5, 2, 4, 3, 2, 3, 1, 4, 3]
*/

{
    const example = [1, [2, 3, [4, 5], [2, 4]], 3, [[2, [3, [1]], 4], [3]]];

    function convertToFlattenedArray(array) {
        return array.reduce((flatArray, arrayElem) => {
            return flatArray.concat(Array.isArray(arrayElem) ? convertToFlattenedArray(arrayElem) : arrayElem);
        }, []);
    }

    console.log('task 1 output:');
    console.log('in:', example);
    console.log('out:', convertToFlattenedArray(example));

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
    const testObj1 = {
        user_name: 'shar',
        is_logged_in: true
    };

    const testObj2 = {
        'user NAME': 'shar',
        TYPE: true
    };

    function toCamelCase(str) {
        return str.toLowerCase().replace(/[\s|_|-](.)/g, matchedChar => matchedChar.toUpperCase())
            .replace(/[\s|_|-]/g, '');
    }

    function convertKeysToCamelCase(obj) {
        return Object.keys(obj).reduce((camelCaseKeysObj, key) => {
            camelCaseKeysObj[toCamelCase(key)] = obj[key];
            return camelCaseKeysObj;
        }, {});
    }

    console.log('task 2 output:');
    console.log('test obj1 in:', testObj1);
    console.log('test obj1 out:', convertKeysToCamelCase(testObj1));
    console.log('test obj2 in:', testObj2);
    console.log('test obj2 out:', convertKeysToCamelCase(testObj2));

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

    function convertKeysToCamelCaseDeep(obj) {
        const camelCaseKeysObj = convertKeysToCamelCase(obj);

        return Object.keys(camelCaseKeysObj).reduce((camelCaseKeysObjNested, key) => {
            const value = camelCaseKeysObjNested[key];

            camelCaseKeysObjNested[key] = Array.isArray(value) ? value.map(elem => convertKeysToCamelCaseDeep(elem)) :
                isObject(value) ? convertKeysToCamelCaseDeep(value) : value;
            return camelCaseKeysObjNested;
        }, camelCaseKeysObj);

    }

    console.log('task 3 output:');
    console.log('test obj in:', testObj);
    console.log('test obj out:', convertKeysToCamelCaseDeep(testObj));

}

